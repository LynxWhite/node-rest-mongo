'use strict';

const mongoose = require('mongoose');
const Teacher = mongoose.model('Teacher');

exports.list_in_faculty = (req, res) => {
    Teacher.find({faculty: req.params.facultyId}, (err, teacher) => {
        if (err)
            res.send(err);
        res.json({type: 'teachers', value: teacher})
    })
};

exports.create_a_teacher = (req, res) => {
    const new_teacher = new Teacher(req.body);
    new_teacher.save((err, teacher) => {
        if (err)
            res.send(err);
        res.json(teacher);
    });
}

exports.update_a_teacher = (req, res) => {
    Teacher.findOneAndUpdate({_id: req.params.teacherId}, req.body, {new: true}, (err, teacher) => {
        if (err)
            res.send(err);
        res.json(teacher);
    })
}

exports.read_a_teacher = (req, res) => {
    Teacher.findById(req.params.teacherId, (err, teacher) => {
        if (err)
            res.send(err);
        res.json(teacher);
    })
}

exports.delete_a_teacher = (req, res) => {
    Teacher.remove({
        _id: req.params.teacherId
    }, (err, teacher) => {
        if (err) 
            res.send(err);
        res.json({message: 'Преподаватель удалён'});
    })
};