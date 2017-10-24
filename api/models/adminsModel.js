'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    login: {
        type: String,
        unique: true,
        required: 'enter admin login',
    },
    pass: {
        type: String,
        required: 'enter admin pass',
    },
    faculty: {
        type: Schema.Types.ObjectId,
        ref: 'Faculty',
    },
});

module.exports = mongoose.model('Admin', AdminSchema);
