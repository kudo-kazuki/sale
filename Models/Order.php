<?php

namespace Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'orders';
    protected $fillable = [
        'orderNo', 
        'name', 
        'email', 
        'orderItems', 
        'question', 
        'remarks', 
        'status'
    ];

    const STATUS_PENDING = 0;   // 準備中
    const STATUS_SENT = 1;      // 送付済
    const STATUS_READY = 2;     // 準備完了
    const STATUS_CANCELED = 3;  // キャンセル

    public $timestamps = true;

    // 数値ステータスと日本語の対応
    public static function getStatusText($status)
    {
        $statuses = [
            self::STATUS_PENDING => '準備中',
            self::STATUS_SENT => '送付済',
            self::STATUS_READY => '準備完了',
            self::STATUS_CANCELED => 'キャンセル',
        ];

        return $statuses[$status] ?? '不明';
    }
}

/*
CREATE TABLE `orders` (
  `id` INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `orderNo` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `orderItems` TEXT NOT NULL,  -- カンマ区切りの文字列で商品IDを格納
  `question` TEXT,             -- 質問やメッセージがあればここに格納
  `remarks` TEXT DEFAULT '',    -- 備考（デフォルトは空文字）
  `status` TINYINT(1) NOT NULL DEFAULT 0, -- 0:準備中, 1:送付済, 2:準備完了, 3:キャンセル
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 作成日時
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- 更新日時
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
*/
