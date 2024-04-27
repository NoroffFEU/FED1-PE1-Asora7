document.addEventListener('DOMContentLoaded', function(){
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.querySelector('.error-message');
    const registerButton = document.querySelector('button');

    registerButton.addEventListener('click', function() {
        errorMessage.textContent = '';

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (name === '' || email === '' || password === '') {
            errorMessage.textContent = 'Please fill out all fields.';
            return;
        }

        if (password.length < 8) {
            errorMessage.textContent = 'Password must be at least 8 characters long.';
            return;
        }

        const registrationData = {
            username: name,
            email: email,
            password: password
        };

        fetchRegistration(registrationData);
    });
});

