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
    const {fio, subjects} = req.body;
    const allPromises = subjects.map( item => {
        return Subject.findOne({_id: item}, (err, sub) => {
            if (err)
                res.send(err);
            return sub;
        });
    });
    Promise.all(allPromises).then(array => {
        const new_teacher = new Teacher({
            fio,
            subjects: array,
        });
        new_teacher.save((err, teacher) => {
            if (err)
                res.send(err);
            res.json(teacher);
        });
    }).catch(error => {
        console.log(error);
    });
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