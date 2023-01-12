import { createApp } from 'vue'
import App from './App.vue'

import { registerPlugin } from '@/plugins/globalPlugin.js'
import { globalComponent } from '@/common/globalComponent.js';

import Antd from "ant-design-vue";
import 'ant-design-vue/dist/antd.css'; 

const app = createApp(App);
registerPlugin(app);
globalComponent(app);
app.use(Antd).mount('#app');