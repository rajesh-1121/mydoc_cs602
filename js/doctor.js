document.addEventListener('DOMContentLoaded', function() {
    function fetchAndDisplayDoctorName() {
        fetch('php/fetch_doctor_name.php')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                document.getElementById('username').textContent = data.doctorName;
                updateHomeContent(data.doctorName); // Update home content with doctor's name
            } else {
                console.error('Failed to fetch doctor name:', data.message);
            }
        })
        .catch(error => console.error('Error fetching doctor name:', error));
    }

    function updateHomeContent(doctorName) {
        const homeMessage = `Welcome, Dr. ${doctorName}!`;
        document.getElementById('dashboardContent').innerHTML = `<h2>${homeMessage}</h2>`;
    }

function loadAppointments() {
    fetch('php/get_appointments.php')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json();
    })
    .then(data => {
        const appointmentsDiv = document.getElementById('dashboardContent');
        if (data.status === 'success') {
           
            if (Array.isArray(data.activeAppointments) && data.activeAppointments.length > 0) {
                appointmentsDiv.innerHTML = '<h2>Active Appointments:</h2>';
                data.activeAppointments.forEach(appointment => {
                    const appointmentElement = createAppointmentElement(appointment);
                    appointmentsDiv.appendChild(appointmentElement);
                });
            } else {
                appointmentsDiv.innerHTML = '<h2>No Active Appointments</h2>';
            }
            const historyDivider = document.createElement('h3');
            historyDivider.textContent = 'Appointment History:';
            appointmentsDiv.appendChild(historyDivider);

            if (Array.isArray(data.appointmentHistory) && data.appointmentHistory.length > 0) {
                data.appointmentHistory.forEach(appointment => {
                    const historyElement = createAppointmentElement(appointment, true);
                    appointmentsDiv.appendChild(historyElement);
                });
            } else {
                const noHistoryMsg = document.createElement('p');
                noHistoryMsg.textContent = 'No appointment history.';
                appointmentsDiv.appendChild(noHistoryMsg);
            }
        } else {
            throw new Error(data.message);
        }
    })
    .catch(error => {
        console.error('Error loading appointments:', error);
        document.getElementById('dashboardContent').innerHTML = `<p>Error loading appointments: ${error.message}</p>`;
    });
}

function createAppointmentElement(appointment, isHistory = false) {
    const appointmentElement = document.createElement('div');
    appointmentElement.classList.add(isHistory ? 'appointment-history' : 'appointment');
    appointmentElement.innerHTML = `
        <p>Date: ${new Date(appointment.appointment_date).toLocaleDateString()}</p>
        <p>Time: ${appointment.time_slot}</p>
        <p>Patient ID: ${appointment.patient_id}</p>
        <p>Reason: ${appointment.reason}</p>
        <p>Type: ${appointment.appointment_type}</p>
        ${appointment.zoom_link ? `<p>Zoom Link: <a href="${appointment.zoom_link}" target="_blank">Join Meeting</a></p>` : ''}
        ${isHistory ? '' : '<button onclick="cancelAppointment(' + appointment.id + ')">Cancel</button>'}
    `;

    if (isHistory) {
        const divider = document.createElement('hr');
        appointmentElement.appendChild(divider);
    }

    return appointmentElement;
}

function cancelAppointment(appointmentId) {
    if (!confirm('Are you sure you want to cancel this appointment?')) {
        return;
    }

    fetch('php/cancel_appointment_doctor.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `appointmentId=${appointmentId}`
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json();
    })
    .then(data => {
        if (data.status === 'success') {
            alert('Appointment cancelled successfully.');
            loadAppointments(); // Refresh appointments display
        } else {
            alert(`Failed to cancel appointment: ${data.message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert(`An error occurred while trying to cancel the appointment: ${error.message}`);
    });
}

    function logout() {
        fetch('php/logout_doctor.php')
        .then(response => {
            if (response.ok) {
                window.location.href = 'index.html';
            } else {
                alert('Logout failed.');
            }
        })
        .catch(error => console.error('Error:', error));
    }
    document.getElementById('homeBtn').addEventListener('click', function() {
        fetchAndDisplayDoctorName();
    });

    document.getElementById('manageAppointmentsBtn').addEventListener('click', loadAppointments);

    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';
    logoutButton.classList.add('menu-button', 'sign-out-button');
    logoutButton.addEventListener('click', logout);
    document.querySelector('.left-section').appendChild(logoutButton);

    fetchAndDisplayDoctorName();
});

document.addEventListener('DOMContentLoaded', () => {
    const menuButtons = document.querySelectorAll('.menu-button');
    
    menuButtons.forEach(button => {

        button.addEventListener('mouseenter', () => {
            button.style.backgroundColor = '#f0f0f0';
            button.style.color = '#333';
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.backgroundColor = '';
            button.style.color = '';
            button.style.transform = '';
            button.style.boxShadow = '';
        });

        button.addEventListener('focus', () => {
            button.style.outline = '2px solid blue';
        });

        button.addEventListener('blur', () => {
            button.style.outline = '';
        });
    });
});
