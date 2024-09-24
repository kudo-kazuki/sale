import { defineStore } from 'pinia'
import axios from 'axios'
import { API_BASE_URL } from '@/config'
import { PersistedStateOptions } from 'pinia-plugin-persistedstate'

export const useCsrfStore = defineStore('csrf', {
    state: () => ({
        csrfToken: '',
    }),
    actions: {
        async fetchCsrfToken() {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/csrf-token.php`,
                )
                this.csrfToken = response.data.csrf_token
            } catch (error) {
                console.error('CSRFトークンの取得に失敗しました:', error)
            }
        },
    },
    persist: {
        enabled: true, // 永続化を有効にする
    } as PersistedStateOptions,
})
