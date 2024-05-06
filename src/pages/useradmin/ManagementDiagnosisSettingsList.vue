<template>
  <div class="info_protection">
    <div class="breadcrumb">
      <Breadcrumb link="dashboard" text1="Home" text2="관리자" />
    </div>
    <div class="heading flex justify-between align-end">
      <h4>관리진단 설정</h4>
    </div>

    <div class="managmenttable">
      <div class="tab-style-two">
        <TabWrapper>
          <Tabs title="진단관리 설정">
            <div class="tab-select">
              <div class="select_wrap">
                <select @change="getdropdownValue($event)">
                  <option disabled selected>선택</option>
                  <option
                    v-for="(value, index) in searchKeyList"
                    :key="index"
                    :value="value.menu"
                  >
                    {{ value.menu }}
                  </option>
                </select>
                <SortingDropdown
                  :obj="userManagementSettinfFilterData"
                  @selectedCol="selectedCol"
                  @selectedOrd="selectedOrd"
                />
              </div>
              <div class="table_wrap">
                <div class="flex flex-col">
                  <div class="overflow-x-auto protection_table">
                    <div class="inline-block min-w-full">
                      <div class="overflow-hidden">
                        <table class="min-w-full text-center">
                          <thead class="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                class="
                                  justify-center
                                  text-sm
                                  font-medium
                                  text-gray-900
                                  px-6
                                  py-4
                                "
                              >
                                <div class="flex items-center justify-center">
                                  <input
                                    id="default-checkbox"
                                    type="checkbox"
                                    value=""
                                    class="
                                      w-4
                                      h-4
                                      text-blue-600
                                      bg-gray-100
                                      rounded
                                      border-gray-300
                                      dark:ring-offset-gray-800
                                      dark:bg-gray-700
                                      dark:border-gray-600
                                    "
                                    @click="selectAll"
                                    v-model="allSelected"
                                    :checked="
                                      selectedDiagnosis.length ==
                                      dSettingsList.length
                                    "
                                  />
                                </div>
                              </th>
                              <th
                                scope="col"
                                class="
                                  text-sm
                                  font-medium
                                  text-gray-900
                                  px-6
                                  py-4
                                "
                                v-for="(item, index) of colData"
                                :key="index"
                              >
                                <div class="with_short">
                                  {{ item.name }}
                                  <img src="@/assets/icon/DownSquare.svg" />
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              @dblclick="isUpdateManagementDiagnosis(item)"
                              v-for="(item, e) in dSettingsList"
                              :key="e"
                            >
                              <td
                                class="
                                  text-sm text-gray-900
                                  font-light
                                  px-6
                                  py-4
                                "
                              >
                                <div class="flex justify-center items-center">
                                  <input
                                    id="default-checkbox"
                                    type="checkbox"
                                    class="
                                      w-4
                                      h-4
                                      text-blue-600
                                      bg-gray-100
                                      rounded
                                      border-gray-300
                                      dark:ring-offset-gray-800
                                      dark:bg-gray-700
                                      dark:border-gray-600
                                    "
                                    v-model="selectedItem"
                                    @change="selectSingle"
                                    :value="item.id"
                                  />
                                </div>
                              </td>
                              <td>{{ item.idx }}</td>
                              <td>
                                <input
                                  :value="item.certification"
                                  :class="
                                    item.diagnosisEditMode == true
                                      ? 'tableInput'
                                      : ''
                                  "
                                  name="certification"
                                  :readonly="item.diagnosisEditMode == false"
                                  @change="updateManagement($event, item.id)"
                                />
                              </td>
                              <td class="menu">
                                <textarea
                                  :class="
                                    item.diagnosisEditMode == true
                                      ? 'tableInput'
                                      : ''
                                  "
                                  name="menu"
                                  :readonly="item.diagnosisEditMode == false"
                                  @change="updateManagement($event, item.id)"
                                >{{item.menu}}</textarea>
                              </td>
                              <td class="menu">
                                <textarea
                                  :class="
                                    item.diagnosisEditMode == true
                                      ? 'tableInput'
                                      : ''
                                  "
                                  name="class"
                                  :readonly="item.diagnosisEditMode == false"
                                  @change="updateManagement($event, item.id)"
                                >{{item.class}}</textarea>
                              </td>
                              <td>
                                <textarea
                                  :class="
                                    item.diagnosisEditMode == true
                                      ? 'tableInput'
                                      : ''
                                  "
                                  name="item_title"
                                  :readonly="item.diagnosisEditMode == false"
                                  @change="updateManagement($event, item.id)"
                                >{{item.item_title}}</textarea>
                              </td>
                              <td>
                                <textarea
                                  :class="
                                    item.diagnosisEditMode == true
                                      ? 'tableInput'
                                      : ''
                                  "
                                  name="detailed_contents"
                                  :readonly="item.diagnosisEditMode == false"
                                  @change="updateManagement($event, item.id)"
                                >{{item.detailed_contents}}</textarea>
                              </td>
                              <td>
                                <input
                                  :value="item.item_number"
                                  :class="
                                    item.diagnosisEditMode == true
                                      ? 'tableInput'
                                      : ''
                                  "
                                  name="item_number"
                                  :readonly="item.diagnosisEditMode == false"
                                  @change="updateManagement($event, item.id)"
                                />
                              </td>
                              <td>
                                <input
                                  :value="item.code"
                                  :class="
                                    item.diagnosisEditMode == true
                                      ? 'tableInput'
                                      : ''
                                  "
                                  name="code"
                                  :readonly="item.diagnosisEditMode == false"
                                  @change="updateManagement($event, item.id)"
                                />
                              </td>
                              <td>
                                <textarea
                                  :class="
                                    item.diagnosisEditMode == true
                                      ? 'tableInput'
                                      : ''
                                  "
                                  name="item"
                                  :readonly="item.diagnosisEditMode == false"
                                  @change="updateManagement($event, item.id)">{{item.item}}</textarea>
                              </td>
                              <td>
                                <input
                                  :value="item.grade"
                                  :class="
                                    item.diagnosisEditMode == true
                                      ? 'tableInput'
                                      : ''
                                  "
                                  name="grade"
                                  :readonly="item.diagnosisEditMode == false"
                                  @change="updateManagement($event, item.id)"
                                />
                              </td>
                              <td>
                                <textarea
                                  :class="
                                    item.diagnosisEditMode == true
                                      ? 'tableInput'
                                      : ''
                                  "
                                  name="explain"
                                  :readonly="item.diagnosisEditMode == false"
                                  @change="updateManagement($event, item.id)"
                                >{{item.explain}}</textarea>
                              </td>
                              <td>
                                <textarea
                                  :class="
                                    item.diagnosisEditMode == true
                                      ? 'tableInput'
                                      : ''
                                  "
                                  name="risk"
                                  :readonly="item.diagnosisEditMode == false"
                                  @change="updateManagement($event, item.id)"
                                >{{item.risk}}</textarea>
                              </td>
                              <td>
                                <textarea
                                  :class="
                                    item.diagnosisEditMode == true
                                      ? 'tableInput'
                                      : ''
                                  "
                                  name="protection"
                                  :readonly="item.diagnosisEditMode == false"
                                  @change="updateManagement($event, item.id)"
                                >{{item.protection}}</textarea>
                              </td>
                              <td>
                                <input
                                  :value="item.threat"
                                  :class="
                                    item.diagnosisEditMode == true
                                      ? 'tableInput'
                                      : ''
                                  "
                                  name="threat"
                                  :readonly="item.diagnosisEditMode == false"
                                  @change="updateManagement($event, item.id)"
                                />
                              </td>
                              <td>
                                <input
                                  :value="item.marking"
                                  :class="
                                    item.diagnosisEditMode == true
                                      ? 'tableInput'
                                      : ''
                                  "
                                  name="marking"
                                  :readonly="item.diagnosisEditMode == false"
                                  @change="updateManagement($event, item.id)"
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <!-- <Pagination /> -->
                  <template v-if="dSettingsList.length > 0">
                    <pagination
                      v-model="page"
                      :records="records"
                      :per-page="limit"
                      @paginate="myCallback"
                    />
                  </template>
                </div>
                <div
                  id="add_diagnosis"
                  :class="addDiagnosis ? 'show add_row' : 'add_row'"
                >
                  <div
                    class="form_group"
                    v-for="(item, index) of diagnosisInput"
                    :key="index"
                  >
                    <input
                      @keypress="isNumber($event)"
                      v-if="item.item == 'grade'"
                      :type="item.type"
                      :id="item.item"
                      :name="item.item"
                      :placeholder="item.placeholder"
                      @change="getManagementDiagnosisInput($event)"
                      maxlength="8"
                    />
                    <input
                      v-else
                      :type="item.type"
                      :name="item.item"
                      :placeholder="item.placeholder"
                      :disabled="item.disabled"
                      :id="item.item"
                      @keyup="getManagementDiagnosisInput($event)"
                    />
                  </div>
                </div>
                <div class="button_wrap fixed-button-wrap flex justify-between">
                  <div class="buttons flex justify-start">
                  <a href="#add_diagnosis">
                    <button
                      type="button"
                      class=""
                      @click="showDiagnosisFields"
                      v-if="
                        permission == 'edit' ||
                        this.$store.state.signin.is_user_admin == 'y'
                      "
                    >
                      {{ addItem }}
                    </button>
                    </a>
                  </div>
                  <div class="buttons flex justify-end">
                    <button
                      type="button"
                      @click="removeManagementDiagnosis"
                      v-if="
                        permission == 'edit' ||
                        this.$store.state.signin.is_user_admin == 'y'
                      "
                    >
                      선택 삭제
                    </button>
                    <button
                      type="button"
                      @click="addManagementDiagnosis"
                      :disabled="
                        Object.keys(managementDiagnosisInputData).length === 0
                      "
                      :class="{
                        no_cursor:
                          Object.keys(managementDiagnosisInputData).length ===
                          0,
                      }"
                      v-if="
                        permission == 'edit' ||
                        this.$store.state.signin.is_user_admin == 'y'
                      "
                    >
                      저장하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Tabs>
          <Tabs title="위협분석 설정">
            <div class="tab-select">
              <div class="select_wrap">
                <select @change="getMainCategorydropdownValue($event)">
                  <option value="" selected>전체</option>
                  <option
                    v-for="(value, index) in mainCategory"
                    :key="index"
                    :value="value.main_category"
                  >
                    {{ value.main_category }}
                  </option>
                </select>
                <SortingDropdown
                  :obj="userThreatAnalysisfFilterData"
                  @selectedCol="selectedThreatCol"
                  @selectedOrd="selectedThreatOrd"
                />
              </div>
              <div class="table_wrap">
                <div class="flex flex-col">
                  <div class="overflow-x-auto protection_table">
                    <div class="inline-block min-w-full">
                      <div class="overflow-hidden">
                        <table class="min-w-full text-center">
                          <thead class="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                class="
                                  justify-center
                                  text-sm
                                  font-medium
                                  text-gray-900
                                  px-6
                                  py-4
                                "
                              >
                                <div class="flex items-center justify-center">
                                  <input
                                    id="default-checkbox"
                                    type="checkbox"
                                    value=""
                                    class="
                                      w-4
                                      h-4
                                      text-blue-600
                                      bg-gray-100
                                      rounded
                                      border-gray-300
                                      dark:ring-offset-gray-800
                                      dark:bg-gray-700
                                      dark:border-gray-600
                                    "
                                    @click="selectThreatAll"
                                    v-model="allThreatSelected"
                                    :checked="
                                      threatSettingList.length ==
                                      selectedThreat.length
                                    "
                                  />
                                </div>
                              </th>
                              <th
                                scope="col"
                                class="
                                  text-sm
                                  font-medium
                                  text-gray-900
                                  px-6
                                  py-4
                                "
                                v-for="(item, index) of threatColData"
                                :key="index"
                              >
                                <div class="with_short">
                                  {{ item.name }}
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              @dblclick="isUpdateThreat(item)"
                              v-for="(item, e) in threatSettingList"
                              :key="e"
                            >
                              <td
                                class="
                                  text-sm text-gray-900
                                  font-light
                                  px-6
                                  py-4
                                "
                              >
                                <div class="flex justify-center items-center">
                                  <input
                                    id="default-checkbox"
                                    type="checkbox"
                                    class="
                                      w-4
                                      h-4
                                      text-blue-600
                                      bg-gray-100
                                      rounded
                                      border-gray-300
                                      dark:ring-offset-gray-800
                                      dark:bg-gray-700
                                      dark:border-gray-600
                                    "
                                    v-model="selectedThreatItem"
                                    @change="selectSingleThreat"
                                    :value="item.id"
                                  />
                                </div>
                              </td>
                              <td>{{ item.idx }}</td>
                              <td>
                                <input
                                  type="text"
                                  :class="
                                    item.threatEditMode == true
                                      ? 'tableInput'
                                      : ''
                                  "
                                  @dblclick="isUpdateThreat(item)"
                                  :value="item.threat_code"
                                  name="threat_code"
                                  :readonly="item.threatEditMode == false"
                                  @change="
                                    getUpdateThreatInput($event, item.id)
                                  "
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  :class="
                                    item.threatEditMode == true
                                      ? 'tableInput'
                                      : ''
                                  "
                                  @dblclick="isUpdateThreat(item)"
                                  :value="item.main_category"
                                  name="main_category"
                                  :readonly="item.threatEditMode == false"
                                  @change="
                                    getUpdateThreatInput($event, item.id)
                                  "
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  :class="
                                    item.threatEditMode == true
                                      ? 'tableInput'
                                      : ''
                                  "
                                  @dblclick="isUpdateThreat(item)"
                                  :value="item.middle_class"
                                  name="middle_class"
                                  :readonly="item.threatEditMode == false"
                                  @change="
                                    getUpdateThreatInput($event, item.id)
                                  "
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  :class="
                                    item.threatEditMode == true
                                      ? 'tableInput'
                                      : ''
                                  "
                                  @dblclick="isUpdateThreat(item)"
                                  :value="item.threats"
                                  name="threats"
                                  :readonly="item.threatEditMode == false"
                                  @change="
                                    getUpdateThreatInput($event, item.id)
                                  "
                                />
                              </td>
                              <td>
                                <!-- <input
                                  type="text"
                                  :class="
                                    item.threatEditMode == true
                                      ? 'tableInput'
                                      : ''
                                  "
                                  @dblclick="isUpdateThreat(item)"
                                  :value="item.confidentiality"
                                  name="confidentiality"
                                  :readonly="item.threatEditMode == false"
                                  @change="
                                    getUpdateThreatInput($event, item.id)
                                  "
                                /> -->
                                <select
                                  name="confidentiality"
                                  @change="
                                    getUpdateThreatInput($event, item.id)
                                  "
                                >
                                <option
                                    v-for="(value, name, index) in rankList"
                                    :key="index"
                                    :value="name"
                                    :selected="item.confidentiality == name"
                                  >
                                    {{ value }}
                                  </option>
                                </select>
                              </td>
                              <td>
                                <!-- <input
                                  type="text"
                                  :class="
                                    item.threatEditMode == true
                                      ? 'tableInput'
                                      : ''
                                  "
                                  @dblclick="isUpdateThreat(item)"
                                  :value="item.integrity"
                                  name="integrity"
                                  :readonly="item.threatEditMode == false"
                                  @change="
                                    getUpdateThreatInput($event, item.id)
                                  "
                                /> -->
                                <select
                                  name="integrity"
                                  @change="
                                    getUpdateThreatInput($event, item.id)
                                  "
                                >
                                <option
                                    v-for="(value, name, index) in rankList"
                                    :key="index"
                                    :value="name"
                                    :selected="item.integrity == name"
                                  >
                                    {{ value }}
                                  </option>
                                </select>
                              </td>
                              <td>
                                <!-- <input
                                  type="text"
                                  :class="
                                    item.threatEditMode == true
                                      ? 'tableInput'
                                      : ''
                                  "
                                  @dblclick="isUpdateThreat(item)"
                                  :value="item.availability"
                                  name="availability"
                                  :readonly="item.threatEditMode == false"
                                  @change="
                                    getUpdateThreatInput($event, item.id)
                                  "
                                /> -->
                                <select
                                  name="availability"
                                  @change="
                                    getUpdateThreatInput($event, item.id)
                                  "
                                >
                                  <option
                                    v-for="(value, name, index) in rankList"
                                    :key="index"
                                    :value="name"
                                    :selected="item.availability == name"
                                  >
                                    {{ value }}
                                  </option>
                                </select>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  readonly
                                  :class="
                                    item.threatEditMode == true
                                      ? 'tableInput'
                                      : ''
                                  "
                                  @dblclick="isUpdateThreat(item)"
                                  :value="item.threat_ranking"
                                  name="threat_ranking"
                                  @change="
                                    getUpdateThreatInput($event, item.id)
                                  "
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <!-- <Pagination /> -->
                  <template v-if="threatSettingList.length > 0">
                    <pagination
                      v-model="page1"
                      :records="threatRecords"
                      :per-page="limit1"
                      @paginate="myCallback2"
                    />
                  </template>
                </div>
                <div
                  id="add_threat"
                  :class="addThreat ? 'show add_row' : 'add_row'"
                >
                  <div
                    class="form_group"
                    v-for="(item, index) of threatInput"
                    :key="index"
                  >
                    <template
                      v-if="
                        item.item == 'confidentiality' ||
                        item.item == 'integrity' ||
                        item.item == 'availability'
                      "
                    >
                      <select class="extra-select"
                        :id="item.item"
                        :name="item.item"
                        @change="getThreatInput($event)"
                      >
                        <option
                          v-for="(value, name, index) in rankList"
                          :key="index"
                          :value="name"
                        >
                          {{ value }}
                        </option>
                      </select>
                    </template>
                    <!-- <input
                      @keypress="isNumber($event)"
                      v-if="
                        item.item == 'confidentiality' ||
                        item.item == 'integrity' ||
                        item.item == 'availability'
                      "
                      :type="item.type"
                      :id="item.item"
                      :name="item.item"
                      :placeholder="item.placeholder"
                      @change="getThreatInput($event)"
                      maxlength="8"
                    /> -->
                    <input
                      v-else
                      :type="item.type"
                      :id="item.item"
                      :name="item.item"
                      :placeholder="item.placeholder"
                      @change="getThreatInput($event)"
                      maxlength="240"
                    />
                  </div>
                </div>
                <div class="button_wrap fixed-button-wrap flex justify-between">
                  <div class="buttons flex justify-start">
                    <button
                      type="button"
                      class=""
                      @click="showThreatFields"
                      v-if="
                        permission == 'edit' ||
                        this.$store.state.signin.is_user_admin == 'y'
                      "
                    >
                      {{ addThreatItem }}
                    </button>
                  </div>
                  <div class="buttons flex justify-end">
                    <button
                      type="button"
                      v-if="
                        permission == 'edit' ||
                        this.$store.state.signin.is_user_admin == 'y'
                      "
                      :class="{ no_cursor: selectedThreat.length == 0 }"
                      :disabled="selectedThreat.length == 0"
                      @click="removeThreatAnalysis"
                    >
                      선택 삭제
                    </button>
                    <button
                      type="button"
                      v-if="
                        permission == 'edit' ||
                        this.$store.state.signin.is_user_admin == 'y'
                      "
                      :class="{
                        no_cursor: Object.keys(threatInputData).length === 0,
                      }"
                      :disabled="Object.keys(threatInputData).length === 0"
                      @click="addThreatAnalysis"
                      class=""
                    >
                      저장하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Tabs>
        </TabWrapper>
      </div>
    </div>
  </div>
