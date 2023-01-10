import { defineAsyncComponent } from 'vue';

import BaseInput from '@/components/base/BaseInput.vue';
import BaseCheckbox from '@/components/base/BaseCheckbox.vue';

const phoneDetail = defineAsyncComponent(() => import('@/views/popup/PhoneDetail/PhoneDetail.vue'));

export const globalComponent = (app) => {
  app.component('PhoneDetail', phoneDetail);
  app.component('BaseInput', BaseInput);
  app.component('BaseCheckbox', BaseCheckbox);
}