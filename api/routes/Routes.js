'use strict';

module.exports = (app) => {
    const faculties = require('../controllers/openTimetableController');
    const admins = require('../controllers/openAdminsController');

    app.route('/faculties')
        .get(faculties.list_all_faculties)
        .post(faculties.create_a_faculty);
    
        app.route('/faculties/:facultyId')
            .get(faculties.read_a_faculty)
            .put(faculties.update_a_faculty)
            .delete(faculties.delete_a_faculty);

    app.route('/admin')
        .post(admins.create_an_admin);
    app.route('/login')
        .get(admins.admin_login);
    app.route('/account')
        .get(admins.admin_account);
}