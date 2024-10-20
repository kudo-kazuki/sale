<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Button from '@/components/Button.vue'

const authStore = useAuthStore()

const errorMessage = ref('')

const logout = async () => {
    try {
        await authStore.logout()
    } catch (error) {
        errorMessage.value = 'ログアウトに失敗しました。'
    }
}
</script>

<template>
    <section class="Page">
        <h1>管理ページ</h1>
        <p>ようこそ、{{ authStore.username }}さん。</p>

        <Button
            @click.orevent="logout()"
            class="Page__logoutButton"
            text="ログアウト"
            size="m"
            color="blue"
        />

        <ul>
            <li><router-link to="/admin/orders">注文一覧</router-link></li>
        </ul>
    </section>
</template>

<style lang="scss" scoped>
.Page {
    @include page;

    & &__logoutButton {
        display: block;
        margin: 12px auto;
    }
}
</style>
