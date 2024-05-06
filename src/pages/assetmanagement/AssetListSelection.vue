<template>
  <div class="info_protection">
    <div class="breadcrumb">
      <Breadcrumb link="/dashboard" text1="Home" text2="자산관리" />
      <!-- <p>
        <a href="#">Home </a><span>></span> Policy management<span>></span>
        Information Protection Policy
      </p> -->
    </div>
    <div class="heading flex justify-between align-end">
      <h4>자산 목록</h4>
      <div class="history_wrap">
        <span>자산그룹</span>
        <select v-model="assetGroupId" ref="assetGroup">
          <option value="" selected disabled>자산그룹을 선택해주세요</option>
          <option v-for="(item, i) in groupList" :key="i" :value="item.id">
            {{ item.group_name }}
          </option>
        </select>
        <button
          type="button"
          class="apply"
          @click="() => (assetGroupIdProps = group_id = assetGroupId)"
        >
          적용
        </button>
        <button
          v-if="
            permission == 'edit' ||
            this.$store.state.signin.is_user_admin == 'y'
          "
          type="button"
          @click="this.$router.push('/editAssetGroup')"
        >
          자산그룹 편집
        </button>
      </div>
    </div>
    <div class="policy_setting_wrap p-t-0">
      <div class="datatable_head flex justify-between">
        <div class="oneside flex justify-start">
          <select
            ref="categoryColumn"
            @change="($e) => (searchByCriteria = $e.target.value)"
          >
            <option value="all" selected>전체</option>
            <option
              v-for="(asset, i) in assetListColumns"
              :key="i"
              :value="asset.category_field_id"
            >
              {{ asset.field_name }}
            </option>
          </select>
          <div class="search_wrap flex justify-between">
            <input type="text" placeholder="입력" ref="searchInput" />
            <button type="button" @click="getSearchText">
              <img src="@/assets/icon/Search.svg" />
            </button>
          </div>
        </div>
        <div class="oneside flex justify-end">
          <button
            v-if="
              permission == 'edit' ||
              this.$store.state.signin.is_user_admin == 'y'
            "
            type="button"
            @click="this.$router.push('/assetClassificationColumnSetting')"
          >
            자산 분류 및 열 설정
          </button>
          <button
            type="button"
            @click="isAssetClassificationCriteriaModal = true"
          >
            자산 분류기준
          </button>
          <button
            type="button"
            @click="isAssetMaterialityAssessmentCriteria = true"
          >
            자산중요도 평가기준
          </button>
        </div>
      </div>
    </div>
    <div class="tab-style-two" v-if="categoryList.length > 0">
      <DynamicTabWrapper @getResponseTitle="onChangeTab">
        <DynamicTabs
          v-for="(category, i) in categoryList"
          :key="i"
          :title="category.category_name"
        >
          <AssetManagementDataTable
            :categoryId="category.category_id"
            :assetGroupId="assetGroupIdProps"
            :tabName="clickedTab"
            :searchByCriteria="searchByCriteria"
            :searchByText="searchByText"
            :tabType="category.tab_type"
            :activeId="activeCategoryID"
          />
        </DynamicTabs>
      </DynamicTabWrapper>
    </div>
    <div class="button_wrap fixed-button-wrap flex justify-between">
      <div class="buttons flex justify-start">
        <button
          type="button"
          class="gray"
          @click="isAssetLedgerDownload = true"
        >
          자산대장 다운로드
        </button>
        <button
          v-if="
            permission == 'edit' ||
            this.$store.state.signin.is_user_admin == 'y'
          "
          type="button"
          class="gray"
          @click="this.$router.push('/AssetSharing')"
        >
          자산공유하기
        </button>
      </div>
      <div
        v-if="
          permission == 'edit' || this.$store.state.signin.is_user_admin == 'y'
        "
        class="buttons flex justify-end"
      >
        <button type="button" @click="this.$router.push('/myRevisionHistory')">
          재-개정 이력
        </button>
        <button
          v-if="
            permission == 'edit' ||
            this.$store.state.signin.is_user_admin == 'y'
          "
          type="button"
          @click="this.$router.push('/addAssetsCorrectionDelete')"
        >
          자산 추가/수정/삭제
        </button>
      </div>
    </div>
  </div>
  <AssetClassificationCriteria
    v-if="isAssetClassificationCriteriaModal"
    @closeAssetClassificationCriteriaModal="
      isAssetClassificationCriteriaModal = false
    "
  />
  <AssetMaterialityAssessmentCriteria
    v-if="isAssetMaterialityAssessmentCriteria"
    @closeAssetMaterialityAssessmentCriteria="
      isAssetMaterialityAssessmentCriteria = false
    "
  />
  <AssetLedgerDownload
    v-if="isAssetLedgerDownload"
    @ledger="assetLedgerDownload"
    @closeAssetLedgerDownload="isAssetLedgerDownload = false"
  />
  <AssetShareRequest
    v-if="isAssetShareRequestModal"
    @closeAssetShareRequestModal="isAssetShareRequestModal = false"
  />

  <Loading
    :active="isLoading"
    :can-cancel="true"
    :on-cancel="onCancel"
    :is-full-page="fullPage"
  ></Loading>
