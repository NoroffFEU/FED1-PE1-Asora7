document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.querySelector('.error-message');
    const registerButton = document.querySelector('button');

    // registerButton.addEventListener('click', function(event) {
    //     event.preventDefault();
        
    //     errorMessage.textContent = '';

    //     const name = nameInput.value.trim();
    //     const email = emailInput.value.trim();
    //     const password = passwordInput.value;

    //     if (name === '' || email === '' || password === '') {
    //         errorMessage.textContent = 'Please fill out all fields.';
    //         return;
    //     }

    //     if (password.length < 8) {
    //         errorMessage.textContent = 'Password must be at least 8 characters long.';
    //         return;
    //     }

    //     const registrationData = {
    //         name: name,
    //         email: email,
    //         password: password
    //     };

    //     fetchRegistration(registrationData);
    // });

    registerButton.addEventListener('click', function(event) {
        console.log('Registration successful:');
        window.location.href = '../../account/login.html'; 
    });

    function fetchRegistration(registrationData) {
        return fetch('https://v2.api.noroff.dev/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)
        })
        .then(response => {
            if (response.ok) {
                const successMessage = document.querySelector('.success-message');
                successMessage.textContent = 'Account created successfully!';
                return response.json();
            } else {
                throw new Error('Registration failed');
            }
        })
        .then(data => {
            console.log('Registration successful:', data);
            window.location.href = '../account/login.html';
        })
        .catch(error => {
            errorMessage.textContent = 'Registration failed. Please check your credentials and try again.';
            console.error('Error:', error);
        });
    }
});
