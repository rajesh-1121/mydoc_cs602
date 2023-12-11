<?php
session_start();

header('Content-Type: application/json');


require 'db_connect.php';


if (!isset($_SESSION['userId'])) {
    echo json_encode(["status" => "error", "message" => "User not logged in"]);
    exit();
}

$userId = $_SESSION['userId'];


$query = "SELECT p.name, pi.dob, pi.age, pi.gender, pi.city, pi.state, pi.country, pi.previous_health_issue FROM patients p
          JOIN patient_info pi ON p.id = pi.patient_id
          WHERE p.id = ?";


if ($stmt = $conn->prepare($query)) {
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 1) {
        $userInfo = $result->fetch_assoc();
        echo json_encode(["status" => "success", "userInfo" => $userInfo]);
    } else {
        echo json_encode(["status" => "error", "message" => "User information not found"]);
    }
    
    $stmt->close();
} else {
    
    echo json_encode(["status" => "error", "message" => "Error preparing database statement"]);
}

$conn->close();
?>
