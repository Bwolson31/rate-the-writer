const User = require('../models/User');

// Controller function to render the login/signup page
const renderLoginSignupPage = (req, res) => {
    res.render('login-signup'); 
    // login-signup being a possilbe name for our handlebars templage
};

// Controller function to handle login form submission
const loginUser = async (req, res) => {
    // TODO: logic to handle form submission
};

// Controller function to handle signup form submission
const signupUser = async (req, res) => {
    // TODO: logic to handle signup form submission 
};

// Controller function to handle logout (example)
const logoutUser = async (req, res) => {
// TODO: logic to handle logging out
};

module.exports = {
    renderLoginSignupPage,
    loginUser,
    signupUser,
    logoutUser
};
