<?php
require '../vendor/autoload.php';
require '../bootstrap.php'; // データベース接続の初期化

use Models\Order;
use Illuminate\Database\Capsule\Manager as Capsule;

// CORSヘッダー（ローカル環境のみ）
$environment = getenv('APP_ENV');
if ($environment === 'local') {
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}

// 認証済みユーザーのみアクセス可能にする処理（例: JWTを使った認証）
$headers = apache_request_headers();
if (!isset($headers['Authorization'])) {
    http_response_code(401);
    echo json_encode(['message' => 'Unauthorized']);
    exit;
}

$jwt = str_replace('Bearer ', '', $headers['Authorization']);
$key = 'shishifsifhisisih'; // JWTの秘密鍵
try {
    $decoded = \Firebase\JWT\JWT::decode($jwt, new \Firebase\JWT\Key($key, 'HS256'));
} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(['message' => 'トークンが無効です']);
    exit;
}

// ページネーションとソートのパラメータを取得
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$perPage = 30;
$sortColumn = isset($_GET['sort']) ? $_GET['sort'] : 'id';
$sortOrder = isset($_GET['order']) && strtolower($_GET['order']) === 'asc' ? 'asc' : 'desc';

// 注文の総数を取得
$totalOrders = Order::count();

// 注文データを取得（ページネーションとソートを適用）
$orders = Order::orderBy($sortColumn, $sortOrder)
    ->skip(($page - 1) * $perPage)
    ->take($perPage)
    ->get();

// ページネーション情報と注文データをJSONで返す
echo json_encode([
    'data' => $orders,
    'total' => $totalOrders,
    'page' => $page,
    'perPage' => $perPage
]);
