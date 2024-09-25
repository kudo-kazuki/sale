<script setup lang="ts">
import { ref } from 'vue'
import { updateMeta } from '@/utils/meta'
import { BreadcrumbsItem } from '@/types'
import Breadcrumbs from '@/components/Breadcrumbs.vue'

updateMeta('注文完了', '注文完了')

const breadcrumbsItems = ref<Array<BreadcrumbsItem>>([
    {
        text: 'カート',
        href: '/cart/',
    },
    {
        text: '注文完了',
    },
])
</script>

<template>
    <section class="Page">
        <Breadcrumbs
            v-if="breadcrumbsItems && breadcrumbsItems.length"
            :items="breadcrumbsItems"
        />
        <h1>注文完了</h1>
        <p>
            ご注文いただき誠にありがとうございます。<br />後程ご連絡させていただきますので今しばらくお待ちください。
        </p>
    </section>
</template>

<style lang="scss" scoped>
.Page {
    @include page;

    height: auto;
}
</style>