</template>

<script>
import AssetClassificationCriteria from "@/components/modals/AssetClassificationCriteria.vue";
import AssetMaterialityAssessmentCriteria from "@/components/modals/AssetMaterialityAssessmentCriteria.vue";
import AssetLedgerDownload from "@/components/modals/AssetLedgerDownload.vue";
import AssetShareRequest from "@/components/modals/AssetShareRequest.vue";
import DynamicTabWrapper from "@/components/DynamicTabWrapper.vue";
import DynamicTabs from "@/components/DynamicTabs.vue";
import AssetManagementDataTable from "@/components/AssetManagementDataTable.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import AssetManagementService from "@/services/AssetManagementService";
import OperatingStatement from "../avidencemanagement/OperatingStatement.vue";
import Toast from "@/alert/alert.js";

export default {
  name: "AssetListSelection",
  components: {
    Breadcrumb,
    AssetClassificationCriteria,
    AssetMaterialityAssessmentCriteria,
    AssetLedgerDownload,
    AssetShareRequest,
    DynamicTabWrapper,
    DynamicTabs,
    AssetManagementDataTable,
  },

  data() {
    return {
      page: 1,
      limit: 50,
      categoryList: [],
      groupList: [],
      assetListColumns: [],

      categoryId: "",
      assetGroupId: "",
      assetGroupIdProps: "",
      searchByCriteria: "all",
      searchByText: "",
      isAssetClassificationCriteriaModal: false,
      isAssetMaterialityAssessmentCriteria: false,
      isAssetLedgerDownload: false,
      isAssetShareRequestModal: false,
      clickedTab: "",
      certification: this.$store.state.header.certificate,
      activeCategoryID: "",
      isLoading: false,
    };
  },

  created() {
    this.AssetManagementService = new AssetManagementService();
  },

  beforeMount() {
    this.getAssetCategoryList();
    this.getGroupList();
  },

  computed: {
    permission() {
      return this.$store.state.sideBar.permission.asset_list;
    },
  },

  methods: {
    getAssetCategoryList() {
      this.AssetManagementService.editGroupCategoryList().then((res) => {
        console.log("asset-category-list", res);
        if (res.status == 200) {
          this.categoryList = res.data.assets_category_list;
          this.categoryId = this.categoryList[0].category_id;
          this.activeCategoryID = res.data.assets_category_list[0].category_id;
          this.getAssetTableColumns(this.categoryId);
        }
      });
    },

    getAssetTableColumns(id) {
      this.AssetManagementService.allFieldList(id).then((res) => {
        console.log("asset-columns-list", res);
        this.assetListColumns = res.data.all_assets_category_field_list;
      });
    },

    getGroupList() {
      this.AssetManagementService.editAssetGroupList().then((res) => {
        console.log("group-list", res);
        if (res.status == 200) {
          this.groupList = res.data.assets_group_list;
        }
      });
    },

    getSearchText() {
      //alert(this.$refs.searchInput.value)
      this.searchByText = this.$refs.searchInput.value;
      // setTimeout(() => {
      //   this.$refs.searchInput.value = "";
      // }, 500);
    },

    getDownloadLedger(pass) {
      this.isLoading = true;
      let credentials = {
        certification: this.$store.state.header.certificate,
        password: pass,
      };

      if (this.assetGroupIdProps) {
        Object.assign(credentials, { group_id: this.assetGroupIdProps });
      }
      if (this.searchByCriteria) {
        Object.assign(credentials, { search_by: this.searchByCriteria });
      }
      if (this.searchByText) {
        Object.assign(credentials, { search_text: this.searchByText });
      }
      this.AssetManagementService.downloadLedger(credentials).then((res) => {
        console.log('res', res);
        if (res.status == 200) {
          console.log("url", res);
          this.$store.dispatch("diagnosisManagement/createDownloadFiles", {
            url: res.data.url,
            fileName: "AssetLedger",
          });
          this.isLoading = false;
        }
        else if(res.response.status == 401){
          this.isLoading = false;
           Toast.fire({ title: res.response.data.error });
        }
        else{
          this.isLoading = false;
          return;
        }
      });
    },

    assetLedgerDownload(pass) {
      this.getDownloadLedger(pass);
      this.isAssetLedgerDownload = false;
    },

    onChangeTab(tab) {
      let selectedTab = this.categoryList.find(function (item) {
        return item.category_name == tab;
      });
      this.getAssetTableColumns(selectedTab.category_id);
      this.category_id = selectedTab.category_id;
      this.activeCategoryID = selectedTab.category_id;
      // this.$refs.assetGroup.value = "";
      // this.$refs.categoryColumn.value = "";
      // this.searchByCriteria = "";
      // this.searchByText = "";
      // // this.assetGroupId = "";
      // this.assetGroupIdProps = "";
      this.clickedTab = tab;
    },
  },
};
</script>

<style lang="scss"></style>
