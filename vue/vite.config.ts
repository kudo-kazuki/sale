import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
/*vite build --mode productionでビルドする*/
export default defineConfig({
    plugins: [vue()],
    base: './',
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
})
