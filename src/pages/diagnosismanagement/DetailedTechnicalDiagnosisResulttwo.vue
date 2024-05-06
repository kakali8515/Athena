<template>
  <div class="info_protection">
    <div class="breadcrumb">
      <Breadcrumb
        link="/dashboard"
        text1="Home"
        text2="진단관리"
        text3="기술적 진단"
        link2="../../detailedResult"
      />
      <!-- <p>
        <a href="#">Home </a><span>></span> diagnosis management<span>></span>
        technical diagnosis
      </p> -->
    </div>
    <div class="heading flex justify-between align-end">
      <h4>기술적 진단 상세결과({{this.$route.params.catName}})</h4>
      <div class="history_wrap">
        <div class="">
          <ul>
            <li>
              (초행진단) <span class="skyblue m-l-10">전체항목</span>:
              {{ $store.state.diagnosisManagement.allCount.prev }}
            </li>
            <li>
              <span class="blue">양호</span>:
              {{ $store.state.diagnosisManagement.initialCount.good }}
            </li>
            <li>
              <span class="red">취약</span>:{{
                $store.state.diagnosisManagement.initialCount.weak
              }}
            </li>
            <li>
              <span class="skyblue">N/A</span>:
              {{ $store.state.diagnosisManagement.initialCount.na }}
            </li>
            <li>
              <span class="orange">수동</span>:
              {{ $store.state.diagnosisManagement.initialCount.manual }}
            </li>
          </ul>
          <ul v-show="isComplete">
            <li>
              (이행진단) <span class="skyblue m-l-10">전체항목</span>:
              {{ $store.state.diagnosisManagement.allCount.current }}
            </li>
            <li>
              <span class="blue">양호</span>:
              {{ $store.state.diagnosisManagement.finalCount.good }}
            </li>
            <li>
              <span class="red">취약</span>:
              {{ $store.state.diagnosisManagement.finalCount.weak }}
            </li>
            <li>
              <span class="skyblue">N/A</span>:
              {{ $store.state.diagnosisManagement.finalCount.na }}
            </li>
            <li>
              <span class="orange">수동</span>:
              {{ $store.state.diagnosisManagement.finalCount.manual }}
            </li>
          </ul>
        </div>
        <div class="flex items-center">
          <input
            @change="importPrevCheck"
            ref="importPreviousCheck"
            id="link-checkbox"
            type="checkbox"
            value=""
            class="
              w-4
              h-4
              text-blue-600
              bg-gray-100
              rounded
              border-gray-300
              dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600
            "
          />
          <label
            for="link-checkbox"
            class="
              text-sm
              font-medium
              text-gray-900
              dark:text-gray-300
              checkbox-element
            "
            >이전현황 불러오기</label
          >
        </div>
      </div>
    </div>
    <div class="policy_setting_wrap">
      <div class="datatable_head mb0 flex justify-between m-t-0">
        <div class="oneside flex justify-start">
          <div class="select_wrap">
            <label>자산구분</label>
            <select
              v-model="assetCategory"
              @change="getParams($event)"
              class="select_param"
            >
              <option value="">전체</option>
              <option
                v-for="(asset, index) in $store.state.diagnosisManagement
                  .assetClassificationList"
                :key="index"
                :value="asset.value"
              >
                {{ asset.name }}
              </option>
              <!-- <option>Asset Classification</option>
                    <option>Asset Classification</option>
                    <option>Asset Classification</option> -->
            </select>
          </div>
          <div class="select_wrap">
            <label>자산코드</label>
            <select
              class="select_param"
              v-model="assetCode"
              @change="getParams($event)"
            >
              <option value="">전체</option>
              <option
                v-for="(asset, index) in $store.state.diagnosisManagement
                  .assetCodeList"
                :key="index"
                :value="asset.asset_code"
              >
                {{ asset.asset_code }}
              </option>
              <!-- <option>Asset Code</option>
              <option>Asset Code</option>
              <option>Asset Code</option> -->
            </select>
          </div>
          <div class="select_wrap">
            <label>점검항목</label>
            <select
              class="select_param"
              v-model="itemCode"
              @change="getParams($event)"
            >
              <option value="">전체</option>
              <option
                v-for="(asset, index) in $store.state.diagnosisManagement
                  .itemCodeList"
                :key="index"
                :value="asset.code"
              >
                {{ asset.code }}
              </option>
              <!-- <option>Checklist</option>
              <option>Checklist</option>
              <option>Checklist</option> -->
            </select>
          </div>
          <div class="select_wrap">
            <label>점검결과</label>
            <select
              v-model="testResult"
              @change="getParams($event)"
              class="select_param"
            >
              <option value="">전체</option>
              <option
                v-for="(result, index) in Object.entries(
                  $store.state.diagnosisManagement.testResultList
                )"
                :value="result[0]"
                :key="index"
              >
                {{ result[1] }}
              </option>
            </select>
          </div>
        </div>
        <div class="oneside flex justify-end">
          <button type="button">가이드라인 보기</button>
        </div>
      </div>
    </div>
    <div class="datatable_wrap">
      <ul
        class="
          nav nav-tabs
          flex flex-col
          md:flex-row
          flex-wrap
          list-none
          border-b-0
          pl-0
          mb-4
        "
        id="tabs-tab"
        role="tablist"
      >
        <li
          class="nav-item"
          role="presentation"
          @click="getOngoingDiagnosisResult"
        >
          <a
            href="#tabs-one"
            class="
              nav-link
              block
              font-medium
              text-xs
              leading-tight
              uppercase
              border-x-0 border-t-0 border-b-2 border-transparent
              px-6
              py-3
              my-2
              hover:border-transparent hover:bg-gray-100
              focus:border-transparent
            "
            id="tabs-one-tab"
            data-bs-toggle="pill"
            data-bs-target="#tabs-one"
            role="tab"
            aria-controls="tabs-one"
            aria-selected="true"
            >진행 중 자산(초행/이행 진단 진행 중)</a>
        </li>
        <li
          class="nav-item"
          role="presentation"
          @click="getCompleteDiagnosisResult"
        >
          <a
            href="#tabs-two"
            class="
              nav-link
              block
              font-medium
              text-xs
              leading-tight
              uppercase
              border-x-0 border-t-0 border-b-2 border-transparent
              px-6
              py-3
              my-2
              hover:border-transparent hover:bg-gray-100
              focus:border-transparent
              active
            "
            id="tabs-two-tab"
            data-bs-toggle="pill"
            data-bs-target="#tabs-two"
            role="tab"
            aria-controls="tabs-two"
            aria-selected="false"
            >완료 자산(초행/이행 진단 완료)</a
          >
        </li>
      </ul>
      <div class="tab-content" id="tabs-tabContent">
        <div
          class="tab-pane fade"
          id="tabs-one"
          role="tabpanel"
          aria-labelledby="tabs-one-tab"
        >
          <DetailedResultServerDataTable
            @pagination="paginationCallOne"
            :importPrev="isImportPrev"
          />
        </div>
        <div
          class="tab-pane fade show active"
          id="tabs-two"
          role="tabpanel"
          aria-labelledby="tabs-two-tab"
        >
          <DetailedResultServerDataTable
            @pagination="paginationCallTwo"
            :importPrev="isImportPrev"
          />
        </div>
        <!-- <div
          class="tab-pane fade"
          id="tabs-three"
          role="tabpanel"
          aria-labelledby="tabs-three-tab"
        >
          Tab 3 content
        </div>
        <div
          class="tab-pane fade"
          id="tabs-four"
          role="tabpanel"
          aria-labelledby="tabs-four-tab"
        >
          Tab 4 content
        </div>
        <div
          class="tab-pane fade"
          id="tabs-five"
          role="tabpanel"
          aria-labelledby="tabs-five-tab"
        >
          Tab 5 content
        </div> -->
      </div>
    </div>
    <div class="button_wrap fixed-button-wrap flex justify-between">
      <div class="buttons flex justify-start">
        <button type="button" class="gray" @click="downloadResultReport">
          결과보고서 다운로드
        </button>
      </div>
      <!-- <div class="buttons flex justify-end">
        <button type="button">My Revision History</button>
        <button type="button">Save</button>
      </div> -->
    </div>
  </div>
