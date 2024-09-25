<?php
$htmlFilePath = __DIR__ . '/index.html';

if (file_exists($htmlFilePath)) {
    // index.html の内容を読み込んで出力
    readfile($htmlFilePath);
} else {
    echo 'index.html が見つかりませんでした。';
}
?>
