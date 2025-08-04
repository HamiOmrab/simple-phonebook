<?php
header('Content-Type: application/json');
require_once 'db.php';
try {
    $data = json_decode(file_get_contents('php://input'), true);
    if (empty($data['name']) || empty($data['phone'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Name and phone are required']);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO contacts (name, phone) VALUES (:name, :phone)");
    $stmt->execute([
        ':name' => $data['name'],
        ':phone' => $data['phone'],
    ]);

    echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
