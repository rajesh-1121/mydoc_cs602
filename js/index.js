
function checkLoginStatus() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        const userType = localStorage.getItem('userType');
        
        redirectToDashboard(userType);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
});


function signOut() {
    

    
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');

    
    window.location.href = 'index.html';
}



function redirectToDashboard(userType) {
    if (userType === 'patients') {
        window.location.href = 'user.html'; 
    } else if (userType === 'doctors') {
        window.location.href = 'doctor.html'; 
    }
}
