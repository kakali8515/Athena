<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto protection_table">
      <div class="inline-block min-w-full">
        <div class="overflow-hidden">
          <!-- <h1>{{ categoryId}}</h1> -->
          <table class="min-w-full text-center">
            <thead class="bg-gray-50" v-if="diagnosisDynamicColumns.length > 0">
              <tr>
                <th
                  scope="col"
                  class="
                    text-sm
                    font-medium
                    text-gray-900
                    px-6
                    py-4
                    white-space
                  "
                ></th>
                <th
                  scope="col"
                  class="
                    text-sm
                    font-medium
                    text-gray-900
                    px-6
                    py-4
                    white-space
                  "
                >
                  No
                </th>
                <th
                  scope="col"
                  class="
                    text-sm
                    font-medium
                    text-gray-900
                    px-6
                    py-4
                    white-space
                  "
                >
                  진단상태
                   <!-- <img src="@/assets/icon/DownSquare.svg" /> -->
                </th>
                <!-- <div  > -->

                <th
                  scope="col"
                  class="
                    text-sm
                    font-medium
                    text-gray-900
                    px-6
                    py-4
                    white-space
                  "
                  v-for="(column, i) in diagnosisDynamicColumns"
                  :key="i"
                >
                  {{ column.field_name }}
                  <!-- <img src="@/assets/icon/DownSquare.svg" /> -->
                </th>
              </tr>
            </thead>
            <tbody v-if="diagnosisDynamicTableData.length > 0">
              <tr
                class="bg-white border-b"
                v-for="(row, i) in diagnosisDynamicTableData"
                :key="i"
              >
                <td class="text-sm text-gray-900 font-light px-6 py-4">
                  <div class="flex items-center">
                    <input
                      v-if="
                        row.diagnosis_status != '1st_ongoing' &&
                        row.diagnosis_status != '2nd_ongoing'
                      "
                      name="check"
                      :id="'default-checkbox-' + row.asset_id"
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
                        my-checkSelect
                      "
                      :disabled="
                        (selectedDiagnosisStatus != '' &&
                          selectedDiagnosisStatus != row.diagnosis_status) ||
                        (selectedRiskCode != '' &&
                          selectedRiskCode != row.technical_risk_code) ||
                        (selectedTemplateId != '' &&
                          isSelect &&
                          selectedTemplateId != row.used_template_id) ||
                        row.diagnosis_status == '2nd_complete' ||
                        isProcessingSelect == true
                      "
                      @change="
                        manageCheckBox(
                          $event,
                          row.asset_id,
                          row.diagnosis_status,
                          row.technical_risk_code,
                          row.used_template_id
                        )
                      "
                    />
                    <input
                      v-if="
                        row.diagnosis_status == '1st_ongoing' ||
                        row.diagnosis_status == '2nd_ongoing'
                      "
                      name="check"
                      :id="'default-checkbox-' + row.asset_id"
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
                        my-checkSelect
                      "
                      :disabled="
                        (selectedDiagnosisStatus != '' &&
                          row.diagnosis_status != '1st_ongoing' &&
                          row.diagnosis_status != '2nd_ongoing') ||
                        isSelect
                      "
                      @change="
                        manageCheckBox2(
                          $event,
                          row.asset_id,
                          row.diagnosis_status,
                          row.technical_risk_code,
                          row.used_template_id
                        )
                      "
                    />
                  </div>
                </td>

                <td
                  @click="getRouteParams(row.diagnosis_status, row.asset_id)"
                  class="
                    text-sm text-gray-900
                    font-light
                    px-6
                    py-4
                    cursor-pointer
                  "
                >
                  {{ (page - 1) * limit + i + 1 }}
                </td>
                <td
                  @click="getRouteParams(row.diagnosis_status, row.asset_id)"
                  class="
                    text-sm text-gray-900
                    font-light
                    px-6
                    py-4
                    cursor-pointer
                  "
                >
                  <span v-if="row.diagnosis_status == 'not_yet'">미진단</span>
                  <span v-if="row.diagnosis_status == '1st_ongoing'"
                    >진행중</span
                  >
                  <span v-if="row.diagnosis_status == '1st_complete'"
                    >진단완료</span
                  >
                  <span v-if="row.diagnosis_status == '2nd_ongoing'"
                    >이행중</span
                  >
                  <span v-if="row.diagnosis_status == '2nd_complete'"
                    >이행완료</span
                  >
                </td>
                <td
                  class="
                    text-sm text-gray-900
                    font-light
                    px-6
                    py-4
                    cursor-pointer
                  "
                  v-for="(cell, index) in row.row_item"
                  :key="index"
                  @click="getRouteParams(row.diagnosis_status, row.asset_id)"
                >
                  {{ cell.field_value }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!-- <Pagination /> -->
  <pagination
    v-model="page"
    :records="totalRecords"
    :per-page="limit"
    @paginate="myCallback"
  />
</template>

<script>
//import Pagination from '@/components/Pagination.vue';
import TechnicalDiagnosticResultsService from "@/services/TechnicalDiagnosticResultsService";
export default {
  name: "DetailedResultDataTable",
  components: {
    //Pagination,
  },
  props: {
    searchCategory: String,
    searchText: String,
    categoryId: Number,
    changeTab: String,
    activeId: Number,
    diagnosis_list_status: String,
  },
  data() {
    return {
      page: 1,
      totalRecords: "",
      limit: 50,
      columnList: [],
      current: 1,
      search_by: "",
      search_text: "",
      diagnosisDynamicColumns: [],
      diagnosisDynamicTableData: [],
      selectedrowId: [],
      selectedDiagnosisStatus: "",
      selectedRiskCode: "",
      selectedTemplateId: "",
      isSelect: false,
      isProcessingSelect: false,
    };
  },
  created() {
    this.technicalDiagnosticResultsService =
      new TechnicalDiagnosticResultsService();
  },

  beforeMount() {
    if (this.activeId == this.categoryId) {
      this.getTableColumns();
      this.getTableData(
        this.page,
        this.limit,
        this.search_by,
        this.search_text,
        this.categoryId,
        this.diagnosis_list_status
      );
    }
  },

  watch: {
    searchCategory: function (newVal, oldVal) {
      if (newVal && newVal != oldVal) {
        this.search_by = newVal;
        if (this.activeId == this.categoryId) {
          this.getTableColumns();
          this.getTableData(
            this.page,
            this.limit,
            newVal,
            this.searchText,
            this.categoryId,
            this.diagnosis_list_status
          );
        }
      }
    },

    searchText: function (newVal, oldVal) {
      if (newVal && newVal != oldVal) {
        this.search_text = newVal;
        this.getTableData(
          this.page,
          this.limit,
          this.searchCategory,
          newVal,
          this.categoryId,
          this.diagnosis_list_status
        );
        newVal = "";
      }
    },

    diagnosis_list_status: function (newVal, oldVal) {
      if (newVal && newVal != oldVal) {
        this.getTableData(
          this.page,
          this.limit,
          this.searchCategory,
          newVal,
          this.categoryId,
          newVal
        );
      }
    },

    changeTab: function (newVal, oldVal) {
      if (newVal != oldVal) {
        (this.page = 1), (this.search_by = "");
        this.search_text = "";
        if (this.activeId == this.categoryId) {
          this.getTableColumns();
          this.getTableData(
            this.page,
            this.limit,
            this.search_by,
            this.search_text,
            this.categoryId,
            this.diagnosis_list_status
          );
        }
      }
    },

    "$store.state.diagnosisManagement.emptyCheckBox": function (
      newVal,
      oldVal
    ) {
      if (newVal) {
        Array.from(document.querySelectorAll(".my-checkSelect")).forEach(
          (element) => {
            element.checked = false;
          }
        );
        this.isSelect = false;
        this.isProcessingSelect = false;
        this.selectedrowId = [];
        this.$emit("rowID", this.selectedrowId);
        this.selectedDiagnosisStatus = "";
        this.selectedRiskCode = "";
        this.selectedTemplateId = "";
        this.$emit("diagnosisStatus", "");
        this.$emit("technical_risk_code", "");
        this.$emit("used_template_id", "");
      }
    },
    "$store.state.diagnosisManagement.isDiagnosisComplete": function (
      newVal,
      oldVal
    ) {
      if (newVal != oldVal) {
        if (this.activeId == this.categoryId) {
          this.getTableColumns();
          this.getTableData(
            this.page,
            this.limit,
            this.search_by,
            this.search_text,
            this.categoryId,
            this.diagnosis_list_status
          );
          this.isSelect = false;
          this.isProcessingSelect = false;
          this.selectedrowId = [];
          this.selectedDiagnosisStatus = "";
          this.selectedRiskCode = "";
          this.selectedTemplateId = "";
          this.$emit("rowID", this.selectedrowId);
          this.$emit("diagnosisStatus", "");
          this.$emit("technical_risk_code", "");
          this.$emit("used_template_id", "");
        }
      }
    },

    "$store.state.header.certificate": function (newVal, oldVal) {
      if (newVal != oldVal) {
        if (this.activeId == this.categoryId) {
          this.getTableColumns();
          this.getTableData(
            this.page,
            this.limit,
            this.search_by,
            this.search_text,
            this.categoryId,
            this.diagnosis_list_status
          );
        }
      }
    },
  },
  methods: {
    getTableColumns() {
      if (this.activeId == this.categoryId) {
        this.technicalDiagnosticResultsService
          .showColumnList(this.categoryId)
          .then((res) => {
            // console.log("DynamicshowColumn", res);
            if (res.status == 200) {
              //Object.assign(obj, { column_list: res.data.list_of_column });
              this.diagnosisDynamicColumns = res.data.list_of_column;
              // console.log(
              //   "DynamicshowColumn-insidetable",
              //   this.diagnosisDynamicColumns
              // );
            }
          });
      }
    },

    getTableData(
      _page,
      _limit,
      searchAsset = "",
      searchText = "",
      id,
      diagnosis_list_status
    ) {
      if (this.activeId != this.categoryId) {
        return;
      }
      let credentials = {
        page: _page,
        limit: _limit,
        search_by: searchAsset,
        search_text: searchText,
        category_id: id,
        certification: this.$store.state.header.certificate,
        diagnosis_status: diagnosis_list_status,
      };
      this.technicalDiagnosticResultsService
        .diagnosisList(credentials)
        .then((res) => {
          // console.log("diagnosis-list", res);
          //commit('getDiagnosisList', res.data)
          if (res.status == 200) {
            this.diagnosisDynamicTableData =
              res.data.technical_diagnosis_settings;
            this.totalRecords = res.data.total_records;
            // console.log("diagnosis-list-table", this.diagnosisDynamicTableData);
            this.$store.state.diagnosisManagement.isDiagnosisComplete = false;
            this.$store.state.diagnosisManagement.emptyCheckBox = false;
            this.isSelect = false;
            this.isProcessingSelect = false;
            this.selectedrowId = [];
            this.$emit("rowID", this.selectedrowId);
            this.selectedDiagnosisStatus = "";
            this.selectedRiskCode = "";
            this.selectedTemplateId = "";
            this.$emit("diagnosisStatus", "");
            this.$emit("technical_risk_code", "");
            this.$emit("used_template_id", "");
          }
        });
    },
    myCallback(clicked) {
      this.page = clicked;
      //alert(clicked)
      this.getTableData(
        this.page,
        this.limit,
        this.search_by,
        this.search_text,
        this.categoryId
      );
      //this.$emit("pagination", this.page)
    },

    manageCheckBox(
      $event,
      rowId,
      diagnosisStatus,
      technical_risk_code,
      used_template_id
    ) {
      if ($event.target.checked) {
        // Array.from(document.querySelectorAll(".my-checkSelect")).forEach(
        //   (element) => {
        //     element.checked = false;
        //   }
        // );
        //this.$store.dispatch("diagnosisManagement/doEmptyCheckBox", false);

        $event.target.checked = true;
        this.selectedrowId.push(Number(rowId));
        this.selectedDiagnosisStatus = diagnosisStatus;
        this.selectedRiskCode = technical_risk_code;
        this.selectedTemplateId = used_template_id;
        this.isSelect = true;
        this.isProcessingSelect = false;
        this.$emit("rowID", this.selectedrowId);
        this.$emit("diagnosisStatus", this.selectedDiagnosisStatus);
        this.$emit("technical_risk_code", this.selectedRiskCode);
        this.$emit("used_template_id", this.selectedTemplateId);
        console.log(this.selectedrowId);
      } else {
        this.selectedrowId.splice(this.selectedrowId.indexOf(Number(rowId)), 1);
        $event.target.checked = false;
        this.$emit("rowID", this.selectedrowId);
        console.log(this.selectedrowId);
        if (this.selectedrowId.length == 0) {
          this.selectedDiagnosisStatus = "";
          this.selectedRiskCode = "";
          this.selectedTemplateId = "";
          this.isSelect = false;
          this.isProcessingSelect = false;

          this.$emit("diagnosisStatus", "");
          this.$emit("technical_risk_code", "");
          this.$emit("used_template_id", "");
        }
      }
    },

    manageCheckBox2(
      $event,
      rowId,
      diagnosisStatus,
      technical_risk_code,
      used_template_id
    ) {
      if ($event.target.checked) {
        $event.target.checked = true;
        this.selectedrowId.push(Number(rowId));
        this.selectedDiagnosisStatus = diagnosisStatus;
        this.selectedRiskCode = technical_risk_code;
        this.selectedTemplateId = used_template_id;
        this.isProcessingSelect = true;
        this.isSelect = false;
        this.$emit("rowID", this.selectedrowId);
        this.$emit("diagnosisStatus", this.selectedDiagnosisStatus);
        this.$emit("technical_risk_code", this.selectedRiskCode);
        this.$emit("used_template_id", this.selectedTemplateId);
      } else {
        this.selectedrowId.splice(this.selectedrowId.indexOf(Number(rowId)), 1);
        $event.target.checked = false;
        this.$emit("rowID", this.selectedrowId);

        if (this.selectedrowId.length == 0) {
          this.selectedDiagnosisStatus = "";
          this.selectedRiskCode = "";
          this.selectedTemplateId = "";
          this.isProcessingSelect = false;
          this.isSelect = false;

          this.$emit("diagnosisStatus", "");
          this.$emit("technical_risk_code", "");
          this.$emit("used_template_id", "");
        }
      }
    },

    getRouteParams(_status, _aid) {
      this.$emit("routeID", {
        status: _status,
        aid: _aid,
        cid: this.categoryId,
      });
    },
  },
};
</script>

<style scoped>
</style>