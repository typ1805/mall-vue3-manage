import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import router from './router'
import store from './store'

// 创建实例
const app = createApp(App)

app.use(ElementPlus, { locale })
app.use(router)
app.use(store)

app.mount('#app')
