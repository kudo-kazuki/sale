<script setup lang="ts">
import Search from '@/components/Search.vue'
</script>

<template>
    <header class="Header">
        <div class="Header__wrap">
            <nav class="Header__logo">
                <router-link to="/">Home</router-link>
            </nav>
            <Search />
        </div>
    </header>
</template>

<style lang="scss" scoped>
.Header {
    &__wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px;
    }

    &__logo {
        font-size: 24px;
        font-weight: bold;
    }
}
</style>
