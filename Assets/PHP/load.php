<?php
header('Content-Type: application/json');
require_once 'db.php';
try {
    $stmt = $pdo->query("SELECT * FROM contacts");
    $contacts = $stmt->fetchAll();

    echo json_encode($contacts);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>