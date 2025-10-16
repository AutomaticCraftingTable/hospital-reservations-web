import { createApp } from 'vue'
import '$src/styles.css'
import App from '$src/App.vue'
import router from '$src/router'

createApp(App).use(router).mount('#app')
