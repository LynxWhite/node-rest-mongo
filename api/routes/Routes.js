'use strict';

module.exports = (app) => {
    const faculties = require('../controllers/facultyController');
    const teachers = require('../controllers/teacherController');
    const subjects = require('../controllers/subjectController');
    const admins = require('../controllers/adminController');
    const directions = require('../controllers/directionController');
    const auditories = require('../controllers/auditoryController');
    const courses = require('../controllers/courseController');

//faculty 
    app.route('/faculties')
        .get(faculties.list_all_faculties)
        .post(faculties.create_a_faculty);
    
        app.route('/faculties/:facultyId')
            .get(faculties.read_a_faculty)
            .put(faculties.update_a_faculty)
            .delete(faculties.delete_a_faculty);
        app.route('/faculties/:facultyId/directions')
            .get(directions.list_all_directions_in_faculty)
//direction 
    app.route('/directions')
        .post(directions.create_a_direction)

        app.route('/direction/:directionId')
            .get(directions.read_a_direction)
            .put(directions.update_a_direction)
            .delete(directions.delete_a_direction);

        app.route('directions/:directionId/courses')
            .get(courses.list_all_courses_in_direction)
//course           
    app.route('/courses')
        .post(courses.create_a_course);

        app.route('/courses/:courseId')
            .get(courses.read_a_course)
            .put(courses.update_a_course)
            .delete(courses.delete_a_course);
//teacher           
    app.route('/teachers')
        .get(teachers.list_all_teachers)
        .post(teachers.create_a_teacher);
        
        app.route('/teachers/:teacherId')
            .get(teachers.read_a_teacher)
            .put(teachers.update_a_teacher)
            .delete(teachers.delete_a_teacher);
//subject           
    app.route('/subjects')
        .get(subjects.list_all_subjects)
        .post(subjects.create_a_subject);

        app.route('/subjects/:subjectId')
            .get(subjects.read_a_subject)
            .put(subjects.update_a_subject)
            .delete(subjects.delete_a_subject);
//auditory           
    app.route('/auditories')
        .get(auditories.list_all_auditories)
        .post(auditories.create_a_auditory);

        app.route('/auditories/:auditoryId')
            .get(auditories.read_a_auditory)
            .put(auditories.update_a_auditory)
            .delete(auditories.delete_a_auditory);
//admin
    app.route('/admin')
        .post(admins.create_an_admin);
    app.route('/login')
        .post(admins.admin_login);
    app.route('/account')
        .get(admins.admin_account);
}