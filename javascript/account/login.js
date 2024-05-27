document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    const editNavItem = document.querySelector('.edit');
    const logInNavItem = document.querySelector('.log-in');
    const logOutNavItem = document.querySelector('.log-out');

    if (token) {
        editNavItem.classList.remove('hide');
        logInNavItem.classList.add('hide');
        logOutNavItem.classList.remove('hide');
        console.log('User is logged in.');
    } else {
        editNavItem.classList.add('hide');
        logInNavItem.classList.remove('hide');
        logOutNavItem.classList.add('hide');
        console.log('User is not logged in.');
    }

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.querySelector('.error-message');
    const loginButton = document.querySelector('.login-button');
    const logoutButton = document.querySelector('.log-out');

    loginButton.addEventListener('click', function(event) {
        event.preventDefault();

        errorMessage.textContent = '';

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (email === '' || password === '') {
            errorMessage.textContent = 'Please enter your email and password.';
            return;
        }

        handleLogin(email, password);
    });

    logoutButton.addEventListener('click', function(event) {
        event.preventDefault();

        localStorage.removeItem('token');
        window.location.href = '/account/login.html';
    });

    function handleLogin(email, password) {
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
            console.log('Login response data:', data);

            if (data.data && data.data.accessToken) {
                localStorage.setItem('token', data.data.accessToken);
                window.location.href = '/post/edit.html';

                const successMessage = document.querySelector('.success-message');
                successMessage.textContent = 'Login successful!';
                successMessage.style.display = 'block';
            } else {
                console.error('Token not found in response');
                errorMessage.textContent = 'Login failed. Token not received.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            errorMessage.textContent = 'Login failed. Please check your credentials.';
        });
    }
});
