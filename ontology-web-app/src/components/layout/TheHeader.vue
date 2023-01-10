<template>
  <div class="header">
    <div class="header-container container h-100">
      <div class="header-left">
        <div class="logo-site h-100">
        </div>
      </div>
      <div class="header-center">
        <router-link to="/" class="header-item">Trang chủ</router-link>
      </div>
      <div class="header-right"></div>
    </div>
  </div>
</template>

<script>
export default {
  /**
   * Layout Header
   */
  name: "TheHeader",
  components: {},
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style lang="scss">
@import "@/scss/layout/header";
</style>