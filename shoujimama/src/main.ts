import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as elPluseIcons from "@element-plus/icons-vue"
import ElementPlus from "element-plus"
import { axiosConfig } from './utiles/axiosConfig'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import router from './router/index'
import routerConfig from './utiles/routerConfig'

const app = createApp(App)
axiosConfig()
routerConfig()

app.use(router).use(ElementPlus, { size: "default", locale: zhCn });
app.mount('#app')

for (const [key, icon] of Object.entries(elPluseIcons)) {
    app.component(key, icon)
}
