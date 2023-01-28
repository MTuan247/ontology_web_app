<template>
  <div class="search-container">
    <a-row justify="space-between" align="center">
      <SearchTemplate />
    </a-row>

     <a-table class="mt-12" :columns="columns" :row-key="record => record.key" :data-source="data" :loading="isLoading">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 's'">
          <div @click="loadData(record?.['s']?.type == 'uri' && record['s'].value)" :class="`${record?.['s']?.type == 'uri' && 'link'}`">
            {{  record?.['s']?.type == 'uri' ? record['s'].value.split("#")[1] : record?.['s']?.value }}
          </div>
        </template>

        <template v-if="column.key === 'p'">
          <div @click="loadData(record?.['p']?.type == 'uri' && record['p'].value)" :class="`${record?.['p']?.type == 'uri' && 'link'}`">
            {{  record?.['p']?.type == 'uri' ? record['p'].value.split("#")[1] : record?.['p']?.value }}
          </div>
        </template>

        <template v-if="column.key === 'o'">
          <div @click="loadData(record?.['o']?.type == 'uri' && record['o'].value)" :class="`${record?.['o']?.type == 'uri' && 'link'}`">
            {{  record?.['o']?.type == 'uri' ? record['o'].value.split("#")[1] : record?.['o']?.value }}
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { onBeforeMount } from '@vue/runtime-core';
import {  watch } from 'vue';
import phoneApi from '@/js/api/phone/PhoneApi.js';
// import SearchTemplate from '@/components/Search.vue';
import { ref } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import SearchTemplate from '@/components/Search.vue';

const columns = [
  {
    title: 'S',
    dataIndex: 's',
    key: 's',
  },
  {
    title: 'P',
    dataIndex: 'p',
    key: 'p',
    responsive: ['md'],
  },
  {
    title: 'O',
    dataIndex: 'o',
    key: 'o',
    responsive: ['lg'],
  },
];

const queryMobile = `PREFIX ex: <http://semweb.edu.vn/example#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

select *
where {?s rdfs:subClassOf ex:mobilePhone}`

export default {
  name: 'SearchView',
  components: {
    SearchTemplate,
  },
  setup() {
    const route = useRoute();
    const searchKey = ref(route.query.keyword);
    const phoneType = ref(route.query.phoneType);
    const phonePriceFrom = ref(route.query.phonePriceFrom);
    const phonePriceTo = ref(route.query.phonePriceTo);

    const data = ref([]);
    const isLoading = ref(true);
    

    const formatUri = (uri) => {
      return (
        `PREFIX ex: <http://semweb.edu.vn/example#>
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

          select *
          where {?s ?p ?o .
          filter (?s = <${uri}> || ?o = <${uri}> || ?p = <${uri}>) .
        }`
      )
    }
    const loadData = async (currentURI) => {
      isLoading.value = true;
      const formData = new FormData();
      formData.append('query', queryMobile);
      try {
        const res = await phoneApi.searchPhone({
          query: currentURI ? formatUri(currentURI) : queryMobile,
        });
        data.value = res.data.results.bindings;
        searchKey.value = currentURI.split("#")[1];
      } catch (error) {
        console.log(error);
      }

      isLoading.value = false
    };

    onBeforeMount(async () => {
      loadData();
    });
    
    watch(() => route.query, () => {
      searchKey.value = route.query.keyword;
      phoneType.value = route.query.phoneType;
      phonePriceFrom.value = route.query.phonePriceFrom;
      phonePriceTo.value = route.query.phonePriceTo;
    });
    
    return {
      searchKey,
      route,
      columns,
      data,
      loadData,
      isLoading,
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
.link {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>