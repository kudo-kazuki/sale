<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import { CartItem } from '@/types'
import Toast from '@/components/Toast.vue'
import cartIcon from '@/assets/icons/cart.svg'

const cartStore = useCartStore()

interface Props extends CartItem {
    isDisabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {})
console.log('cartStore.items', cartStore.items)

const x = ref(0)
const y = ref(0)
const buttonRef = ref<HTMLElement | null>(null)
const isToastShow = ref(false)

const addCartItem = (event: MouseEvent) => {
    if (isToastShow.value || cartStore.hasItem(props.id)) {
        return false
    }

    const addItemData: CartItem = {
        id: props.id,
        name: props.name,
        image: props.image,
        description: props.description,
    }
    cartStore.addItem(addItemData)
    console.log('cartStore.items', cartStore.items)

    x.value = event.clientX - 80
    y.value = event.clientY - 60
    isToastShow.value = true
}

onMounted(() => {
    if (buttonRef.value) {
        buttonRef.value.addEventListener('click', addCartItem)
    }
})

onUnmounted(() => {
    if (buttonRef.value) {
        buttonRef.value.removeEventListener('click', addCartItem)
    }
})
</script>

<template>
    <div class="AddButton">
        <button
            class="AddButton__button"
            :class="[
                {
                    'AddButton__button--disabled':
                        isDisabled || cartStore.hasItem(id),
                },
            ]"
            ref="buttonRef"
        >
            <img class="AddButton__icon" :src="cartIcon" alt="" />
            <span class="AddButton__text">
                <template v-if="!cartStore.hasItem(id)"
                    >カートに入れる</template
                >
                <template v-else>カート追加済み</template>
            </span>
        </button>
        <Toast
            text="カートに追加しました"
            color="green"
            :x="x"
            :y="y"
            v-model:isShow="isToastShow"
        />
    </div>
</template>

<style lang="scss" scoped>
.AddButton {
    &__button {
        position: fixed;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        width: 250px;
        padding: 8px 0;
        border-radius: 10px;
        background-color: #ffa41c;
        border: 1px solid #f79c14;
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 8px;
        font-size: 18px;
        box-shadow: 1px 0 7px rgba(0, 0, 0, 0.15);

        &:not(&--disabled):hover {
            background-color: #fa8900;
            border-color: #fa8900;
        }

        &--disabled {
            background-color: #ccc;
            cursor: default;
            pointer-events: none;
            border-color: #bbb;
        }
    }

    &__icon {
        $size: 24px;
        width: $size;
        height: $size;
    }
}
</style>
