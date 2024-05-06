<template>
  <div class="info_protection">
    <div class="breadcrumb">
      <Breadcrumb
        link="dashboard"
        text1="Home"
        text2="자산관리"
        text3="자산목록"
        text4="공유하기"
        link2="../../../../assetListSelection"
        text2link="../../../../assetListSelection"
      />
    </div>
    <div class="heading flex justify-between align-end">
      <h4>자산 공유 이력</h4>
    </div>
    <div class="policy_setting_wrap no-padding">
      <p>
        * 공유자산은 다른 기업과 자산을 공동으로 사용 할 경우 공유 할 수 있는
        기능으로 공유하기 시 해당 자산은 양 기업간의 동기화가 이루어집니다.
      </p>
      <div class="datatable_head flex justify-between">
        <h4>공유 자산 목록 상세보기</h4>
        <h4>
          공유 기업:
          <span
            >{{ this.$route.params.cName }}
            <span v-if="this.$route.params.aName != 'null'">{{
              this.$route.params.aName
            }}</span></span
          >
        </h4>
      </div>
      <div class="tab-style-two" v-if="categoryList.length > 0">
        <DynamicTabWrapper @getResponseTitle="onChangeTab">
          <DynamicTabs
            v-for="(category, i) in categoryList"
            :key="i"
            :title="category.category_name"
          >
            <AssetSharingHistoryContentEdit
              :categoryId="category.category_id"
              :categoryName="category.category_name"
              :tabName="clickedTab"
              @savedData="getSavedData"
              @noEdit="changeEditStat"
              :contentEdit="isContentEdit"
              :activeCatId="activeCategoryId"
              :isBackBtn="isBack"
              :tabType="category.tab_type"
            />
          </DynamicTabs>
        </DynamicTabWrapper>
      </div>
      <div class="button_wrap fixed-button-wrap flex justify-end">
        <div class="buttons flex justify-end">
          <template v-if="isBack">
            <button type="button" @click="$router.push('/AssetSharingHistory')">
              뒤로가기
            </button>
          </template>
          <template v-else>
            <button type="button" @click="doEdit" v-if="btnEdit">
              수정하기
            </button>
            <button type="button" @click="doSave" v-else>저장</button>
          </template>
        </div>
      </div>
    </div>
    <!-- <ValidationModal
    v-if="isValidate"
    bodyText="Required data to save"
    @close="isValidate=false"
    @confirm="isValidate=false"
    firstBtn="Confirm"
  /> -->
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import AssetManagementService from "@/services/AssetManagementService";
import AssetSharingHistoryContentEdit from "@/components/AssetSharingHistoryContentEdit.vue";
import DynamicTabWrapper from "@/components/DynamicTabWrapper.vue";
import DynamicTabs from "@/components/DynamicTabs.vue";
import ValidationModal from "@/components/modals/ValidationModal.vue";
import Toast from "@/alert/alert.js";
export default {
  name: "AssetSharingHistorytwo",
  components: {
    Breadcrumb,
    DynamicTabWrapper,
    DynamicTabs,
    AssetSharingHistoryContentEdit,
    ValidationModal,
  },
  data() {
    return {
      //assetGroupId:this.$route.params.id,
      categoryList: [],
      saveData: {},
      clickedTab: "",
      btnEdit: true,
      isContentEdit: true,
      isBack: false,
      activeCategoryId: 1,
      isValidate: false,
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
      this.AssetManagementService.editGroupCategoryList(
        this.$route.params.id
      ).then((res) => {
        if (res.status == 200) {
          this.categoryList = res.data.assets_category_list;
        }
      });
    },
    getSavedData(data) {
      Object.assign(this.saveData, {
        shared_request_id: this.$route.params.id,
        data: data,
      });
    },

    doEdit() {
      this.btnEdit = false;
      this.isContentEdit = false;
    },

    doSave() {
      // alert("Saved")
      // this.isContentEdit = true;
      console.log("save data", this.saveData.data[0].row_item);
      this.updateSharedHistory();
    },
    updateSharedHistory() {
      let empty;
      for (let i = 0; i < this.saveData.data.length; i++) {
        if (Array.from(this.saveData.data[i].row_item).some((item) => item.field_value == "" && item.is_required == "y")) {
          empty = true;
          break;
        }
      }
      if (empty) {
        Toast.fire({ title: "필수항목란을 입력해주세요" });
        return;
      } 
      else{
        this.AssetManagementService.shareReequestUpdate(this.saveData).then(
          (res) => {
            console.log("update-share", res);
            if (res.status == 200) {
              this.isContentEdit = true;
              this.btnEdit = true;
              Toast.fire({ title: res.data.message });
              this.saveData = [];
            }
          }
        );
      }
      // if (!this.saveData) {
      //   this.isValidate = true;
      //   return;
      // }
      
    },

    changeEditStat(status) {
      console.log("edit-status", status);
      this.isBack = status;
    },

    onChangeTab(tab) {
      let selectedTab = this.categoryList.find(function (item) {
        return item.category_name == tab;
      });
      this.activeCategoryId = selectedTab.category_id;

      this.clickedTab = tab;
    },
  },
};
</script>

<style lang="scss"></style>
