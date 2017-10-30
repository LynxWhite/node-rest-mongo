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
        required: true,
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

/* 
Преподаватель:
 - Фамилия Имя Отчество
 - Предметы
*/
const TeacherSchema = new Schema({
    fio: {
        type: String,
        unique: true,
    },
    subjects: [{ type : Schema.Types.ObjectId, ref: 'Subject' }],
});


/* 
Предмет:
 - Название
*/
const SubjectSchema = new Schema({
    name: {
        type: String,
    },
});


/* 
Аудитория:
 - Номер
 - Вместимость
 - Есть ли проектор
 - Есть ли компьютер
 - Достает ли ВайФай
*/
const AuditorySchema = new Schema({
    number: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
    },
    projector: {
        type: Boolean,
        default: false,
    },
    computer: {
        type: Boolean,
        default: false,
    },
    wifi: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Faculty', FacultySchema);
module.exports = mongoose.model('Direction', DirectionSchema);
module.exports = mongoose.model('Course', СourseSchema);
module.exports = mongoose.model('Teacher', TeacherSchema);
module.exports = mongoose.model('Subject', SubjectSchema);
module.exports = mongoose.model('Auditory', AuditorySchema);