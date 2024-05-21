document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

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
                return response.json().then(err => {
                    throw new Error(`Login failed: ${err.message}`);
                });
            }
        })
        .then(data => {
            console.log('Login response:', data); // Log the full response

            if (data.token) {
                console.log('Login successful, received token:', data.token); // Log token
                localStorage.setItem('token', data.token);
                window.location.href = '../../post/edit.html';

                const successMessage = document.querySelector('.success-message');
                successMessage.textContent = 'Login successful!';
                successMessage.style.display = 'block';
            } else {
                throw new Error('Token is missing in the response');
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            document.querySelector('.error-message').textContent = 'Login failed. Please check your credentials.';
        });
    }

    function handleRegister(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const registrationData = {
            name: name,
            email: email,
            password: password
        };

        fetch('https://v2.api.noroff.dev/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(err => {
                    throw new Error(`Registration failed: ${err.message}`);
                });
            }
        })
        .then(data => {
            console.log('Registration response:', data); // Log the full response
            const successMessage = document.querySelector('.success-message');
            successMessage.textContent = 'Account created successfully!';
            successMessage.style.display = 'block';
            window.location.href = '../../account/login.html';
        })
        .catch(error => {
            console.error('Error during registration:', error);
            document.querySelector('.error-message').textContent = 'Registration failed. Please check your credentials and try again.';
        });
    }
});
