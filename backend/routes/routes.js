const express = require('express');
const routes = express.Router();

// importing the contrllers
const signup = require('../controllers/signup.js');
const login = require('../controllers/login.js');
const sendEmail = require('../controllers/sendEmail.js');
const placeOrder = require("../controllers/placeOrder.js");
const { trackOrdersByEmail } = require("../controllers/trackOrders.js")

// importing the middlewares
const authenticateToken = require('../middlewares/authenticateToken.js');


routes
    .post('/signup', signup)
    .post('/login', login)
    .post('/sendEmail', sendEmail)
    .post("/place-order", authenticateToken, placeOrder)
    .post("/get-orders-by-email", authenticateToken, trackOrdersByEmail)

module.exports = routes;