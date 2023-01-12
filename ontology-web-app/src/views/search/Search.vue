<template>
  <div class="search-container">
    <a-row justify="space-between" align="center">
      <a-col class="keyword">
        Kết quả tìm kiếm cho: {{ searchKey }}
      </a-col>
      <a-col>
        <SearchTemplate />
      </a-col>
    </a-row>

     <a-table class="mt-12" :columns="columns" :row-key="record => record.key" :data-source="data">
      <!-- <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a>
            {{ record.name }}
          </a>
        </template>
      </template> -->
    </a-table>
  </div>
</template>

<script>
import { onBeforeMount } from '@vue/runtime-core';
import {  watch } from 'vue';
import phoneApi from '@/js/api/phone/PhoneApi.js';
import SearchTemplate from '@/components/Search.vue';
import { ref } from '@vue/reactivity';
import { useRoute } from 'vue-router';

const columns = [
  {
    title: 'EX: S',
    dataIndex: 's',
    key: 's',
  },
  {
    title: 'EX: P',
    dataIndex: 'p',
    key: 'p',
    responsive: ['md'],
  },
  {
    title: 'EX: O',
    dataIndex: 'o',
    key: 'o',
    responsive: ['lg'],
  },
];

const data = [
  {
    key: '1',
    s: 'IPhone 7',
    o: 'OP',
    p: 'OS',
  },
  {
    key: '2',
    s: 'IPhone 12',
    o: 'OP',
    p: 'OS',
  },
  {
    key: '3',
    s: 'IPhone 1',
    o: 'OP',
    p: 'OS',
  },
  {
    key: '4',
    s: 'IPhone 2',
    o: 'OP',
    p: 'OS',
  },
];

export default {
  name: 'SearchView',
  components: {
    SearchTemplate,
  },
  setup() {
    const route = useRoute();
    const loadData = async () => {
      var res = await phoneApi.get();
      return res;
    };

    const searchKey = ref(route.query.keyword);

    onBeforeMount(async () => {
      await loadData();
    });
    
     watch(() => route.query.keyword, () => {
        console.log(route.query.keyword);
        searchKey.value = route.query.keyword
      });

    return {
      searchKey,
      route,
      columns,
      data,
    };
  },
};
</script>

<style lang="scss">
.search-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px;
}
.keyword {
  font-weight: bold;
  font-size: 16;
}
.mt-12 {
  margin-top: 12;
}
</style>