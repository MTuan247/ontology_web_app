<template>
  <vue-final-modal
    v-bind="$attrs"
    classes="modal-container"
    content-class="modal-content phone-detail"
    :min-width="200"
    :min-height="200"
    v-model="show"
    name="PhoneDetail"
    @before-open="beforeOpen"
  >
    <button class="modal__close" @click="close">X</button>
    <span class="modal__title">Mobile Phone Information</span>
    <div class="modal__content">
      <v-col class="form-col">
        <phone-form-group title="General">
          <!-- <base-input
            label="Mã điện thoại"
            class="form-input flex1"
            v-model="model.phoneCode"
          ></base-input> -->
          <base-input
            label="Name *"
            class="form-input flex2"
            v-model="model.name"
          ></base-input>
        </phone-form-group>
        <!-- <phone-form-group title="Network">
        </phone-form-group> -->
        <phone-form-group title="Launch">
          <base-input
            label="PublishDate"
            v-model="model.publishDate"
            class="form-input flex1"
          ></base-input>
          <base-autocomplete
            label="Status"
            v-model="model.status"
            class="form-input flex1"
            :items="['discontinued']"
          ></base-autocomplete>
        </phone-form-group>
        <phone-form-group title="Body">
          <v-col>
            <v-row class="mb-10">
              <base-input
                label="Dimensions"
                v-model="model.bodyDimensions"
                class="form-input"
              ></base-input>
              <base-input
                label="Weight"
                v-model="model.bodyWeight"
                class="form-input"
              ></base-input>
            </v-row>
            <v-row>
              <base-combobox
                label="Build"
                v-model="model.bodyBuild"
                multiple
                chips
                class="form-input"
              ></base-combobox>
              <base-input
                label="SIM"
                v-model="model.SIM"
                class="form-input"
              ></base-input>
            </v-row>
          </v-col>
        </phone-form-group>
        <phone-form-group title="Display">
          <v-col>
            <v-row class="mb-10">
              <base-autocomplete
                v-model="model.displayType"
                label="Type"
                class="form-input"
                :items="['LCD', 'LED']"
              ></base-autocomplete>
              <base-input
                v-model="model.displayDimensions"
                label="Dimensions"
                class="form-input"
              ></base-input>
            </v-row>
            <v-row>
              <base-input
                v-model="model.displayProtection"
                label="Protection"
                class="form-input"
              ></base-input>
            </v-row>
          </v-col>
        </phone-form-group>
        <phone-form-group title="Platform">
          <v-col>
            <v-row class="mb-10">
              <base-autocomplete
                v-model="model.operatingSystem"
                label="OS"
                class="form-input"
                :items="['IOS', 'Android']"
              ></base-autocomplete>
              <base-autocomplete
                v-model="model.chipset"
                label="Chipset"
                class="form-input"
                :items="['A10Fusion']"
              ></base-autocomplete>
            </v-row>
            <v-row>
              <base-input
                v-model="model.CPU"
                label="CPU"
                class="form-input"
              ></base-input>
              <!-- <base-input
                v-model="model.gpu"
                label="GPU"
                class="form-input"
              ></base-input> -->
            </v-row>
          </v-col>
        </phone-form-group>
        <phone-form-group title="Memory">
          <base-checkbox
            label="Card slot"
            class="form-input flex1"
            v-model="model.cardSlot"
          ></base-checkbox>
          <base-checkbox
            label="Ram"
            class="form-input flex1"
            v-model="model.ramMemory"
          ></base-checkbox>
          <base-combobox
            :multiple="true"
            chips
            v-model="model.internalMemory"
            label="Internal"
            class="form-input flex1"
          ></base-combobox>
        </phone-form-group>
        <phone-form-group title="Main camera">
          <v-col>
            <v-row class="mb-10">
              <base-input
                v-model="model.mainCameraResolution"
                label="Resolution"
                class="form-input"
              ></base-input>
            </v-row>
            <v-row>
              <base-combobox
                :multiple="true"
                chips
                label="Features"
                class="form-input flex1"
                v-model="model.mainCameraFeatures"
              ></base-combobox>
              <base-combobox
                :multiple="true"
                chips
                v-model="model.mainCameraVideo"
                label="Video"
                class="form-input flex1"
              ></base-combobox>
            </v-row>
          </v-col>
        </phone-form-group>
        <phone-form-group title="Selfie camera">
          <v-col>
            <v-row class="mb-10">
              <base-input
                v-model="model.selfieCameraResolution"
                label="Resolution"
                class="form-input"
              ></base-input>
            </v-row>
            <v-row>
              <base-combobox
                :multiple="true"
                chips
                v-model="model.selfieCameraFeatures"
                label="Features"
                class="form-input"
              ></base-combobox>
              <base-combobox
                :multiple="true"
                chips
                v-model="model.selfieCameraVideo"
                label="Video"
                class="form-input"
              ></base-combobox>
            </v-row>
          </v-col>
        </phone-form-group>
        <!-- <phone-form-group title="Sound">
          <base-input
            v-model="model.loud_speaker"
            label="Loudspeaker"
            class="form-input flex1"
          ></base-input>
          <base-checkbox
            label="3.5mm jack"
            class="form-input flex1"
            v-model="model.jack_3_5_mm"
          ></base-checkbox>
        </phone-form-group>
        <phone-form-group title="Comms">
          <v-col>
            <v-row class="mb-10">
              <base-input
                v-model="model.wlan"
                label="Wlan"
                class="form-input"
              ></base-input>
            </v-row>
            <v-row class="mb-10">
              <base-input
                v-model="model.bluetooth"
                label="Bluetooth"
                class="form-input"
              ></base-input>
              <base-input
                v-model="model.position"
                label="Position"
                class="form-input"
              ></base-input>
            </v-row>
            <v-row>
              <base-checkbox
                label="NFC"
                class="form-input flex1"
                v-model="model.nfc"
              ></base-checkbox>
              <base-checkbox
                label="Infrared port"
                class="form-input flex1"
                v-model="model.infrared_port"
              ></base-checkbox>
            </v-row>
          </v-col>
        </phone-form-group>
        <phone-form-group title="Features">
          <base-input
            label="Sensors"
            v-model="model.sensors"
            class="form-input"
          ></base-input>
        </phone-form-group>
        <phone-form-group title="Battery">
          <base-input
            v-model="model.battery_type"
            label="Type"
            class="form-input"
          ></base-input>
          <base-input
            v-model="model.battery_charging"
            label="Charging"
            class="form-input"
          ></base-input>
        </phone-form-group>
        <phone-form-group title="Misc">
          <base-input
            v-model="model.colors"
            label="Colors"
            class="form-input"
          ></base-input>
          <base-input
            v-model="model.price"
            label="Price"
            class="form-input"
          ></base-input>
        </phone-form-group> -->
      </v-col>
    </div>
    <div class="modal__footer pt4 pb4">
      <v-btn @click="close" class="modal_footer-btn">Hủy</v-btn>
      <v-btn @click="save" color="primary" class="modal_footer-btn ml8"
        >Lưu</v-btn
      >
    </div>
  </vue-final-modal>
