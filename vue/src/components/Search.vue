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
            class="Search__input"
            type="text"
            placeholder="検索ワードを入力"
            v-model="searchWord"
        />
        <button class="Search__button" @click="search()">
            <img class="Search__icon" :src="IconSearch" alt="" />
        </button>
    </div>
</template>

<style lang="scss">
.Search {
    position: relative;

    $size: 24px;

    &__button {
        position: absolute;
        top: 50%;
        right: 16px;
        transform: translateY(-50%);
        width: $size;
        height: $size;

        &:hover {
            opacity: 0.9;
        }
    }

    &__icon {
        width: $size;
        height: $size;
    }
}
</style>
