
function fetchAndDisplayUserName() {
    fetch('php/fetch_user_name.php')
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            const userName = data.fullName;
            document.getElementById('userInfoName').textContent = `Full Name: ${userName}`;
            
        } else {
            console.error('Failed to fetch user name:', data.message);
        }
    })
    .catch(error => console.error('Error fetching user name:', error));
}

function toggleEditMode() {
    
    const inputs = document.querySelectorAll('#infoForm input, #infoForm select');
    const isEditable = inputs[0].disabled; 

    
    inputs.forEach(input => input.disabled = !isEditable);
    document.querySelector('#infoForm select').disabled = !isEditable;

    
    document.getElementById('saveInfoButton').style.display = isEditable ? 'block' : 'none';
}

function saveUserInfo() {
    
    const form = document.getElementById('infoForm');
    const formData = new FormData(form);

    
    fetch('php/save_user_info.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Information saved successfully!');
            toggleEditMode(); 
        } else {
            alert('Failed to save information: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}


function updateHomeContent(userName) {
    const homeMessage = `Welcome to MyDoc, ${userName}! Easily book your appointment today!`;
    document.getElementById('dashboardContent').innerHTML = `<h2>${homeMessage}</h2>`;
}



function signOut() {
    fetch('php/signout.php')
    .then(response => {
        if (response.ok) {
            window.location.href = 'index.html';
        } else {
            alert('Sign out failed.');
        }
    })
    .catch(error => console.error('Error:', error));
}



document.addEventListener('DOMContentLoaded', function() {

    
    fetchAndDisplayUserName();


    
    document.getElementById('homeBtn').addEventListener('click', function() {
        const userName = document.getElementById('patientFullName').innerText;
        updateHomeContent(userName);
    });

    document.getElementById('infoFormBtn').addEventListener('click', function() {
        
        document.getElementById('dashboardContent').innerHTML = `
            <div id="infoFormContainer">
                <h3 id="userInfoName"><!-- User's Full Name will be loaded here --></h3>
                <button id="editInfoButton">Edit</button>
                <form id="infoForm">
                    <input type="date" name="dob" placeholder="Date of Birth" disabled>
                    <input type="number" name="age" placeholder="Age" disabled>
                    <select name="gender" disabled>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <input type="text" name="city" placeholder="City" disabled>
                    <input type="text" name="state" placeholder="State" disabled>
                    <input type="text" name="country" placeholder="Country" disabled>
                    <select name="previousHealthIssue" disabled>
                        <option value="none">No, I don't have any previous health issues</option>
                        <option value="haveIssues">Yes, I have health issues</option>
                        <option value="noAnswer">Prefer not to answer</option>
                    </select>
                    <input type="submit" id="saveInfoButton" value="Save" style="display: none;">
                </form>
            </div>
        `;
    
        
        fetchAndDisplayUserName();
    
        
        document.getElementById('editInfoButton').addEventListener('click', toggleEditMode);
    
        
        document.getElementById('infoForm').addEventListener('submit', function(event) {
            event.preventDefault();
            saveUserInfo();
        });
    });
    

    document.getElementById('appointmentsBtn').addEventListener('click', function() {
        
        document.getElementById('dashboardContent').innerHTML = `
            <button id="bookAppointmentBtn" style="display: none;">Book an Appointment</button>
            <div id="appointmentFormContainer" style="display:none;">
            <form id="appointmentForm">
            <label for="appointmentDate">Choose Date:</label>
            <input type="date" id="appointmentDate" name="date" required>

            <label for="timeSlot">Choose Time Slot:</label>
            <select id="timeSlot" name="timeSlot" required>
                <!-- Time slots will be populated here -->
            </select>

            <label for="reason">Reason for Appointment:</label>
            <select id="reason" name="reason" required>
                <option value="mental">Mental Illness</option>
                <option value="physical">Physical Illness</option>
                <option value="allergy">Allergy</option>
            </select>

            <label for="type">Appointment Type:</label>
            <select id="type" name="type" required>
                <option value="zoom">Zoom</option>
                <option value="offline">Offline</option>
            </select>

            <button type="submit">Submit</button>
        </form>
            </div>
            <div id="bookedAppointments"></div>
        `;
    
        
        document.getElementById('appointmentDate').addEventListener('change', function() {
            loadAvailableTimeSlots(this.value);
        });
    
        
        document.getElementById('appointmentForm').addEventListener('submit', function(event) {
            event.preventDefault();
            bookAppointment();
        });
        
    
        
        loadBookedAppointments();
        
        document.getElementById('bookAppointmentBtn').addEventListener('click', function() {
            
            document.getElementById('appointmentFormContainer').style.display = 'block';
            this.style.display = 'none';
        });
    });
    
    function loadAvailableTimeSlots(date) {
        fetch('php/get_available_time_slots.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'date=' + date
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const timeSlotSelect = document.getElementById('timeSlot');
                timeSlotSelect.innerHTML = ''; 
    
                data.timeSlots.forEach(slot => {
                    const option = document.createElement('option');
                    option.value = slot;
                    option.textContent = slot;
                    timeSlotSelect.appendChild(option);
                });
            } else {
                alert('Failed to load time slots: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    
    document.getElementById('signOutBtn').addEventListener('click', signOut);
});




function loadInformationForm() {
    
    document.getElementById('dashboardContent').innerHTML = `
        <div id="infoFormContainer">
            <h3 id="userInfoName"><!-- User's Full Name will be loaded here --></h3>
            <button id="editInfoButton">Edit</button>
            <form id="infoForm">
                <input type="date" name="dob" placeholder="Date of Birth" disabled>
                <input type="number" name="age" placeholder="Age" disabled>
                <select name="gender" disabled>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <input type="text" name="city" placeholder="City" disabled>
                <input type="text" name="state" placeholder="State" disabled>
                <input type="text" name="country" placeholder="Country" disabled>
                <select name="previousHealthIssue" disabled>
                    <option value="none">No, I don't have any previous health issues</option>
                    <option value="haveIssues">Yes, I have health issues</option>
                    <option value="noAnswer">Prefer not to answer</option>
                </select>
                <input type="submit" id="saveInfoButton" value="Save" style="display: none;">
            </form>
        </div>
    `;

    
    
    fetchAndDisplayUserInfo();

    
    document.getElementById('editInfoButton').addEventListener('click', toggleEditMode);

    
    document.getElementById('infoForm').addEventListener('submit', function(event) {
        event.preventDefault();
        saveUserInfo();
    });
}


function fetchAndDisplayUserInfo() {
    fetch('php/get_user_info.php') 
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            
            const form = document.getElementById('infoForm');
            form['dob'].value = data.userInfo.dob;
            form['age'].value = data.userInfo.age;
            form['gender'].value = data.userInfo.gender;
            form['city'].value = data.userInfo.city;
            form['state'].value = data.userInfo.state;
            form['country'].value = data.userInfo.country;
            form['previousHealthIssue'].value = data.userInfo.previousHealthIssue;

            
            document.getElementById('userInfoName').textContent = `Full Name: ${data.userInfo.name}`;
        } else {
            console.error('Failed to fetch user information:', data.message);
        }
    })
    .catch(error => console.error('Error fetching user information:', error));
}


function bookAppointment() {
    
    const formData = new FormData(document.getElementById('appointmentForm'));

    fetch('php/book_appointment.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Appointment booked successfully!');
            loadBookedAppointments(); 
        } else {
            alert('Failed to book appointment: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

function loadBookedAppointments() {
    
    fetch('php/get_booked_appointments.php', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        const appointmentFormContainer = document.getElementById('appointmentFormContainer');
        const bookAppointmentButton = document.getElementById('bookAppointmentBtn');
        const bookedAppointmentsDiv = document.getElementById('bookedAppointments');

        
        if (data.status === 'success' && data.appointments.length > 0) {
            appointmentFormContainer.style.display = 'none';
            bookAppointmentButton.style.display = 'none';
            bookedAppointmentsDiv.innerHTML = '<h3>Your Booked Appointments:</h3>';

            
            data.appointments.forEach(appointment => {
                const appointmentInfo = document.createElement('div');
                appointmentInfo.innerHTML = `
                    <p>Date: ${appointment.date}</p>
                    <p>Time Slot: ${appointment.timeSlot}</p>
                    <p>Type: ${appointment.type}</p>
                    <p>Reason: ${appointment.reason}</p>
                    ${appointment.type === 'zoom' ? `<p>Zoom Link: ${appointment.zoomLink}</p>` : ''}
                    <button onclick="cancelAppointment(${appointment.id})">Cancel</button>
                `;
                bookedAppointmentsDiv.appendChild(appointmentInfo);
            });
        } else {
            
            bookAppointmentButton.style.display = 'block';
            bookedAppointmentsDiv.innerHTML = ''; 
        }
    })
    .catch(error => console.error('Error:', error));
}

function cancelAppointment(appointmentId) {
    if (!confirm('Are you sure you want to cancel this appointment?')) {
        return; 
    }

    fetch('php/cancel_appointment.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'appointmentId=' + appointmentId
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Appointment cancelled successfully.');
            loadBookedAppointments(); 
        } else {
            alert('Failed to cancel appointment: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while trying to cancel the appointment.');
    });
}