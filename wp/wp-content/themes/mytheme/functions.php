<?php
function setup_theme() {
  add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'setup_theme');

//一般設定の「サイトのタイトル」を取得するAPI
add_action('rest_api_init', function () {
    register_rest_route('custom/v2', '/site-title', [
        'methods' => 'GET',
        'callback' => function() {
            return get_bloginfo('name');
        },
    ]);
});
?>
