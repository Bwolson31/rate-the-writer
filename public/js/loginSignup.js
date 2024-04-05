const loginUsername = document.getElementById('username-login').value.trim();
const loginPassword = document.getElementById('password-login').value.trim();
const loginBtn = document.getElementById('submit-logic');
//above id names have been pulled from login.handlebars

const signupUsername = document.getElementById('signupEmail').value.trim();
const signupPassword = document.getElementById('signupPassword').value.trim();
const signupBtn = document.getElementById('signupBtn');


//Note: all variable names, function names, etc are generics and can be replaced

const loginForm = async (event) => {
    event.preventDefault();

    if (loginUsername && loginPassword) {
        const response = await fetch ('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ loginUsername, loginPassword}),
            headers: { 'Content-Type': ''},
        });
    }

    if (response.ok) {
        document.location.replace('/homepage');
    } else {
        alert(response.statusText);
    }
};



const signupForm = async (event) => {
    event.preventDefault();
    if (signupUsername && signupPassword) {
        const response = await fetch ('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ signupUsername, signupPassword}),
            headers: { 'Content-Type': ''},
        });
    }

    if (response.ok) {
        document.location.replace('/homepage');
    } else {
        alert(response.statusText);
    }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginForm);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupForm);