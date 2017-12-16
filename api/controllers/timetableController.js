'use strict';

const mongoose = require('mongoose');

const Time = mongoose.model('Time');
const Table = mongoose.model('Table');
const Faculty = mongoose.model('Faculty');
const ObjectId = require('mongodb').ObjectID;

const array = {};

exports.create_table = (req, res) => {
    const new_table = new Table({
        year: req.body.year,
        semester: req.body.semester,
        course: req.body.course,
        groupName: req.body.groupName,
        faculty: req.body.faculty,
        direction: req.body.direction,
        subgroups: req.body.subgroup,
        start: req.body.start,
        end: req.body.end,
        cells: [],
    });
    new_table.save((err, table) => {
        if (err)
            res.send(err);
        res.json(table);
    });
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
