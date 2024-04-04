const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginBtn = document.getElementById('loginBtn');

const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const signupBtn = document.getElementById('signupBtn');


//Note: all variable names, function names, etc are generics and can be replaced

const loginForm = async (event) => {
    event.preventDefault();

    if (loginEmail && loginPassword) {
        const response = await fetch ('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ loginEmail, loginPassword}),
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
    if (signupEmail && signupPassword) {
        const response = await fetch ('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ signupEmail, signupPassword}),
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