</template>

<script>
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import { diagnosisSettingCol, threatSettingCol } from "@/config/TableColData";
import Breadcrumb from "@/components/Breadcrumb.vue";
import userAdmin from "@/services/userAdmin";
import { AddManagementDiagnosis, addThreatAnalysis } from "@/config/InputData";
import Toast from "@/alert/alert.js";
import {
  userManagementSettinfFilterData,
  userThreatAnalysisfFilterData,
} from "@/config/SortingDropdownData";
import SortingDropdown from "@/components/SortingDropdown.vue";
export default {
  name: "ManagementDiagnosisSettingsList",
  components: {
    Tabs,
    TabWrapper,
    Breadcrumb,
    SortingDropdown,
  },
  data() {
    return {
      page: 1,
      limit: 50,
      page1: 1,
      limit1: 50,
      totalItems: 0,
      chunkPage: { chunk: 5 },
      colData: diagnosisSettingCol,
      diagnosisInput: AddManagementDiagnosis,
      searchKeyList: [],
      searchKey: "",
      dSettingsList: [],
      allSelected: false,
      selectedItem: [],
      selectedDiagnosis: [],
      records: "",
      addDiagnosis: false,
      addItem: "항목 추가하기",
      managementDiagnosisInputData: {},
      // updatedInputData: '',
      diagnosisId: "",
      //threat analysis
      mainCategory: [],
      searchByMainCategory: "",
      threatSettingList: [],
      threatColData: threatSettingCol,
      threatRecords: "",
      threatInput: addThreatAnalysis,
      addThreat: false,
      threatInputData: {},
      threatId: "",
      selectedThreat: [],
      selectedThreatItem: [],
      allThreatSelected: false,
      setMenu: "",
      setCode: "",
      addThreatItem: "항목 추가하기",
      userManagementSettinfFilterData: userManagementSettinfFilterData,
      sort_by: "",
      sortOrder: "",
      userThreatAnalysisfFilterData: userThreatAnalysisfFilterData,
      threat_sort_by: "",
      threatsortOrder: "",
      rankList: "",
    };
  },
  created() {
    this.userAdmin = new userAdmin();
  },
  computed: {
    permission() {
      return this.$store.state.sideBar.permission.management_diagnosis_setting;
    },
  },
  mounted() {
    this.getDiagnosisSearchKey();
    this.getDiagnosisSettingsList();
    this.mainCategoryList();
    this.getThreatAnalysisSettingsList();
    this.rankingDropdown();
  },
  watch: {
    "$store.state.header.certificate": function (newVal, oldVal) {
      if (newVal != oldVal && newVal) {
        this.getDiagnosisSettingsList();
      }
    },
  },
  methods: {
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    getdropdownValue(event) {
      this.searchKey = event.target.value;
      // console.log(this.searchKey);
      this.getDiagnosisSettingsList();
    },
    selectedCol(value) {
      this.sort_by = value;
      this.getDiagnosisSettingsList();
    },
    selectedOrd(value) {
      this.sortOrder = value;
      this.getDiagnosisSettingsList();
    },
    // Management Diagnosis API's
    getDiagnosisSearchKey() {
      this.userAdmin
        .DiagnosisSearchKey()
        .then((res) => {
          if (res.status == 200) {
            this.searchKeyList = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    },
    getDiagnosisSettingsList() {
      this.userAdmin
        .diagnosisSettingsList(
          this.page,
          this.limit,
          this.searchKey,
          this.$store.state.header.certificate,
          this.sort_by,
          this.sortOrder
        )
        .then((res) => {
          if (res.status == 200) {
            this.dSettingsList = res.data.diagnosis_settings;
            this.totalItems = res.data.diagnosis_settings.length;
            this.records = res.data.total_records;
            for (let i = 0; i < this.totalItems; i++) {
              this.dSettingsList[i]["diagnosisEditMode"] = false;
              this.dSettingsList[i]["idx"] =
                // (this.page - 1) * this.limit + i + 1;
                this.records - i - (this.page - 1) * this.limit;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeManagementDiagnosis() {
      if (this.selectedDiagnosis) {
        this.userAdmin
          .deleteManagementDiagnosis(this.selectedDiagnosis)
          .then((res) => {
            if (res.status == 200) {
              this.getDiagnosisSettingsList();
            }
          })
          .catch((err) => {
            return;
          });
      } else {
        // console.log("select any");
      }
    },
    showDiagnosisFields() {
      this.addDiagnosis = !this.addDiagnosis;
      if (this.addDiagnosis == true) {
        this.addItem = "뒤로가기";
      } else {
        this.addItem = "항목 추가하기";
      }
    },

    // all select check box
    selectAll() {
      if (!this.allSelected) {
        const selected = this.dSettingsList.map((u) => u.id);
        this.selectedItem = selected;
        this.selectedDiagnosis = this.dSettingsList.map((u) => {
          return u.id;
        });
      } else {
        this.selectedItem = [];
        this.selectedDiagnosis = [];
      }
      // console.log(this.selectedDiagnosis);
    },
    // checkbox select event
    selectSingle(event) {
      const id = event.target.value;
      const click = event.target.checked;
      this.allSelected = false;
      const obj = this.dSettingsList.find((x) => x.id == id);
      if (click) {
        this.selectedDiagnosis.push(obj.id);
      } else {
        this.selectedDiagnosis.splice(
          this.selectedDiagnosis.indexOf(obj.id),
          1
        );
      }
      if (this.selectedDiagnosis.length == this.dSettingsList.length) {
        this.allSelected = true;
      }
      // console.log(this.selectedDiagnosis);
    },
    // callback pagination
    myCallback(ClickPage) {
      this.page = ClickPage;
      this.getDiagnosisSettingsList();
    },

    //get managemnet diagnosis input
    getManagementDiagnosisInput(e) {
      const inputGroup = document.getElementById("add_diagnosis");
      const inputs = inputGroup.getElementsByTagName("input");

      if (e.target.value == "") {
        for (let i = 0; i < inputs.length; i++) {
          let id = inputs[i].getAttribute("id");
          // if (code == 'code') {
          //   document.getElementById(id).value = ''
          // }
        }
      }
      this.managementDiagnosisInputData[e.target.name] = e.target.value;

      // if (e.target.name == "menu") {
      //   this.setMenu = e.target.value;
      // }
      if (e.target.name == "code") {
        this.setCode = e.target.value;
      }

      if (e.target.name == "code") {
        this.userAdmin
          .getAddData(
            this.setMenu,
            this.setCode,
            this.$store.state.header.certificate
          )
          .then((res) => {
            if (res.status == 200) {
              this.managementDiagnosisInputData = res.data.data.length
                ? res.data.data[0]
                : {};
              this.managementDiagnosisInputData[e.target.name] = this.setCode;
              let id;
              for (let i = 0; i < inputs.length; i++) {
                id = inputs[i].getAttribute("id");
                if (id in this.managementDiagnosisInputData) {
                  document.getElementById(id).value =
                    this.managementDiagnosisInputData[id];
                } else {
                  if (id != "code") {
                    document.getElementById(id).value = "";
                  }
                }
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      // console.log(this.managementDiagnosisInputData)
    },

    // add management analysis
    addManagementDiagnosis() {
      this.userAdmin
        .addManagementDiagnosis(
          this.managementDiagnosisInputData.certification,
          this.managementDiagnosisInputData.menu,
          this.managementDiagnosisInputData.class,
          this.managementDiagnosisInputData.item_number,
          this.managementDiagnosisInputData.detailed_contents,
          this.managementDiagnosisInputData.item_title,
          this.managementDiagnosisInputData.code,
          this.managementDiagnosisInputData.item,
          this.managementDiagnosisInputData.grade,
          this.managementDiagnosisInputData.explain,
          this.managementDiagnosisInputData.risk,
          this.managementDiagnosisInputData.protection,
          this.managementDiagnosisInputData.threat,
          this.managementDiagnosisInputData.marking,
          this.diagnosisId
        )
        .then((res) => {
          this.$store.state.addMenu = res;
          // console.log('this.$store.state.addMenu', this.$store.state.addMenu, res);
          if (res.status == 200) {
            const inputGroup = document.getElementById("add_diagnosis");
            const inputs = inputGroup.getElementsByTagName("input");
            for (let i = 0; i < inputs.length; i++) {
              let id = inputs[i].getAttribute("id");
              document.getElementById(id).value = "";
            }
            this.addDiagnosis = false;
            if (this.addDiagnosis == true) {
              this.addItem = "뒤로가기";
            } else {
              this.addItem = "항목 추가하기";
            }
            this.getDiagnosisSearchKey();
            this.getDiagnosisSettingsList();
            Toast.fire({ title: "완료" });
            this.managementDiagnosisInputData = {};
          } else if (res.response.status == 400) {
            Toast.fire({ title: res.response.data.error });
            if (res.response.data.validation.body.keys == "certification") {
              Toast.fire({ title: "인증명을 입력해주세요" });
            }
            if (res.response.data.validation.body.keys == "class") {
              Toast.fire({ title: "분야를 입력해주세요" });
            }
            if (res.response.data.validation.body.keys == "code") {
              Toast.fire({ title: "세부항목 번호를 입력해주세요" });
            }
            if (res.response.data.validation.body.keys == "item") {
              Toast.fire({ title: "주요확인사항을 입력해주세요" });
            }
            if (res.response.data.validation.body.keys == "item_title") {
              Toast.fire({ title: "항목명을 입력해주세요" });
            }
            if (res.response.data.validation.body.keys == "menu") {
              Toast.fire({ title: "메뉴명을 입력해주세요" });
            }
            if (res.response.data.validation.body.keys == "grade") {
              Toast.fire({ title: " Grade를 입력해주세요" });
            }
            if (res.response.data.validation.body.keys == "threat") {
              Toast.fire({ title: "위협코드를 입력해주세요" });
            }
            if (res.response.data.validation.body.keys == "item_number") {
              Toast.fire({ title: "항목번호를 입력해주세요" });
            }
            if (res.response.data.validation.body.keys == "detailed_contents") {
              Toast.fire({ title: "상세내용을 입력해주세요" });
            }
            if (res.response.data.validation.body.keys == "explain") {
              Toast.fire({ title: " Explain을 입력해주세요" });
            }
            if (res.response.data.validation.body.keys == "risk") {
              Toast.fire({ title: "Risk를 입력해주세요" });
            }
            if (res.response.data.validation.body.keys == "protection") {
              Toast.fire({ title: "Protection을 입력해주세요" });
            }
            if (res.response.data.validation.body.keys == "marking") {
              Toast.fire({ title: "Marking을 입력해주세요" });
            }
          }
        })
        .catch((err) => {
          return;
        });
    },

    isUpdateManagementDiagnosis(item) {
      item["diagnosisEditMode"] = true;
      // console.log(item)
      this.diagnosisId = item.id;
      const obj = this.dSettingsList.find((x) => x.id == item.id);
      this.managementDiagnosisInputData = obj;
    },

    updateManagement(e, id) {
      // console.log(id);
      this.diagnosisId = id;
      const obj = this.dSettingsList.find((x) => x.id == id);
      this.managementDiagnosisInputData = obj;
      this.managementDiagnosisInputData[e.target.name] = e.target.value;
      // console.log(this.managementDiagnosisInputData);
    },

    // get add data
    // fetchAddData() {
    //   if (
    //     this.managementDiagnosisInputData[e.target.name] == "menu" &&
    //     this.managementDiagnosisInputData[e.target.name] == "code"
    //   ) {
    //     this.userAdmin
    //       .getAddData()
    //       .then((res) => {
    //         if (res.status == 200) {
    //           console.log(res);
    //         }
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   }
    // },

    // threat analysis main category list
    mainCategoryList() {
      this.userAdmin
        .mainCategoryList()
        .then((res) => {
          if (res.status == 200) {
            this.mainCategory = res.data.data;
          }
        })
        .catch((err) => {
          // console.log(err);
          return false;
        });
    },
    // threat analysis main category list
    rankingDropdown() {
      this.userAdmin.rankingDropdown().then((res) => {
        if (res.status == 200) {
          this.rankList = res.data.list;
          this.threatInputData.confidentiality = Object.keys(res.data.list)[0];
          this.threatInputData.integrity = Object.keys(res.data.list)[0];
          this.threatInputData.availability = Object.keys(res.data.list)[0];
        }
      });
    },
    //main category dropdownvalue
    getMainCategorydropdownValue(event) {
      this.searchByMainCategory = event.target.value;
      this.getThreatAnalysisSettingsList();
    },
    selectedThreatCol(value) {
      this.threat_sort_by = value;
      this.getThreatAnalysisSettingsList();
    },
    selectedThreatOrd(value) {
      this.threatsortOrder = value;
      this.getThreatAnalysisSettingsList();
    },
    //Threat analysis Settings List
    getThreatAnalysisSettingsList() {
      this.userAdmin
        .threatAnalysisList(
          this.page1,
          this.limit1,
          this.searchByMainCategory,
          this.$store.state.header.certificate,
          this.threat_sort_by,
          this.threatsortOrder
        )
        .then((res) => {
          if (res.status == 200) {
            this.threatSettingList = res.data.threat_analysis;
            this.threatRecords = res.data.total_records;
            for (let i = 0; i < this.threatSettingList.length; i++) {
              this.threatSettingList[i]["threatEditMode"] = false;
              this.threatSettingList[i]["idx"] =
                // (this.page1 - 1) * this.limit1 + i + 1;
                this.threatRecords - i - (this.page1 - 1) * this.limit1;
            }
          }
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    //Threat analysis callback pagination
    myCallback2(ClickPage) {
      this.page1 = ClickPage;
      this.getThreatAnalysisSettingsList();
    },

    showThreatFields() {
      this.addThreat = !this.addThreat;
      if (this.addThreat == true) {
        this.addThreatItem = "뒤로가기";
      } else {
        this.addThreatItem = "항목 추가하기";
      }
    },

    getThreatInput(e) {
      this.threatInputData[e.target.name] = e.target.value;
    },

    isUpdateThreat(item) {
      item["threatEditMode"] = true;
      // console.log(item)
      this.threatId = item.id;
      const obj = this.threatSettingList.find((x) => x.id == item.id);
      this.threatInputData = obj;
    },

    getUpdateThreatInput(e, id) {
      this.threatId = id;
      const obj = this.threatSettingList.find((x) => x.id == id);
      this.threatInputData = obj;
      this.threatInputData[e.target.name] = e.target.value;
      // console.log(this.threatInputData);
    },

    // add threat analysis
    addThreatAnalysis() {
      this.userAdmin
        .addthreatAnalysis(
          this.threatInputData.threat_code,
          this.threatInputData.main_category,
          this.threatInputData.middle_class,
          this.threatInputData.threats,
          this.threatInputData.confidentiality,
          this.threatInputData.integrity,
          this.threatInputData.availability,
          this.threatId
        )
        .then((res) => {
          if (res.status == 200) {
            this.addThreat = false;
            if (this.addThreat == true) {
              this.addThreatItem = "뒤로가기";
            } else {
              this.addThreatItem = "항목 추가하기";
            }
            this.mainCategoryList();
            this.getThreatAnalysisSettingsList();
            const inputGroup = document.getElementById("add_threat");
            const inputs = inputGroup.getElementsByTagName("input");
            for (let i = 0; i < inputs.length; i++) {
              let id = inputs[i].getAttribute("id");
              document.getElementById(id).value = "";
            }
            this.threatInputData = {};
            Toast.fire({ title: "완료" });
            this.rankList = "";
            this.rankingDropdown();
          } else if (res.response.status == 400) {
            Toast.fire({ title: res.response.data.error });
            if (res.response.data.validation.body.keys == "threat_code") {
              Toast.fire({ title: "위협코드를 입력해주세요" });
            }
            if (res.response.data.validation.body.keys == "main_category") {
              Toast.fire({ title: "대분류를 입력해주세요" });
            }
            if (res.response.data.validation.body.keys == "middle_class") {
              Toast.fire({ title: "중분류를 입력해주세요" });
            }
            if (res.response.data.validation.body.keys == "threats") {
              Toast.fire({ title: "위협코드를 입력해주세요" });
            }
            if (res.response.data.validation.body.keys == "availability") {
              Toast.fire({ title: "가용성을 입력해주세요" });
            }
            if (res.response.data.validation.body.keys == "confidentiality") {
              Toast.fire({ title: "기밀성을 입력해주세요" });
            }
            if (res.response.data.validation.body.keys == "integrity") {
              Toast.fire({ title: "무결성을 입력해주세요" });
            }
            if (res.response.data.validation.body.keys == "threat_ranking") {
              Toast.fire({ title: "위협을 입력해주세요" });
            }
          }
        })
        .catch((err) => {
          return;
        });
    },

    // all threat select check box
    selectThreatAll() {
      if (!this.allThreatSelected) {
        const selected = this.threatSettingList.map((u) => u.id);
        this.selectedThreatItem = selected;
        this.selectedThreat = this.threatSettingList.map((u) => {
          return u.id;
        });
      } else {
        this.selectedThreatItem = [];
        this.selectedThreat = [];
      }
    },

    //threat checkbox select event
    selectSingleThreat(event) {
      const id = event.target.value;
      const click = event.target.checked;
      this.allThreatSelected = false;
      const obj = this.threatSettingList.find((x) => x.id == id);
      if (click) {
        this.selectedThreat.push(obj.id);
      } else {
        this.selectedThreat.splice(this.selectedThreat.indexOf(obj.id), 1);
      }
      if (this.selectedThreat.length == this.threatSettingList.length) {
        this.allThreatSelected = true;
      }
    },

    //remove threat analysis
    removeThreatAnalysis() {
      if (this.selectedThreat) {
        this.userAdmin
          .deleteThreatAnalysis(this.selectedThreat)
          .then((res) => {
            if (res.status == 200) {
              this.mainCategoryList();
              this.getThreatAnalysisSettingsList();
              Toast.fire({ title: res.data.message });
            }
          })
          .catch((err) => {
            return;
          });
      } else {
        // console.log("select any");
      }
    },

    //update threat analysis
  },
};
</script>


<style lang="scss">
.with_short {
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    margin-left: 5px;
  }
}

.tab-select {
  flex-direction: column;

  .select_wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 30px;
  }
}

.add_row {
  display: none;
  grid-template-columns: auto auto auto auto;
  margin-top: 20px;
  gap: 10px;

  &.show {
    display: grid;
  }

  .form_group {
    input {
      border: 1px solid #a4a4a4;
      padding: 10px;
      width: 100%;
      border-radius: 5px;
    }
  }
}

.tableInput {
  border: 1px solid #a4a4a4;
  // width: 100%;
  border-radius: 5px;
}
.menu{
  textarea{
    background-color: #FBEBEA;
    min-height: 200px;
  }
}
 textarea{
    min-height: 200px;
    background:transparent;
  }
</style>