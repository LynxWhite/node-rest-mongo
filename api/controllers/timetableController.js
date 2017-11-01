'use strict';

const mongoose = require('mongoose');

const Faculty = mongoose.model('Faculty');
const Direction = mongoose.model('Direction');
const Course = mongoose.model('Course');
const Cell = mongoose.model('Cell');
const Lesson = mongoose.model('Lesson');
const Time = mongoose.model('Time');

const array = {};

exports.get_timetable = (req, res) => {
    const {facultyId, course, type} = req.params;
    const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    let times = [];
    Time.find({faculty: facultyId}, (err, time) => {
        times = time;
    })
    Faculty.find({_id: facultyId})
        .populate({
            path: 'directions',
            populate: { 
                path: 'courses',
                populate: { 
                    path: 'cells',
                    populate: {
                        path: 'lessons',
                        populate: [
                            {
                                path: 'auditory'
                            },
                            {
                                path: 'subject'
                            },
                            {
                                path: 'auditory'
                            },
                        ]
                    }
                }
            }
        })
        .exec(function (err, fac) {
            if (err)
                res.send(err);
            if (fac[0]) {
                const dirs = fac[0].directions.filter(elem => (elem.type === type));
                days.forEach(day => { 
                    const list = {};
                    for (let i = 0; i<=5; i++) {
                        list[i] = [times[i].time];
                    }
                    dirs.forEach(dir => {
                        const type = dir.courses.filter(dir => (dir.number === Number(course)));
                        for(let i = 0; i<=5; i++) {
                            let dirCell = '';
                            if (type[0]) {
                                dirCell = type[0].cells.filter(cell => (cell.day === day && cell.time === i));
                            }
                            dirCell = (dirCell.length === 0 ? [null] : dirCell);
                            list[i] = [...list[i], ...dirCell];
                        }
                    });
                    array[day] = list;
                })
                res.send(array);
            } else res.send('Факультет не найден');
        })
};
