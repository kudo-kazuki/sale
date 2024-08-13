<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'
const settingsStore = useSettingsStore()
</script>

<template>
    <footer class="Footer">@{{ settingsStore.siteTitle }}</footer>
</template>

<style lang="scss" scoped>
.Footer {
    background-color: #333;
    text-align: center;
    color: #fff;
    padding: 4px;
    font-size: 12px;
}
</style>
