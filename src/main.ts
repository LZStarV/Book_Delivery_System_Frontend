import { createApp } from 'vue';
import { createPinia } from "pinia";
import router from '@/routers/index';
import './assets/styles/global.scss';
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import naive from 'naive-ui'
import App from './App.vue'

const pinia = createPinia();

createApp(App)
    .use(router)
    .use(pinia)
    .use(naive)
    .mount('#app')
