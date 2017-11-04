'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TableSchema = new Schema({
    year: {
        type: String
    },
    semester: {
        type: String
    },
    course: {
        type: Number,
    },
    groupName: {
        type: String,
    },
    faculty: {
        type: Schema.Types.ObjectId,
        ref: 'Faculty',
    },
    direction: {
        type: Schema.Types.ObjectId,
        ref: 'Direction',
    },
    subgroups: [
        {
            type: String,
        },
    ],
    cells: [
        {
            time: {
                type: Schema.Types.ObjectId,
                ref: 'Time',
            },
            day: {
                type: String,
            },
            comment: {
                type: String,
            },
            lessons: [
                {
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
                        type: Number,
                        default: 0,
                    },
                    plus_minus: {
                        type: String,
                        default: '',
                    },
                    type: {
                        type: String,
                    }
                }
            ],
        }
    ]
});

const FacultySchema = new Schema({
    name: {
        type: String
    },
    abbr: {
        type: String
    },
});


const DirectionSchema = new Schema({
    code: {
        type: String,
    },
    name: {
        type: String
    },
    level: {
        type: String,
    },
    profile: {
        type: String,
    },
    abbr: {
        type: String,
    },
    faculty: {
        type : Schema.Types.ObjectId, 
        ref: 'Faculty'
    }
});

const TeacherSchema = new Schema({
    fio: {
        type: String,
        unique: true,
    },
    position: {
        type: String,
    },
    url: {
        type: String,
    },
    faculty: {
        type : Schema.Types.ObjectId, 
        ref: 'Faculty'
    }
});

const SubjectSchema = new Schema({
    name: {
        type: String,
    },
    abbr: {
        type: String,
    },
    faculty: {
        type : Schema.Types.ObjectId, 
        ref: 'Faculty'
    }
});

const AuditorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    extraName: {
        type: String,
    },
    housing: {
        type: String,
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
});

const TimeSchema = new Schema({
    time: {
        type: String,
    },
    faculty: {
        type: Schema.Types.ObjectId,
        ref: 'Faculty',
    },
})

module.exports = mongoose.model('Table', TableSchema);
module.exports = mongoose.model('Faculty', FacultySchema);
module.exports = mongoose.model('Direction', DirectionSchema);
module.exports = mongoose.model('Teacher', TeacherSchema);
module.exports = mongoose.model('Subject', SubjectSchema);
module.exports = mongoose.model('Auditory', AuditorySchema);
module.exports = mongoose.model('Time', TimeSchema);