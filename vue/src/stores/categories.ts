import { defineStore } from 'pinia'
import axiosInstance from '@/axiosConfig'
import { Category } from '@/types'

export const useCategoryStore = defineStore('categoryStore', {
    state: () => ({
        categories: [] as Category[],
    }),
    actions: {
        async fetchCategories() {
            try {
                const response =
                    await axiosInstance.get<Category[]>('categories')
                this.categories = response.data
                console.log('categories', this.categories)
            } catch (error) {
                console.error('Error fetching WordPress posts:', error)
            }
        },
    },
})
