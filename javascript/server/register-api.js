
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
        window.location.href = '../../account/login.html';
    })
    .catch(error => {
        const errorMessage = document.querySelector('.error-message');
        errorMessage.textContent = 'Registration failed. Please check your credentials and try again.';
        console.error('Error:', error);
    });
}