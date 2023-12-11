<?php
session_start();
header('Content-Type: application/json');

include 'db_connect.php'; 

if (!isset($_SESSION['userId'])) {
    echo json_encode(["status" => "error", "message" => "User not logged in"]);
    exit();
}

$date = $_POST['date'] ?? '';


$timeSlots = getAvailableTimeSlots($date, $conn);

echo json_encode(["status" => "success", "timeSlots" => $timeSlots]);


function getAvailableTimeSlots($date, $mysqli) {
    
    
    return ['09:00', '09:30', '10:00']; 
}
?>
