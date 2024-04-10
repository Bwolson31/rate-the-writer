document.addEventListener('DOMContentLoaded', (event) => {
// const signupBtn = document.getElementById('submit-signup');

// const signupFormHandler = async (event) => {
//     event.preventDefault();

//     const username = document.getElementById('name-signup').value.trim();
//     const password = document.getElementById('password-signup').value.trim();
//     const email = document.getElementById('email-signup').value.trim();

//     if (username && password && email) {
//         const response = await fetch('/api/users', {
//             method: 'POST',
//             body: JSON.stringify({ username, password, email }),
//             headers: { 'Content-Type': 'application/json' },
//         });

//         if (response.ok) {
//             document.location.replace('/homepage');
//         } else {
//             alert(response.statusText);
//         }
//     }
// };


// document
//   .querySelector('.signup-form')
//   .addEventListener('submit', signupFormHandler);
    const signupFormHandler = async (event) => {
        event.preventDefault();

        const username = document.getElementById('username-signup').value.trim();
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

document.getElementById('signup-form').addEventListener('submit', function(event) {
    const email = document.getElementById('email-signup').value.trim();
    const password = document.getElementById('password-signup').value.trim();
    let validationFailed = false; 

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    validationFailed = true; 
  }
  
  if (password.length < 8) {
    alert('Password must be at least 8 characters long.');
    validationFailed = true; 
  }
  
  if (validationFailed) {
    event.preventDefault(); 
  }
  });

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
});