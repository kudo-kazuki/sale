import { defineStore } from 'pinia'
import axios from 'axios'
import { API_BASE_URL } from '@/config'
import { PersistedStateOptions } from 'pinia-plugin-persistedstate'

interface csrfStore {
    csrfToken: {
        name: string
        value: string
    }
}

export const useCsrfStore = defineStore('csrf', {
    state: (): csrfStore => ({
        csrfToken: {
            name: '', // トークン名
            value: '', // トークンの値
        },
    }),
    actions: {
        async fetchCsrfToken() {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/csrf-token.php`,
                )
                this.csrfToken.name = response.data.csrf_token.name
                this.csrfToken.value = response.data.csrf_token.value
            } catch (error) {
                console.error('CSRFトークンの取得に失敗しました:', error)
            }
        },
        resetCsrfToken() {
            this.csrfToken = { name: '', value: '' }
            localStorage.removeItem('csrf') // ローカルストレージのキーに合わせて削除
        },
    },
    persist: {
        enabled: true, // 永続化を有効にする
    } as PersistedStateOptions,
})