</template>


<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import DetailedResultServerDataTable from "@/components/DetailedResultServerDataTable.vue";
import TechnicalDiagnosticResultsService from "@/services/TechnicalDiagnosticResultsService.js";
import Toast from "@/alert/alert.js";


export default {
  name: "DetailedTechnicalDiagnosisResulttwo",
  components: {
    //   DonutChart,
    //   radarchart,
    // stackchart
    Breadcrumb,
    DetailedResultServerDataTable,
  },

  data() {
    return {
      categoryId: this.$route.params.id,
      certificate: this.$store.state.header.certificate,
      assetCategory: "",
      testResult: "",
      itemCode: "",
      assetCode: "",
      diagnosisResultType: "completed",
      isOngoing: false,
      isComplete: "",
      isImportPrev: false,
      page: 1,
      limit: 50,
    };
  },
  created() {
    this.technicalDiagnosticResultsService =
      new TechnicalDiagnosticResultsService();

    this.$store.dispatch("diagnosisManagement/getAssetClassification", {
      id: this.categoryId,
    });
    this.$store.dispatch("diagnosisManagement/getTestResultList");
    this.$store.dispatch("diagnosisManagement/getAssetCodeList", {
      id: this.categoryId,
      certificate: this.$store.state.header.certificate,
    });
    this.$store.dispatch("diagnosisManagement/getItemCodeList", {
      id: this.categoryId,
      certificate: this.$store.state.header.certificate,
    });

    this.getCompleteDiagnosisResult();
    this.getDiagnosisResultCount();
  },
  watch: {
    // calling all the functions with certification dependency on certificate change
    "$store.state.header.certificate": function (newVal, oldVal) {
      if (newVal != oldVal) {
        this.$store.dispatch("diagnosisManagement/getAssetCodeList", {
          id: this.categoryId,
          certificate: this.$store.state.header.certificate,
        });
        this.$store.dispatch("diagnosisManagement/getItemCodeList", {
          id: this.categoryId,
          certificate: this.$store.state.header.certificate,
        });

        // checking which status is active
        if (this.diagnosisResultType == "complete") {
          this.getCompleteDiagnosisResult();
        }

        if (this.diagnosisResultType == "ongoing") {
          this.getOngoingDiagnosisResult();
        }

        this.getDiagnosisResultCount();
      }
    },
  },

  methods: {
    // for ongoing diagnosis tab
    getOngoingDiagnosisResult() {
      if (this.isOngoing) {
        return;
      }
      this.diagnosisResultType = "ongoing";
      this.resetSelectedParams();
      this.isOngoing = true; // this is to prevent calling same API on
      this.isComplete = false; // clicking same active tab
      let credentials = {
        page: this.page,
        limit: this.limit,
        certification: this.$store.state.header.certificate,
        searchByAssetCategory: this.categoryId,
        searchByDiagnosisResults: this.diagnosisResultType,
        searchByAssetClassification: "", //Optional
        searchByTestResults: "", //Optional
        searchByItemCode: "",
        searchByAssetCode: "",
      };

      this.$store.dispatch(
        "diagnosisManagement/getDiagnosisResult",
        credentials
      );
    },

    // for complete diagnosis tab
    getCompleteDiagnosisResult() {
      if (this.isComplete) {
        return;
      }
      this.diagnosisResultType = "completed";
      this.resetSelectedParams();
      this.isOngoing = false; // this is to prevent calling same API on
      this.isComplete = true; // clicking same active tab
      let credentials = {
        page: this.page,
        limit: this.limit,
        certification: this.$store.state.header.certificate,
        searchByAssetCategory: this.categoryId,
        searchByDiagnosisResults: this.diagnosisResultType,
        searchByAssetClassification: "", //Optional
        searchByTestResults: "", //Optional
        searchByItemCode: "",
        searchByAssetCode: "",
      };

      this.$store.dispatch(
        "diagnosisManagement/getDiagnosisResult",
        credentials
      );
    },

    // to get result count
    getDiagnosisResultCount() {
      let credentials = {
        category_id: this.categoryId,
        certification: this.$store.state.header.certificate,
      };
      this.$store.dispatch("diagnosisManagement/getResultCount", credentials);
    },

    // it will fire when any dropdown will be selected
    getParams() {
      let credentials = {
        page: 1,
        limit: 50,
        certification: this.$store.state.header.certificate,
        searchByAssetCategory: this.categoryId,
        searchByDiagnosisResults: this.diagnosisResultType,
        searchByAssetClassification: this.assetCategory, //Optional
        searchByTestResults: this.testResult, //Optional
        searchByItemCode: this.itemCode,
        searchByAssetCode: this.assetCode,
      };

      this.$store.dispatch(
        "diagnosisManagement/getDiagnosisResult",
        credentials
      );
    },

    // it will reset all selected params after a tab is selected
    resetSelectedParams() {
      const selectedParams = document.querySelectorAll(".select_param");
      selectedParams.forEach((element) => {
        element.value = "";
      });
      this.assetCategory = "";
      this.testResult = "";
      this.itemCode = "";
      this.assetCode = "";
    },

    // it will fire for each pagination change
    paginationCallOne(clickedPage) {
      this.page = clickedPage;
      let credentials = {
        page: this.page,
        limit: this.limit,
        certification: this.$store.state.header.certificate,
        searchByAssetCategory: this.categoryId,
        searchByDiagnosisResults: this.diagnosisResultType,
        searchByAssetClassification: this.assetCategory, //Optional
        searchByTestResults: this.testResult, //Optional
        searchByItemCode: this.itemCode,
        searchByAssetCode: this.assetCode,
      };

      this.$store.dispatch(
        "diagnosisManagement/getDiagnosisResult",
        credentials
      );
      //alert("One");
    },

    // it will fire for each pagination change
    paginationCallTwo(clickedPage) {
      this.page = clickedPage;
      let credentials = {
        page: this.page,
        limit: this.limit,
        certification: this.$store.state.header.certificate,
        searchByAssetCategory: this.categoryId,
        searchByDiagnosisResults: this.diagnosisResultType,
        searchByAssetClassification: this.assetCategory, //Optional
        searchByTestResults: this.testResult, //Optional
        searchByItemCode: this.itemCode,
        searchByAssetCode: this.assetCode,
      };

      this.$store.dispatch(
        "diagnosisManagement/getDiagnosisResult",
        credentials
      );
      //alert("Two");
    },

    // it will show columns on checkbox select
    importPrevCheck() {
      if (this.$refs.importPreviousCheck.checked == true) {
        this.isImportPrev = true;
      } else {
        this.isImportPrev = false;
      }
    },

    downloadResultReport() {
      let credentials = {
        category_id: this.categoryId, //required
        certification: this.$store.state.header.certificate, //required,
        searchByTestResults: this.testResult, //Optional
        searchByItemCode: this.itemCode,
        searchByAssetCode: this.assetCode, //optional
        searchByAssetClassification: this.assetCategory,
      };
      this.technicalDiagnosticResultsService
        .downloadDiagnosisResult(credentials)
        .then((res) => {
          if (res.status == 200) {
            let path = res.data.path;
            path = path + "type=unlink";
            let data = { url: path, fileName: "Diagnosis-result" };
            this.$store.dispatch(
              "diagnosisManagement/createDownloadFiles",
              data
            );
          }
          else if (res.response.status == 401) {
            Toast.fire({ title: res.response.data.error });
          }
          else{
            return;
          }
        });
    },
  },
};
</script>


<style lang="scss">
</style>