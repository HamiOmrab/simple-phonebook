<?php
header('Content-Type: application/json');

if (file_exists('contacts.json')) {
    echo file_get_contents('contacts.json');
} else {
    echo json_encode([]);
}
?>