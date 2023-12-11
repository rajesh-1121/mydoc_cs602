document.addEventListener('DOMContentLoaded', function() {


    
    function toggleActiveClass(button) {
        const buttons = document.querySelectorAll('.toggle-buttons button');
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    }

    
    const patientLoginSection = document.getElementById('patientLoginSection');
    const patientSignupSection = document.getElementById('patientSignupSection');
    const patientSignupToggle = document.getElementById('patientSignupToggle');
    const patientLoginToggle = document.getElementById('patientLoginToggle');

    patientSignupToggle.addEventListener('click', function() {
        patientLoginSection.classList.add('hidden');
        patientSignupSection.classList.remove('hidden');
    });

    patientLoginToggle.addEventListener('click', function() {
        patientSignupSection.classList.add('hidden');
        patientLoginSection.classList.remove('hidden');
    });

    
    const doctorLoginSection = document.getElementById('doctorLoginSection');
    const doctorSignupSection = document.getElementById('doctorSignupSection');
    const doctorSignupToggle = document.getElementById('doctorSignupToggle');
    const doctorLoginToggle = document.getElementById('doctorLoginToggle');

    doctorSignupToggle.addEventListener('click', function() {
        doctorLoginSection.classList.add('hidden');
        doctorSignupSection.classList.remove('hidden');
    });

    doctorLoginToggle.addEventListener('click', function() {
        doctorSignupSection.classList.add('hidden');
        doctorLoginSection.classList.remove('hidden');
    });


function resetForms() {
    
    document.getElementById('patientLoginForm').reset();
    document.getElementById('patientSignupForm').reset();

    
    document.getElementById('doctorLoginForm').reset();
    document.getElementById('doctorSignupForm').reset();
}


function handleLogin(formId, userType) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(form);
            formData.append('userType', userType);

            const actionURL = userType === 'patients' ? 'php/login_patient.php' : 'php/login_doctor.php';

            fetch(actionURL, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    alert('Login successful'); 
                    redirectToDashboard(userType); 
                } else {
                    alert('Login failed: ' + data.message); 
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred'); 
            });
        });
    }
}


function redirectToDashboard(userType) {
    if (userType === 'patients') {
        window.location.href = 'user.html'; 
    } else if (userType === 'doctors') {
        window.location.href = 'doctor.html'; 
    }
}


    
function handleSignup(formId, userType) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(form);

            
            const actionURL = userType === 'patients' ? 'php/register_patient.php' : 'php/register_doctor.php';

            fetch(actionURL, {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                if (data.trim() === "Signup successful") {
                    alert('Signup successful'); 

                    
                    if (userType === 'patients') {
                        window.location.href = 'index.html#patientLoginSection';
                    } else {
                        window.location.href = 'index.html#doctorLoginSection';
                    }
                } else {
                    alert('Signup failed: ' + data); 
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred'); 
            });
        });
    }
}


    
    handleSignup('patientSignupForm', 'patients');
    handleLogin('patientLoginForm', 'patients');
    handleSignup('doctorSignupForm', 'doctors');
    handleLogin('doctorLoginForm', 'doctors');
});
