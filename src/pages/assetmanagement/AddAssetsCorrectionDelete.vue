<template>
  <div class="info_protection">
    <div class="breadcrumb">
      <Breadcrumb
        link="/dashboard"
        text1="Home"
        text2="자산관리"
        text2link="/assetListSelection"
      />
      <!-- <p>
        <a href="#">Home </a><span>></span> Policy management<span>></span>
        Information Protection Policy
      </p> -->
    </div>
    <div class="heading flex justify-between align-end">
      <h4>자산 추가/수정/삭제</h4>
      <div class="history_wrap">
        <button type="button" @click="downloadExcel">샘플 다운로드</button>
        <button type="button" @click="uploadExcel">엑셀 업로드</button>
      </div>
    </div>
    <div class="policy_setting_wrap">
      <div class="tab-style-two" v-if="categoryList.length > 0">
        <DynamicTabWrapper @getResponseTitle="onChangeTab">
          <DynamicTabs
            v-for="(category, i) in categoryList"
            :key="i"
            :title="category.category_name"
          >
            <AssetManagementEditTable
              :categoryId="category.category_id"
              :isResetAfterSave="isResetAfterSave"
              @savedData="getModifiedData"
              :activeId="activeCategoryID"
              :tabType="category.tab_type"
              :addEnable="isAddEnable"
              @save="saveEditedAssets"
              :saveEnable="isSave"
              :uploadDone="isexcelUploadDone"
              @excelDone="excelUploadFalse"
            />
          </DynamicTabs>
        </DynamicTabWrapper>
      </div>
    </div>

    <div class="button_wrap fixed-button-wrap flex justify-end">
      <!-- <div class="buttons flex justify-start">
                <button type="button" class="gray">Asset Ledger Download</button>
                <button type="button" class="gray">Share Your Assets</button>
            </div> -->
      <div class="buttons flex justify-end">
        <!-- <button type="button">My Revision History</button> -->
        <button type="button" @click="$router.push('assetListSelection')">
          뒤로가기
        </button>
      </div>
    </div>
  </div>

  <ValidationModal
    v-if="isValidate"
    bodyText="Required data to save"
    @close="closeValidationModal"
    @confirm="closeValidationModal"
    firstBtn="Confirm"
  />

  <!--automatic upload modal -->
  <AssetUpload
    v-if="isAssetUpload"
    @close="closeModal"
    :activeId="activeCategoryID"
    @confirm="excelUploadDone"
  />
</template>


<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import AssetManagementEditTable from "@/components/AssetManagementEditTable.vue";
import DynamicTabWrapper from "@/components/DynamicTabWrapper.vue";
import DynamicTabs from "@/components/DynamicTabs.vue";
import ValidationModal from "@/components/modals/ValidationModal.vue";
import Toast from "@/alert/alert.js";
import AssetManagementService from "@/services/AssetManagementService";
import AssetUpload from "@/components/modals/AssetUpload.vue";
export default {
  name: "AddAssetsCorrectionDelete",
  components: {
    Breadcrumb,
    AssetManagementEditTable,
    DynamicTabWrapper,
    DynamicTabs,
    ValidationModal,
    AssetUpload,
  },
  data() {
    return {
      categoryList: [],
      saveData: [],
      activeCategoryID: "",
      isValidate: false,
      isResetAfterSave: false,
      isAddEnable: false,
      isSave: false,
      isAssetUpload: false,
      isexcelUploadDone: false,
    };
  },
  created() {
    this.AssetManagementService = new AssetManagementService();
  },

  beforeMount() {
    this.getAssetCategoryList();
  },

  methods: {
    getAssetCategoryList() {
      this.AssetManagementService.editGroupCategoryList().then((res) => {
        console.log("asset-category-list", res);
        if (res.status == 200) {
          this.categoryList = res.data.assets_category_list;
          this.activeCategoryID = res.data.assets_category_list[0].category_id;
          console.log('c l', this.categoryList);
        }
      });
    },

    saveEditedAssets() {
      this.AssetManagementService.assetListSave(this.saveData).then((res) => {
        if (res.status == 200) {
          this.isAddEnable = true;
          this.isResetAfterSave = true;
          setTimeout(() => {
            this.isResetAfterSave = false;
            this.isAddEnable = false;
          }, 1000);
          Toast.fire({ title: "수정이 완료되었습니다." });
        }
      });
    },

    getModifiedData(data) {
      this.saveData = data;
    },

    onChangeTab(tab) {
      let selectedTab = this.categoryList.find(function (item) {
        return item.category_name == tab;
      });
      this.saveData = [];
      this.activeCategoryID = selectedTab.category_id;
    },

    closeValidationModal() {
      this.isValidate = false;
    },

    uploadExcel() {
      this.isAssetUpload = true;
    },

    closeModal() {
      this.isAssetUpload = false;
    },

    excelUploadDone() {
      this.isexcelUploadDone = true;
    },

    excelUploadFalse() {
      this.isexcelUploadDone = false;
    },

    downloadExcel() {
      this.AssetManagementService.downloadExcel(
        this.activeCategoryID,
        this.$store.state.header.certificate
      ).then((res) => {
        if (res.status == 200) {
          const url = `${process.env.VUE_APP_API_BASE_URL}/download/file?url=${res.data.path}&type=unlink`; // later required base url to dynamic
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "downloadExcel");
          document.body.appendChild(link);
          link.click();
        }
      });
    },
  },
};
</script>


<style lang="scss">
</style>