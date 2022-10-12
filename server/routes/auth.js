const express = require('express');

const { signup, login } = require('../controllers/auth.js');
//get router to set up routes
//routing helps us determine how an application responds to a client request to a particular endpoint, which URI(or path) and specific HTTP request method (GET,POST and so on)
const router = express.Router();

//post routes because we have to send data from the frontend to the backend
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;