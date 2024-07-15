<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axiosInstance from '@/axiosConfig'
import { Post } from '@/types'

const posts = ref<Array<Post>>([])

onMounted(async () => {
    try {
        const response = await axiosInstance.get<Post[]>('posts')
        posts.value = response.data
        console.log(posts.value)
    } catch (error) {
        console.error('Error fetching WordPress posts:', error)
    }
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
    }
}
</style>
