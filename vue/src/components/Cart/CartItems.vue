<script setup lang="ts">
import { CartItem as CartItemType } from '@/types'
import CartItem from '@/components/Cart/CartItem.vue'

interface Props {
    items?: Array<CartItemType>
    isNotDeleteButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
    <div class="CartItems">
        <ul v-if="items && items.length" class="CartItems__items">
            <li v-for="item in items" :key="item.id" class="CartItems__item">
                <CartItem
                    v-bind="item"
                    :isNotDeleteButton="isNotDeleteButton"
                />
            </li>
        </ul>
        <div v-else>カートには何も入っていません</div>
    </div>
</template>

<style lang="scss" scoped>
.CartItems {
    &__item {
        border: 1px solid #999;
        padding: 24px;
    }

    &__item + &__item {
        border-top: none;
    }
}
</style>
