import { createApp } from 'vue';
import { createPinia } from "pinia";
import router from '@/routers/index';
import './assets/styles/global.scss';
import App from './App.vue'

const pinia = createPinia();

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')
