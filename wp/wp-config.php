<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

//5xHWVGXsvhizue9dg

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
if($_SERVER['SERVER_NAME'] == 'sale'){
    // ** local ** //
    /** WordPress のためのデータベース名 */
    define('DB_NAME', 'sale');

    /** MySQL データベースのユーザー名 */
    define('DB_USER', 'root');

    /** MySQL データベースのパスワード */
    define('DB_PASSWORD', '');

    /** MySQL のホスト名 */
    define('DB_HOST', 'localhost');

    /** データベースのテーブルを作成する際のデータベースの文字セット */
    define('DB_CHARSET', 'utf8');

    /** データベースの照合順序 (ほとんどの場合変更する必要はありません) */
    define('DB_COLLATE', '');
}else{
    // ** 本番環境 ** //
    /** WordPress のためのデータベース名 */
    define('DB_NAME', '_wp');

    /** MySQL データベースのユーザー名 */
    define('DB_USER', '');

    /** MySQL データベースのパスワード */
    define('DB_PASSWORD', '');

    /** MySQL のホスト名 */
    define('DB_HOST', '');

    /** データベースのテーブルを作成する際のデータベースの文字セット */
    define('DB_CHARSET', 'utf8');

    /** データベースの照合順序 (ほとんどの場合変更する必要はありません) */
    define('DB_COLLATE', '');
}

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         ')*-L+O@~e&4@;GZH-TS/)TloJ.SAT%TxNCP&?LdiPC +D6JiQ&)~N^zbTm%6CX&D');
define('SECURE_AUTH_KEY',  '30k}($,O_6d;|;Yn@7-+@2nWHbFKlHj>W*:JlC]CS//f/yzxe|@.-xhsc`T|->A@');
define('LOGGED_IN_KEY',    '5}!>gHZzQ|!ck|?StL4Tx1[aftJhWpFDdo?EOY$S$T*Sc4]S4pG=6h{ `h#y*~D2');
define('NONCE_KEY',        'OacT.e,6cF+hWcxGCLxD_B eF<#.5+6=lM98xCDw|m/5OoQ6tDf,Npy@GfGp8i=D');
define('AUTH_SALT',        '$rnd,wxh_[-G04R*c%rpu^(D=Ac2?{=?e%-8^DzJFLvz/s-4eYQpv+#+~ed!~q@t');
define('SECURE_AUTH_SALT', '1iN.qRV{kIifJDcW[-0=twYN-ZmNlXT/BmYDd[>R1k:GTq2u#t0d;&98/=C|_L_;');
define('LOGGED_IN_SALT',   ')(Lyv%#p!7F!(]w5nqTS]p|iqqKpn^ Y=[|lQ.(JH.JV%q2FT!)+s4wMMw+)T}14');
define('NONCE_SALT',       'M6BN,&P|B`cmv49ZM!>gG!^#zIH>q|[ I(i.--F!^6V<t)N*DxWco|]oML2Mo1`{');

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wpsale_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */


/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
