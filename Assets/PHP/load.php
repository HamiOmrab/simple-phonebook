<?php
header('Content-Type: application/json');
require 'db.php';

$stmt = $pdo->query("SELECT name, phone FROM contacts");
$contacts = $stmt->fetchAll();

echo json_encode($contacts);
?>