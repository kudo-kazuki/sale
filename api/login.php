<?php
require 'vendor/autoload.php';
use \Firebase\JWT\JWT;
use Models\Admin;
use Illuminate\Database\Capsule\Manager as Capsule;

header('Content-Type: application/json');

// 秘密鍵
$key = "shishifsifhisisih";

// POSTデータを取得
$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'];
$password = $data['password'];

// 管理者情報をDBから取得
$admin = Admin::where('name', $username)->first();

if ($admin && password_verify($password, $admin->password)) {
    // JWTペイロード
    $payload = [
        "iat" => time(),
        "exp" => time() + (24 * 60 * 60),
        "username" => $admin->name,
        "level" => $admin->level // 権限レベルもJWTに含める
    ];

    // JWTを生成
    $jwt = JWT::encode($payload, $key, 'HS256');

    // JWTをクライアントに返す
    echo json_encode([
        "status" => "success",
        "token" => $jwt
    ]);
} else {
    // 認証失敗
    http_response_code(401);
    echo json_encode([
        "status" => "error",
        "message" => "ユーザー名またはパスワードが違います"
    ]);
}
