
const loginForm = async (event) => {
    event.preventDefault();
    const username = document.getElementById('username-login').value.trim();
    const password = document.getElementById('password-login').value.trim();

    if (loginUsername && loginPassword) {
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/homepage');
        } else {
            alert(response.statusText);
        }
    }
};





const loginBtn = document.getElementById('submit-login');


loginBtn.addEventListener('click', loginForm);


