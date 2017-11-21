'use strict';

const mongoose = require('mongoose');

const Faculty = mongoose.model('Faculty');
const Direction = mongoose.model('Direction');
const Teacher = mongoose.model('Teacher');
const Subject = mongoose.model('Subject');
const Auditory = mongoose.model('Auditory');
const Time = mongoose.model('Time');
const Table = mongoose.model('Table');

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
        cells: [],
    });
    new_table.save((err, table) => {
        if (err)
            res.send(err);
        res.json(table);
    });
};

exports.get_all_libraries = (req, res) => {
    const {faculty} = req.params;
    let libraries = [];
    Direction.find({faculty}, (err, direction) => {
        libraries.push(direction);
    }).then(() => {
        Teacher.find({faculty}, (err, teacher) => {
            libraries.push(teacher);
        }).then(() => {
            Subject.find({faculty}, (err, subject) => {
                libraries.push(subject);
            }).then(() => {
                Auditory.find({}, (err, auditory) => {
                    libraries.push(auditory);
                }).then(() => {
                    res.send(libraries);
                })
            })
        })
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
