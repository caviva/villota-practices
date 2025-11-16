/**
 * Ponto de entrada da aplicação Vue
 * Configura e monta a aplicação com router e estilos
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import './assets/prism.css'

const app = createApp(App)

app.use(router)
app.mount('#app')
