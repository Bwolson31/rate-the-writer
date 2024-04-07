const loginUsername = document.getElementById('username-login').value.trim();
const loginPassword = document.getElementById('password-login').value.trim();
//const loginBtn = document.getElementById('submit-login');
//above id names have been pulled from login.handlebars

const signupUsername = document.getElementById('username-signup').value.trim();
const signupPassword = document.getElementById('password-signup').value.trim();
const signupBtn = document.getElementById('submit-signup');
//above id names have been pulled from signup.handlebars

const logoutBtn = document.getElementById('');
//above hasn't yet been connected


const loginForm = async (event) => {
    event.preventDefault();
    //Below might be '../controllers/authController.js' As in, it might need two dots
    if (loginUsername && loginPassword) {
        const response = await fetch('./controllers/authController.js', {
            method: 'POST',
            body: JSON.stringify({ loginUsername, loginPassword }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/homepage');
        } else {
            alert(response.statusText);
        }
    }
};



const signupForm = async (event) => {
    event.preventDefault();
    if (signupUsername && signupPassword) {
        const response = await fetch('./controllers/authController.js', {
            method: 'POST',
            body: JSON.stringify({ signupUsername, signupPassword }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/homepage');
        } else {
            alert(response.statusText);
        }
    }
};

const logout = async () => {
    const response = await fetch('./controllers/authController.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

// document
//   .querySelector('.login-form')
//   .addEventListener('submit', loginForm);

// document
//   .querySelector('.signup-form')
//   .addEventListener('submit', signupForm);

//signupBtn.addEventListener('click', signupForm);
//loginBtn.addEventListener('click', loginForm);
//logoutBtn.addEventListener('click', logout);

document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('submit-login');
    if (loginBtn) {
      loginBtn.addEventListener('click', loginForm);
    } else {
      console.error('Login button not found');
    }
  });