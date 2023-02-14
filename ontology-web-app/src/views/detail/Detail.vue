<template>
  <div class="detail-container">
    <a-spin v-if="loading" tip="Loading..." size="large"/>
    <a-row v-else>
      <a-col :span="24">
        <a-row style="margin-bottom: 20px; align-items: center; cursor: pointer;" @click="navigateBack()">
          <img :src="BackIcon" style="width: 40px;" />
          Back
        </a-row>
      </a-col>
      <a-col :span="12">
        <img :src="data.imgUri.value" style="width: 100%; max-width: 400px;"/>
      </a-col>
      <a-col :span="12">
        <a-row justify="space-between">
          <a-col style="font-weight: bold">Title</a-col>
          <a-col>{{ data.label.value }}</a-col>
          <a-divider />
        </a-row>

        <a-row justify="space-between">
          <a-col style="font-weight: bold">Price</a-col>
          <a-col>aaaaaa</a-col>
          <a-divider />
        </a-row>

        <a-row justify="space-between">
          <a-col style="font-weight: bold">Title</a-col>
          <a-col>aaaaaa</a-col>
          <a-divider />
        </a-row>

        <a-row justify="space-between">
          <a-col style="font-weight: bold">Title</a-col>
          <a-col>aaaaaa</a-col>
          <a-divider />
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { onBeforeMount } from '@vue/runtime-core';
import phoneApi from '@/js/api/phone/PhoneApi.js';
import { ref } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { router } from '@/plugins/router.js';
import dataJson from '@/views/search/queryResults.json';
import BackIcon from '@/assets/back.svg'

const queryMobile = `PREFIX ex: <http://semweb.edu.vn/example#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

select *
where {?s rdfs:subClassOf ex:mobilePhone}`

export default {
  name: 'DetailComponent',
  components: {
},
  setup() {
    const route = useRoute();
    const url = ref(route.query.url);

    const data = ref(dataJson.results.bindings[0]);
    const isLoading = ref(true);

    const buildQueryPhone = () => `PREFIX ex: <http://semweb.edu.vn/example#>
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          ${{ url }}
          `

    const loadData = async () => {
      isLoading.value = true;
      const formData = new FormData();
      formData.append('query', queryMobile);

      try {
        const res = await phoneApi.searchPhone({
          query: buildQueryPhone(),
        });
        data.value = res;
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

    const navigateSearch = (keyword) => {
      router.push({ path: '/', query: {
        keyword,
      }})
    }

    const navigateBack = () => {
      console.log(222222);
      router.go(-1);
    } 
    
    return {
      navigateSearch,
      data,
      BackIcon,
      navigateBack,
    };
  },
};
</script>

<style lang="scss">
@import '@/scss/base/button.scss';
.detail-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>