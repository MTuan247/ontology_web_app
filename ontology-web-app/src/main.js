import { createApp } from 'vue'
import App from './App.vue'

import { registerPlugin } from '@/plugins/globalPlugin.js'
import { globalComponent } from '@/common/globalComponent.js';

const app = createApp(App);
registerPlugin(app);
globalComponent(app);
app.mount('#app');