<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    text: string
    href?: string
    isBlank?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    isBlank: true,
})

const tag = computed(() => {
    return props.href ? 'router-link' : 'span'
})
</script>

<template>
    <component
        :is="tag"
        class="CircleLinkItem"
        :to="href"
        :target="isBlank ? '_blank' : ''"
        >{{ text }}</component
    >
</template>

<style lang="scss" scoped>
.CircleLinkItem {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    color: #454545;
    border: 1px solid #333;
    border-radius: 10px;
    font-size: 12px;
    padding: 1px 5px;
}
</style>
