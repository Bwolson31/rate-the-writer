const express = require('express');
const router = express.Router();
const { renderLoginPage, renderSignupPage, loginUser, signupUser, logoutUser } = require('../controllers/authController');

// Route for rendering the login page
router.get('/login', renderLoginPage);

// Route for handling login form submission
router.post('/login', loginUser);

// Route for rendering the signup page
router.get('/signup', renderSignupPage);

// Route for handling signup form submission
router.post('/signup', signupUser);

// Route for handling logout 
router.get('/logout', logoutUser);

module.exports = router;


