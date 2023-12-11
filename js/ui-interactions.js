document.addEventListener('DOMContentLoaded', function() {
    
    const patientSection = document.getElementById('patientSection');
    const doctorSection = document.getElementById('doctorSection');
    const toPatientSectionBtn = document.getElementById('toPatientSection');
    const toDoctorSectionBtn = document.getElementById('toDoctorSection');

    
    toPatientSectionBtn.classList.add('active');

    
    function toggleActiveClass(button) {
        const buttons = document.querySelectorAll('.toggle-buttons button');
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    }

    
    function toggleSection(button, showSection, hideSection) {
        hideSection.classList.add('hidden');
        showSection.classList.remove('hidden');
        toggleActiveClass(button);
    }

    toPatientSectionBtn.addEventListener('click', function() {
        toggleSection(this, patientSection, doctorSection);
    });

    toDoctorSectionBtn.addEventListener('click', function() {
        toggleSection(this, doctorSection, patientSection);
    });

    
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
    
    
});
