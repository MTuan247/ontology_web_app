<template>
  <div class="search-container">
    <a-row style="align-items: center; justify-content: flex-start;">
      <SearchTemplate />
      <div style="flex: 1;"></div>
    </a-row>

    <a-spin v-if="isLoading" tip="Loading..." size="large"/>
    <a-row v-else class="mt-8" :gutter="[60,48]">
      <a-col :span="4" v-for="phone in data" :key="phone.phone.value" @click="navigateDetailRoute(phone.label.value)">
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
import { router } from '@/plugins/router.js';

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

    const buildQueryPhone = () => {
      let ns = `PREFIX ex: <http://semweb.edu.vn/example#>
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>`,
          whereClause = `?phone rdfs:subClassOf ex:mobilePhone .
            ?phone ex:label ?label .
            ?phone ex:image ?imgUri .`;

      if(searchKey.value) {
        let convertedSearchKey = searchKey.value.replace(/\W/g, '');
        whereClause += `?phone ?p ?o .
            BIND(REPLACE(STR(?phone), "\\\\W", "", "i") AS ?s2)
            BIND(REPLACE(STR(?o), "\\\\W", "", "i") AS ?o2)
            FILTER (regex(str(?o2), "${convertedSearchKey}", "i") || regex(str(?s2), "${convertedSearchKey}", "i"))`;
        // return `PREFIX ex: <http://semweb.edu.vn/example#>
        //   PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        //   PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

        //   SELECT DISTINCT ?phone ?label ?imgUri
        //   WHERE {
        //     ?phone rdfs:subClassOf ex:mobilePhone .
        //     ?phone ex:label ?label .
        //     ?phone ex:image ?imgUri .
            
        //     ?phone ?p ?o .
        //     BIND(REPLACE(STR(?phone), "\\\\W", "", "i") AS ?s2)
        //     BIND(REPLACE(STR(?o), "\\\\W", "", "i") AS ?o2)
        //     FILTER (regex(str(?o2), "${searchKey.value.replace(/\W/g, '')}", "i") || regex(str(?s2), "${searchKey.value.replace(/\W/g, '')}", "i"))
        //   } 
        //   ORDER BY ASC(?label)`
        } else {
          // return `PREFIX ex: <http://semweb.edu.vn/example#>
          // PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          // PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

          // SELECT DISTINCT ?phone ?label ?imgUri
          // WHERE {
          //   ?phone rdfs:subClassOf ex:mobilePhone .
          //   ?phone ex:label ?label .
          //   ?phone ex:image ?imgUri .
          // } 
          // ORDER BY ASC(?label)`
        }

        if(phoneType.value) {
          whereClause += `
            ?phone ex:manufacturer ex:${phoneType.value}
          `
        }

        return `${ns}
        SELECT DISTINCT ?phone ?label ?imgUri
          WHERE {
            ${whereClause}
          } 
          ORDER BY ASC(?label)`; 
    }
    
    const buildQueryJsonLD = () => {
      let ns = `PREFIX ex: <http://semweb.edu.vn/example#>
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>`,
          whereClause = `
          ?s rdfs:subClassOf ex:mobilePhone .
          ?s ?p ?o .
          ?s ?p1 ?o1 .
          filter(?p = ex:label || ?p = ex:image || ?p = rdfs:subClassOf)`;

      if(searchKey.value) {
        let convertedSearchKey = searchKey.value.replace(/\W/g, '');
        whereClause += `
            BIND(REPLACE(STR(?s), "\\\\W", "", "i") AS ?s2)
            BIND(REPLACE(STR(?o1), "\\\\W", "", "i") AS ?o2)
            FILTER (regex(str(?o2), "${convertedSearchKey}", "i") || regex(str(?s2), "${convertedSearchKey}", "i"))`;
       
        } 
        if(phoneType.value) {
          whereClause += `
            ?s ex:manufacturer ex:${phoneType.value}
          `
        }

        return `${ns}
        construct {?s ?p ?o}
        WHERE {
          ${whereClause}
        }`; 
    }

    const loadData = async (currentURI) => {
      isLoading.value = true;
      const formData = new FormData();
      formData.append('query', queryMobile);

      try {
        const res = await phoneApi.searchPhone({
          query: currentURI ? formatUri(currentURI) : buildQueryPhone(),
        });
        data.value = res.data.results.bindings;
        embedJsonLD();
        searchKey.value = currentURI?.split("#")[1];
      } catch (error) {
        console.log(error);
      }

      isLoading.value = false
    };

    const embedJsonLD = async () => {
      try {
        const res = await phoneApi.getJsonLD({
          query: buildQueryJsonLD(),
        });

          let script = document.head.querySelector("script[type='application/ld+json']");
          if(script) {
            script.textContent = JSON.stringify(res.data, null, 2);
          } else {
            const newScript = document.createElement('script');
            newScript.setAttribute('type', 'application/ld+json');
            newScript.textContent = JSON.stringify(res.data, null, 2);
            document.head.appendChild(newScript);
          }
          
      } catch (error) {
        console.log(error);
      }
    };

    onBeforeMount(async () => {
      loadData();
    });

    const navigateDetailRoute = (label) => {
       router.push({ path: '/detail', query: {
        phone: label
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

.ant-card-body {
  padding: 16px 4px;
  display: flex;
  justify-content: center;
}

.ant-card-meta-title {
  font-size: 13px;
}
</style>