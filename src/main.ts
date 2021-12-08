import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible'
import Vant from 'vant'
import 'vant/lib/index.css'
import '@/assets/style/mixin.scss'

createApp(App).use(router).use(Vant).mount('#app')
