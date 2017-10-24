'use strict';

const mongoose = require('mongoose');
const Admin = mongoose.model('Admin');
const Faculty = mongoose.model('Faculty');

exports.create_an_admin = (req, res) => {
    const {login, pass, faculty} = req.body;
    Faculty.findOne({abbr_key: faculty}, (err, fac) => {
        if (err)
            res.send(err);
        const new_admin = new Admin({
            login,
            pass,
            faculty: fac,
        });
        new_admin.save((err, admin) => {
            if (err)
                res.send(err);
            res.json(admin);
        });
    });
}
