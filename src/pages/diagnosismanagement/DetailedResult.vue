<template>
  <div class="info_protection">
    <Breadcrumb link="/dashboard" text1="Home" text2="진단 관리" />
    <!-- <div class="breadcrumb">
      <p><a href="#">Home </a><span>></span> diagnosis management</p>
    </div> -->
    <div class="heading flex justify-between item-center">
      <h4>기술적 진단 결과</h4>
      <div class="history_wrap flex colomn">
        <p class="status">*진단상태</p>
        <div class="breadcrumb">
          <p>
            - 미진단 <span>></span> 진단중 <span>></span> 진단완료
            <span>></span> 이행중 <span>></span> 이행완료
          </p>
        </div>
      </div>
    </div>
    <div class="policy_setting_wrap">
      <div class="datatable_head mb0 flex justify-between m-t-0">
        <div class="oneside flex justify-start">
          <select ref="categorySelection">
            <option value="0" selected disabled>전체</option>
            <option
              v-for="(column, i) in showColList"
              :key="i"
              :value="column.id"
            >
              {{ column.field_name }}
            </option>
          </select>
          <div class="ml8">
            <select v-model="diagnosis_list_status">
              <option value="" selected disabled>진단상태</option>
              <option value="not_yet">미진단</option>
              <option value="1st_ongoing">진행중</option>
              <option value="1st_complete">진단완료</option>
              <option value="2nd_ongoing">이행중</option>
              <option value="2nd_complete">이행완료</option>
            </select>
          </div>
          <div class="search_btn_wrap">
            <div class="search_wrap flex justify-between">
              <input type="text" placeholder="검색" ref="searchInput" />
              <button type="button" @click="getSearchValue">
                <img src="@/assets/icon/Search.svg" />
              </button>
            </div>
            <button type="button" class="search_btn" @click="getSearchValue">
              검색
            </button>
          </div>
        </div>
        <div class="oneside flex justify-end">
          <button
            type="button"
            @click="
              $router.push({
                name: 'DetailedTechnicalDiagnosisResulttwo',
                params: { id: categoryId, catName: resultBtnName },
              })
            "
          >
            {{ resultBtnName }} 시스템 상세결과
          </button>
        </div>
      </div>
    </div>
    <div class="tab-style-two m-30" v-if="diagnosisDynamicData.length > 0">
      <DynamicTabWrapper @getResponseTitle="changeTab">
        <DynamicTabs
          v-for="(data, index) in diagnosisDynamicData"
          :key="index"
          :title="data.category_name"
        >
          <!-- <h2>{{ data.category_name }}</h2> -->

          <DetailedResultDataTable
            :categoryId="data.id"
            :searchCategory="searchByCategory"
            :searchText="searchByText"
            :diagnosis_list_status="diagnosis_list_status"
            :changeTab="changeTabText"
            @routeID="getRouteID"
            @rowID="getRowId"
            @diagnosisStatus="getDiagnosisStatus"
            :activeId="activeCategoryID"
            @technical_risk_code="get_technical_risk_code"
            @used_template_id="get_used_template_id"
          />
        </DynamicTabs>
      </DynamicTabWrapper>
    </div>
    <div class="button_wrap fixed-button-wrap flex justify-between">
      <div class="buttons flex justify-start">
        <button
          @click="startAutomaticUpload"
          v-if="
            permission == 'edit' ||
            this.$store.state.signin.is_user_admin == 'y'
          "
          type="button"
          class="gray"
          :disabled="
            !row_id ||
            diagnosis_status == '1st_ongoing' ||
            diagnosis_status == '2nd_ongoing' ||
            diagnosis_status == '2nd_complete'
          "
          :class="
            !row_id ||
            diagnosis_status == '1st_ongoing' ||
            diagnosis_status == '2nd_ongoing' ||
            diagnosis_status == '2nd_complete'
              ? 'cursor-not-allowed'
              : ''
          "
        >
          진단 결과 업로드
        </button>
        <button
          v-if="
            permission == 'edit' ||
            this.$store.state.signin.is_user_admin == 'y'
          "
          type="button"
          :disabled="
            !row_id ||
            diagnosis_status == '1st_ongoing' ||
            diagnosis_status == '2nd_ongoing' ||
            diagnosis_status == '2nd_complete'
          "
          @click="startManualDiagnosis"
          :class="
            !row_id ||
            diagnosis_status == '1st_ongoing' ||
            diagnosis_status == '2nd_ongoing' ||
            diagnosis_status == '2nd_complete'
              ? 'cursor-not-allowed'
              : ''
          "
          class="gray"
        >
          수동진단 시작
        </button>
      </div>
      <div class="buttons flex justify-end">
        <!-- <button type="button">My Revision History</button> -->
        <button
          v-if="
            permission == 'edit' ||
            this.$store.state.signin.is_user_admin == 'y'
          "
          class=""
          :class="!row_id || diagnosis_status == 'not_yet' ||  diagnosis_status == '1st_complete' ||  diagnosis_status == '2nd_complete' ? 'cursor-not-allowed' : ''"
          type="button"
          :disabled="!row_id || diagnosis_status == 'not_yet' || diagnosis_status == '1st_complete' ||  diagnosis_status == '2nd_complete'"
          @click="startTechnicalDiagnosis"
        >
          진단 완료
        </button>
      </div>
    </div>
  </div>

  <!--Manual upload modal -->
  <ResultReportManualUpload
    v-if="isManualUploadModal"
    @close="closeModal"
    :assetId="row_id"
    :status="diagnosis_status"
    :technical_risk_code="technical_risk_code"
    :used_template_id="used_template_id"
    :catName="resultBtnName"
    :activeCategoryID="activeCategoryID"
  />

  <!--automatic upload modal -->
  <ResultReportAutomaticUpload
    v-if="isAutomaticUploadModal"
    @close="closeModal"
    :assetId="row_id"
    :status="diagnosis_status"
    :technical_risk_code="technical_risk_code"
    :used_template_id="used_template_id"
    :categoryId="categoryId"
    :catName="resultBtnName"
  />

  <!-- <ValidationModal v-if="isValidate" bodyText="Required to select Field" @close="closeValidationModal" @confirm="closeValidationModal" firstBtn="Confirm"/> -->
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import DetailedResultDataTable from "@/components/DetailedResultDataTable.vue";
import DynamicTabWrapper from "@/components/DynamicTabWrapper.vue";
import DynamicTabs from "@/components/DynamicTabs.vue";
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import ResultReportManualUpload from "@/components/modals/ResultReportManualUpload.vue";
import ValidationModal from "@/components/modals/ValidationModal.vue";
import TechnicalDiagnosticResultsService from "@/services/TechnicalDiagnosticResultsService";
import ResultReportAutomaticUpload from "@/components/modals/ResultReportAutomaticUpload.vue";
export default {
  name: "DetailedResult",
  components: {
    Breadcrumb,
    DetailedResultDataTable,
    DynamicTabWrapper,
    DynamicTabs,
    TabWrapper,
    Tabs,
    ResultReportManualUpload,
    ValidationModal,
    ResultReportAutomaticUpload
  },
  data() {
    return {
      page: 1,
      limit: 50,
      categories: ["server", "dbs", "linux"],
      categoryList: [],
      searchByCategory: "",
      searchByText: "",
      row_id: [],
      // assetCategoryList : [],
      isManualUploadModal: false,
      selectedTitle: "",
      diagnosisDynamicData: [],
      diagnosisDynamicColumns: [],
      diagnosisDynamicList: [],
      changeTabText: "",
      isValidate: false,
      resultBtnName: "",
      categoryId: "",
      showColList: [],
      activeCategoryID: "",
      diagnosis_status: "not_yet",
      diagnosis_list_status: "",
      isAutomaticUploadModal:false,
      technical_risk_code:"",
      used_template_id:""
    };
  },
  created() {
    this.technicalDiagnosticResultsService =
      new TechnicalDiagnosticResultsService();
    //this.$store.dispatch("diagnosisManagement/getSearchColumn");
  },
  computed: {
    permission() {
      return this.$store.state.sideBar.permission.technical_diagnosis;
    },
  },
  mounted() {
    this.getAssetCategoryList();
    localStorage.removeItem("automaticRes");
    localStorage.removeItem("automaticDownloadPath");
  },

  methods: {
    // for tab names
    getAssetCategoryList() {
      this.technicalDiagnosticResultsService
        .defaultAssetCategory()
        .then((res) => {
          // console.log("assetCategoryDynamic", res);

          if (res.status == 200) {
            this.diagnosisDynamicData = res.data.asset_category_list;
            this.resultBtnName = this.diagnosisDynamicData[0].category_name;
            this.categoryId = this.diagnosisDynamicData[0].id;
            this.activeCategoryID = res.data.asset_category_list[0].id;
            this.getTableColumns(); // to output search by category dropdown
          }
        });
    },

    // for columns names & search by columns
    getTableColumns() {
      this.technicalDiagnosticResultsService
        .showColumnList(this.categoryId)
        .then((res) => {
          // console.log("DynamicshowColumn", res);
          if (res.status == 200) {
            //Object.assign(obj, { column_list: res.data.list_of_column });
            this.showColList = res.data.list_of_column;
            // console.log(
            //   "DynamicshowColumn-insidetable",
            //   this.diagnosisDynamicColumns
            // );
          }
        });
    },

    // to get the value of search by category
    getCategory($event) {
      this.searchByCategory = $event.target.value;
    },

    // rearranging values on clicking a new tab
    changeTab(value) {
      let selectedTab = this.diagnosisDynamicData.find(function (item) {
        return item.category_name == value;
      });
      //console.log("selected-category", value)
      this.activeCategoryID = selectedTab.id;
      this.categoryId = selectedTab.id;
      this.getTableColumns();
      this.resultBtnName = value;
      this.$refs.categorySelection.value = "0";
      this.searchByCategory = "";
      this.searchByText = "";
      this.changeTabText = value;
      this.$store.dispatch("diagnosisManagement/doEmptyCheckBox", true);
    },

    // getAssetCategory() {
    //     this.technicalDiagnosticResultsService.defaultAssetCategory().then((res) => {
    //         console.log("assetCategory", res)
    //         console.log("assetCategory-2", res.data.asset_category_list)
    //         this.categoryList =  res.data.asset_category_list
    //     })
    // },

    getSearchValue() {
      this.searchByText = this.$refs.searchInput.value;
      this.searchByCategory = this.$refs.categorySelection.value;
      // console.log("columnsearch", this.$refs.categorySelection.value);
      //alert(this.$refs.categorySelection.value)
      // setTimeout(() => {
      //   this.searchByText = "";
      //   this.$refs.searchInput.value = "";
      // }, 500);
    },

    // onPageChange(_page) {
    //   this.page = _page;
    //   this.createDynamicTabTable(
    //     this.page,
    //     this.limit,
    //     this.searchByCategory,
    //     this.searchByText
    //   );
    // },

    // getDynamicTabsAndTable(_page, _limit, searchAsset = "", searchText = "") {
    //   let credentials = {
    //     page: _page,
    //     limit: _limit,
    //     searchByAssetCategory: searchAsset,
    //     searchByText: searchText,
    //   };
    //   this.$store.dispatch(
    //     "diagnosisManagement/createDynamicTabTable",
    //     credentials
    //   );
    // },

    // gets the asset id of the row when selected
    getRowId(id) {
      this.row_id = id;
    },

    getDiagnosisStatus(status) {
      this.diagnosis_status = status;
    },

    get_technical_risk_code(code) {
      this.technical_risk_code=code;
    },

    get_used_template_id(id) {
      this.used_template_id=id;
    },

    // redirects to the page when any row is clicked
    getRouteID(params) {
      this.$router.push({
        name: "DetailedTechnicalDiagnosisResultServerOnClick",
        params: { aid: params.aid, cid: params.cid, catName: this.resultBtnName },
      });
    },

    // starts the diagnosis
    startTechnicalDiagnosis() {
      if (!this.row_id) {
        this.isValidate = true;
        return;
      } else {
        this.$store.dispatch(
          "diagnosisManagement/finishEvaluation", {rowId:this.row_id,categoryId:this.activeCategoryID}
        ); // API for diagnosis
        this.$store.dispatch("diagnosisManagement/doEmptyCheckBox", true);
        this.row_id = [];
      }
    },

    closeValidationModal() {
      this.isValidate = false;
    },

    startManualDiagnosis() {
      if (this.row_id) {
        this.isManualUploadModal = true;
      }
    },
    closeModal() {
      this.isManualUploadModal = false;
      this.isAutomaticUploadModal = false;
    },
    startAutomaticUpload() {
        this.isAutomaticUploadModal = true;
    },
  },
};
</script>


<style lang="scss">
.ml8 {
  margin-left: 10px;
}
.oneside select {
  padding-right: 40px !important;
}
.cursor-not-allowed {
  cursor: not-allowed !important;
}
</style>