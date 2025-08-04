<?php
header('Content-Type: application/json');
require_once 'db.php';
try {
    $data = json_decode(file_get_contents('php://input'), true);
    if (empty($data['id']) || empty($data['name']) || empty($data['phone'])) {
        http_response_code(400);
        echo json_encode(['error' => 'ID, name and phone are required']);
        exit;
    }

    $stmt = $pdo->prepare("UPDATE contacts SET name = :name, phone = :phone WHERE id = :id");
    $stmt->execute([
        ':name' => $data['name'],
        ':phone' => $data['phone'],
        ':id' => $data['id'],
    ]);

    echo json_encode(['success' => true]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
