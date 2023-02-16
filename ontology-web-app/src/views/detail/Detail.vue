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
        <img :src="myPhoneData.imgUri?.value" style="width: 100%; max-width: 200px;"/>
        <div class="txt-phone-label">{{ route.query.phone }}</div>
      </a-col>
      <a-col :span="12">
        <a-row justify="space-between" v-for="item in data" :key="item.pLabel.value">
          <a-col style="font-weight: bold">{{ item.pLabel.value }}</a-col>
          <a-col v-if="item.o" @click="navigateSearch(item.value.value)" class="link">{{ item.value.value }}</a-col>
          <a-col v-else>{{ item.value.value }}</a-col>
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
import BackIcon from '@/assets/back.svg'

const buildQueryPhoneByLabel = (label) => `PREFIX ex: <http://semweb.edu.vn/example#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

select ?s ?imgUri
where {
  ?s rdfs:subClassOf ex:mobilePhone.
  ?s ex:label ?label .
  ?s ex:image ?imgUri .
  filter( ?label = "${label}")
}`;

export default {
  name: 'DetailComponent',
  components: {
},
  setup() {
    const route = useRoute();
    const myPhoneData = ref({});
    const data = ref([]);
    const isLoading = ref(true);

    const buildQueryPhone = (phoneUri) => `PREFIX ex: <http://semweb.edu.vn/example#>
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          SELECT ?pLabel ?value ?o WHERE
          { 
          {
              SELECT ?pLabel ?value ?o WHERE 
              {
                ?phone rdfs:subClassOf ex:mobilePhone .
                ?phone ?p ?o .
                ?p ex:label ?pLabel .
                ?o ex:label ?value .
                filter (?phone = <${phoneUri}> && isIRI(?o)) .
              }
          }
          UNION
          {
              SELECT ?pLabel (group_concat(?o;separator=", ") as ?value) WHERE 
              {
                ?phone rdfs:subClassOf ex:mobilePhone .
                ?phone ?p ?o .
                ?p ex:label ?pLabel .
                filter (?phone = <${phoneUri}> && !isIRI(?o)) .
              } group by ?pLabel
          }
          }
          
    `;

    const buildQueryJsonLD = (phoneUri) => {
      return `PREFIX ex: <http://semweb.edu.vn/example#>
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          construct  {?s ?p ?o}
          WHERE {
            ?s rdfs:subClassOf ex:mobilePhone .
            ?s ?p ?o .
            filter (?s = <${phoneUri}>)
          }
          `;
    }

    const embedJsonLD = async (phoneUri) => {
      try {
        const res = await phoneApi.getJsonLD({
          query: buildQueryJsonLD(phoneUri),
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

    const loadData = async () => {
      isLoading.value = true;

      try {
        const res = await phoneApi.searchPhone({
          query: buildQueryPhone(myPhoneData.value.s.value),
        });
        data.value = res.data.results.bindings;
        embedJsonLD(myPhoneData.value.s.value);
      } catch (error) {
        console.log(error);
      }

      isLoading.value = false
    };

    onBeforeMount(async () => {
      await getPhone();
      loadData();
    });

    const getPhone = async () => {
      isLoading.value = true;
      try {
        const res = await phoneApi.searchPhone({
          query: buildQueryPhoneByLabel(route.query.phone),
        });
        myPhoneData.value = res.data.results.bindings[0];
        console.log(myPhoneData.value);
      } catch (error) {
        console.log(error);
      }

      isLoading.value = false
    }

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
      route,
      myPhoneData,
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

.txt-phone-label {
  margin-top: 20px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    max-width: 200px;
    font-weight: 700;
}
.link {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>