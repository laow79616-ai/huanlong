<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'POST only']);
  exit;
}

if (empty($_FILES['file'])) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'no file']);
  exit;
}

$f = $_FILES['file'];
if ($f['error'] !== UPLOAD_ERR_OK) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'upload error ' . $f['error']]);
  exit;
}

// 限制 50MB
if ($f['size'] > 50 * 1024 * 1024) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'file too large (max 50MB)']);
  exit;
}

$ext = strtolower(pathinfo($f['name'], PATHINFO_EXTENSION));
$allowed = ['jpg','jpeg','png','gif','webp','mp4','webm','mov','m4v'];
if (!in_array($ext, $allowed)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'file type not allowed']);
  exit;
}

$dir = realpath(__DIR__ . '/../uploads');
if ($dir === false) {
  $dir = __DIR__ . '/../uploads';
  @mkdir($dir, 0775, true);
}

$name = date('Ymd_His') . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
$dest = $dir . '/' . $name;
if (!move_uploaded_file($f['tmp_name'], $dest)) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'save failed']);
  exit;
}
@chmod($dest, 0644);

$url = '/uploads/' . $name;
echo json_encode(['ok' => true, 'url' => $url, 'name' => $name]);
