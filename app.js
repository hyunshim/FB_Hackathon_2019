require('dotenv').config()
const express = require('express');
const mongo = require('mongoose');
const logger = require('morgan');
const parser = require('body-parser');
const app = express();

// Route Constants
const marks_routes = require('./api/routes/marks');
const users_routes = require('./api/routes/users');
const quests_routes = require('./api/routes/quests');

// MongoDB Connection
mongo.connect('mongodb+srv://admin:'+process.env.MONGO_PW+'@db1-agnnf.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});
mongo.Promise = global.Promise;

// Logger
app.use(logger('dev'));
app.use(parser.urlencoded({extended: false}));
app.use(parser.json());

// CORS Handling
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

// Routes
app.use('/api/marks', marks_routes);
app.use('/api/users', users_routes);
app.use('/api/quests', quests_routes);

// Error Handling
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
            status: error.status
        }
    });
});

module.exports = app;
