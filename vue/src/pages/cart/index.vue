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
</script>

<template>
    <section class="Page">
        <Breadcrumbs
            v-if="breadcrumbsItems && breadcrumbsItems.length"
            :items="breadcrumbsItems"
        />
        <h1>カート</h1>
    </section>
</template>

<style lang="scss" scoped>
.Page {
    @include page;
}
</style>
