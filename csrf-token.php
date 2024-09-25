<?php
session_start();
require 'vendor/autoload.php';
use Volnix\CSRF\CSRF;

// セッションにCSRFトークンがない場合のみ生成する
if (empty($_SESSION[CSRF::TOKEN_NAME])) {
    $_SESSION[CSRF::TOKEN_NAME] = CSRF::getToken();
}

// トークン名とトークン値を取得
$csrfTokenName = CSRF::TOKEN_NAME; // 'csrf_token' がデフォルト
$csrfTokenValue = $_SESSION[CSRF::TOKEN_NAME]; // トークンの値

// CSRFトークンをJSON形式で返す
header('Content-Type: application/json');
echo json_encode([
    'csrf_token' => [
        'name' => $csrfTokenName,
        'value' => $csrfTokenValue,
    ]
]);
