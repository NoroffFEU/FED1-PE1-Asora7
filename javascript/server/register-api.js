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
            window.location.href = '../../account/login.html';
        } else {
            throw new Error('Registration failed');
        }
    })
    .catch(error => {
        const errorMessage = document.querySelector('.error-message');
        errorMessage.textContent = 'Registration failed. Please check your credentials and try again.';
        console.error('Error:', error);
    });
}
