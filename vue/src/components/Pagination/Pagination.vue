<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import PaginationItem from '@/components/Pagination/PaginationItem.vue'

interface Props {
    currentPage: number
    maxDisplayPages: number
    itemsPerPage: number
    total: number
}

const props = withDefaults(defineProps<Props>(), {
    currentPage: 1,
    maxDisplayPages: 5,
    itemsPerPage: 10,
})

const emit = defineEmits(['onClick:pageNumber'])

const currentPage = ref(props.currentPage || 1)
const maxPage = ref(Math.ceil(props.total / props.itemsPerPage))

const isPrev = computed(() => currentPage.value > 1)
const isNext = computed(() => currentPage.value < maxPage.value)

const BREAK_POINT = 767
const maxDisplayPages = ref(props.maxDisplayPages)
const isSp = ref(window.innerWidth <= BREAK_POINT)
const setMaxDisplayPages = () => {
    isSp.value = window.innerWidth <= BREAK_POINT
    maxDisplayPages.value = isSp.value ? 3 : props.maxDisplayPages
}
onMounted(() => {
    setMaxDisplayPages()
    window.addEventListener('resize', setMaxDisplayPages)
})
onUnmounted(() => {
    window.removeEventListener('resize', setMaxDisplayPages)
})

const numberRange = computed(() => {
    const numbers: Array<number> = []

    if (isSp.value) {
        if (currentPage.value <= maxDisplayPages.value) {
            for (let i = 1; i <= maxDisplayPages.value; i++) {
                if (i <= maxPage.value) {
                    numbers.push(i)
                }
            }
        } else {
            const group = Math.ceil(currentPage.value / maxDisplayPages.value)
            const start = (group - 1) * maxDisplayPages.value + 1
            for (let i = start; i < start + maxDisplayPages.value; i++) {
                if (i <= maxPage.value) {
                    numbers.push(i)
                }
            }
        }
    } else {
        if (currentPage.value <= maxDisplayPages.value) {
            for (let i = 1; i <= maxDisplayPages.value; i++) {
                if (i <= maxPage.value) {
                    numbers.push(i)
                }
            }
        } else {
            const group = Math.ceil(currentPage.value / maxDisplayPages.value)
            const start = (group - 1) * maxDisplayPages.value + 1
            for (let i = start; i < start + maxDisplayPages.value; i++) {
                if (i <= maxPage.value) {
                    numbers.push(i)
                }
            }
        }
    }

    return numbers
})

const shouldDisplayOmissionBefore = computed(() => {
    if (isSp.value) {
        return false
    }
    return currentPage.value > maxDisplayPages.value
})

const shouldDisplayOmissionAfter = computed(() => {
    if (isSp.value) {
        return false
    }
    const groups = Math.ceil(maxPage.value / maxDisplayPages.value)
    const currentPageGroup = Math.ceil(
        currentPage.value / maxDisplayPages.value,
    )

    if (currentPageGroup === groups && currentPage.value === maxPage.value) {
        return false
    }

    return currentPageGroup < groups
})

const onClick = (pageNumber: number) => {
    emit('onClick:pageNumber', pageNumber)
}

watch(
    () => props.currentPage,
    (newVal) => {
        currentPage.value = newVal
    },
)

watch(
    () => props.total,
    (newVal) => {
        maxPage.value = Math.ceil(newVal / props.itemsPerPage)
    },
)
</script>

<template>
    <nav v-if="maxPage > 1" class="Pagination">
        <div class="Pagination__numberInfo">
            {{ currentPage > 1 ? (currentPage - 1) * itemsPerPage + 1 : 1 }}-{{
                currentPage < maxPage ? currentPage * itemsPerPage : total
            }}件目（合計{{ total }}件）
        </div>
        <div class="Pagination__area">
            <PaginationItem
                class="Pagination__arrow"
                :class="{ 'Pagination__arrow--visible': isPrev }"
                :isPrev="true"
                :num="currentPage - 1"
                @click="onClick(currentPage - 1)"
            />
            <ol class="Pagination__itemList">
                <li
                    v-if="!isSp && numberRange.length && numberRange[0] !== 1"
                    class="Pagination__item"
                >
                    <PaginationItem :num="1" @click.stop="onClick(1)" />
                </li>
                <li v-if="shouldDisplayOmissionBefore" class="Pagination__item">
                    <PaginationItem isOmission />
                </li>
                <li
                    v-for="num in numberRange"
                    :key="num"
                    class="Pagination__item"
                >
                    <PaginationItem
                        :num="num"
                        :isActive="num === currentPage"
                        @click.stop="onClick(num)"
                    />
                </li>
                <li v-if="shouldDisplayOmissionAfter" class="Pagination__item">
                    <PaginationItem isOmission />
                </li>
                <li
                    v-if="
                        !isSp &&
                        numberRange.length &&
                        numberRange[numberRange.length - 1] !== maxPage
                    "
                    class="Pagination__item"
                >
                    <PaginationItem
                        :num="maxPage"
                        @click.stop="onClick(maxPage)"
                    />
                </li>
            </ol>
            <PaginationItem
                class="Pagination__arrow"
                :class="{ 'Pagination__arrow--visible': isNext }"
                :isNext="true"
                :num="currentPage + 1"
                @click="onClick(currentPage + 1)"
            />
        </div>
    </nav>
</template>

<style lang="scss" scoped>
.Pagination {
    position: relative;
    display: flex;
    justify-content: center;

    &__numberInfo {
        position: absolute;
        top: 50%;
        left: 0;
        font-size: 14px;
        color: #767676;
        transform: translateY(-50%);
    }

    &__area {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__arrow {
        visibility: hidden;

        &--visible {
            visibility: visible;
        }
    }

    &__itemList {
        display: flex;
        margin: 0 8px;
    }

    &__item {
        margin: 0;
    }

    &__item + &__item {
        margin-left: 8px;
    }

    @media (max-width: 767px) {
        flex-direction: column-reverse;
        align-items: center;

        &__numberInfo {
            position: static;
            margin-top: 8px;
            transform: translateY(0);
        }
    }
}
</style>
