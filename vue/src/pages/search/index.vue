<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchPosts } from '@/utils/fetchPosts'
import { formatDate } from '@/utils/dateFormatter'
import { Post } from '@/types'
import Pagination from '@/components/Pagination/Pagination.vue'

const route = useRoute()
const posts = ref<Array<Post>>([])

const total = ref(0)
const currentPage = ref(1)
const MAX_DISPLAY_PAGES = 5
const ITEMS_PER_PAGE = 5

const fetchAndSetPosts = async () => {
    const options = {
        searchWord: (route.query.q as string) || '',
        perPage: ITEMS_PER_PAGE,
        page: currentPage.value,
    }
    const result = await fetchPosts(options)
    posts.value = result.posts
    total.value = result.total

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
    <div class="Page">
        <h1>検索結果</h1>
        <ul>
            <li v-for="post in posts" :key="post.id">
                <router-link :to="`/detail/${post.id}`"
                    >{{ post.title.rendered }}
                    <time><br />投稿日: {{ formatDate(post.date) }}</time>
                    <img
                        v-if="post.featured_media_details"
                        :src="post.featured_media_details.source_url"
                        alt=""
                /></router-link>
            </li>
        </ul>

        <Pagination
            :currentPage="currentPage"
            :maxDisplayPages="MAX_DISPLAY_PAGES"
            :itemsPerPage="ITEMS_PER_PAGE"
            :total="total"
            @onClick:pageNumber="movePage"
        />
    </div>
</template>

<style lang="scss" scoped>
h1 {
    color: $primary-color; // これは variables.scss の変数を使っています
}
</style>
