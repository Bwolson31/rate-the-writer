
const loginForm = async (event) => {
    event.preventDefault();
    const loginUsername = document.getElementById('username-login').value.trim();
    const loginPassword = document.getElementById('password-login').value.trim();

    if (loginUsername && loginPassword) {
        const response = await fetch('/login', {
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
    const signupUsername = document.getElementById('username-signup').value.trim();
    const signupPassword = document.getElementById('password-signup').value.trim();

    if (signupUsername && signupPassword) {
        const response = await fetch('/signup', {
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
    const response = await fetch('/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('submit-login');
    const signupBtn = document.getElementById('submit-signup');
    const logoutBtn = document.getElementById('logout');
    if (loginBtn) {
        loginBtn.addEventListener('click', loginForm);
    }
    if (signupBtn) {
        signupBtn.addEventListener('click', signupForm);
    }
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});

