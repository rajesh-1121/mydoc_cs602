<?php
$servername = "localhost";
$username = "id21616895_rj";
$password = "12345@Qwerty";
$dbname = "id21616895_doc";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$name = $_POST['name'];
$email = $_POST['email'];
$mobileNumber = $_POST['mobileNumber'];
$hashed_password = password_hash($_POST['password'], PASSWORD_DEFAULT);


$sql = "INSERT INTO patients (name, email, mobileNumber, password) VALUES ('$name', '$email', '$mobileNumber', '$hashed_password')";

if ($conn->query($sql) === TRUE) {
    echo "Signup successful";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
