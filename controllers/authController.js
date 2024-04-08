const { User } = require('../models');
// Controller function to render the login/signup page

const renderLoginPage = (req, res) => {
    res.render('login'); 
};

const renderSignupPage = (req, res) => {
    res.render('signup'); 
}


// Controller function to handle login form submission
const loginUser = async (req, res) => {
    const { loginUsername, loginPassword } = req.body; // Change 'email' to 'username'
    console.log('Received username:', loginUsername);
    console.log('Received password:', loginPassword);
    try {
       const user = await User.findOne({ where: { username: loginUsername } }); // Use 'username' for the where condition
 
       if (!user || !user.checkpassword(loginPassword)) { // Ensure password check is correct
          req.session.logged_in = true;
          req.session.username = loginUsername;
 
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
 };

// Controller function to handle signup form submission
const signupUser = async (req, res) => {
    const { signupUsername, signupEmail, signupPassword } = req.body;

    console.log('Signup email:', signupEmail);

    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ where: { email: signupEmail } });

        if (existingUser) {
            // If the email is already registered, render the signup form with an error message
            return res.render('signup', { error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(signupPassword, 10);

        // Create a new user record in the database with the hashed password
        await User.create({ username: signupUsername, email: signupEmail, password: hashedPassword });

        // Redirect the user to the login page after successful signup
        res.redirect('/login');
    } catch (error) {
        // Handle any errors that occur during the signup process
        console.error('Error signing up user:', error);
        res.status(500).render('signup', { error: 'An unexpected error occurred. Please try again later.' });
    }
};

// Controller function to handle logout (example)
const logoutUser = async (req, res) => {
    req.session.destroy(); 
    res.redirect('/login'); 
};

module.exports = {
    renderLoginPage,
    renderSignupPage,
    loginUser,
    signupUser,
    logoutUser
};
