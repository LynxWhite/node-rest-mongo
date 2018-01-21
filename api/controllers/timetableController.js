'use strict';

const utils = require('../utils/utils.js');
const mongoose = require('mongoose');

const Time = mongoose.model('Time');
const Table = mongoose.model('Table');
const Faculty = mongoose.model('Faculty');
const ObjectId = require('mongodb').ObjectID;

const array = {};

exports.create_table = (req, res) => {
    const {year, semester, course, direction, faculty, groupName, subgroups, start, end} = req.body;
    Table.find({
        year,
        semester,
        course,
        direction,
        faculty,
    }, (err, table) => {
        if (table.length === 0) {
            const new_table = new Table({
                year,
                semester,
                course,
                groupName,
                faculty,
                direction,
                subgroups,
                start,
                end,
                cells: [],
            });
            new_table.save((err, table) => {
                if (err)
                    res.send(err);
                res.json(table);
            });
        } else res.json({message: 'Расписание уже существует'});
    })
};

exports.get_timetable = (req, res) => {
    const {year, semester, faculty, level, course} = req.params;
    const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    let times = [];
    Time.find({faculty}, (err, tts) => {
        if (tts) {
            times = tts.map(time => {
                return time.time;
            });
        }
    })
    Table.find({
        year,
        semester,
        faculty,
        }, (err, result) => {
            Table.populate(result, [{
                path: 'direction',
                model: 'Direction',
            }, {
                path: 'cells.time',
                model: 'Time',
            }, {
                path: 'cells.lessons.teacher',
                model: 'Teacher',
            }, {
                path: 'cells.lessons.subject',
                model: 'Subject',
            }, {
                path: 'cells.lessons.auditory',
                model: 'Auditory',
            }], (err, tables) => {
                const educationLevel = level? level : tables[0].direction.level;
                const educationCourse = course? course : tables[0].course;
                let trueTables = tables.filter(table => (
                    table.direction.level === educationLevel && table.course === educationCourse
                ));
                let outputTimetable = {};
                for (let day of days) {
                    outputTimetable[day] = times.map((time, index) => {
                        return [time, ...trueTables.map(table => {
                            const tableCell = null;
                            table.cells.forEach(cell => {
                                if (cell.time === time && cell.day === day){
                                    tableCell = cell;
                                }
                            })
                            return tableCell;
                        })]
                    });
                }
                res.json({
                    timetable: outputTimetable,
                    directions: utils.unique(tables.map(table => table.direction.name)),
                    courses: utils.unique(tables.map(table => table.course)),
                    levels: utils.unique(tables.map(table => table.direction.level)),
                });
            })
        }
    );
};

exports.get_timetables = (req, res) => {
    const {faculty} = req.params;
    Table.aggregate([
        { $match: faculty? {faculty: ObjectId(faculty)} : {}},
        { $sort : { year: 1, faculty: 1, direction: 1, profile: 1, course: 1, level: 1 } },
        { $group : {
            _id : { faculty: "$faculty", year: "$year", semester: "$semester"},
            tables: { $push: "$$ROOT" }
        } },
    ], (err, result) => {
        if (err)
            res.send(err);
        Table.populate(result, [{
            path: 'tables.faculty',
            model: 'Faculty',
        }, {
            path: '_id.faculty',
            model: 'Faculty',
        }, {
            path: 'tables.direction',
            model: 'Direction',
        }], (err, p) => {
            res.json(p);
        });
    } );
};

exports.delete_timetable = (req, res) => {
    Table.remove({
        _id: req.params.tableId
    }, (err, timetable) => {
        if (err)
            res.send(err);
        res.json({message: 'Расписание удалёно'});
    })
};

exports.update_timetable = (req, res) => {
    const {subgroups, start, end} = req.body;
    const newFields = {
        subgroups,
        start,
        end,
    }
    Table.findOneAndUpdate({_id: req.params.tableId}, newFields, (err, table) => {
        if (err)
            res.send(err);
        res.json(table);
    })
}