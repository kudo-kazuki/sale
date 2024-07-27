<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchPosts } from '@/utils/fetchPosts'
import { Post } from '@/types'

const posts = ref<Array<Post>>([])

const fetchAndSetPosts = async () => {
    posts.value = await fetchPosts()
    console.log('posts', posts.value)
}

// 初回の検索を実行
onMounted(() => {
    fetchAndSetPosts().catch((error) => console.error(error))
})
</script>

<template>
    <div class="Page">
        <h1>index</h1>
        <ul>
            <li v-for="post in posts" :key="post.id">
                <router-link :to="`/detail/${post.id}`">{{
                    post.title.rendered
                }}</router-link>
            </li>
        </ul>
    </div>
</template>

<style lang="scss">
.Page {
    h1 {
        font-size: 86px;
        margin: 10px;
        display: flex;
    }
}
</style>
