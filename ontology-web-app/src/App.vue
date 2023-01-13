<template>
  <div id="main-app">
    <modals-container></modals-container>
    <TheHeader />
    <TheContent />
  </div>
</template>

<script>

import TheHeader from '@/components/layout/TheHeader'
import TheContent from '@/components/layout/TheContent.vue'
import { getCurrentInstance, onMounted } from '@vue/runtime-core'
import 'ant-design-vue/dist/antd.css'; 

export default {
  name: 'App',
  components: {
    TheHeader,
    TheContent
  },
  setup() {
    const { proxy } = getCurrentInstance();

    onMounted(() => {
      window._proxy = proxy;
    })
  }
}
</script>

<style lang="scss">
@import '@/scss/main.scss';
</style>
