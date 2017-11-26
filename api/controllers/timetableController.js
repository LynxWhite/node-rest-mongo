'use strict';

const mongoose = require('mongoose');

const Faculty = mongoose.model('Faculty');
const Admin = mongoose.model('Admin');
const Direction = mongoose.model('Direction');
const Teacher = mongoose.model('Teacher');
const Subject = mongoose.model('Subject');
const Auditory = mongoose.model('Auditory');
const Time = mongoose.model('Time');
const Table = mongoose.model('Table');

const array = {};

exports.create_table = (req, res) => {
    const new_table = new Table({
        year: req.body.year,
        semester: req.body.semester,
        course: req.body.course,
        groupName: req.body.groupName,
        faculty: req.body.faculty,
        direction: req.body.direction,
        subgroups: req.body.subgroup,
        cells: [],
    });
    new_table.save((err, table) => {
        if (err)
            res.send(err);
        res.json(table);
    });
};

exports.get_manager_libraries = (req, res) => {
    const {faculty} = req.params;
    let promises = [];
    promises.push(Direction.find({faculty}).sort({code: -1}).then((value) => {
        return {type: 'directions', name:'Направления', icon: 'directions', value};
    }));
    promises.push(Teacher.find({faculty}).then((value) => {
        return {type: 'teachers', name:'Преподаватели', icon: 'group', value};
    }));
    promises.push(Subject.find({faculty}).then((value) => {
        return {type: 'subjects', name:'Предметы', icon: 'assignment', value};
    }));
    Promise.all(promises).then(libraries => {
        res.send(libraries);
    })
};

exports.get_admin_libraries = (req, res) => {
    let promises = [];
    promises.push(Admin.find({faculty: { $ne: null }}).then((value) => {
        return {type: 'admins', name:'Менеджеры', icon: 'vpn_key', value};
    }));
    promises.push(Faculty.find({}).then((value) => {
        return {type: 'faculties', name:'Факультеты', icon: 'work', value};
    }));
    promises.push(Direction.find({}).sort({code: -1}).then((value) => {
        return {type: 'directions', name:'Направления', icon: 'directions', value};
    }));
    promises.push(Teacher.find({}).then((value) => {
        return {type: 'teachers', name:'Преподаватели', icon: 'group', value};
    }));
    promises.push(Subject.find({}).then((value) => {
        return {type: 'subjects', name:'Предметы', icon: 'assignment', value};
    }));
    promises.push(Auditory.find({}).then((value) => {
        return {type: 'auditories', name:'Аудитории', icon: 'local_library', value};
    }));
    Promise.all(promises).then(libraries => {
        res.send(libraries);
    })
};


exports.get_timetable = (req, res) => {
    const {year, semester, faculty, direction, course} = req.params;
    const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    let times = [];
    Time.find({faculty}, (err, time) => {
        times = time;
    })
    for (let i = 0; i<=5; i++) {
        list[i] = [times[i].time];
    }
};
