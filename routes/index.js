const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');
const bcrypt = require('bcrypt');

// Import individual route files
const authRoutes = require('./authRoutes');
const withAuth = require('../utils/auth'); 
// Possibly add more route imports here 

router.get('/', withAuth, async (req, res) => {
  try {
    // Fetch all posts from the database
    const posts = await Post.findAll();
    const loggedIn = req.session.logged_in
    // Pass the fetched posts data to the template
    res.render('homepage', { posts, loggedIn:true }); 
  } catch (error) {
    // Handle errors
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/login', async (req, res) => {
  try {
    console.log('Rendering login page');

    // Fetch all posts from the database
    const posts = await Post.findAll();
    // Pass the fetched posts data to the template
    res.render('login', { loggedIn:true}); 
  } catch (error) {
    // Handle errors
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user || !user.isValidPassword(password)) {
      req.session.logged_in = true;
      req.session.username = username;

      // Redirect to the homepage or authorized page
      req.session.user_id = user.id;
      res.redirect('/homepage');
    } else {
      // Handle incorrect credentials
      res.render('login', { error: 'Invalid username or password' });
    }
  } catch (error) {
    // Handle server errors
    console.error('Error logging in:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.render('signup', { error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({ username, email, password: hashedPassword });

    // Redirect to login page after successful signup
    res.redirect('/login');
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/logout', (req, res) => {
  // Clear the session or perform logout logic
  req.session.destroy(err => {
      if (err) {
          console.error('Error destroying session:', err);
          res.status(500).send('Internal Server Error');
      } else {
          // Redirect to the home page or login page after logout
          res.redirect('/');
      }
  });
});

// router.use('/users', authRoutes);
// Use individual route files
// router.use('/auth', authRoutes);
// Possibly add more route usage here 



module.exports = router;
