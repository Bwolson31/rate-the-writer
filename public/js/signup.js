const signupBtn = document.getElementById('submit-signup');

const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.getElementById('name-signup').value.trim();
    const password = document.getElementById('password-signup').value.trim();
    const email = document.getElementById('email-signup').value.trim();

    if (username && password && email) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password, email }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/homepage');
        } else {
            alert(response.statusText);
        }
    }
};


document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
