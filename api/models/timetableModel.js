'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/* 
Факультет:
 - Название
 - Аббревиатура
 - Ключ (абревиатура на английском)
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

/*
Время
 - время 
 - факультет
*/
const TimeSchema = new Schema({
    name: {
        type: String,
    },
    faculty: {
        type: Schema.Types.ObjectId,
        ref: 'Faculty',
    },
});

/*
Ячейка расписания:
 - время 
 - день 
 - подгруппа (first/second/all)
 - аудитория 
 - предмет
 - курс
*/
const CellSchema = new Schema({
    time: {
        type: Schema.Types.ObjectId,
        ref: 'Time',
    },
    day: {
        type: String,
    },
    subgroup: {
        type: String,
        default: 'all',
    },
    auditory: {
        type: Schema.Types.ObjectId,
        ref: 'Auditory',
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
    }

});

module.exports = mongoose.model('Faculty', FacultySchema);
module.exports = mongoose.model('Direction', DirectionSchema);
module.exports = mongoose.model('Course', СourseSchema);
module.exports = mongoose.model('Teacher', TeacherSchema);
module.exports = mongoose.model('Subject', SubjectSchema);
module.exports = mongoose.model('Auditory', AuditorySchema);
module.exports = mongoose.model('Time', TimeSchema);
module.exports = mongoose.model('Cell', CellSchema);