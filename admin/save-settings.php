<?php
header('Content-Type: application/json');
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) { http_response_code(400); echo json_encode(['ok'=>false]); exit; }
$file = __DIR__ . '/../js/settings.json';
$old = [];
if (is_file($file)) $old = json_decode(file_get_contents($file), true) ?: [];
$out = array_merge($old, $data);
file_put_contents($file, json_encode($out, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
echo json_encode(['ok'=>true]);
