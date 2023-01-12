<template>
  <v-autocomplete
    class="base-autocomplete"
    :label="label"
    density="compact"
    :items="items"
    hide-details
    v-model="value"
  ></v-autocomplete>
</template>

<script>
import { computed, getCurrentInstance } from '@vue/runtime-core';
export default {
  name: "BaseAutocomplete",
  props: {
    label: {
      type: String
    },
    modelValue: {
      
    },
    items: {

    }
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const value = computed({
      get() {
        return proxy.modelValue;
      },
      set(value) {
        proxy.$emit("update:modelValue", value);
      }
    });

    return {
      value
    }
  }
};
</script>

<style scoped>

</style>