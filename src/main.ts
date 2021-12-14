import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import Vant from 'vant'
import 'vant/lib/index.css'
import '@/assets/style/mixin.scss'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $filters: any
    }
}

const app = createApp(App)

app.config.globalProperties.$filters = {
    prefix(url: string) {
        if (url && url.startsWith('http')) {
            return url
        } else {
            url = `http://backend-api-01.newbee.ltd${url}`
            return url
        }
    }
}

app.use(router).use(store).use(Vant).mount('#app')
