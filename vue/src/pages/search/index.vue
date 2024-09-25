<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { fetchPosts } from '@/utils/fetchPosts'
import { Post } from '@/types'
import Pagination from '@/components/Pagination/Pagination.vue'
import Posts from '@/components/Posts/Posts.vue'

const route = useRoute()
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
        searchWord: (route.query.q as string) || '',
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

// 初回の検索を実行
onMounted(() => {
    fetchAndSetPosts().catch((error) => console.error(error))
})

// クエリパラメータの変更を監視して再検索を実行
watch(
    () => route.query.q,
    (newQuery) => {
        if (newQuery) {
            console.log('newQuery', newQuery)
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
        <h1>検索結果 {{ total }}件</h1>
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

    height: auto;
}
</style>
