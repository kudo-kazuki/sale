<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'
import Search from '@/components/Search.vue'
import cartIcon from '@/assets/icons/cart.svg'

const settingsStore = useSettingsStore()
const route = useRoute()

const isCartActive = computed(() => {
    return route.path === '/cart'
})
</script>

<template>
    <header class="Header">
        <div class="Header__wrap">
            <nav class="Header__logo">
                <router-link class="Header__logoText" to="/">{{
                    settingsStore.siteTitle
                }}</router-link>
            </nav>
            <Search />
            <router-link
                class="Header__cart"
                :class="[{ 'Header__cart--active': isCartActive }]"
                to="/cart"
            >
                <img class="Header__cartIcon" :src="cartIcon" alt="" />
                <span class="Header__cartText">カート</span>
            </router-link>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.Header {
    border-bottom: 1px solid #ccc;

    &__wrap {
        display: flex;
        align-items: center;
        padding: 12px;
        column-gap: 16px;
    }

    &__logo {
        font-size: 24px;
        font-weight: bold;
    }

    &__logoText {
        color: #333;
        text-decoration: none;
        font-family: '游明朝', 'Yu Mincho', YuMincho, 'Hiragino Mincho Pro',
            serif;
    }

    &__cart {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #333;
        column-gap: 4px;
        margin-left: auto;

        &:hover,
        &--active {
            opacity: 0.8;
        }
    }

    &__cartIcon {
        $size: 32px;
        width: $size;
        height: $size;
    }

    &__cartText {
        font-size: 20px;
    }
}
</style>
