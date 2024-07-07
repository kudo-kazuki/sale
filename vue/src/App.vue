<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { ref, onMounted } from 'vue'
import axiosInstance from './axiosConfig'
import { Post } from './types'

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
    <div>
        <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
            <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
    </div>
    <HelloWorld msg="Vite + Vue" />

    <ul>
        <li v-for="post in posts" :key="post.id">
            <h2>{{ post.title }}</h2>
            <div v-html="post.content"></div>
        </li>
    </ul>
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
