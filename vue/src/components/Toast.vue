<script setup lang="ts">
interface Props {
    text: string
    color?: 'blue' | 'green' | 'gray' | 'red' | 'orange'
    icon?: string
    x: number
    y: number
}

const props = withDefaults(defineProps<Props>(), {
    color: 'green',
})

const isShow = defineModel('isShow', { type: Boolean, default: false })

const TIME = 500
const handleAfterEnter = () => {
    setTimeout(() => {
        isShow.value = false
    }, TIME)
}
</script>

<template>
    <transition name="fade" @after-enter="handleAfterEnter">
        <div
            v-if="isShow"
            class="Toast"
            :class="[`Toast--${color}`]"
            :style="{ top: `${y}px`, left: `${x}px` }"
        >
            <img v-if="icon" class="Toast__icon" :src="icon" alt="" />
            {{ text }}
        </div>
    </transition>
</template>

<style lang="scss" scoped>
$color-styles: (
    'blue': (
        'border-color': #175bda,
        'color': #111,
    ),
    'green': (
        'border-color': #25b413,
        'color': #111,
    ),
    'red': (
        'border-color': red,
        'color': #640000,
    ),
);

.Toast {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 12px;
    font-size: 15px;
    background-color: #fff;
    border: 3px solid #000;
    border-radius: 4px;

    @each $color, $style in $color-styles {
        &--#{$color} {
            color: map-get($style, 'color');
            border-color: map-get($style, 'border-color');
        }
    }
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
</style>
