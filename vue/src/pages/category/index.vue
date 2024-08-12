<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { fetchPosts } from '@/utils/fetchPosts'
import { useCategoryStore } from '@/stores/categories'
import { Post, Category, BreadcrumbsItem } from '@/types'
import Pagination from '@/components/Pagination/Pagination.vue'
import Posts from '@/components/Posts/Posts.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'

const categoryInfo = ref<Category>()
const categoryStore = useCategoryStore()
const breadcrumbsItems = ref<Array<BreadcrumbsItem>>([])
categoryStore.fetchCategories().then(() => {
    categoryInfo.value = categoryStore.categories.find(
        (category) => category.id === Number(categoryId),
    )
    if (categoryInfo.value) {
        breadcrumbsItems.value.push({
            text: categoryInfo.value?.name,
        })
    }
})

const route = useRoute()
const categoryId = route.params.id as string

const posts = ref<Array<Post>>([])
const isLoading = ref(false)

const total = ref(0)
const currentPage = ref(1)
const MAX_DISPLAY_PAGES = 5
const ITEMS_PER_PAGE = 10

const fetchAndSetPosts = async () => {
    if (isLoading.value) {
        return false
    }

    isLoading.value = true
    const options = {
        categories: [Number(categoryId)],
        perPage: ITEMS_PER_PAGE,
        page: currentPage.value,
    }
    const result = await fetchPosts(options)
    posts.value = result.posts
    total.value = result.total

    await nextTick()
    isLoading.value = false

    console.log('posts', posts.value)
    console.log('total', total.value)
}

fetchAndSetPosts().catch((error) => console.error(error))

watch(
    () => route.params.id,
    (newId) => {
        if (newId) {
            console.log('newId', newId)
            currentPage.value = 1
            fetchAndSetPosts()
        }
    },
)

const movePage = (pageNumber: number) => {
    currentPage.value = pageNumber
    fetchAndSetPosts()
}
</script>

<template>
    <section class="Page">
        <Breadcrumbs
            v-if="breadcrumbsItems && breadcrumbsItems.length"
            :items="breadcrumbsItems"
        />
        <h1 v-if="categoryInfo">カテゴリー「{{ categoryInfo.name }}」の一覧</h1>
        <Posts :posts="posts" :isLoading="isLoading" />
        <Pagination
            :currentPage="currentPage"
            :maxDisplayPages="MAX_DISPLAY_PAGES"
            :itemsPerPage="ITEMS_PER_PAGE"
            :total="total"
            @onClick:pageNumber="movePage"
        />
    </section>
</template>

<style lang="scss" scoped>
.Page {
    @include page;
}
</style>
