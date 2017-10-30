'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/* 
Факультет:
 - Название
 - Аббривеатура
 - Ключ (абривеатура на английском)
*/
const FacultySchema = new Schema({
    name: {
        type: String
    },
    abbr: {
        type: String
    },
    abbr_key: {
        type: String,
        required: 'enter faculty en name or abbr'
    }
});

/*
Направление:
 - Название направления
 - Номер направления
 - Факультет (id)
*/
const DirectionSchema = new Schema({
    name: {
        type: String
    },
    number: {
        type: Number,
    },
    faculty: {
        type: Schema.Types.ObjectId,
        ref: 'Faculty',
    },
});

/* 
Курс:
 - Номер курса
 - тип (бакалавриат/магистратура/специалитет)
 - Направление (id)
*/
const СourseSchema = new Schema({
    number: {
        type: Number,
    },
    type: {
        type: String,
    },
    direction: {
        type: Schema.Types.ObjectId,
        ref: 'Direction',
    },
});

module.exports = mongoose.model('Faculty', FacultySchema);
module.exports = mongoose.model('Direction', DirectionSchema);
module.exports = mongoose.model('Course', СourseSchema);