import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './main.css'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import { pinia } from './store/pinia.ts'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueQueryPlugin, {queryClient:new QueryClient})
app.mount('#app')
