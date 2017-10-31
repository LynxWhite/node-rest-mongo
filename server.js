const express = require('express')
const app = express()
const port = process.env.PORT || 1337
const mongoose = require('mongoose')
const Faculty = require('./api/models/timetableModel')
const Admins = require('./api/models/adminsModel')
const bodyParser = require('body-parser')
const config = require('./config')

// mongoose instance connection url connection
mongoose.Promise = global.Promise;

const db_url = process.env.MONGODB_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/TimeTabledb'
mongoose.connect(db_url, { useMongoClient: true }, () => {
    console.log('MongoDB connected sucessfully')
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    /*
    if (req.method === 'POST' && req.originalUrl !== '/login') {
        if (!req.headers['x-auth']) { return res.sendStatus(401)}
        try {
            const login = jwt.decode(req.headers['x-auth'], config.secretkey).login;
        } catch (err) {
            return res.sendStatus(400);
        }
    }
    */
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, x-auth');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
const routes = require('./api/routes/Routes')
routes(app)

app.use((req, res) => {
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);