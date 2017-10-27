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
        required: 'enter faculty en name or abbr'
    }
});

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

module.exports = mongoose.model('Faculty', FacultySchema);
module.exports = mongoose.model('Direction', DirectionSchema);