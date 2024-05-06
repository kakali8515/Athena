<template>
  <div class="info_protection">
    <div class="breadcrumb">
      <Breadcrumb link="dashboard" text1="Home" text2="위험관리" />
    </div>
    <div class="heading flex justify-between item-center">
      <h4>위험평가 결과</h4>
      <div class="history_wrap">
        <button type="button" @click="openCalculationModal">평가기준</button>
      </div>
    </div>

    <div class="managmenttable table-no-shadow">
      <div class="tab-style-two">
        <TabWrapper @getResponseTitle="getTitle($event)">
          <Tabs title="관리영역 (ISMS)">
            <SortingDropdown
              :obj="riskManagementAreaFilterData"
              @selectedCol="selectedCol"
              @selectedOrd="selectedOrd"
            />
            <DataTable
              :HeadersColumn="mgmntAreaColData"
              :BodyData="mgmntData"
              :rowClickable="true"
              @clickEvent="ShowDetails($event)"
              :Page="page"
              :records="totalItems"
              :options="chunkPage"
              :perPage="limit"
              @clickPaginate="myCallback($event)"
              clickCellIndex="1"
            />
          </Tabs>
          <Tabs title="기술영역">
            <SortingDropdown
              :obj="riskTechnicalAreaFilterData"
              @selectedCol="selectedColTechnical"
              @selectedOrd="selectedOrdTechnical"
            />
            <DataTable
              :HeadersColumn="technicalColData"
              :BodyData="technicalData"
              :rowClickable="true"
              @clickEvent="ShowDetails($event)"
              :Page="page"
              :records="totalItems2"
              :options="chunkPage"
              :perPage="limit"
              @clickPaginate="myCallback2($event)"
              clickCellIndex="1"
            />
          </Tabs>
        </TabWrapper>
      </div>
    </div>
    <div class="button_wrap fixed-button-wrap flex justify-between">
      <div class="buttons flex justify-start">
        <button @click="downloadResult" type="button" class="gray">
          분석 결과 다운로드
        </button>
      </div>
      <div class="buttons flex justify-end">
        <!-- <button type="button">My Revision History</button> -->
      </div>
    </div>
  </div>
  <CalculationStandardmodal
    v-if="isCalculation"
    @close="closeCalculationStandard"
  />
</template>

<script>
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import DataTable from "@/components/DataTable.vue";
import { diagnosisSettingCol } from "@/config/TableColData";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { technicalAreaCol, MgmntAreaCol } from "@/config/TableColData";
import RiskMgmntService from "@/services/RiskMgmntService";
import CalculationStandardmodal from "@/components/modals/EvaluationStandardModal.vue";
import {
  riskManagementAreaFilterData,
  riskTechnicalAreaFilterData,
} from "@/config/SortingDropdownData";
import SortingDropdown from "@/components/SortingDropdown.vue";
import Toast from "@/alert/alert.js";



export default {
  name: "RiskAssessmentResults",
  components: {
    Tabs,
    TabWrapper,
    DataTable,
    Breadcrumb,
    CalculationStandardmodal,
    SortingDropdown,
  },
  data() {
    return {
      InquiryList: [],
      page: 1,
      limit: 50,
      chunkPage: { chunk: 5 },
      totalItems: 0,
      technicalColData: technicalAreaCol,
      mgmntAreaColData: MgmntAreaCol,
      type: "management_area",
      mgmntData: [],
      technicalData: [],
      limit2: 50,
      page2: 1,
      totalItems2: 0,
      isCalculation: false,
      riskManagementAreaFilterData: riskManagementAreaFilterData,
      sort_by: "",
      sortOrder: "",
      riskTechnicalAreaFilterData: riskTechnicalAreaFilterData,
      sort_by_technical: "",
      sortOrderTechnical: "",
    };
  },
  created() {
    this.riskMgmntService = new RiskMgmntService();
  },
  mounted() {
    this.getTechData();
    this.getMgmntData();
  },
  watch: {
    "$store.state.header.certificate": function (newVal, oldVal) {
      if (newVal != oldVal && newVal) {
        this.getTechData();
        this.getMgmntData();
      }
    },
  },
  methods: {
    selectedCol(value) {
      this.sort_by = value;
      this.getMgmntData();
    },
    selectedOrd(value) {
      this.sortOrder = value;
      this.getMgmntData();
    },
    selectedColTechnical(value) {
      this.sort_by_technical = value;
      this.getTechData();
    },
    selectedOrdTechnical(value) {
      this.sortOrderTechnical = value;
      this.getTechData();
    },

    myCallback(ClickPage) {
      this.page = ClickPage;
      this.getMgmntData();
    },

    myCallback2(ClickPage) {
      this.page2 = ClickPage;
      this.getTechData();
    },

    getTechData() {
      this.riskMgmntService
        .technicalArea(
          this.page2,
          this.limit2,
          this.$store.state.header.certificate,
          this.sort_by_technical,
          this.sortOrderTechnical
        )
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data.technical_area_list);
            this.totalItems2 = res.data.total_records;
            this.technicalData = res.data.technical_area_list;
          }
        });
    },
    getMgmntData() {
      this.riskMgmntService
        .managementArea(
          this.page,
          this.limit,
          this.$store.state.header.certificate,
          this.sort_by,
          this.sortOrder
        )
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data.management_area_list);
            this.totalItems = res.data.total_records;
            this.mgmntData = res.data.management_area_list;
          }
        });
    },

    downloadManagementResult() {
      this.riskMgmntService
        .managementAreaDownload(
          this.type,
          this.$store.state.header.certificate,
          this.sort_by,
          this.sortOrder
        )
        .then((res) => {
          if (res.status == 200) {
            const url = `${process.env.VUE_APP_API_BASE_URL}/download/file?url=${res.data.path}&type=unlink`; // later required base url to dynamic
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "ManagementAreaDownload");
            document.body.appendChild(link);
            link.click();
          }
          else if (res.response.status == 401) {
            Toast.fire({ title: res.response.data.error });
          }
          else{
            return;
          }
        });
    },

    downloadTechnicalResult() {
      this.riskMgmntService
        .technicalAreaDownload(
          this.type,
          this.$store.state.header.certificate,
          this.sort_by_technical,
          this.sortOrderTechnical
        )
        .then((res) => {
          if (res.status == 200) {
            const url = `${process.env.VUE_APP_API_BASE_URL}/download/file?url=${res.data.path}&type=unlink`; // later required base url to dynamic
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "TechnicalAreaDownload");
            document.body.appendChild(link);
            link.click();
          }
          else if (res.response.status == 401) {
            Toast.fire({ title: res.response.data.error });
          }
          else{
            return;
          }
        });
    },

    downloadResult() {
      if (this.type == "management_area") {
        this.downloadManagementResult();
      }
      if (this.type == "technical_area") {
        this.downloadTechnicalResult();
      }
    },

    getTitle(e) {
      if (e == "관리영역 (ISMS)") {
        this.type = "management_area";
      }
      if (e == "기술영역") {
        this.type = "technical_area";
      }
    },

    openCalculationModal() {
      this.isCalculation = true;
    },

    closeCalculationStandard() {
      this.isCalculation = false;
    },
  },
};
</script>


<style lang="scss">
.limit_wrap{
  margin-bottom:15px !important;
}
</style>