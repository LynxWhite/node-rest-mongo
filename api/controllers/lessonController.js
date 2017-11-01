'use strict';

const mongoose = require('mongoose');
const Lesson = mongoose.model('Lesson');
const Cell = mongoose.model('Cell');



exports.list_all_lessons = (req, res) => {
    Lesson.find({}, (err, lesson) => {
        if (err)
            res.send(err);
        res.json(lesson);
    })
};

exports.list_all_lessons_in_cell = (req, res) => {
    Cell.find({_id: req.params.cellId})
        .populate('lessons')
        .exec(function (err, lessons) {
            if (err)
                res.send(err);
            res.json(lessons);
        })
};

exports.create_a_lesson = (req, res) => {
    const new_lesson = new Lesson(req.body);
    new_lesson.save((err, lesson) => {
        if (err)
            res.send(err);
        res.json(lesson);
    })
}

exports.read_a_lesson = (req, res) => {
    Lesson.findById(req.params.lessonId, (err, lesson) => {
        if (err)
            res.send(err);
        res.json(lesson);
    })
}

exports.update_a_lesson = (req, res) => {
    Lesson.findOneAndUpdate({_id: req.params.lessonId}, req.body, {new: true}, (err, lesson) => {
        if (err)
            res.send(err);
        res.json(lesson);
    })
}

exports.delete_a_lesson = (req, res) => {
    Lesson.remove({
        _id: req.params.lessonId
    }, (err, lesson) => {
        if (err) 
            res.send(err);
        res.json({message: 'Пара удалёна'});
    })
};