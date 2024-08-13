<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useCategoryStore } from '@/stores/categories'
import { useSettingsStore } from '@/stores/settings'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { axiosInstance2 } from '@/axiosConfig'

const categoryStore = useCategoryStore()
categoryStore.fetchCategories()

const appRef = ref<HTMLElement | null>(null)
const setAppHeight = () => {
    if (appRef.value) {
        appRef.value.style.height = `${window.innerHeight}px`
    }
}
onMounted(() => {
    setAppHeight()
    window.addEventListener('resize', setAppHeight)
})
onUnmounted(() => {
    window.removeEventListener('resize', setAppHeight)
})

//サイトタイトルの取得
const settingsStore = useSettingsStore()
axiosInstance2.get(`/wp-json/custom/v2/site-title`).then((response) => {
    // 取得したサイトタイトルをstoreに設定
    settingsStore.siteTitle = String(response.data)
})
</script>

<template>
    <div class="App" ref="appRef">
        <Header />
        <main class="App__main"><router-view /></main>
        <Footer />
    </div>
</template>

<style lang="scss" scoped>
.App {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;

    &__main {
        height: 100%;
        overflow: auto;
    }
}
</style>
