import { createApp } from 'vue'

import App from './App.vue'
import * as VueRouter from "vue-router"
import routes from "./config/route";
import Vant from "vant"
import 'vant/lib/index.css'
import './global.css'


const app = createApp(App)
app.use(Vant)



// 3. 创建路由实例并传递 `routes` 配置
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。
    history: VueRouter.createWebHistory(),
    routes: routes, // `routes: routes` 的缩写
})
app.use(router)
app.mount('#app')




