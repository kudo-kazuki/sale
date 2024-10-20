<?php

require 'bootstrap.php'; // Eloquentの設定を読み込み
use Models\Order;

function saveOrder($postDataArray) {
    // orderItems配列からidプロパティのみを取り出してカンマ区切りにする
    $orderItemsIds = array_map(function($item) {
        return $item['id']; // 各orderItemのidを取得
    }, $postDataArray['orderItems']);

    // カンマ区切りの文字列に変換
    $orderItemsString = implode(',', $orderItemsIds);
    
    // データベースに注文情報を保存
    $order = Order::create([
        'orderNo' => $postDataArray['orderNo'],
        'name' => $postDataArray['name'],
        'email' => $postDataArray['email'],
        'orderItems' => $orderItemsString,
        'question' => $postDataArray['question'],
        'remarks' => '', // 備考はデフォルトで空
        'status' => Order::STATUS_PENDING // デフォルトは「準備中」
    ]);
    
    return $order->id; // 保存した注文のIDを返す
}
