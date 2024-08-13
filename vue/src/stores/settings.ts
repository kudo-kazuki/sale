import { defineStore } from 'pinia'

interface settingsStore {
    siteTitle: string
}

export const useSettingsStore = defineStore('settingsStore', {
    state: (): settingsStore => ({
        siteTitle: '',
    }),
    actions: {},
})
