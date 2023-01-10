<template>
  <v-text-field
    class="base-input"
    :label="label"
    density="compact"
    hide-details
    v-model="value"
  ></v-text-field>
</template>

<script>
import { computed, getCurrentInstance } from '@vue/runtime-core';
export default {
  name: "BaseInput",
  props: {
    label: {
      type: String
    },
    modelValue: {
    },
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