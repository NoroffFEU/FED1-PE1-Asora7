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
        localStorage.setItem('token', data.token);
        window.location.href = '../../post/edit.html';

        const successMessage = document.querySelector('.success-message');
        successMessage.textContent = 'Login successful!';
        successMessage.style.display = 'block';
    })
    .catch(error => {
         console.error('Error:', error);
         document.querySelector('.error-message').textContent = 'Login failed. Please check your credentials.';
    });
}

document.querySelector('.login-button').addEventListener('click', handleLogin);