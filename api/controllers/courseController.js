'use strict';

const mongoose = require('mongoose');
const Course = mongoose.model('Course');


exports.list_all_courses = (req, res) => {
    Course.find({}, (err, course) => {
        if (err)
            res.send(err);
        res.json(course);
    })
};


exports.create_a_course = (req, res) => {
    const data = {
        number: req.body.number,
        type: req.body.type,
        direction: req.params.directionId
    }
    const new_course = new Course(data);
    new_course.save((err, course) => {
        if (err)
            res.send(err);
        res.json(course);
    })
}

exports.read_a_course = (req, res) => {
    Course.findById(req.params.courseId, (err, course) => {
        if (err)
            res.send(err);
        res.json(course);
    })
}

exports.update_a_course = (req, res) => {
    Course.findOneAndUpdate({_id: req.params.courseId}, req.body, {new: true}, (err, course) => {
        if (err)
            res.send(err);
        res.json(course);
    })
}

exports.delete_a_course = (req, res) => {
    Course.remove({
        _id: req.params.courseId
    }, (err, course) => {
        if (err) 
            res.send(err);
        res.json({message: 'Курс удален'});
    })
};