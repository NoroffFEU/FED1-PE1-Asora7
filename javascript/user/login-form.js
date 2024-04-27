
document.addEventListener('DOMContentLoaded', function() {

    const token = localStorage.getItem('token');
    if (token) {
        document.querySelector('.edit').style.display = 'block';
        console.log('User is logged in.');
    } else {
        document.querySelector('.edit').style.display = 'none';
        console.log('User is not logged in.');
    }

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.querySelector('.error-message');
    const loginButton = document.querySelector('.login-button');

    loginButton.addEventListener('click', function(event) {
        event.preventDefault();

        errorMessage.textContent = '';

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (email === '' || password === '') {
            errorMessage.textContent = 'Please enter your email and password.';
            return;
        }

        handleLogin();
    });
});