</template>

<script>
import {
  getCurrentInstance,
  onMounted,
  ref,
} from "@vue/runtime-core";
import PhoneFormGroup from "./PhoneFormGroup.vue";
import phoneApi from "@/js/api/phone/PhoneApi.js";

import { useOntology } from '@/js/common/ontology'

export default {
  name: "PhoneDetail",
  inheritAttrs: false,
  components: {
    PhoneFormGroup,
  },
  setup() {
    const { proxy } = getCurrentInstance();

    const show = ref(true);

    const model = ref({});
    const mode = ref();
    const params = ref();

    const beforeOpen = (event) => {
      model.value = { ...event.ref.params.value.data };
      mode.value = event.ref.params.value.mode;
      params.value = event.ref.params.value;
    };

    onMounted(() => {
      console.log("PhoneDetail");
    });

    const {generateCode} = useOntology(proxy);

    const save = async () => {
      
      console.log(generateCode(model.value))

      // let res = {};
      // switch (proxy.mode) {
      //   case "add":
      //     res = await phoneApi.post({
      //       Model: model.value,
      //     });
      //     break;
      //   case "edit":
      //     res = await phoneApi.put({
      //       Model: model.value,
      //       Condition: {
      //         phone_id: model.value.phone_id,
      //       },
      //     });
      //     break;
      // }
      // if (res.data) {
      //   if (typeof proxy.params.afterSave == "function") {
      //     proxy.params.afterSave();
      //   }
      //   show.value = false;
      // }
      try {
        const res = await phoneApi.insertPhone({
          update: generateCode(model.value),
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }

      show.value = false;
    };

    const close = () => {
      show.value = false;
    }

    return {
      show,
      mode,
      save,
      params,
      beforeOpen,
      model,
      close
    };
  },
};
</script>

<style lang="scss">
.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0 1rem;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
    background: #fff;
    max-height: 95vh;
    max-width: 80%;

    .modal__title {
      margin: 0 2rem 0 0;
      font-size: 1.5rem;
      font-weight: 700;
    }
    .modal__close {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
    }

    .modal__footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    .modal__content {
      padding-top: 8px;
      padding-bottom: 8px;
      overflow: auto;

      .form-col {
        padding: 0px;
      }

      .form-group {
        margin-bottom: 8px;
        padding: 8px;

        .form-group-title {
          margin-bottom: 8px;
        }

        .form-group-input {
          display: flex;
        }
      }

      .form-input + .form-input {
        margin-left: 8px;
      }
    }

    .dark-mode div::v-deep(.modal-content) {
      border-color: #2d3748;
      background-color: #1a202c;
    }
  }
}
</style>