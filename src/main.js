import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import './styles/global.css'
import './assets/iconfont/iconfont.css'
// element 无限滚动指令
import InfiniteScroll from "element-plus"

const app = createApp(App)



app.use(router)
app.use(store)
app.use(InfiniteScroll)



// 这个放在最后面
app.mount('#app')
