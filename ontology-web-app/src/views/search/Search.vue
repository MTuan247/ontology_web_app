<template>
  <div class="search-container">
    <!-- <PhoneDetail @hidePopup="hidePopup"/> -->
    <a-row style="align-items: center; justify-content: flex-start;">
      <SearchTemplate />
      <div style="flex: 1;"></div>
      <a-col>
        <a-button @click="showPopup" class="ms-btn ms-btn-primary">Thêm mới</a-button>
      </a-col>
    </a-row>
    <a-row class="mt-4">
      Kết quả tìm kiếm theo liên kết: 
      <div class="keyword ml-2">{{ searchKey }}</div>
      <div class="btn-icon ml-2" v-if="searchKey" @click="loadData()"><CloseCircleTwoTone /></div>
    </a-row>
     <a-table 
      class="mt-4" 
      :columns="columns" 
      :row-key="record => record.key" 
      :data-source="data" 
      :loading="isLoading"
      :pagination="{ pageSize: 10 }"
      :scroll="{ y: 340 }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 's'">
          <div @click="loadData(record?.['s']?.type == 'uri' && record['s'].value)" :class="`${record?.['s']?.type == 'uri' && 'link'}`">
            {{  record?.['s']?.type == 'uri' ? record['s'].value.split("#")[1] : record?.['s']?.value }}
          </div>
        </template>

        <!-- <template v-if="column.key === 'p'">
          <div @click="loadData(record?.['p']?.type == 'uri' && record['p'].value)" :class="`${record?.['p']?.type == 'uri' && 'link'}`">
            {{  record?.['p']?.type == 'uri' ? record['p'].value.split("#")[1] : record?.['p']?.value }}
          </div>
        </template> -->

        <template v-if="column.key === 'p'">
          <div>
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
import { onBeforeMount, getCurrentInstance } from '@vue/runtime-core';
import {  watch } from 'vue';
import phoneApi from '@/js/api/phone/PhoneApi.js';
// import SearchTemplate from '@/components/Search.vue';
import { ref } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import SearchTemplate from '@/components/Search.vue';
import { CloseCircleTwoTone } from '@ant-design/icons-vue';
// import PhoneDetail from '../popup/PhoneDetail/PhoneDetail.vue';

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
    // PhoneDetail
},
  setup() {
    const { proxy } = getCurrentInstance();

    const route = useRoute();
    const isShowPopup = ref(false);
    const searchKey = ref(route.query.keyword);
    const phoneType = ref(route.query.phoneType);
    const phonePriceFrom = ref(route.query.phonePriceFrom);
    const phonePriceTo = ref(route.query.phonePriceTo);

    const data = ref([]);
    const isLoading = ref(true);
    
    const showPopup = () => {
      // isShowPopup.value = true;
      proxy.$popup.show({
        component: 'PhoneDetail'
      }, {
        data: {
          
        }
      });
    }

    const hidePopup = () => {
      isShowPopup.value = false;
    }

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
      let whereClause = '?s rdfs:subClassOf ex:mobilePhone . ';
      if(phoneType.value) {
        whereClause += `?s ex:manufacturer ex:${phoneType.value}`;
      }

      if(searchKey.value) {
        whereClause += `?s ?p ?o . 
        BIND(REPLACE(STR(?s), "\\\\W", "", "i") AS ?s2)
        BIND(REPLACE(STR(?o), "\\\\W", "", "i") AS ?o2)
        FILTER (regex(str(?o2), "${searchKey.value.replace(/\W/g, '')}", "i") || regex(str(?s2), "${searchKey.value.replace(/\W/g, '')}", "i"))
        `;

        return `PREFIX ex: <http://semweb.edu.vn/example#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

        select ?s ?p ?o
        where {${whereClause}}`;
      }
      return `PREFIX ex: <http://semweb.edu.vn/example#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

      select ?s
      where {${whereClause}}`;
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
      isShowPopup,
      showPopup,
      hidePopup
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

.btn-icon {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>