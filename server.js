const express = require('express')
const app = express()
const port = process.env.PORT || 1337
const mongoose = require('mongoose')
const Faculty = require('./api/models/timetableModel')
const Admins = require('./api/models/adminsModel')
const bodyParser = require('body-parser')

// mongoose instance connection url connection
mongoose.Promise = global.Promise;

const db_url = process.env.MONGODB_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/TimeTabledb'
mongoose.connect(db_url, { useMongoClient: true }, function(){
    console.log('MongoDB connected sucessfully')
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./api/routes/Routes')
routes(app)

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);