<template>
  <div class="grid">
    <table cellspacing="0">
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :fieldName="col.fieldName"
            :key="col.fieldName"
            :style="col.style"
          >
            {{ col.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          @dblclick="dbclickRow(row)"
          @click.ctrl="ctrlClickRow(index)"
          @click.right.exact.prevent="
            rightClickRow($event, row, index)
          "
          :class="{ selected: row['isSelected'] }"
          :key="row[this.rowKey]"
          v-for="(row, index) in records"
        >
          <template v-for="col in columns" :key="col.fieldName">
            <td v-if="col.fieldName == 'Checkbox'" class="check-box">
              <v-checkbox
                hide-details
                density="compact"
                v-model="row.isSelected"
              ></v-checkbox>
            </td>
            <td v-else-if="col.fieldName == 'Index'">{{ index + 1 }}</td>
            <td v-else :style="col.style" :title="row[col.fieldName]">
              {{ row[col.fieldName] }}
            </td>
          </template>
        </tr>
      </tbody>
    </table>
    <Teleport to="body">
      <BaseContextMenu
        :contextMenuX="contextMenuX"
        :contextMenuY="contextMenuY"
        :contextMenuItems="[
          { title: 'Chọn', action: checkBox, payload: contextMenuIndex },
          { title: 'Sửa', action: editRow, payload: contextMenuPayload },
          { title: 'Xóa', action: deleteRow, payload: contextMenuPayload },
        ]"
      />
    </Teleport>
  </div>
</template>

<script>
import { computed, getCurrentInstance } from "vue";
import BaseContextMenu from "./BaseContextMenu.vue";
export default {
  name: "BaseGridTable",
  props: {
    columns: {},
    modelValue: {},
    selectedRows: {},
    rowKey: {},
  },
  data() {
    return {
      contextMenuX: null,
      contextMenuY: null,
      contextMenuPayload: null,
      contextMenuIndex: null,
      isContextMenu: true,
      isLoading: true,
    };
  },
  components: {
    BaseContextMenu,
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    /**
     * Hàm xử lý click checkbox
     * Author: NMTuan (20/07/2021)
     * @param {int} index
     */
    checkBox(index) {
      let row = this.records[index];
      row.isSelected = !row.isSelected;
      this.$emit("updateSelectedRows", row[this.rowKey]);
    },
    /**
     * Hàm xử lý dblclick vào hàng
     * @author: NMTuan (20/07/2021)
     */
    dbclickRow(item) {
      this.editRow(item);
    },
    /**
     * Hàm mở form
     * @author: NMTuan (20/07/2021)
     */
    editRow(item) {
      this.$emit('edit', item);
    },

    /**
     * Hàm xử lý ctrl-click vào row
     * @author: NMTuan (09/08/2021)
     */
    ctrlClickRow(index) {
      this.checkBox(index);
    },
    /**
     * Hàm xử lý khi right click vào row
     * @author: NMTuan (11/08/2021)
     */
    rightClickRow(event, item, index) {
      this.contextMenuX = event.pageX;
      this.contextMenuY = event.pageY;
      this.contextMenuPayload = item;
      this.contextMenuIndex = index;
      this.$eventBus.emit("showContext");
    },
    /**
     * Hàm xóa bản ghi
     * @author: NMTuan (13/08/2021)
     */
    deleteRow(item) {
      this.$emit("deleteRow", item);
    },
  },
  setup() {
    const { proxy } = getCurrentInstance();

    const records = computed({
      get() {
        return proxy.modelValue;
      },
      set(val) {
        proxy.$emit("update:modelValue", val);
      },
    });

    return {
      records,
    };
  },
};
</script>

<style lang="scss">
@import url("@/scss/base/grid.scss");
</style>