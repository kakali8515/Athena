<template>
  <div class="info_protection UserAdmin">
    <Breadcrumb
      link="dashboard"
      text1="Home"
      text2="관리자"
      text3="기준 변경하기"
    />
    <div class="heading flex justify-between align-end">
      <h4>기준 변경하기</h4>
    </div>
    <div class="policy_setting_wrap">
      <div class="datatable_head flex justify-between">
        <div class="oneside flex justify-start">
          <!-- <select @change="getdropdownValue($event)" v-model="type">
            <option disabled selected>선택</option>
            <option
              v-for="(value, index) in criteriaValues"
              :key="index"
              :value="value.value"
               :disabled="value.value !== 'priority' && value.value !== 'security_rating'"
            >
              {{ value.key }}
            </option>
          </select> -->
          <select @change="getdropdownValue($event)" v-model="type">
            <option disabled selected>선택</option>
            <option
              v-for="(value, index) in criteriaValues"
              :key="index"
              :value="value.value"
              :class="{
                'hidden-option':
                  value.value !== 'priority' &&
                  value.value !== 'security_rating',
              }"
            >
              {{ value.key }}
            </option>
          </select>

          <div class="buttons">
            <button
              type="button"
              class="gray"
              v-if="
                permission == 'edit' ||
                this.$store.state.signin.is_user_admin == 'y'
              "
              @click="openModal"
            >
              설정
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="datatable_wrap_new protection_table">
      <div class="tab-content" id="tabs-tabContent">
        <div
          class="tab-pane fade show active"
          id="tabs-one"
          role="tabpanel"
          aria-labelledby="tabs-one-tab"
        >
          <div class="flex flex-col">
            <div class="overflow-x-auto protection_table">
              <div class="inline-block min-w-full">
                <div class="overflow-hidden">
                  <table class="min-w-full text-center">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          class="justify-center text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          구분
                        </th>
                        <th
                          scope="col"
                          class="justify-center text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          등급
                        </th>
                        <th
                          scope="col"
                          class="justify-center text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          평가범위
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in criteriaDetails"
                        :key="index"
                        class="bg-white border-b"
                      >
                        <td
                          v-if="index == 0"
                          :rowspan="criteriaDetails.length"
                          class="text-sm text-gray-900 font-light px-6 py-4 rowspan-border"
                        >
                          {{ criteriaName }}
                        </td>
                        <td
                          v-if="
                            item.threat_rating_range || item.value_rank == null
                          "
                          class="text-sm text-gray-900 font-light px-6 py-4"
                        >
                          {{ item.value }}
                        </td>
                        <td
                          v-else
                          class="text-sm text-gray-900 font-light px-6 py-4"
                        >
                          <!-- {{ item.value + "[" + item.value_rank + "]" }} -->
                          {{ item.value }}
                        </td>
                        <td
                          v-if="
                            item.grade_range ||
                            item.grade_range == 0 ||
                            item.implementation_cost_range ||
                            item.implementation_cost_range == 0 ||
                            item.implementation_difficulty_range ||
                            item.implementation_difficulty_range == 0 ||
                            item.threat_rating_range ||
                            item.threat_rating_range == 0
                          "
                          class="text-sm text-gray-900 font-light px-6 py-4"
                        >
                          <div class="number_wrap">
                            <input
                              type="number"
                              :value="
                                item.grade_range ||
                                item.implementation_cost_range ||
                                item.implementation_difficulty_range ||
                                item.threat_rating_range
                              "
                              readonly
                            />
                          </div>
                        </td>
                        <td
                          v-else
                          class="text-sm text-gray-900 font-light px-6 py-4"
                        >
                          <div class="number_wrap">
                            <input
                              type="number"
                              :value="item.range_from"
                              contenteditable
                              readonly
                            />
                            <span><img src="@/assets/icon/icon.svg" /></span>
                            <input
                              type="number"
                              :value="item.range_to"
                              contenteditable
                              readonly
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="button_wrap fixed-button-wrap flex justify-between">
      <div class="buttons flex justify-start"></div>
      <div class="buttons flex justify-end">
        <button
          type="button"
          class="gray"
          @click="$router.push('/TechnicalDiagnosisSettingSelection')"
        >
          뒤로가기
        </button>
      </div>
    </div>
  </div>
  <ManagementDiagnosisSettingsModal
    v-if="isChangeCriteria"
    @close="closeModal"
    :criteria="criteriaName"
    :selectedCriteriaValue="type"
    :details="criteriaDetails"
    @correction="getUpdateData"
  />
</template>

<script>
import ManagementDiagnosisSettingsModal from "@/components/modals/ManagementDiagnosisSettingsModal.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
// API Service
import userAdmin from "@/services/userAdmin";
export default {
  name: "ChangeCriteria",
  components: {
    ManagementDiagnosisSettingsModal,
    Breadcrumb,
  },

  data() {
    return {
      criteriaValues: [],
      criteriaDetails: [],
      criteriaName: "",
      type: "",
      isChangeCriteria: false,
    };
  },
  created() {
    this.userAdmin = new userAdmin();
  },
  computed: {
    permission() {
      return this.$store.state.sideBar.permission.technical_diagnosis_setting;
    },
  },
  mounted() {
    this.getCriteriaValues();
  },
  methods: {
    closeModal() {
      this.isChangeCriteria = false;
    },
    // API call

    getdropdownValue(event) {
      this.criteriaName =
        event.target.options[event.target.options.selectedIndex].text;
      this.getCriteriaDetails();
    },
    getUpdateData() {
      this.getCriteriaDetails();
    },

    // getCriteriaDetails
    getCriteriaDetails() {
      this.userAdmin
        .criteriaDetails(this.type)
        .then((res) => {
          if (res.status == 200) {
            this.criteriaDetails = res.data.values;
          }
        })
        .catch((err) => {
          return false;
        });
    },

    // get criteria dropdown list

    getCriteriaValues() {
      this.userAdmin
        .criteriaValues()
        .then((res) => {
          if (res.status == 200) {
            this.criteriaValues = res.data.values;
            this.type = res.data.values[0].value;
            this.criteriaName = res.data.values[0].key;
            this.getCriteriaDetails();
          }
        })
        .catch((err) => {
          return false;
        });
    },
    openModal() {
      this.isChangeCriteria = true;
    },
  },
};
</script>

<style scoped>
.rowspan-border {
  border-right: 1px solid #f2f2f2;
}
.number_wrap {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.number_wrap input[type="number"] {
  width: 72px;
  height: 36px;
  padding: 6px 18px;
  border: 1px solid #a4a4a4;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  border-radius: 5px;
  text-align: center;
  outline: none;
}
.hidden-option {
  display: none;
}
</style>
