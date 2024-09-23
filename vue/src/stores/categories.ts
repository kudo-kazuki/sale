import { defineStore } from 'pinia'
import { axiosInstance } from '@/axiosConfig'
import { Category } from '@/types'
import { PersistedStateOptions } from 'pinia-plugin-persistedstate'

export const useCategoryStore = defineStore('categoryStore', {
    state: () => ({
        categories: [] as Category[],
    }),
    actions: {
        async fetchCategories() {
            try {
                const response = await axiosInstance.get<Category[]>(
                    'categories?per_page=100',
                )
                this.categories = response.data
                console.log('categories', this.categories)
            } catch (error) {
                console.error('Error fetching WordPress posts:', error)
            }
        },

        getAllCategories() {
            return this.categories
        },

        async getCategoryById(
            id: number | string,
        ): Promise<Category | undefined> {
            // state から ID をもとにカテゴリを探す
            let category = this.categories.find((cat) => cat.id === id)

            if (!category) {
                try {
                    // ID に基づいてカテゴリをサーバーから取得
                    const response = await axiosInstance.get<Category>(
                        `categories/${id}`, // 相対パスで指定
                    )
                    category = response.data
                    this.categories.push(category) // state に追加
                } catch (error) {
                    console.error(`Error fetching category by ID ${id}:`, error)
                }
            }

            return category
        },

        // 複数の ID からカテゴリを取得するメソッド（エラーがあっても中断しない）
        async getCategoryByIds(
            ids: Array<number | string>,
        ): Promise<Category[]> {
            // 各 ID に対して getCategoryById を呼び出し、全ての結果を取得
            const results = await Promise.allSettled(
                ids.map((id) => this.getCategoryById(id)),
            )

            // 成功したもののみを抽出して配列として返す
            return results
                .filter((result) => result.status === 'fulfilled') // 成功したものだけを抽出
                .map(
                    (result) =>
                        (result as PromiseFulfilledResult<Category | undefined>)
                            .value!,
                ) // `value` を抽出
                .filter((category): category is Category => !!category) // `undefined` を除外
        },
    },
    persist: {
        enabled: true, // 永続化を有効にする
    } as PersistedStateOptions,
})
