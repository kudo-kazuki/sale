<?php
session_start();

require 'vendor/autoload.php';
use Volnix\CSRF\CSRF;
date_default_timezone_set('Asia/Tokyo');

// POSTデータを取得
$postData = file_get_contents('php://input');

// 取得したデータをデコードして配列に変換
$postDataArray = json_decode($postData, true);

if($postDataArray['enviroment'] != 'local'){
    // CSRFトークンを検証
    if (!CSRF::validate($postDataArray)) {
        // トークンが無効な場合、403 Forbiddenを返す
        http_response_code(403);
        echo json_encode(['error' => 'CSRF token validation failed', 'result' => false]);
        exit;
    }
}

// CSRFトークンが有効な場合、注文処理を続ける

// 必須項目のバリデーション
if(
    empty($postDataArray['name']) || 
    empty($postDataArray['email']) ||
    !filter_var($postDataArray['email'], FILTER_VALIDATE_EMAIL) // emailの形式チェック
){
    http_response_code(400);
    echo json_encode(['result' => false]);
	exit;
}

/*--------------------------------------------------------*/
/*------------------管理者に送るメール------------------------*/
$order_confirm_mail = 'kuasehujikolp@yahoo.co.jp';
mb_language('ja');
mb_internal_encoding('utf-8');
mb_send_mail(
    $order_confirm_mail, 
    $postDataArray['toOrner']['subject'], 
    $postDataArray['toOrner']['body'], 
    $postDataArray['toOrner']['headers']
);


/*--------------------------------------------------------*/
/*------------------注文者に送るメール------------------------*/
mb_send_mail(
    $postDataArray['email'], 
    $postDataArray['toCustomer']['subject'], 
    $postDataArray['toCustomer']['body'], 
    $postDataArray['toCustomer']['headers']
);


//TODO:DBに保存

// 処理が成功した場合のレスポンス
header('Content-Type: application/json');
echo json_encode(['result' => true]);
