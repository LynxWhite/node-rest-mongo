'use strict';

const mongoose = require('mongoose');
const Time = mongoose.model('Time');

exports.list_all_times_by_faculty = (req, res) => {
    Time.find({faculty: req.params.facultyId}, (err, time) => {
        if (err)
            res.send(err);
        res.json(time.sort((a, b) => {
            if (a.time < b.time) return 1
            if (a.time > b.time) return -1
            return 0
        }));
    })
};

exports.create_a_time = (req, res) => {
    const new_time = new Time(req.body);
    new_time.save((err, time) => {
        if (err)
            res.send(err);
        res.json(time);
    });
}

exports.read_a_time = (req, res) => {
    Time.findById(req.params.timeId, (err, time) => {
        if (err)
            res.send(err);
        res.json(time);
    })
}