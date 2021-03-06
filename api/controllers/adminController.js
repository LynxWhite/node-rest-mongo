'use strict';

const mongoose = require('mongoose');
const Admin = mongoose.model('Admin');
const Faculty = mongoose.model('Faculty');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const config = require('../../config');

exports.create_an_admin = (req, res) => {
    const { login, pass, faculty } = req.body;
    const new_admin = new Admin({
        login,
        faculty,
    });
    bcrypt.hash(pass, 10, (err, hash) => {
        if (err) { res.status(500).send({ error: err }) }
        else {
            new_admin.pass = hash
            new_admin.save((err, user) => {
                if (err) { res.status(500).send({ error: err }) }
                else {
                    res.json({ type: 'admins', value: user })
                }
            })
        }
    });
}

exports.delete_an_admin = (req, res) => {
    Admin.remove({
        _id: req.params.adminId
    }, (err, admin) => {
        if (err)
            res.send(err);
        res.json({ message: 'Администратор удалён' });
    })
};

exports.update_an_admin = (req, res) => {
    Admin.findOneAndUpdate({ _id: req.params.adminId }, req.body, { new: true }, (err, admin) => {
        if (err)
            res.send(err);
        res.json('Администратор изменен');
    })
}


exports.admin_account = (req, res) => {
    if (!req.headers['x-auth']) { return res.sendStatus(401) }
    try {
        const login = jwt.decode(req.headers['x-auth'], config.secretkey).login;
    } catch (err) {
        return res.sendStatus(400);
    }
    const login = jwt.decode(req.headers['x-auth'], config.secretkey).login
    Admin.findOne({ login: login }).populate('faculty')
        .exec((err, user) => {
            if (err) {
                return res.status(500).send({ error: err })
            }
            if (!user) {
                return res.sendStatus(401)
            }
            res.json(user)
        })
}

exports.admin_login = (req, res) => {
    if (!req.body.login || !req.body.pass) {
        return res.sendStatus(400);
    } else {
        const login = req.body.login;
        const password = req.body.pass;
        Admin.findOne({ login: login })
            .select('pass')
            .exec((err, user) => {
                if (err) {
                    return res.status(500).send({ error: err })
                }
                if (!user) { return res.sendStatus(401) }
                bcrypt.compare(password, user.pass, (err, valid) => {
                    if (err) {
                        return res.status(500).send({ error: err })
                    }
                    if (!valid) { return res.sendStatus(401) }
                    var token = jwt.encode({ login: login }, config.secretkey)
                    res.send({ token })
                })
            })
    }
}
