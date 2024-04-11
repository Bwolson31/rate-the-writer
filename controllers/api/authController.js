const { User } = require('../../models');
// Controller function to render the login/signup page
const renderLoginPage = (req, res) => {
    res.render('login'); 
};

const renderSignupPage = (req, res) => {
    res.render('signup'); 
}


// Controller function to handle login form submission
const loginUser = async (req, res) => {
   const { email, password } = req.body;
   const user = await User.findOne( { email, password });
console.log('user', user);
if (user) {
    req.session.user_id = user.id;
    res.render('/homepage'); 
} else {
    res.render('login', {error: 'Invalid email or password'})
}

};

// Controller function to handle signup form submission
const signupUser = async (req, res) => {
    const { name, email, password } = req.body;

try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        // If the email is already registered, render the signup form with an error message
        return res.render('signup', { error: 'Email already exists' });
    }

    // Create a new user record in the database
    await User.create({ name, email, password });

    // Redirect the user to the login page after successful signup
    res.redirect('/login');
} catch (error) {
    // Handle any errors that occur during the signup process
    console.error('Error signing up user:', error);
    res.status(500).render('signup', { error: 'An unexpected error occurred. Please try again later.' });
}
};


// Controller function to handle logout (example)

// const logoutUser = async (req, res) => {
//     req.session.destroy(); 
//     res.redirect('/login'); 
// };

module.exports = {
    renderLoginPage,
    renderSignupPage,
    loginUser,
    signupUser,
    //logoutUser
};







