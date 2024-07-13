import { createWebHistory, createRouter } from 'vue-router';
import Welcome from '../views/Welcome.vue';
import Chat from '../views/Chat.vue';
import store from '../store/pinia';

const routes = [
    {
        path: '/',
        component: Welcome,
        name: 'Welcome',
        meta: {
            title: 'Welcome...',
            public: true
        }
    },
    {
        path: '/chat',
        component: Chat,
        name: 'Chat',
        beforeEnter: (to, from, next) => {
            const _store = store();
            if (_store.currentUser) {
                next();
            } else {
                next('/')
            }
        },
        meta: {
            title: 'Chat',
            public: true
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `Chat App | ${to.meta.title}`;
    next();
});

export default router;