import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // 環境変数のロード（必要であれば使用）
    const env = loadEnv(mode, process.cwd())

    return {
        plugins: [
            vue(),
            Pages({
                dirs: 'src/pages', // デフォルトのページディレクトリを指定
                extensions: ['vue'], // 対応するファイル拡張子を指定
            }),
        ],
        // モードに応じて base を切り替え
        base: mode === 'development' ? './' : '/wp/wp-content/themes/mytheme/',
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'), // '@'を'src'ディレクトリにマッピング
            },
        },
        server: {
            proxy: {
                '/wp-json': {
                    target:
                        env.VITE_API_BASE_URL || process.env.VITE_API_BASE_URL, // WordPressのURL
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
    }
})
