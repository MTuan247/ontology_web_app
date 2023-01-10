<template>
  <v-checkbox
    class="base-checkbox"
    :label="label"
    density="compact"
    hide-details
    v-model="value"
  ></v-checkbox>
</template>

<script>
import { computed, getCurrentInstance } from '@vue/runtime-core';
export default {
  name: "BaseCheckbox",
  props: {
    label: {
      type: String
    },
    modelValue: {
      
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