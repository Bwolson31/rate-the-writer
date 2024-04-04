const express = require('express');
const router = express.Router();
const { renderLoginSignupPage, loginUser, signupUser, logoutUser } = require('../controllers/authController');

// Route for rendering the login/signup page
router.get('/login-signup', renderLoginSignupPage);

// Route for handling login form submission
router.post('/login', loginUser);

// Route for handling signup form submission
router.post('/signup', signupUser);

// Route for handling logout 
router.get('/logout', logoutUser);

module.exports = router;

