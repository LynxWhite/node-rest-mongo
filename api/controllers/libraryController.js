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


exports.get_manager_libraries = (req, res) => {
    const {faculty} = req.params;
    let promises = [];
    Faculty.findById(faculty, (err, fac) => {
        promises.push(Admin.find({}).then((value) => {
            return {type: 'admins', name:'Менеджеры', icon: 'vpn_key'};
        }));
        promises.push(Faculty.find({}).then((value) => {
            return {type: 'faculties', name:'Факультеты', icon: 'work', value};
        }));
        promises.push(Direction.find({faculty}).sort({code: -1}).then((value) => {
            return {type: 'directions', name:'Направления', icon: 'directions', value};
        }));
        promises.push(Teacher.find({faculty}).sort({fio:1}).then((value) => {
            return {type: 'teachers', name:'Преподаватели', icon: 'group', value};
        }));
        promises.push(Subject.find({faculty}).then((value) => {
            return {type: 'subjects', name:'Предметы', icon: 'assignment', value};
        }));
        promises.push(Auditory.find({}).sort({housing: 1}).then((auditories) => {
            let value = [...auditories];
            auditories.forEach((auditory, index) => {
                if (auditory.housing === fac.favouriteHousing) {
                    value.splice(0, 0, value.splice(index, 1)[0]);
                };
            });
            return {type: 'auditories', name:'Аудитории', icon: 'local_library', value};
        }));
        Promise.all(promises).then(libraries => {
            res.send(libraries);
        });
    });
};

exports.get_admin_libraries = (req, res) => {
    const {faculty} = req.params;
    let promises = [];
    promises.push(Admin.find({}).then((value) => {
        return {type: 'admins', name:'Менеджеры и Администраторы', icon: 'vpn_key', value};
    }));
    promises.push(Faculty.find({}).then((value) => {
        return {type: 'faculties', name:'Факультеты', icon: 'work', value};
    }));
    promises.push(Direction.find(faculty ? {faculty: faculty} : '').sort({level: 1, code: 1, profile: 1}).then((value) => {
        return {type: 'directions', name:'Направления', icon: 'directions', value};
    }));
    promises.push(Teacher.find(faculty ? {faculty: faculty} : '').sort({fio:1}).then((value) => {
        return {type: 'teachers', name:'Преподаватели', icon: 'group', value};
    }));
    promises.push(Subject.find(faculty ? {faculty: faculty} : '').sort({faculty: 1, name: 1}).then((value) => {
        return {type: 'subjects', name:'Предметы', icon: 'assignment', value};
    }));
    promises.push(Auditory.find({}).then((value) => {
        return {type: 'auditories', name:'Аудитории', icon: 'local_library', value};
    }));
    Promise.all(promises).then(libraries => {
        res.send(libraries);
    })
};