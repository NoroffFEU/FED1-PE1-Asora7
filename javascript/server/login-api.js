function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginData = {
        email: email,
        password: password
    };

    fetch('https://v2.api.noroff.dev/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Login failed');
        }
    })
    .then(data => {
        // Handle successful login (e.g., show success message, redirect to dashboard)
        console.log(data);
    })
    .catch(error => {
         // Handle login error (e.g., display error message to user)
         console.error('Error:', error);
    });
}

document.querySelector('.login-button').addEventListener('click', handleLogin);