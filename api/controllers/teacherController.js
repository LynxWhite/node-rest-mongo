'use strict';

const mongoose = require('mongoose');
const Teacher = mongoose.model('Teacher');
const Subject = mongoose.model('Subject');

exports.list_all_teachers = (req, res) => {
    Teacher.find({}, (err, teacher) => {
        if (err)
            res.send(err);
        res.json(teacher);
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