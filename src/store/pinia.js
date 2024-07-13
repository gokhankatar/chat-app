import { defineStore } from "pinia";

const store = defineStore('piniaStore', {
    state() {
        return {
            theme: 'light',
            currentUser: null
        }
    },
    actions: {
        changeTheme() {
            this.theme === 'dark'
                ? this.theme = 'light'
                : this.theme = 'dark'
        },
        setUser(name) {
            this.currentUser = name;
        },
        clearUser() {
            this.currentUser = null;
        }
    },
    persist: true
});

export default store;