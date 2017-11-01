'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    },
    directions: [{ type : Schema.Types.ObjectId, ref: 'Direction' }],
});

const DirectionSchema = new Schema({
    name: {
        type: String
    },
    number: {
        type: Number,
    },
    type: {
        type: String,
    },
    courses: [{ type : Schema.Types.ObjectId, ref: 'Course' }],
});

const СourseSchema = new Schema({
    number: {
        type: Number,
    },
    cells: [{ type : Schema.Types.ObjectId, ref: 'Cell' }],
});

const TeacherSchema = new Schema({
    fio: {
        type: String,
        unique: true,
    },
    subjects: [{ type : Schema.Types.ObjectId, ref: 'Subject' }],
});

const SubjectSchema = new Schema({
    name: {
        type: String,
    },
});

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

const CellSchema = new Schema({
    time: {
        type: Number,
    },
    day: {
        type: String,
    },
    lessons: [{ type : Schema.Types.ObjectId, ref: 'Lesson' }],
});

const LessonSchema = new Schema({
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
    },
    auditory: {
        type: Schema.Types.ObjectId,
        ref: 'Auditory',
    },
    subgroup: {
        type: String,
        default: 'all',
    },
    plus_minus: {
        type: String,
        default: '',
    }
})

const TimeSchema = new Schema({
    time: {
        type: String,
    },
    faculty: {
        type: Schema.Types.ObjectId,
        ref: 'Faculty',
    },
})

module.exports = mongoose.model('Faculty', FacultySchema);
module.exports = mongoose.model('Direction', DirectionSchema);
module.exports = mongoose.model('Course', СourseSchema);
module.exports = mongoose.model('Teacher', TeacherSchema);
module.exports = mongoose.model('Subject', SubjectSchema);
module.exports = mongoose.model('Auditory', AuditorySchema);
module.exports = mongoose.model('Cell', CellSchema);
module.exports = mongoose.model('Lesson', LessonSchema);
module.exports = mongoose.model('Time', TimeSchema);