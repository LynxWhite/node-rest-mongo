'use strict';

const mongoose = require('mongoose');
const Auditory = mongoose.model('Auditory');

exports.list_all_auditories = (req, res) => {
    Auditory.find({}, (err, auditory) => {
        if (err)
            res.send(err);
        res.json(auditory);
    })
};

exports.create_a_auditory = (req, res) => {
    const new_auditory = new Auditory(req.body);
    new_auditory.save((err, auditory) => {
        if (err)
            res.send(err);
        res.json(auditory);
    })
}

exports.read_a_auditory = (req, res) => {
    Auditory.findById(req.params.auditoryId, (err, auditory) => {
        if (err)
            res.send(err);
        res.json(auditory);
    })
}

exports.update_a_auditory = (req, res) => {
    Auditory.findOneAndUpdate({_id: req.params.auditoryId}, req.body, {new: true}, (err, auditory) => {
        if (err)
            res.send(err);
        res.json(auditory);
    })
}

exports.delete_a_auditory = (req, res) => {
    Auditory.remove({
        _id: req.params.auditoryId
    }, (err, auditory) => {
        if (err) 
            res.send(err);
        res.json({message: 'Аудитория удалёна'});
    })
};