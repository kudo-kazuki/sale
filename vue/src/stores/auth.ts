import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'
import { API_BASE_URL, ENVIROMENT_NAME } from '@/config'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null as string | null,
        isAuthenticated: false,
        username: null as string | null, // ユーザー名
    }),
    actions: {
        async login(username: string, password: string) {
            try {
                const response = await axios.post(
                    `${API_BASE_URL}/api/login.php`,
                    {
                        username,
                        password,
                        headers: {
                            'Content-Type': 'text/plain',
                        },
                    },
                )
                this.token = response.data.token
                this.isAuthenticated = true
                this.username = username // ユーザー名を保存

                // JWTをlocalStorageに保存
                if (this.token) {
                    localStorage.setItem('jwt_token', this.token)
                    localStorage.setItem('username', this.username) // ユーザー名も保存
                }

                // 認証成功後、/admin/indexにリダイレクト
                router.push('/admin/')
            } catch (error: any) {
                console.log(error)

                // サーバーからのエラーメッセージをそのまま投げる
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) {
                    throw new Error(error.response.data.message)
                } else {
                    // エラーメッセージが無い場合のデフォルトエラーメッセージ
                    throw new Error('ログインに失敗しました')
                }
            }
        },
        logout() {
            this.token = null
            this.isAuthenticated = false
            this.username = null // ユーザー名をリセット
            localStorage.removeItem('jwt_token')
            localStorage.removeItem('username') // ユーザー名も削除
            router.push('/admin/login')
        },
        checkAuth() {
            const token = localStorage.getItem('jwt_token')
            const storedUsername = localStorage.getItem('username') // 保存されたユーザー名を取得
            if (token) {
                this.token = token
                this.isAuthenticated = true
                this.username = storedUsername // ユーザー名を再設定
            } else {
                this.isAuthenticated = false
            }
        },
    },
})
