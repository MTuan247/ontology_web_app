<template>
  <v-combobox
    class="base-combobox"
    :label="label"
    density="compact"
    :items="items"
    hide-details
    v-model="value"
    :multiple="multiple"
    :chips="chips"
  ></v-combobox>
</template>

<script>
import { computed, getCurrentInstance } from '@vue/runtime-core';
export default {
  name: "BaseCombobox",
  props: {
    label: {
      type: String
    },
    modelValue: {
      
    },
    items: {

    },
    multiple: {
      default: false
    },
    chips: {
      default: false
    },
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const value = computed({
      get() {
        if (proxy.multiple) {
          if (proxy.modelValue) {
            return proxy.modelValue.split(',');
          }
          return [];
        }
        return proxy.modelValue;
      },
      set(value) {
        if (proxy.multiple) {
          proxy.$emit("update:modelValue", value.join(','));
          return;
        }
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