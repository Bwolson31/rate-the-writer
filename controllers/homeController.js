const router = require('express').Router();
const { Post, User } = require('../models');

const withAuth = require('../utils/auth'); 
// Possibly add more route imports here 

router.get('/', withAuth, async (req, res) => {
  try {
    // Fetch all posts from the database
    const posts = await Post.findAll();

    // Pass the fetched posts data to the template
    res.render('homepage', { posts, loggedIn:req.session.logged_in }); 
  } catch (error) {
    // Handle errors
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/login', async (req, res) => {
  try {

    // Pass the fetched posts data to the template
    res.render('login'); 
  } catch (error) {
    // Handle errors
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/new', (req, res)=> {
  res.render('createPost')
})

// // Login route
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ where: { username } });

//     if (!user || !user.isValidPassword(password)) {
//       req.session.logged_in = true;
//       req.session.username = username;

//       // Redirect to the homepage or authorized page
//       req.session.user_id = user.id;
//       res.redirect('/homepage');
//     } else {
//       // Handle incorrect credentials
//       res.render('login', { error: 'Invalid username or password' });
//     }
//   } catch (error) {
//     // Handle server errors
//     console.error('Error logging in:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router