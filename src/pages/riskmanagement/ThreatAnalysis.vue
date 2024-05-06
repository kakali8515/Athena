<template>
  <div class="info_protection">
    <div class="breadcrumb">
      <Breadcrumb link="dashboard" text1="Home" text2="위협분석" />
    </div>
    <div class="heading flex justify-between item-center">
      <h4>위협평가 결과</h4>
      <div class="history_wrap">
        <div class="">
          <button type="button" @click="openCalculationModal">평가기준</button>
        </div>
      </div>
    </div>
    <div class="managmenttable">
      <SortingDropdown
        :obj="riskThreatAnalysisfFilterData"
        @selectedCol="selectedCol"
        @selectedOrd="selectedOrd"
      />
      <DataTable
        :HeadersColumn="colData"
        :BodyData="threatData"
        :rowClickable="true"
        :Page="page"
        :records="totalItems"
        :options="chunkPage"
        :perPage="limit"
        @clickPaginate="myCallback($event)"
      />
    </div>
    <div class="button_wrap fixed-button-wrap flex justify-between">
      <div class="buttons flex justify-start">
        <button @click="downloadResult" type="button" class="gray">
          분석 결과 다운로드
        </button>
      </div>
    </div>
  </div>

  <CalculationStandardmodal
    v-if="isCalculation"
    @close="closeCalculationStandard"
  />
</template>


<script>
import DataTable from "@/components/DataTable.vue";
import { ThreatAnalysisCol } from "@/config/TableColData";
import RiskMgmntService from "@/services/RiskMgmntService";
import Breadcrumb from "@/components/Breadcrumb.vue";
import CalculationStandardmodal from "@/components/modals/EvaluationStandardModal.vue";
import { riskThreatAnalysisfFilterData } from "@/config/SortingDropdownData";
import SortingDropdown from "@/components/SortingDropdown.vue";
import Toast from "@/alert/alert.js";



export default {
  name: "ThreatAnalysis",
  components: {
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
      colData: ThreatAnalysisCol,
      threatData: [],
      type: "threat_analysis",
      isCalculation: false,
      riskThreatAnalysisfFilterData: riskThreatAnalysisfFilterData,
      sort_by: "",
      sortOrder: "",
    };
  },
  created() {
    this.riskMgmntService = new RiskMgmntService();
  },
  mounted() {
    this.getThreatAnalysis();
  },
  watch: {
    "$store.state.header.certificate": function (newVal, oldVal) {
      if (newVal != oldVal && newVal) {
        this.getThreatAnalysis();
      }
    },
  },
  methods: {
    selectedCol(value) {
      this.sort_by = value;
      this.getThreatAnalysis();
    },
    selectedOrd(value) {
      this.sortOrder = value;
      this.getThreatAnalysis();
    },
    getThreatAnalysis() {
      this.riskMgmntService
        .threatAnalysis(
          this.page,
          this.limit,
          this.$store.state.header.certificate,
          this.sort_by,
          this.sortOrder
        )
        .then((res) => {
          if (res.status == 200) {
            this.threatData = res.data.threat_analysis;
            this.totalItems = res.data.total_records;
          }
        });
    },
    downloadResult() {
      this.riskMgmntService
        .threatDownload(
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
            link.setAttribute("download", "ThreatDownload");
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
    myCallback(ClickPage) {
      this.page = ClickPage;
      this.getThreatAnalysis();
    },

    openCalculationModal() {
      console.log('object1');
      this.isCalculation = true;
      console.log('object2');
    },

    closeCalculationStandard() {
      this.isCalculation = false;
    },
  },
};
</script>


<style lang="scss">
</style>