<?php
session_start();
header('Content-Type: application/json');


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'db_connect.php'; 


function doesUserInfoExist($conn, $userId) {
    $stmt = $conn->prepare("SELECT * FROM user_info WHERE patient_id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->num_rows > 0;
}


if (!isset($_SESSION['userId'])) {
    echo json_encode(["status" => "error", "message" => "User not logged in"]);
    exit();
}


$userId = $_SESSION['userId'];


$dob = $_POST['dob'] ?? null;
$age = $_POST['age'] ?? null;
$gender = $_POST['gender'] ?? null;
$city = $_POST['city'] ?? null;
$state = $_POST['state'] ?? null;
$country = $_POST['country'] ?? null;
$previousHealthIssue = $_POST['previousHealthIssue'] ?? null;

try {
    
    $conn->begin_transaction();

    
    if (doesUserInfoExist($conn, $userId)) {
        
        $stmt = $conn->prepare("UPDATE user_info SET dob=?, age=?, gender=?, city=?, state=?, country=?, previous_health_issue=? WHERE patient_id=?");
        $stmt->bind_param("sisssssi", $dob, $age, $gender, $city, $state, $country, $previousHealthIssue, $userId);
    } else {
        
        $stmt = $conn->prepare("INSERT INTO user_info (patient_id, dob, age, gender, city, state, country, previous_health_issue) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("isisssss", $userId, $dob, $age, $gender, $city, $state, $country, $previousHealthIssue);
    }

    
    if (!$stmt->execute()) {
        throw new Exception($stmt->error);
    }

    
    $conn->commit();

    echo json_encode(["status" => "success", "message" => "Information saved successfully"]);
} catch (Exception $e) {
    
    $conn->rollback();
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}

$stmt->close();
$conn->close();
?>
