'use strict';

module.exports = (app) => {
    const faculties = require('../controllers/openTimetableController');
    const admins = require('../controllers/openAdminsController');
    const directions = require('../controllers/openDirectionsController')

    app.route('/faculties')
        .get(faculties.list_all_faculties)
        .post(faculties.create_a_faculty);
    
        app.route('/faculties/:facultyId')
            .get(faculties.read_a_faculty)
            .put(faculties.update_a_faculty)
            .delete(faculties.delete_a_faculty);
        app.route('/faculties/:facultyId/directions')
            .get(directions.list_all_directions_in_faculty)
            .post(directions.create_a_direction)
    
    app.route('/direction/:directionId')
        .get(directions.read_a_direction)
        .put(directions.update_a_direction)
        .delete(directions.delete_a_direction);

    app.route('/admin')
        .post(admins.create_an_admin);
    app.route('/login')
        .post(admins.admin_login);
    app.route('/account')
        .get(admins.admin_account);
}