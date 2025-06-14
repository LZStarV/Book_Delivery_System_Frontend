import { createApp } from 'vue';
import { createPinia } from "pinia";
import router from '@/routers/index';
import '@/assets/styles/global.scss';
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import naive from 'naive-ui'
import App from './App.vue'
import GlobalLayout from '@/Layouts/GlobalLayout.vue'

const pinia = createPinia();

const app = createApp(App)

app.component('GlobalLayout', GlobalLayout)

app
    .use(router)
    .use(pinia)
    .use(naive)
    .use(ElementPlus)
    .mount('#app')
