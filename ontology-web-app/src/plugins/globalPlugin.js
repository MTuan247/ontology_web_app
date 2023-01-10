import { vuetify } from './vuetify.js'
import { router } from './router.js';
import mitt from 'mitt';
import { vfmPlugin, $vfm } from 'vue-final-modal';

export const registerPlugin = (app) => {

  const emitter = mitt();
  app.config.globalProperties.$eventBus = emitter;
  app.config.globalProperties.$popup = $vfm;

  app.use(vuetify);
  app.use(router);
  app.use(vfmPlugin);
}