'use strict';

const utils = require('../utils/utils.js');
const mongoose = require('mongoose');

const Time = mongoose.model('Time');
const Table = mongoose.model('Table');
const Faculty = mongoose.model('Faculty');
const ObjectId = require('mongodb').ObjectID;

const array = {};

exports.create_table = (req, res) => {
    const {year, semester, course, direction, faculty, groupName, subgroups, start, end, time} = req.body;
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
                time,
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
                let tablesByLevel = tables.filter(table => table.direction.level === educationLevel);
                const educationCourse = course? course : tablesByLevel[0] ? tablesByLevel[0].course : 0;
                let trueTables = tablesByLevel.filter(table => table.course === Number(educationCourse));
                let times = [];
                Time.findOne({_id: tables[0].time}, (err, times) => {
                    let outputTimetable = {};
                    for (let day of days) {
                        outputTimetable[day] = times.schedule.map((time, index) => {
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
                        directions: tables.filter(table => (table.course === Number(educationCourse) && table.direction.level === educationLevel)).map(
                            filtered => filtered.direction.name
                        ),
                        courses: tables.filter(table => (table.direction.level === educationLevel)).map(
                            filtered => filtered.course
                        ),
                        levels: utils.unique(tables.map(table => table.direction.level)),
                    });
                })
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