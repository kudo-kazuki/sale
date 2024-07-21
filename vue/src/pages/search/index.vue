<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import axiosInstance from '@/axiosConfig'
import { useRoute } from 'vue-router'
import { Post } from '@/types'

const route = useRoute()
const posts = ref<Array<Post>>([])
const searchWord = route.query.q as string
console.log('searchWord', searchWord)

const fetchPosts = async (searchWord: string) => {
    try {
        const response = await axiosInstance.get<Post[]>(
            `posts?search=${searchWord}`,
        )
        posts.value = response.data
        console.log(posts.value)
    } catch (error) {
        console.error('Error fetching WordPress posts:', error)
    }
}

// 初回の検索を実行
onMounted(async () => {
    fetchPosts(searchWord)
})

// クエリパラメータの変更を監視して再検索を実行
watch(
    () => route.query.q,
    (newQuery) => {
        if (newQuery) {
            fetchPosts(newQuery as string)
        }
    },
)
</script>

<template>
    <div class="Page">
        <h1>search</h1>
        <ul>
            <li v-for="post in posts" :key="post.id">
                <router-link :to="`/detail/${post.id}`">{{
                    post.title.rendered
                }}</router-link>
            </li>
        </ul>
    </div>
</template>

<style lang="scss"></style>
