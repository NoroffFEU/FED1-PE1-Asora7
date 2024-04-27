document.addEventListener('DOMContentLoaded', function() {
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

        // Simulate login (replace with actual login logic)
        // Here, you would send a request to your backend to validate the credentials
    })
})