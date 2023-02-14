<template>
  <div class="search-container">
    <a-row style="align-items: center; justify-content: flex-start;">
      <SearchTemplate />
      <div style="flex: 1;"></div>
    </a-row>
    <a-row class="mt-8">
      Kết quả tìm kiếm theo liên kết: 
      <div class="keyword ml-2">{{ searchKey }}</div>
      <div class="btn-icon ml-2" v-if="searchKey" @click="loadData()"><CloseCircleTwoTone /></div>
    </a-row>

    <a-row class="mt-8" :gutter="[24,24]">
      <a-col :span="6" v-for="phone in data" :key="phone.phone.value" @click="navigateDetailRoute(phone.phone.value)">
        <a-card hoverable style="width: 100%">
          <template #cover>
            <img alt="example" :src="phone.imgUri.value" />
          </template>
          <a-card-meta :title="phone.label.value">
            <template #description></template>
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { onBeforeMount } from '@vue/runtime-core';
import {  watch } from 'vue';
import phoneApi from '@/js/api/phone/PhoneApi.js';
import { ref } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import SearchTemplate from '@/components/Search.vue';
import { CloseCircleTwoTone } from '@ant-design/icons-vue';
import { router } from '@/plugins/router.js';
import dataJson from './queryResults.json';

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
    CloseCircleTwoTone,
},
  setup() {
    const route = useRoute();
    const searchKey = ref(route.query.keyword);
    const phoneType = ref(route.query.phoneType);
    const phonePriceFrom = ref(route.query.phonePriceFrom);
    const phonePriceTo = ref(route.query.phonePriceTo);

    const data = ref(dataJson.results.bindings);
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

    const buildQueryPhone = () => `PREFIX ex: <http://semweb.edu.vn/example#>
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

          SELECT DISTINCT ?phone ?label ?imgUri
          WHERE {
            ?phone rdfs:subClassOf ex:mobilePhone .
            ?phone ex:label ?label .
            ?phone ex:image ?imgUri .
            
            ?phone ?p ?o .
            BIND(REPLACE(STR(?phone), "\\\\W", "", "i") AS ?s2)
            BIND(REPLACE(STR(?o), "\\\\W", "", "i") AS ?o2)
            FILTER (regex(str(?o2), "${searchKey.value.replace(/\W/g, '')}", "i") || regex(str(?s2), "${searchKey.value.replace(/\W/g, '')}", "i"))
          } 
          ORDER BY ASC(?label)`

    const loadData = async (currentURI) => {
      isLoading.value = true;
      const formData = new FormData();
      formData.append('query', queryMobile);

      try {
        const res = await phoneApi.searchPhone({
          query: currentURI ? formatUri(currentURI) : buildQueryPhone(),
        });
        data.value = res.data.results.bindings;
        searchKey.value = currentURI?.split("#")[1];
      } catch (error) {
        console.log(error);
      }

      isLoading.value = false
    };

    onBeforeMount(async () => {
    //   const script = document.createElement('script');
    //   script.setAttribute('type', 'application/ld+json');
    //   script.textContent = `{
    //   "@context": "https://schema.org/",
    //   "@type": "Recipe",
    //   "name": "Party Coffee Cake",
    //   "author": {
    //     "@type": "Person",
    //     "name": "Mary Stone"
    //   },
    //   "datePublished": "2018-03-10",
    //   "description": "This coffee cake is awesome and perfect for parties.",
    //   "prepTime": "PT20M"
    // }`;
    //   document.head.appendChild(script);
      loadData();
    });

    const navigateDetailRoute = (url) => {
      router.push({ path: '/detail', query: {
        url,
      }})
    }
    
    watch(() => route.query, () => {
      searchKey.value = route.query.keyword;
      phoneType.value = route.query.phoneType;
      phonePriceFrom.value = route.query.phonePriceFrom;
      phonePriceTo.value = route.query.phonePriceTo;
      loadData();
    });
    
    return {
      searchKey,
      route,
      columns,
      data,
      loadData,
      isLoading,
      navigateDetailRoute
    };
  },
};
</script>

<style lang="scss">
@import '@/scss/base/button.scss';
.search-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 16px;
}
.keyword {
  font-weight: bold;
  font-size: 16;
}
.mt-8 {
  margin-top: 8;
}
.link {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}

.btn-icon {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>