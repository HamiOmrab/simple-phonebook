<?php
header('Content-Type: application/json');
require 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid data']);
    exit;
}

// Clear table first
$pdo->exec("DELETE FROM contacts");

$stmt = $pdo->prepare("INSERT INTO contacts (name, phone) VALUES (?, ?)");

foreach ($data as $contact) {
    $stmt->execute([$contact['name'], $contact['phone']]);
}

echo json_encode(['status' => 'success']);