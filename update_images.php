<?php
// Xserver本番用：imagesフォルダをスキャンしてimages.jsonを自動更新
// 使い方：ブラウザで https://あなたのドメイン/update_images.php にアクセスするだけ

// ★セキュリティ：パスワードを設定してください★
define('PASSWORD', 'your-secret-password');

if (!isset($_GET['pw']) || $_GET['pw'] !== PASSWORD) {
    http_response_code(403);
    die('Forbidden: ?pw=パスワード をURLに付けてアクセスしてください');
}

$dir    = __DIR__ . '/images/';
$exts   = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
$files  = [];

foreach (scandir($dir) as $file) {
    if ($file === '.' || $file === '..') continue;
    $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
    if (in_array($ext, $exts)) {
        $files[] = $file;
    }
}

sort($files);

$json = json_encode(['images' => $files], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
file_put_contents(__DIR__ . '/images.json', $json);

header('Content-Type: application/json; charset=utf-8');
echo $json;
?>
