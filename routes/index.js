
const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');
const bcrypt = require('bcrypt');
const authController = require('../controllers/authController');
const withAuth = require('../utils/auth'); 

// Destructure functions from authController
const { renderLoginPage, renderSignupPage, loginUser, signupUser, logoutUser } = authController;

// Route for homepage
router.get('/', withAuth, async (req, res) => {
  try {
    // Fetch all posts from the database
    const posts = await Post.findAll();
    const loggedIn = req.session.logged_in;
    // Pass the fetched posts data to the template
    res.render('homepage', { posts, loggedIn: true }); 
  } catch (error) {
    // Handle errors
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route for rendering the login page
router.get('/login', renderLoginPage);

// Login route
router.post('/login', loginUser);

// Route for rendering the signup page
router.get('/signup', renderSignupPage);

// Route for handling signup form submission
router.post('/signup', signupUser);

// Route for handling logout 
router.get('/logout', logoutUser);
router.post('/logout', logoutUser); 

router.get('/homepage', (req, res) => {
  res.render('homepage'); // Render the homepage template
});

module.exports = router;

