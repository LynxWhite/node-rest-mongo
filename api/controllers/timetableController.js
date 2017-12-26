'use strict';

const mongoose = require('mongoose');

const Time = mongoose.model('Time');
const Table = mongoose.model('Table');
const Faculty = mongoose.model('Faculty');
const ObjectId = require('mongodb').ObjectID;

const array = {};

exports.create_table = (req, res) => {
    Table.find({
        year: req.body.year,
        semester: req.body.semester,
        course: req.body.course,
        direction: req.body.direction,
        faculty: req.body.faculty,
    }, (err, table) => {
        if (table.length === 0) {
            const start = req.body.start ? req.body.start.split('.') : '';
            const end = req.body.end ? req.body.end.split('.') : '';
            const new_table = new Table({
                year: req.body.year,
                semester: req.body.semester,
                course: req.body.course,
                groupName: req.body.groupName,
                faculty: req.body.faculty,
                direction: req.body.direction,
                subgroups: req.body.subgroup,
                start: start[0] ? new Date(start[2],start[1]-s,start[0]+1) : new Date(),
                end: end[0] ? new Date(end[2],end[1]-1,end[0]+1) : new Date(),
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
    const {year, semester, faculty, direction, course} = req.params;
    const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    let times = [];
    Time.find({faculty}, (err, time) => {
        times = time;
    })
    for (let i = 0; i<=5; i++) {
        list[i] = [times[i].time];
    }
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
    Table.findOneAndUpdate({_id: req.params.tableId}, req.body, {new: true}, (err, table) => {
        if (err)
            res.send(err);
        res.json(table);
    })
}