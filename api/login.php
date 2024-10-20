<?php
require '../vendor/autoload.php';
require '../bootstrap.php'; // Eloquentのデータベース接続を初期化

use \Firebase\JWT\JWT;
use Models\Admin;
use Illuminate\Database\Capsule\Manager as Capsule;

// 環境を判別
$environment = getenv('APP_ENV');
// ローカル環境ならCORSヘッダーを追加
if ($environment === 'local') {
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    // OPTIONSメソッドの場合はプリフライトリクエストに対して応答
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}


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
