<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'invalid json']);
  exit;
}
$path = __DIR__ . '/../js';
if (!is_dir($path)) mkdir($path, 0755, true);
$file = $path . '/posts.json';
$ok = file_put_contents($file, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
if ($ok === false) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'write failed']);
  exit;
}
@chmod($file, 0664);
echo json_encode(['ok' => true, 'count' => count($data)]);
