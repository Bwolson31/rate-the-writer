const express = require('express');
const router = express.Router();
const { Post } = require('../models');

// Import individual route files
const authRoutes = require('./authRoutes');
// Possibly add more route imports here 

router.get('/', async (req, res) => {
  try {
    // Fetch all posts from the database
    const posts = await Post.findAll();
    // Pass the fetched posts data to the template
    res.render('index', { posts }); 
  } catch (error) {
    // Handle errors
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.use('/users', authRoutes);
// Use individual route files
router.use('/auth', authRoutes);
// Possibly add more route usage here 



module.exports = router;
