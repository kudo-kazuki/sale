<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import IconSearch from '@/assets/icons/search.svg'

const searchWord = ref('')
const router = useRouter()
const search = () => {
    router.push({ name: 'search', query: { q: searchWord.value } })
}
</script>

<template>
    <div class="Search">
        <input
            type="text"
            placeholder="検索ワードを入力"
            v-model="searchWord"
        />
        <button @click="search()">
            <img :src="IconSearch" alt="" />
        </button>
    </div>
</template>

<style lang="scss">
.Search {
}
</style>
