'use strict';

const mongoose = require('mongoose');
const Time = mongoose.model('Time');

exports.list_all_times = (req, res) => {
    Time.find({}, (err, time) => {
        if (err)
            res.send(err);
        res.json(time);
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