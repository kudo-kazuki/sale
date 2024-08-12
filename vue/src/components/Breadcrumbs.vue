<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { BreadcrumbsItemProps, BreadcrumbsItem } from '@/types'

const props = withDefaults(defineProps<BreadcrumbsItemProps>(), {})

const displayItems = ref<Array<BreadcrumbsItem>>([
    {
        text: 'Home',
        href: '/',
    },
])

watch(
    () => props.items,
    (newVal) => {
        if (newVal && newVal.length) {
            displayItems.value[0].href = '/'
            props.items.forEach((item) => {
                displayItems.value.push(item)
            })
        } else {
            delete displayItems.value[0].href
        }
    },
    { immediate: true, deep: true },
)
</script>

<template>
    <nav class="Breadcrumbs">
        <ul class="Breadcrumbs__items">
            <li v-for="(item, index) in displayItems" :key="index">
                <span v-if="index > 0" class="Breadcrumbs__arrow">&gt;</span>
                <router-link
                    v-if="item.href"
                    :to="item.href"
                    class="Breadcrumbs__link"
                >
                    {{ item.text }}
                </router-link>
                <span v-else class="Breadcrumbs__text">{{ item.text }}</span>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" scoped>
.Breadcrumbs {
    &__items {
        display: flex;
    }

    &__link,
    &__text,
    &__arrow {
        color: #666;
    }

    &__link {
        &:hover {
            text-decoration: none;
        }
    }

    &__arrow {
        padding: 0 8px;
    }

    @media (max-width: 767px) {
        font-size: 11px;
    }
}
</style>
