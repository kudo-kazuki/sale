<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axiosInstance from '@/axiosConfig'
import { Post } from '@/types'
import { updateMeta } from '@/utils/meta'

const route = useRoute()
const post = ref<Post | null>(null)

const fetchPost = async (postId: string) => {
    try {
        const response = await axiosInstance.get<Post>(`posts/${postId}`)
        post.value = response.data
        updateMeta(
            response.data.title.rendered,
            response.data.content.rendered.substring(0, 150),
        )
    } catch (error) {
        console.error('Error fetching post:', error)
    }
}

onMounted(() => {
    const postId = route.params.id as string
    fetchPost(postId)
})

watch(
    () => route.params.id,
    (newId) => {
        if (newId) {
            fetchPost(newId as string)
        }
    },
)
</script>

<template>
    <article>
        <h1>{{ post ? post.title.rendered : '' }}</h1>
        <div v-if="post">
            <div v-html="post.content.rendered"></div>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </article>
</template>
