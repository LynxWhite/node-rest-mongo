'use strict';

const mongoose = require('mongoose');
const Direction = mongoose.model('Direction');

exports.list_all_directions_in_faculty = (req, res) => {
    Direction.find({faculty: req.params.facultyId}, (err, direction) => {
        if (err)
            res.send(err);
        res.json(direction);
    })
};

exports.create_a_direction = (req, res) => {
    const data = {
        name: req.body.name,
        number: req.body.number,
        faculty: req.params.facultyId
    }
    const new_direction = new Direction(data);
    new_direction.save((err, direction) => {
        if (err)
            res.send(err);
        res.json(direction);
    })
}

exports.read_a_direction = (req, res) => {
    Direction.findById(req.params.directionId, (err, direction) => {
        if (err)
            res.send(err);
        res.json(direction);
    })
}

exports.update_a_direction = (req, res) => {
    Direction.findOneAndUpdate({_id: req.params.directionId}, req.body, {new: true}, (err, direction) => {
        if (err)
            res.send(err);
        res.json(direction);
    })
}

exports.delete_a_direction = (req, res) => {
    Direction.remove({
        _id: req.params.directionId
    }, (err, direction) => {
        if (err) 
            res.send(err);
        res.json({message: 'Направление удалено'});
    })
};