<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { fetchPosts } from '@/utils/fetchPosts'
import { Post } from '@/types'
import Pagination from '@/components/Pagination/Pagination.vue'
import Posts from '@/components/Posts/Posts.vue'

const posts = ref<Array<Post>>([])
const isLoading = ref(false)

const fetchAndSetPosts = async () => {
    if (isLoading.value) {
        return false
    }

    isLoading.value = true
    const options = {
        perPage: 50,
    }
    const result = await fetchPosts(options)
    posts.value = result.posts

    await nextTick()
    isLoading.value = false
}

// 初回の検索を実行
onMounted(() => {
    fetchAndSetPosts().catch((error) => console.error(error))
})
</script>

<template>
    <div class="Page">
        <h1>TOP</h1>
        <Posts :posts="posts" :isLoading="isLoading" />
    </div>
</template>

<style lang="scss" scoped>
.Page {
    @include page;

    height: auto;
}
</style>
