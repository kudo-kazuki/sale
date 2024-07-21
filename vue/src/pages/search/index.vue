<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchPosts } from '@/utils/fetchPosts'
import { formatDate } from '@/utils/dateFormatter'
import { Post } from '@/types'

const route = useRoute()
const posts = ref<Array<Post>>([])
const searchWord = (route.query.q as string) || ''

const fetchAndSetPosts = async () => {
    const options = {
        searchWord: route.query.q as string,
        perPage: 5,
    }
    posts.value = await fetchPosts(options)

    console.log('searchWord', searchWord)
    console.log('posts', posts.value)
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
            fetchAndSetPosts()
        }
    },
)
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
    </div>
</template>

<style lang="scss" scoped>
h1 {
    color: $primary-color; // これは variables.scss の変数を使っています
}
</style>
