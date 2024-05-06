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
            <AssetSharingHistoryContent
              :categoryId="category.category_id"
              :categoryName="category.category_name"
              :tabName="clickedTab"
              :activeId="activeCategoryID"
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
        <div v-if="this.$route.params.s_id != company_id">
          <button type="button" @click="shareRequestChange('rejected')">
            거절
          </button>
          <button type="button" @click="shareRequestChange('shared')">
            수락
          </button>
        </div>
          <button type="button" @click="$router.push('/AssetSharingHistory')">
            뒤로가기
          </button>
      </div>
    </div>
  </div>
</template>

<script>
import AssetManagementService from "@/services/AssetManagementService";
import DynamicTabWrapper from "@/components/DynamicTabWrapper.vue";
import DynamicTabs from "@/components/DynamicTabs.vue";
import AssetSharingHistoryContent from "@/components/AssetSharingHistoryContent.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
export default {
  name: "AssetSharingHistorythree",
  components: {
    DynamicTabWrapper,
    DynamicTabs,
    AssetSharingHistoryContent,
    Breadcrumb,
  },
  data() {
    return {
      assetGroupId: this.$route.params.id,
      categoryList: [],
      clickedTab: "",
      aName: this.$route.params.aName ? this.$route.params.aName : "",
      company_id: localStorage.getItem("compid"),
      activeCategoryID: "",
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
          this.activeCategoryID = res.data.assets_category_list[0].category_id;
        }
      });
    },
    onChangeTab(tab) {
      let selectedTab = this.categoryList.find(function (item) {
        return item.category_name == tab;
      });
      this.clickedTab = tab;
      this.activeCategoryID = selectedTab.category_id;
    },
    shareRequestChange(status) {
      this.AssetManagementService.shareHistoryStatusChange(
        this.$route.params.id,
        status
      ).then((res) => {
        if (res.status == 200) {
          if (status == "rejected") {
            this.$router.push("/AssetSharingHistory");
          } else {
            this.$router.push(
              `/AssetSharingHistorytwo/${this.$route.params.id}/${this.$route.params.cName}/${this.$route.params.aName}`
            );
          }
        }
      });
    },
  },
};
</script>

<style lang="scss"></style>
