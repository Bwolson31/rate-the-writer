const { User } = require('../../models');
// Controller function to render the login/signup page
const bcrypt = require('bcrypt');


const renderLoginPage = (req, res) => {
    res.render('login'); 
};

const renderSignupPage = (req, res) => {
    res.render('signup'); 
}


// Controller function to handle login form submission
const loginUser = async (req, res) => {
    const { loginUsername, loginPassword } = req.body;

    try {
        const user = await User.findOne({ where: { username: loginUsername } });

        if (user) {
            // Compare the entered password with the hashed password from the database
            const isPasswordCorrect = await bcrypt.compare(loginPassword, user.password);

            if (isPasswordCorrect) {
                // Authentication successful
                req.session.logged_in = true;
                req.session.username = user.username;
                req.session.user_id = user.id;
                return res.redirect('/homepage');
            } else {
                // Incorrect password
                console.log('Invalid password');
                return res.render('login', { error: 'Invalid username or password' });
            }
        } else {
            // User not found
            console.log('User not found');
            return res.render('login', { error: 'Invalid username or password' });
        }
    } catch (error) {
        // Handle errors
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

// Controller function to handle logout
const logoutUser = async (req, res) => {
    req.session.destroy(); 
    res.redirect('/login'); 
};



// Controller function to retrieve and log hashed passwords
const retrieveHashedPasswords = async () => {
    try {
        // Retrieve all users from the database
        const users = await User.findAll();

        // Log the hashed passwords for each user
        users.forEach(user => {
            console.log(`Username: ${user.username}, Hashed Password: ${user.password}`);
        });
    } catch (error) {
        console.error('Error retrieving hashed passwords:', error);
    }
};

// Call the function to retrieve and log hashed passwords
retrieveHashedPasswords();

module.exports = {
    renderLoginPage,
    renderSignupPage,
    loginUser,
    signupUser,
    logoutUser
};
