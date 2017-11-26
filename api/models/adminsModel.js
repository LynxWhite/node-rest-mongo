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
        select: false,
        required: 'enter admin pass',
    },
    faculty: {
        type: Schema.Types.ObjectId,
        ref: 'Faculty',
    },
    used: {
        type: Number,
        default: 0,
    }
});

module.exports = mongoose.model('Admin', AdminSchema);
