'use strict';

const mongoose = require('mongoose');
const Subject = mongoose.model('Subject');

exports.list_in_faculty = (req, res) => {
    Subject.find({faculty: req.params.facultyId}, (err, subject) => {
        if (err)
            res.send(err);
        res.json({type: 'subjects', value: subject})
    })
};

exports.create_a_subject = (req, res) => {
    const new_subject = new Subject(req.body);
    new_subject.save((err, subject) => {
        if (err)
            res.send(err);
        res.json(subject);
    })
}

exports.read_a_subject = (req, res) => {
    Subject.findById(req.params.subjectId, (err, subject) => {
        if (err)
            res.send(err);
        res.json(subject);
    })
}

exports.update_a_subject = (req, res) => {
    Subject.findOneAndUpdate({_id: req.params.subjectId}, req.body, {new: true}, (err, subject) => {
        if (err)
            res.send(err);
        res.json(subject);
    })
}

exports.delete_a_subject = (req, res) => {
    Subject.remove({
        _id: req.params.subjectId
    }, (err, subject) => {
        if (err) 
            res.send(err);
        res.json({message: 'Предмет удалён'});
    })
};