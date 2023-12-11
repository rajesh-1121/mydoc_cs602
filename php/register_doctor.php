<?php
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $specialist = $_POST['specialist'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $password = $_POST['password'] ?? '';

    
    if (empty($name) || empty($email) || empty($specialist) || empty($phone) || empty($password)) {
        echo "Please fill all fields.";
        exit;
    }

    
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    
    $sql = "INSERT INTO doctors (name, email, specialist, phone, password) VALUES (?, ?, ?, ?, ?)";
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("sssss", $name, $email, $specialist, $phone, $hashedPassword);
        if ($stmt->execute()) {
            echo "Doctor registered successfully";
        } else {
            echo "Error: " . $conn->error;
        }
        $stmt->close();
    } else {
        echo "Error: " . $conn->error;
    }

    $conn->close();
}
?>
