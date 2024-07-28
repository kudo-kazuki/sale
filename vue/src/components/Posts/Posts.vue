<script setup lang="ts">
import { Post } from '@/types'
import PostItem from '@/components/Posts/PostItem.vue'
import Loading from '@/components/Loading.vue'

interface Props {
    posts: Array<Post>
    column?: number
    isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    column: 5,
})
</script>

<template>
    <div class="Posts" :class="{ 'Posts--loading': isLoading }">
        <ul
            v-if="posts && posts.length"
            class="Posts__items"
            :style="{ '--columns': column }"
        >
            <li v-for="post in posts" :key="post.id" class="Posts__item">
                <PostItem v-bind="post" />
            </li>
        </ul>
        <p v-if="(!posts || !posts.length) && !isLoading" class="Posts__noText">
            お探しのものは見つかりませんでした
        </p>
        <Loading v-if="isLoading" class="Posts__loading" />
    </div>
</template>

<style lang="scss" scoped>
.Posts {
    position: relative;
    height: 100%;
    overflow: auto;

    &__items {
        display: grid;
        gap: 16px;
        grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
    }

    &--loading &__items {
        opacity: 0.6;
        pointer-events: none;
    }

    &__noText {
        text-align: center;
        font-size: 18px;
        padding: 20px;
    }

    &__loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
    }

    @media (max-width: 767px) {
        &__items {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
        }
    }
}
</style>
