<?php
session_start();
require 'vendor/autoload.php';
use Volnix\CSRF\CSRF;

// セッションにCSRFトークンがない場合のみ生成する
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = CSRF::getToken();
}

// セッションに保存されているトークンを取得
$csrfToken = $_SESSION['csrf_token'];


// CSRFトークンをJSON形式で返す
header('Content-Type: application/json');
echo json_encode(['csrf_token' => $csrfToken]);
