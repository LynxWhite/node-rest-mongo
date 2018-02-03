'use strict';

const utils = require('../utils/utils.js');
const mongoose = require('mongoose');

const Time = mongoose.model('Time');
const Table = mongoose.model('Table');
const Teacher = mongoose.model('Teacher');
const Subject = mongoose.model('Subject');
const Faculty = mongoose.model('Faculty');
const Auditory = mongoose.model('Auditory');
const ObjectId = require('mongodb').ObjectID;

const array = {};

exports.create_table = (req, res) => {
    const {year, semester, course, direction, faculty, groupName, subgroups, start, end, time} = req.body;
    Table.find({
        year,
        semester,
        course,
        direction,
        faculty,
    }, (err, table) => {
        if (table.length === 0) {
            const new_table = new Table({
                year,
                semester,
                course,
                groupName,
                faculty,
                direction,
                subgroups,
                start,
                end,
                time,
                cells: [],
            });
            new_table.save((err, table) => {
                if (err)
                    res.send(err);
                res.json(table);
            });
        } else res.json({message: 'Расписание уже существует'});
    })
};

exports.get_timetable = (req, res) => {
    const {year, semester, faculty, level, course} = req.params;
    const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    Table.find({
        year,
        semester,
        faculty,
        }, (err, result) => {
            Table.populate(result, [{
                path: 'direction',
                model: 'Direction',
            }, {
                path: 'cells.time',
                model: 'Time',
            }, {
                path: 'cells.lessons.teacher',
                model: 'Teacher',
            }, {
                path: 'cells.lessons.subject',
                model: 'Subject',
            }, {
                path: 'cells.lessons.auditory',
                model: 'Auditory',
            }], (err, tables) => {
                const educationLevel = level? level : tables[0].direction.level;
                let tablesByLevel = tables.filter(table => table.direction.level === educationLevel);
                const educationCourse = course? course : tablesByLevel[0] ? tablesByLevel[0].course : 0;
                let trueTables = tablesByLevel.filter(table => table.course === Number(educationCourse));
                let times = [];
                Time.findOne({_id: tables[0].time}, (err, times) => {
                    let outputTimetable = {};
                    for (let day of days) {
                        outputTimetable[day] = times.schedule.map((time, index) => {
                            return [time, ...trueTables.map(table => {
                                let tableCell = null;
                                table.cells.forEach(cell => {
                                    if (cell.number === index && cell.day === day) {
                                        tableCell = cell;
                                    }
                                })
                                return tableCell;
                            })]
                        });
                    }
                    res.json({
                        timetable: outputTimetable,
                        directions: tables.filter(table => (table.course === Number(educationCourse) && table.direction.level === educationLevel)).map(
                            filtered => {
                                return {
                                    name: filtered.direction.abbr + ' (' + filtered.direction.profile + ')',
                                    id: filtered.direction._id,
                                }
                            }
                        ),
                        courses: tables.filter(table => (table.direction.level === educationLevel)).map(
                            filtered => filtered.course
                        ),
                        levels: utils.unique(tables.map(table => table.direction.level)),
                        requestParams: {
                            year,
                            semester,
                            faculty,
                            level: educationLevel,
                            course: educationCourse,
                        }
                    });
                })
            })
        }
    );
};

exports.get_timetables = (req, res) => {
    const {faculty} = req.params;
    Table.aggregate([
        { $match: faculty? {faculty: ObjectId(faculty)} : {}},
        { $sort : { year: 1, faculty: 1, direction: 1, profile: 1, course: 1, level: 1 } },
        { $group : {
            _id : { faculty: "$faculty", year: "$year", semester: "$semester"},
            tables: { $push: "$$ROOT" }
        } },
    ], (err, result) => {
        if (err)
            res.send(err);
        Table.populate(result, [{
            path: 'tables.faculty',
            model: 'Faculty',
        }, {
            path: '_id.faculty',
            model: 'Faculty',
        }, {
            path: 'tables.direction',
            model: 'Direction',
        }], (err, p) => {
            res.json(p);
        });
    } );
};

exports.delete_timetable = (req, res) => {
    Table.remove({
        _id: req.params.tableId
    }, (err, timetable) => {
        if (err)
            res.send(err);
        res.json({message: 'Расписание удалёно'});
    })
};

exports.update_timetable = (req, res) => {
    const {subgroups, start, end} = req.body;
    const newFields = {
        subgroups,
        start,
        end,
    }
    Table.findOneAndUpdate({_id: req.params.tableId}, newFields, (err, table) => {
        if (err)
            res.send(err);
        res.json(table);
    })
}

function findElement(arr, day, number) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].day === day && arr[i].number === number) {
            return i;
        }
    }
    return false;
 }

exports.add_lesson = (req, res) => {
    const {table, day, number, lessons} = req.body;
    delete table.level;
    const trueLessons = lessons.map(les => {
        const newLesson = {...les};
        Teacher.findOne({fio: les.teacher}, (err, teacher) => {
            newLesson.teacher = teacher ? teacher._id : null;
        });
        Subject.findOne({name: les.subject}, (err, subject) => {
            newLesson.subject = subject ? subject._id : null;
        });
        Auditory.findOne({number: les.room}, (err, auditory) => {
            newLesson.auditory = auditory ? auditory._id : null;
        });
        newLesson.subgroup = les.subgroup === 'all' ? 0 : Number(les.subgroup);
        newLesson.plus_minus = les.plus_minus === false ? '' : les.plus_minus;
        delete newLesson.room;
        return newLesson;
    });
    Table.findOne(table, (err, foundTable) => {
        const cellIndex = findElement(foundTable.cells, day, number);
        if (cellIndex !== false) {
            foundTable.cells[cellIndex].lessons.push(...trueLessons);
        } else {
            foundTable.cells.push({
                day,
                number,
                lessons: trueLessons,
            })
        }
        foundTable.save(function (err, table) {
            if (err) {
                console.error(err);
            } else {
                res.json({message: 'Ячейка добавлена'});
            }
        });
    });
}