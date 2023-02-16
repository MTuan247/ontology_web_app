<template>
  <a-row :gutter="[16, 16]">
    <a-col
      ><a-input v-model:value="keyword"  style="width: 300px" placeholder="Nhập từ khóa để tìm kiếm điện thoại..."
    /></a-col>
    <a-col>
      <a-button @click="search" class="ms-btn ms-btn-primary">Tìm kiếm</a-button>
    </a-col>
  </a-row>
  <a-row :gutter="[16, 16]" style="align-items: center; margin-left: 20px;">
    <a-col>Hãng điện thoại</a-col>
    <a-auto-complete
    v-model:value="phoneType"
    :options="phoneTypes"
    style="width: 200px"
    placeholder="Tất cả"
    @change="search"
    />
  </a-row>
  

  <!-- <div>
    <a-slider @change="search" range :tip-formatter="formatter" :min=100000 :max=20000000 :step=100000 v-model:value="phonePrice" />
    Giá từ <b>{{ formatter(phonePrice[0]) }}</b> đến <b>{{ formatter(phonePrice[1]) }}</b>
  </div> -->
</template>

<script>

import { ref } from '@vue/reactivity';
import { router } from '@/plugins/router.js';

export default {
  name: 'SearchTemplate',
  components: {},
  setup() {
    const keyword = ref('');
    const phoneType = ref('');
    const phonePrice = ref([500000, 30000000]);

    const search = () => {
      router.push({ path: '/', query: {
          keyword: keyword.value,
          phoneType: phoneType.value,
          // phonePriceFrom: phonePrice.value[0],
          // phonePriceTo: phonePrice.value[1],
      }})
    };

    const phoneTypes = ref([
      { value: 'Apple' },
      { value: 'Samsung' },
      { value: 'Xiaomi' },
      { value: 'realme' }
    ]);
  
    const formatter = (value) => {
      return value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    };
  
    return {
      keyword,
      search,
      phoneTypes,
      phoneType,
      phonePrice,
      formatter,
    };
  },
};
</script>

<style lang="scss">
@import '@/scss/base/button.scss';
</style>
