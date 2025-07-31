import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as elPluseIcons from "@element-plus/icons-vue"

const app = createApp(App)

app.mount('#app')
for(const [key, icon] of Object.entries(elPluseIcons)){
    app.component(key, icon)
}
