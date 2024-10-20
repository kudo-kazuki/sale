<?php

require 'vendor/autoload.php';

use Illuminate\Database\Capsule\Manager as Capsule;
use Dotenv\Dotenv;

// サーバーのホスト名に応じて環境を設定
if ($_SERVER['SERVER_NAME'] === 'localhost' || $_SERVER['SERVER_NAME'] === '127.0.0.1' || $_SERVER['SERVER_NAME'] === 'sale') {
    putenv('APP_ENV=local');
} else if ($_SERVER['SERVER_NAME'] === 'test.xxxx') {
    putenv('APP_ENV=develop');
} else {
    // 本番環境
    putenv('APP_ENV=production');
}

// 環境変数に基づいて.envファイルを読み込む
$env = getenv('APP_ENV');
$dotenvFile = ".env.$env"; // 例: .env.local, .env.develop, .env.production

if (file_exists(__DIR__ . '/' . $dotenvFile)) {
    $dotenv = Dotenv::createImmutable(__DIR__, $dotenvFile);
    $dotenv->load();
} else {
    // デフォルトの.envを使用
    $dotenv = Dotenv::createImmutable(__DIR__);
    $dotenv->load();
}

// データベース接続設定
$capsule = new Capsule;
$capsule->addConnection([
    'driver' => 'mysql',
    'host' => $_ENV['DB_HOST'],
    'database' => $_ENV['DB_DATABASE'],
    'username' => $_ENV['DB_USERNAME'],
    'password' => $_ENV['DB_PASSWORD'],
    'charset' => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'prefix' => '',
    'timezone' => $_ENV['DB_TIMEZONE'],
]);

$capsule->setAsGlobal();
$capsule->bootEloquent();

// PHPのタイムゾーン設定
date_default_timezone_set('Asia/Tokyo');
