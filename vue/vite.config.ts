import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import { resolve } from 'path'

// https://vitejs.dev/config/
/*vite build --mode productionでビルドする*/
export default defineConfig({
    plugins: [
        vue(),
        Pages({
            dirs: 'src/pages', // デフォルトのページディレクトリを指定
            extensions: ['vue'], // 対応するファイル拡張子を指定
        }),
    ],
    base: '/wp/wp-content/themes/mytheme/',
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'), // '@'を'src'ディレクトリにマッピング
        },
    },
    server: {
        proxy: {
            '/wp-json': {
                target: process.env.VITE_API_BASE_URL, // WordPressのURL
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/wp-json/, ''),
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                // vueファイル内でも普通に使えるようになる
                additionalData: `
                    @import "@/scss/variables.scss";
                    @import "@/scss/mixins.scss";
                `,
            },
        },
    },
    build: {
        outDir: '../wp/wp-content/themes/mytheme',
    },
})
