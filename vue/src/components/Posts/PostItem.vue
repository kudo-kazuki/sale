<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { Post } from '@/types'

const props = withDefaults(defineProps<Post>(), {})
</script>

<template>
    <article class="PostItem">
        <router-link class="PostItem__link" :to="`/detail/${id}`">
            <h2 class="PostItem__title">{{ title.rendered }}</h2>
            <div class="PostItem__imageWrap">
                <img
                    v-if="featured_media_details"
                    class="PostItem__image"
                    :src="featured_media_details.source_url"
                    alt=""
                />
                <img
                    v-else
                    class="PostItem__image"
                    src="https://placehold.jp/24/cccccc/ffffff/500x250.png?text=No Image"
                />
            </div>
        </router-link>
    </article>
</template>

<style lang="scss" scoped>
.PostItem {
    &__link {
        display: block;
        color: $text-color1;
        text-decoration: none;
        transition: opacity 0.2s ease;

        &:hover {
            opacity: 0.85;
        }
    }

    &__title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &__imageWrap {
        position: relative;
        width: 100%;
        height: 250px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }

    @media (max-width: 767px) {
        &__title {
            font-size: 14px;
            margin-bottom: 4px;
        }

        &__imageWrap {
            height: 160px;
        }
    }
}
</style>
