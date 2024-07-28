<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useCategoryStore } from '@/stores/categories'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

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
