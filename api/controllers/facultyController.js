'use strict';

const mongoose = require('mongoose');
const Faculty = mongoose.model('Faculty');

exports.list_all_faculties = (req, res) => {
    Faculty.find({}, (err, faculty) => {
        if (err)
            res.send(err);
        res.json(faculty);
    })
};

exports.create_a_faculty = (req, res) => {
    const new_faculty = new Faculty(req.body);
    new_faculty.save((err, faculty) => {
        if (err)
            res.send(err);
        res.json({type: 'faculties', value: faculty})
    })
}

exports.read_a_faculty = (req, res) => {
    Faculty.findById(req.params.facultyId, (err, faculty) => {
        if (err)
            res.send(err);
        res.json(faculty);
    })
}

exports.update_a_faculty = (req, res) => {
    Faculty.findOneAndUpdate({_id: req.params.facultyId}, req.body, {new: true}, (err, faculty) => {
        if (err)
            res.send(err);
        res.json(faculty);
    })
}

exports.delete_a_faculty = (req, res) => {
    Faculty.remove({
        _id: req.params.facultyId
    }, (err, faculty) => {
        if (err) 
            res.send(err);
        res.json({message: 'Факультет удалён'});
    })
};