<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchPostById } from '@/utils/fetchPosts'
import { Post, BreadcrumbsItem } from '@/types'
import { updateMeta } from '@/utils/meta'
import { formatDate } from '@/utils/dateFormatter'
import { useCategoryStore } from '@/stores/categories'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Loading from '@/components/Loading.vue'
import AddButton from '@/components/Cart/AddButton.vue'

const categoryStore = useCategoryStore()
categoryStore.fetchCategories()

const route = useRoute()
const post = ref<Post | null>(null)
const isLoading = ref(true)
const breadcrumbsItems = ref<Array<BreadcrumbsItem>>([])

const postId = route.params.id as string

const fetchPost = async (postId: string) => {
    try {
        isLoading.value = true

        const response = await fetchPostById(postId)

        post.value = response
        console.log('post', post.value)
        updateMeta(
            post.value.title.rendered,
            post.value.content.rendered.substring(0, 150),
        )

        //パンくず生成
        breadcrumbsItems.value = []
        const categoryId =
            post.value.categories && post.value.categories?.length
                ? post.value.categories[0]
                : null
        if (categoryId) {
            const categoryInfo = categoryStore.categories.find(
                (category) => category.id === categoryId,
            )
            if (categoryInfo) {
                breadcrumbsItems.value.push({
                    text: categoryInfo.name,
                    href: `/category/${categoryId}`,
                })
            }
        }
        breadcrumbsItems.value.push({
            text: post.value.title.rendered,
        })

        isLoading.value = false
    } catch (error) {
        console.error('Error fetching post:', error)
    }
}

fetchPost(postId)

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
    <article class="Detail">
        <section class="Detail__section">
            <Breadcrumbs
                v-if="breadcrumbsItems && breadcrumbsItems.length"
                :items="breadcrumbsItems"
            />
            <h1 class="Detail__h1">{{ post ? post.title.rendered : '' }}</h1>
            <p v-if="post && post.date" class="Detail__date">
                <time>{{ post ? formatDate(post.date) : '不明' }}</time>
            </p>

            <figure
                v-if="
                    post &&
                    post.featured_media_details &&
                    post.featured_media_details.source_url
                "
                class="Detail__hero"
            >
                <img
                    class="Detail__heroImg"
                    :src="post?.featured_media_details?.source_url"
                    alt=""
                />
            </figure>

            <div v-if="post" v-html="post.content.rendered"></div>

            <AddButton />
        </section>
        <Loading v-if="isLoading" class="Detail__loading" />
    </article>
</template>

<style lang="scss" scoped>
.Detail {
    @include page;

    $contentWidth: 1300px;

    height: 100%;
    overflow: auto;

    &__section {
        width: $contentWidth;
        margin: 0 auto;
        padding-bottom: 40px;
    }

    &__h1 {
        margin: 16px 0 4px;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
    }

    &__date {
        text-align: right;
        margin-bottom: 24px;
    }

    &__hero {
        text-align: center;
        line-height: 0;
        margin: 24px 0;
    }

    &__heroImg {
        max-width: 100%;
        height: auto;
    }

    & &__loading {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    :deep(figure img) {
        max-width: 100%;
        height: auto;
    }

    @media (max-width: ($contentWidth + 20px)) {
        &__section {
            width: 100%;
        }
    }

    @media (max-width: 767px) {
        &__h1 {
            font-size: 18px;
            margin-top: 12px;
        }

        &__date {
            font-size: 12px;
            margin-bottom: 12px;
        }

        &__hero {
            margin: 12px 0;
        }
    }
}
</style>
