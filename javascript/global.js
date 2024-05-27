
document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    const editNavItem = document.querySelector('.edit');
    const logInNavItem = document.querySelector('.log-in');
    const logOutNavItem = document.querySelector('.log-out');
    const logoutButton = document.querySelector('.log-out');

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

    logoutButton.addEventListener('click', function(event) {
        event.preventDefault();

        localStorage.removeItem('token');
        window.location.href = '../index.html';
    });

let timeoutId;
const TIMEOUT_DURATION = 30 * 60 * 1000; 

function startLogoutTimer() {
    clearTimeout(timeoutId); 
    timeoutId = setTimeout(logout, TIMEOUT_DURATION);
}

function resetLogoutTimer() {
    clearTimeout(timeoutId); 
    startLogoutTimer(); 
}

function logout() {
    localStorage.removeItem('token'); 
    window.location.href = '/account/login.html'; 
}

document.addEventListener('mousemove', resetLogoutTimer);
document.addEventListener('mousedown', resetLogoutTimer);
document.addEventListener('keypress', resetLogoutTimer);
document.addEventListener('scroll', resetLogoutTimer);

startLogoutTimer();
    
});

