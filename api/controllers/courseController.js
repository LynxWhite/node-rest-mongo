'use strict';

const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const Direction = mongoose.model('Direction');


exports.list_all_courses_in_direction = (req, res) => {
    Direction.find({_id: req.params.directionId})
        .populate('courses')
        .exec(function (err, courses) {
            if (err)
                res.send(err);
            res.json(courses);
        })
};

exports.create_a_course = (req, res) => {
    const new_course = new Course(req.body);
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