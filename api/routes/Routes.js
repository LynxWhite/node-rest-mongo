'use strict';

module.exports = (app) => {
    const faculties = require('../controllers/facultyController');
    const teachers = require('../controllers/teacherController');
    const subjects = require('../controllers/subjectController');
    const admins = require('../controllers/adminController');
    const directions = require('../controllers/directionController');
    const auditories = require('../controllers/auditoryController');
    const times = require('../controllers/timeController');
    const timetable = require('../controllers/timetableController');
    const libraries = require('../controllers/libraryController');
//libraries
    app.route('/libraries/manager/:faculty')
        .get(libraries.get_manager_libraries);
    app.route('/libraries/admin/:faculty?')
        .get(libraries.get_admin_libraries);
//timetable
    app.route('/timetables/:faculty?')
        .get(timetable.get_timetables);
    app.route('/timetable/:tableId')
        .delete(timetable.delete_timetable)
        .put(timetable.update_timetable);
    app.route('/timetable/')
        .post(timetable.create_table);
    app.route('/timetable/:year/:semester/:faculty/:level?/:course?')
        .get(timetable.get_timetable);
//faculty
    app.route('/faculties')
        .get(faculties.list_all_faculties)
        .post(faculties.create_a_faculty);

        app.route('/faculties/:facultyId')
            .get(faculties.read_a_faculty)
            .put(faculties.update_a_faculty)
            .delete(faculties.delete_a_faculty);
//direction
    app.route('/directions')
        .post(directions.create_a_direction)

        app.route('/directions/:directionId')
            .get(directions.read_a_direction)
            .put(directions.update_a_direction)
            .delete(directions.delete_a_direction);

//teacher
    app.route('/teachers')
        .get(teachers.list_in_faculty)
        .post(teachers.create_a_teacher);

        app.route('/teachers/:teacherId')
            .get(teachers.read_a_teacher)
            .put(teachers.update_a_teacher)
            .delete(teachers.delete_a_teacher);
//subject
    app.route('/subjects')
        .get(subjects.list_in_faculty)
        .post(subjects.create_a_subject);

        app.route('/subjects/:subjectId')
            .get(subjects.read_a_subject)
            .put(subjects.update_a_subject)
            .delete(subjects.delete_a_subject);
//auditory
    app.route('/auditories')
        .get(auditories.list_in_housing)
        .post(auditories.create_a_auditory);

        app.route('/auditories/:auditoryId')
            .get(auditories.read_a_auditory)
            .put(auditories.update_a_auditory)
            .delete(auditories.delete_a_auditory);

//time
    app.route('/times')
        .post(times.create_a_time)
        .get(times.list_all_times)

        app.route('/times/:timeId')
            .get(times.read_a_time)
//admin
    app.route('/admins')
        .post(admins.create_an_admin);
    app.route('/login')
        .post(admins.admin_login);
    app.route('/account')
        .get(admins.admin_account);
        app.route('/admins/:adminId')
            .put(admins.update_an_admin)
            .delete(admins.delete_an_admin);
}