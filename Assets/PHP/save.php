<?php
// Get raw POST data
$data = file_get_contents("php://input");

// Decode to verify it's valid JSON
$contacts = json_decode($data, true);
if ($contacts === null) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid JSON"]);
    exit;
}

// Save to file
file_put_contents('contacts.json', json_encode($contacts, JSON_PRETTY_PRINT));
echo json_encode(["status" => "success"]);

?>