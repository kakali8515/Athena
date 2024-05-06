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
              dark:ring-offset-gray-800
              dark:bg-gray-700 dark:border-gray-600
            "
          />
          <label
            for="link-checkbox"
            class="text-sm font-medium text-gray-900 dark:text-gray-300 checkbox-element"
            >이전형환 불러오기</label
          >
        </div>
      </div>
    </div>
    <div class="policy_setting_wrap">
      <div class="datatable_head mb0 flex justify-between m-t-0">
        <div class="oneside flex justify-start">
          <div class="select_wrap">
            <label>자산구분</label>
            <select v-model="assetCategory" class="select_param" disabled>
              <option value="">전체</option>
              <option
                v-for="(asset, index) in $store.state.diagnosisManagement
                  .assetClassificationList"
                :key="index"
                :value="asset.name"
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
            <select class="select_param" v-model="assetCode" disabled>
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
      <!-- <ul
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
            >Ongoing diagnosis (initial diagnosis completed -> transition
            diagnosis)</a
          >
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
            >Completed re-diagnosis (fulfillment diagnosis completed ->
            implementation diagnosis)</a
          >
        </li>
      </ul> -->
      <div class="tab-content" id="tabs-tabContent">
        <DetailedResultServerDataTable
        @assetValue="getAssetValues"
          @pagination="paginationCallOne"
          :importPrev="isImportPrev"
        />
        <!-- <div
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
        <div
          class="tab-pane fade"
          id="tabs-three"
          role="tabpanel"
          aria-labelledby="tabs-three-tab"
        >
          Tab 3 content
        </div> -->
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
        </div>
      </div>
    </div>
    <div class="button_wrap fixed-button-wrap flex justify-end">
      <!-- <div class="buttons flex justify-start">
        <button type="button" class="gray">Upload result report</button>
      </div> -->
      <div class="buttons flex justify-end">
        <!-- <button type="button">My Revision History</button> -->
        <button
          type="button"
          @click="$router.push('/detailedResult')"
        >
        뒤로가기
        </button>
      </div>
    </div>
  </div>
</template>


