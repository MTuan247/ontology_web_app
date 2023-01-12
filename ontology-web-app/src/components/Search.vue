<template>
  <a-row :gutter="[16, 16]">
    <a-col
      ><a-input v-model:value="keyword" placeholder="Tìm kiếm ..."
    /></a-col>
    <a-col>
      <a-button @click="search">Tìm Kiếm</a-button>
    </a-col>
  </a-row>
</template>

<script>

import { ref } from '@vue/reactivity';
import { router } from '@/plugins/router.js';

export default {
  name: 'SearchTemplate',
  components: {},
  setup() {
    const keyword = ref('');

    const search = () => {
        router.push({ path: '/search', query: {
            keyword: keyword.value
        }})
    };
  
    return {
      keyword,
      search,
    };
  },
};
</script>
