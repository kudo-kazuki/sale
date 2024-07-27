<script setup lang="ts">
import arrowL from '@/assets/icons/arrowL.svg'
import arrowR from '@/assets/icons/arrowR.svg'

interface Props {
    num?: number
    isActive?: boolean
    isOmission?: boolean
    isPrev?: boolean
    isNext?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    num: 1,
})
</script>

<template>
    <span
        v-if="isActive || isOmission"
        class="PaginationItem"
        :class="{
            'PaginationItem--active': isActive,
            'PaginationItem--omission': isOmission,
        }"
    >
        <span v-if="!isOmission && num" class="PaginationItem__num">{{
            num
        }}</span>
        <span v-if="isOmission">…</span>
    </span>
    <button
        v-else
        class="PaginationItem"
        :aria-label="isPrev ? '前へ' : isNext ? '次へ' : ''"
    >
        <span v-if="!isPrev && !isNext && num" class="PaginationItem__num">{{
            num
        }}</span>
        <img
            v-if="isPrev || isNext"
            class="PaginationItem__icon"
            :src="isPrev ? arrowL : isNext ? arrowR : ''"
            :alt="isPrev ? '前へ' : isNext ? '次へ' : ''"
        />
    </button>
</template>

<style lang="scss" scoped>
.PaginationItem {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    font-size: 14px;
    color: $text-color1;
    background-color: #fff;
    border: 1px solid #bfbfbf;
    border-radius: 2px;

    &:hover:not(&--active) {
        cursor: pointer;
        background-color: #f1f1f1;
    }

    &--active {
        color: #fff;
        background-color: #2667d7;
        border: none;
    }

    &--omission {
        pointer-events: none;
        border: none;

        &:hover {
            cursor: default;
            background-color: transparent;
        }
    }

    &__icon {
        width: 24px;
        height: 24px;
    }
}
</style>
