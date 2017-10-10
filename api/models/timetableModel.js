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

module.exports = mongoose.model('Faculty', FacultySchema);
