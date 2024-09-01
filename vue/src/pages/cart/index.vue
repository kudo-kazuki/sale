<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { updateMeta } from '@/utils/meta'
import { CartItem, BreadcrumbsItem } from '@/types'
import Breadcrumbs from '@/components/Breadcrumbs.vue'

updateMeta('カート', 'カート')

const breadcrumbsItems = ref<Array<BreadcrumbsItem>>([
    {
        text: 'カート',
    },
])

const cartStore = useCartStore()
console.log('cartStore.items', cartStore.items)

const noImage =
    'https://placehold.jp/24/cccccc/ffffff/500x400.png?text=No Image'
</script>

<template>
    <section class="Page">
        <Breadcrumbs
            v-if="breadcrumbsItems && breadcrumbsItems.length"
            :items="breadcrumbsItems"
        />
        <h1>カート</h1>
        <template v-if="cartStore.items.length">
            <ul class="">
                <li v-for="item in cartStore.items" :key="item.id">
                    <div>
                        <img :src="item.image ? item.image : noImage" alt="" />
                    </div>
                    <div>
                        {{ item.name }}
                    </div>
                </li>
            </ul>
        </template>
        <div v-else>カートには何も入っていません</div>
    </section>
</template>

<style lang="scss" scoped>
.Page {
    @include page;
}
</style>
