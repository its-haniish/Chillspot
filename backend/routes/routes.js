const express = require('express');
const routes = express.Router();

// importing the contrllers
const signup = require('../controllers/signup.js');
const login = require('../controllers/login.js');
const sendEmail = require('../controllers/sendEmail.js');

routes
    .post('/signup', signup)
    .post('/login', login)
    .post('/sendEmail', sendEmail)

module.exports = routes;