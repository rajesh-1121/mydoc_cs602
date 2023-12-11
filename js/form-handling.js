document.addEventListener('DOMContentLoaded', function () {

    function resetForms() {

        document.getElementById('patientLoginForm').reset();
        document.getElementById('patientSignupForm').reset();


        document.getElementById('doctorLoginForm').reset();
        document.getElementById('doctorSignupForm').reset();
    }


    function showNotification(message, isSuccess = true) {
        const notification = document.createElement('div');
        notification.className = isSuccess ? 'notification success' : 'notification error';
        notification.textContent = message;

        document.body.appendChild(notification);


        setTimeout(() => {
            document.body.removeChild(notification);
        }, 5000);
    }




    function handleLogin(formId, actionURL, userType) {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                const formData = new FormData(form);

                fetch(actionURL, {
                    method: 'POST',
                    body: formData
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === "success") {
                            showNotification('Login successful', true);
                            redirectToDashboard(userType);
                        } else {
                            showNotification('Login failed: ' + data.message, false);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        showNotification('An error occurred', false);
                    });
            });
        }
    }


    function handleSignup(formId, actionURL, userType) {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                const formData = new FormData(form);

                fetch(actionURL, {
                    method: 'POST',
                    body: formData
                })
                    .then(response => response.text())
                    .then(responseText => {

                        if (responseText.includes("successful")) {
                            showNotification('Signup successful', true);
                            window.location.href = 'index.html';
                        } else {
                            showNotification(responseText, false);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        showNotification('An error occurred during signup', false);
                    });
            });
        }
    }



    function redirectToDashboard(userType) {

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userType', userType);

        if (userType === 'patient') {
            window.location.href = 'user.html';
        } else if (userType === 'doctor') {
            window.location.href = 'doctor.html';
        }
    }

    function resetForms() {

        document.getElementById('patientLoginForm')?.reset();
        document.getElementById('patientSignupForm')?.reset();


        document.getElementById('doctorLoginForm')?.reset();
        document.getElementById('doctorSignupForm')?.reset();
    }


    handleLogin('patientLoginForm', 'php/login_patient.php', 'patient');
    handleSignup('patientSignupForm', 'php/register_patient.php', 'patient');
    handleLogin('doctorLoginForm', 'php/login_doctor.php', 'doctor');
    handleSignup('doctorSignupForm', 'php/register_doctor.php', 'doctor');


    resetForms();


    window.addEventListener('focus', resetForms());

});

