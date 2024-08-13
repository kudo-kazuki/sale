import { defineStore } from 'pinia'
import { CartItem } from '@/types'

export const useCartStore = defineStore('cartStore', {
    state: () => ({
        items: [] as CartItem[],
    }),
    actions: {
        addItem(itemData: CartItem) {
            this.items.push(itemData)
        },

        deleteItem(id: number | string) {
            this.items = this.items.filter((item) => item.id !== id)
        },

        deleteAllItem() {
            this.items = []
        },

        hasItem(id: number | string): boolean {
            return this.items.some((item) => item.id === id)
        },
    },
})
