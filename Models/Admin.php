<?php

namespace Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $table = 'admins';
    
    // 入力可能なフィールドを指定
    protected $fillable = ['name', 'password', 'level', 'remarks'];

    // created_at, updated_atを自動管理
    public $timestamps = true;
}


/*
CREATE TABLE `admins` (
  `id` INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL, -- 管理者名
  `password` VARCHAR(255) NOT NULL, -- ハッシュ化されたパスワード
  `level` TINYINT(1) NOT NULL DEFAULT 0, -- 権限レベル（0が最高管理者）
  `remarks` TEXT DEFAULT '', -- 備考
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 作成日時
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- 更新日時
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
*/
