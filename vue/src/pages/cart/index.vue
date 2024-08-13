<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { CartItem, BreadcrumbsItem } from '@/types'
import Breadcrumbs from '@/components/Breadcrumbs.vue'

const breadcrumbsItems = ref<Array<BreadcrumbsItem>>([
    {
        text: 'カート',
    },
])
</script>

<template>
    <section class="Page">
        <Breadcrumbs
            v-if="breadcrumbsItems && breadcrumbsItems.length"
            :items="breadcrumbsItems"
        />
    </section>
</template>

<style lang="scss" scoped>
.Page {
    @include page;
}
</style>
