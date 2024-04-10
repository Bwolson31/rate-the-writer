const router = require('express').Router();
const { Post, User, Author, AuthorComment } = require('../models');
// const bcrypt = require('bcrypt');
// //const fs = require('fs');

const withAuth = require('../utils/auth'); 
// Possibly add more route imports here 


router.get('/', withAuth, async (req, res) => {
  try {
    // Fetch all posts from the database
    const authorData = await Author.findAll();

    // serialize the postData to be displayed as an array of plain objects
    const authors = authorData.map((post)=> post.get({plain: true}))

    // Pass the fetched posts data to the template
    res.render('homepage', { authors, loggedIn:req.session.logged_in }); 
  } catch (error) {
    // Handle errors
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/author/:id', async (req, res)=>{
  try {
    // Fetch all posts from the database
    const authorData = await Author.findByPk(req.params.id, {
      include: [{
        model: AuthorComment,
        include: [User]
      }]
    });

    // serialize the postData to be displayed as an array of plain objects
    const authors = authorData.get({plain: true})

    console.log(authors);

    // Pass the fetched posts data to the template
    res.render('authors', { authors, loggedIn:req.session.logged_in }); 
  } catch (error) {
    // Handle errors
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
  }
})

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

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router

// router.post('/signup', async (req, res) => {
//   try {
//     // Hash the password using bcrypt
//     //const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
//     // Create a new user instance with the form data
//     const newUser = await User.create({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//       //change above to hashedPassword
//       // Include any other user fields you have
//     });

//     fs.readFile('userdata.json', 'utf8', (err, data) => {
//       if (err) {
//         console.log(err);
//         res.status(500).send('Error saving user data');
//       } else {
//         const userData = JSON.parse(data);
//         userData.push(newUser);
//         fs.writeFile('userdata.json', JSON.stringify(userData), (err) => {
//           if (err) {
//             console.error(err);
//             res.status(500).send('Error saving user data');
//           } else {
//             res.redirect('/login');
//           }
//         });
//       }
//     });
//   } catch (err) {
//     // Handle any errors that occur
//     console.error(err);
//     res.status(500).send('Error creating user');
//   }
// });



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
