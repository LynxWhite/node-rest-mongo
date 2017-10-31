'use strict';

const mongoose = require('mongoose');
const Cell = mongoose.model('Cell');

exports.list_all_cells = (req, res) => {
    Cell.find({}, (err, cell) => {
        if (err)
            res.send(err);
        res.json(cell);
    })
};

exports.create_a_cell = (req, res) => {
    const new_cell = new Cell(req.body);
    new_cell.save((err, cell) => {
        if (err)
            res.send(err);
        res.json(cell);
    })
}

exports.read_a_cell = (req, res) => {
    Cell.findById(req.params.cellId, (err, cell) => {
        if (err)
            res.send(err);
        res.json(cell);
    })
}

exports.update_a_cell = (req, res) => {
    Cell.findOneAndUpdate({_id: req.params.cellId}, req.body, {new: true}, (err, cell) => {
        if (err)
            res.send(err);
        res.json(cell);
    })
}

exports.delete_a_cell = (req, res) => {
    Cell.remove({
        _id: req.params.cellId
    }, (err, cell) => {
        if (err) 
            res.send(err);
        res.json({message: 'Предмет удалён'});
    })
};