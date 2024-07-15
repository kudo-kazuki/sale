<script setup lang="ts">
import { useCategoryStore } from '@/stores/categories'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const categoryStore = useCategoryStore()
categoryStore.fetchCategories()
</script>

<template>
    <div>
        <Header />
        <main><router-view /></main>
        <Footer />
    </div>
</template>

<style lang="scss"></style>