<script>
// import DonutChart from "./Donatchart.vue";
// import radarchart from "./radarchart.vue";
// import stackchart from "./stackchart.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import DetailedResultServerDataTable from "@/components/DetailedResultServerDataTable.vue";
export default {
  name: "DetailedTechnicalDiagnosisResultServerOnClick",
  components: {
    //   DonutChart,
    //   radarchart,
    // stackchart
    Breadcrumb,
    DetailedResultServerDataTable,
  },

  data() {
    return {
      assetCategory: "",
      classificationValue : "",
      testResult: "",
      itemCode: "",
      assetCode: "",
      //diagnosisResultType: this.$route.params.status,
      isOngoing: false,
      isComplete: true,
      isImportPrev: false,
      page: 1,
      limit: 50,
      assetId: this.$route.params.aid,
      categoryId: this.$route.params.cid,
      //diagnosisStatus: this.$route.params.status,
    };
  },
  created() {
    this.$store.dispatch("diagnosisManagement/getAssetClassification", {
      id: this.categoryId,
    });
    this.$store.dispatch("diagnosisManagement/getTestResultList");
    this.$store.dispatch("diagnosisManagement/getAssetCodeList", {
      id: this.categoryId,
      certificate: this.$store.state.header.certificate,
    });
    
    let credentials = {
      page: this.page,
      limit: this.limit,
      certification: this.$store.state.header.certificate,
      searchByAssetCategory: this.categoryId,
      searchByDiagnosisResults: this.diagnosisResultType,
      searchByAssetClassification: this.classificationValue, //Optional
      searchByTestResults: this.testResult, //Optional
      searchByItemCode: this.itemCode,
      searchByAssetCode: this.assetCode,
      asset_id: this.assetId,
    };

    this.$store.dispatch("diagnosisManagement/getDiagnosisResult", credentials);
  },
  mounted() {
    this.getDiagnosisResultCount();
    
  },

  watch: {
    // on change of certificate
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

        let credentials = {
          page: this.page,
          limit: this.limit,
          certification: this.$store.state.header.certificate,
          searchByAssetCategory: this.categoryId,
          searchByDiagnosisResults: this.diagnosisResultType,
          searchByAssetClassification: this.classificationValue, //Optional
          searchByTestResults: this.testResult, //Optional
          searchByItemCode: this.itemCode,
          searchByAssetCode: this.assetCode,
          asset_id: this.assetId,
        };

        this.$store.dispatch(
          "diagnosisManagement/getDiagnosisResult",
          credentials
        );
      }
    },

  
  },
  methods: {
    getDiagnosisResultCount() {
      let credentials = {
        category_id: this.categoryId,
        certification: this.$store.state.header.certificate,
      };
      this.$store.dispatch("diagnosisManagement/getResultCount", credentials);
    },

    getParams() {
      let credentials = {
        page: 1,
        limit:10,
        certification: this.$store.state.header.certificate,
        searchByAssetCategory: this.categoryId,
        searchByDiagnosisResults: this.diagnosisResultType,
        searchByAssetClassification: this.classificationValue, //Optional
        searchByTestResults: this.testResult, //Optional
        searchByItemCode: this.itemCode,
        searchByAssetCode: this.assetCode,
        asset_id: this.assetId,
      };

      this.$store.dispatch(
        "diagnosisManagement/getDiagnosisResult",
        credentials
      );
    },

    // resetSelectedParams() {
    //   const selectedParams = document.querySelectorAll(".select_param");
    //   selectedParams.forEach((element) => {
    //     element.value = "";
    //   });
    //   this.assetCategory = "";
    //   this.testResult = "";
    //   this.itemCode = "";
    //   this.assetCode = "";
    // },

    getAssetValues(data){
      this.assetCategory = data.classification;
      this.assetCode = data.code;

      let classification = Array.from(this.$store.state.diagnosisManagement
                  .assetClassificationList).find(item => item.name == data.classification);
                  console.log('jhhgffddd',data)
      this.classificationValue = classification?.value;
      this.$store.dispatch("diagnosisManagement/getItemCodeList", {
      id: this.categoryId,
      certificate: this.$store.state.header.certificate,
      code : this.classificationValue // optional
    });

    },

    paginationCallOne(clickedPage) {
      this.page = clickedPage;
      let credentials = {
        page: this.page,
        limit: this.limit,
        certification: this.$store.state.header.certificate,
        searchByAssetCategory: this.categoryId,
        searchByDiagnosisResults: this.diagnosisResultType,
        searchByAssetClassification: this.classificationValue, //Optional
        searchByTestResults: this.testResult, //Optional
        searchByItemCode: this.itemCode,
        searchByAssetCode: this.assetCode,
        asset_id: this.assetId,
      };

      this.$store.dispatch(
        "diagnosisManagement/getDiagnosisResult",
        credentials
      );
      //alert("One");
    },

    // paginationCallTwo(clickedPage) {
    //   this.page = clickedPage;
    //   let credentials = {
    //     page: this.page,
    //     limit: this.limit,

    //     searchByDiagnosisResults: this.diagnosisResultType,
    //     searchByAssetClassification: "", //Optional
    //     searchByTestResults: "", //Optional
    //     searchByItemCode: "",
    //     searchByAssetCode: "",
    //   };

    //   this.$store.dispatch(
    //     "diagnosisManagement/getDiagnosisResult",
    //     credentials
    //   );
    //   //alert("Two");
    // },

    importPrevCheck() {
      if (this.$refs.importPreviousCheck.checked == true) {
        this.isImportPrev = true;
      } else {
        this.isImportPrev = false;
      }
    },
  },
};
</script>


<style lang="scss">
</style>