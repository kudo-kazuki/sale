<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useCategoryStore } from '@/stores/categories'
import { useCartStore } from '@/stores/cart'
import { CartItem, Category } from '@/types'
import CircleLinkItem from '@/components/CircleLinkItem.vue'

const categoryStore = useCategoryStore()
const cartStore = useCartStore()

interface Props extends CartItem {
    isNotDeleteButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {})

const noImage =
    'https://placehold.jp/24/cccccc/ffffff/200x200.png?text=No Image'

// カテゴリ情報を格納するための ref を定義
const categoryDetails = ref<Array<Category>>([])

// props.categories を監視して、変更があればカテゴリ情報を取得する
watch(
    () => props.categories,
    async (newCategories) => {
        if (newCategories && newCategories.length > 0) {
            try {
                // カテゴリ ID が存在する場合にのみ取得を行う
                categoryDetails.value =
                    await categoryStore.getCategoryByIds(newCategories)
                console.log('Fetched Categories:', categoryDetails.value)
            } catch (error) {
                console.error('Error fetching categories:', error)
            }
        } else {
            // props.categories が空または undefined の場合、カテゴリ情報をクリア
            categoryDetails.value = []
        }
    },
    { immediate: true },
)

// コンポーネントがマウントされたときにカテゴリ情報を取得する
onMounted(async () => {
    if (props.categories && props.categories.length > 0) {
        try {
            categoryDetails.value = await categoryStore.getCategoryByIds(
                props.categories,
            )
            console.log('Fetched Categories on Mounted:', categoryDetails.value)
        } catch (error) {
            console.error('Error fetching categories on mounted:', error)
        }
    }
})
</script>

<template>
    <div class="CartItem">
        <router-link
            class="CartItem__imageWrap"
            :to="`/detail/${id}`"
            target="_blank"
        >
            <img
                class="CartItem__image"
                :src="image ? image : noImage"
                alt=""
            />
        </router-link>
        <div class="CartItem__content">
            <p class="CartItem__name">{{ name }}</p>
            <ul v-if="categoryDetails.length" class="CartItem__categories">
                <li v-for="item in categoryDetails" :key="item.id">
                    <CircleLinkItem
                        :text="item.name"
                        :href="`/category/${item.id}`"
                    />
                </li>
            </ul>
        </div>
        <div v-if="!isNotDeleteButton" class="CartItem__button">
            <button class="CartItem__delete" @click="cartStore.deleteItem(id)">
                ×削除
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$imageW: 200px;
$imageH: 200px;
$imageWsp: 100px;
$imageHsp: 100px;

.CartItem {
    display: flex;
    align-items: center;
    width: 100%;
    column-gap: 20px;

    &__imageWrap {
        width: $imageW;
        height: $imageH;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;

        &:hover {
            opacity: 0.85;
        }
    }

    &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }

    &__content {
        display: flex;
        flex-direction: column;
        row-gap: 12px;
    }

    &__name {
        font-size: 18px;
        font-weight: bold;
        line-height: 1.4;
    }

    &__categories {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
    }

    &__button {
        margin-left: auto;
    }

    @media (max-width: 767px) {
        &__imageWrap {
            width: $imageWsp;
            height: $imageHsp;
        }
    }
}
</style>
