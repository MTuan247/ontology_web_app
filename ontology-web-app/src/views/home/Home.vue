<template>
  <div class="home">
    <div class="home-toolbar">
      <div class="home-toolbar-left"></div>
      <div class="home-toolbar-right">
        <v-btn @click="add" class="toolbar-btn">Thêm</v-btn>
        <v-btn @click="() => del(gridData.filter(x => x.isSelected).map(x => x.phone_id))" class="toolbar-btn">Xóa</v-btn>
      </div>
    </div>
    <div class="home-main">
      <!-- <div class="home-branch">Ontology Web</div>
      <div class="home-text">Hệ thống tìm kiếm và tư vấn booking các khu nghỉ dưỡng</div> -->
      <base-grid-table
        :columns="columns"
        v-model="gridData"
        rowKey="phone_id"
        @edit="editRow"
        @deleteRow="(item) => del(item.phone_id)"
      ></base-grid-table>
    </div>
  </div>
</template>

<script>
import BaseGridTable from "@/components/base/BaseGridTable.vue";
import { ref } from "@vue/reactivity";
import { getCurrentInstance, onBeforeMount } from '@vue/runtime-core';
import phoneApi from '@/js/api/phone/PhoneApi.js'

export default {
  name: "HomeView",
  components: {
    BaseGridTable,
  },
  setup() {
    const { proxy } = getCurrentInstance();

    const gridData = ref([
      {
        phone_id: "q",
        phone_code: "A",
        phone_name: "B",
        phone_category: "C",
      },
    ]);

    const loadData = async () => {
      var res = await phoneApi.get();
      gridData.value = res.data;

    }

    onBeforeMount(async () => {
      await loadData();
    });

    const columns = ref([
      {
        title: "",
        fieldName: "Checkbox",
        style: "width: 50px;",
      },
      {
        title: "#",
        fieldName: "Index",
        style: "width: 50px;",
      },
      {
        title: "Mã điện thoại",
        fieldName: "phone_code",
        style: "width: 120px;",
      },
      {
        title: "Tên điện thoại",
        fieldName: "phone_name",
        style: "width: 200px;",
      },
      {
        title: "Ngày phát hành",
        fieldName: "anounced",
        style: "width: 100px;",
      },
    ]);

    const editRow = (item) => {
      // proxy.$popup.show('PhoneDetail');
      proxy.$popup.show({ component: 'PhoneDetail'}, {
        data: item,
        mode: 'edit',
        afterSave: loadData
      });
    }

    const add = () => {
      proxy.$popup.show({ component: 'PhoneDetail'}, {
        data: {},
        mode: 'add',
        afterSave: loadData
      });
    }

    const del = (phoneId) => {
      phoneApi.delete({
        Condition: {
          phone_id: phoneId,
        }
      }).then(() => {
        loadData();
      });
    }

    return {
      columns,
      gridData,
      editRow,
      add,
      del
    };
  },
};
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 16px;
  // justify-content: center;

  .home-toolbar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 48px;

    .toolbar-btn {
      margin-left: 8px;
    }

    .home-toolbar-left {
      flex: 1;
    }

    .home-toolbar-right {
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  }

  .home-main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .home-branch,
    .home-text {
      align-self: center;
    }
    .home-branch {
      font-size: 4.5rem;
      letter-spacing: 0.2rem;
      line-height: normal;
    }
    .home-text {
      font-size: 1.05rem;
      padding-bottom: 0.5rem;
      padding-top: 0.7rem;
      margin-bottom: 1rem;
    }
  }
}
</style>