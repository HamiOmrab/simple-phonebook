<?php
header('Content-Type: application/json');
require_once 'db.php';
try {
    $data = json_decode(file_get_contents('php://input'), true);
    if (empty($data['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'ID is required']);
        exit;
    }

    $stmt = $pdo->prepare("DELETE FROM contacts WHERE id = :id");
    $stmt->execute([':id' => $data['id']]);

    echo json_encode(['success' => true]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
