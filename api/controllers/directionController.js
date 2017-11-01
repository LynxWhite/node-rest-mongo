'use strict';

const mongoose = require('mongoose');
const Direction = mongoose.model('Direction');
const Faculty = mongoose.model('Faculty');

exports.list_all_directions_in_faculty = (req, res) => {
    Faculty.find({_id: req.params.facultyId})
        .populate('directions', null, { type: { $gte: req.params.type }},)
        .exec(function (err, faculty) {
            if (err)
                res.send(err);
            res.json(faculty[0].directions);
        })
};

exports.create_a_direction = (req, res) => {
    const new_direction = new Direction(req.body);
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