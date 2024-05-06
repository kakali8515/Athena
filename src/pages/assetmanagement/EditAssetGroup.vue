<template>
  <div class="info_protection">
    <Breadcrumb
      link="/dashboard"
      text1="Home"
      text2="자산관리"
      text2link="/assetListSelection"
    />
    <div class="heading flex justify-between align-end">
      <h4>자산그룹 편집</h4>
      <div class="history_wrap" :class="error.gname ? 'field-error' : ''">
        <span>자산그룹 추가</span>
        <input v-model="group_name" type="text" placeholder="그룹명 입력" />
        <button type="button" @click="addAssetGroup">추가</button>
      </div>
    </div>
    <div class="policy_setting_wrap no-padding">
      <div class="left_wrap datatable_head">
        <div class="select_group flex justify-start">
          <select v-model="assetGroupId" @change="assetGroupChange">
            <option value="" selected disabled>자산그룹을 선택해주세요</option>
            <option v-for="(item, i) in groupList" :key="i" :value="item.id">
              {{ item.group_name }}
            </option>
          </select>
          <button @click="deleteAssetGroup" type="button">삭제</button>
        </div>
        <span class="error-msg">{{ error.assetGroupId }}</span>
      </div>
      <div class="tab-style-two" v-if="categoryList.length > 0">
        <DynamicTabWrapper @getResponseTitle="onChangeTab">
          <DynamicTabs
            v-for="(category, i) in categoryList"
            :key="i"
            :title="category.category_name"
          >
            <EditAssetGroupContent
              :categoryId="category.category_id"
              :categoryName="category.category_name"
              :tabName="clickedTab"
              @assetId="getAssetId"
              :saveAssetId="uniqueassetId"
              @modifiedAssetId="getModifiedAssetId"
              :activeId="activeCategoryID"
            />
          </DynamicTabs>
        </DynamicTabWrapper>
      </div>
      <div class="button_wrap fixed-button-wrap flex justify-end">
        <div class="buttons flex justify-end">
          <button
            type="button"
            v-if="assetGroupId"
            @click="$router.push('../assetListSelection')"
          >
            뒤로가기
          </button>
          <button
            type="button"
            v-else
            @click="$router.push('assetListSelection')"
          >
            뒤로가기
          </button>
          <button
            :disabled="asset_id.length == 0"
            :class="{ no_cursor: asset_id.length == 0 }"
            @click="saveAssetGroup"
            type="button"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AssetManagementService from "@/services/AssetManagementService";
import DynamicTabWrapper from "@/components/DynamicTabWrapper.vue";
import DynamicTabs from "@/components/DynamicTabs.vue";
import EditAssetGroupContent from "@/components/EditAssetGroupContent.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import Toast from "@/alert/alert.js";
export default {
  name: "EditAssetGroup",
  components: {
    DynamicTabWrapper,
    DynamicTabs,
    EditAssetGroupContent,
    Breadcrumb,
  },
  data() {
    return {
      certification: localStorage.getItem("certificationName"),
      groupList: [],
      assetGroupId: this.$route.params.id,
      group_name: "",
      error: {},
      categoryList: [],
      clickedTab: "",
      asset_id: [],
      uniqueassetId: [],
      activeCategoryID: "",
    };
  },
  created() {
    this.AssetManagementService = new AssetManagementService();
  },
  mounted() {
    this.getAssetCategoryList();
    this.getGroupList();
  },
  methods: {
    getAssetCategoryList() {
      this.AssetManagementService.editGroupCategoryList().then((res) => {
        if (res.status == 200) {
          this.categoryList = res.data.assets_category_list;
          this.activeCategoryID = res.data.assets_category_list[0].category_id;
        }
      });
    },
    getGroupList() {
      this.AssetManagementService.editAssetGroupList().then((res) => {
        if (res.status == 200) {
          this.groupList = res.data.assets_group_list;
        }
      });
    },
    addAssetGroup() {
      if (this.group_name == "") {
        this.error.gname = "그룹명 입력";
        Toast.fire({ title: "그룹명 입력" });
      } else {
        this.AssetManagementService.editAssetAddGroup(this.group_name).then(
          (res) => {
            if (res.status == 200) {
              this.getGroupList();
              this.error.gname = "";
              this.group_name = "";
              this.$router.push(`/EditAssetGroup/${res.data.group_id}`);
            } else {
              this.error.gname = res.response.data.error;
              Toast.fire({ title: res.response.data.error });
            }
          }
        );
      }
    },
    deleteAssetGroup() {
      if (this.assetGroupId == "") {
        this.error.assetGroupId = "자산그룹을 선택해주세요";
      } else {
        this.AssetManagementService.editGroupDelete(this.assetGroupId).then(
          (res) => {
            if (res.status == 200) {
              this.getGroupList();
              this.getAssetCategoryList();
              this.error.assetGroupId = "";
              this.assetGroupId = "";
              this.$router.push("/EditAssetGroup");
              Toast.fire({ title: res.data.message });
            }
          }
        );
      }
    },
    onChangeTab(tab) {
      let selectedTab = this.categoryList.find(function (item) {
        return item.category_name == tab;
      });
      this.clickedTab = tab;
      this.activeCategoryID = selectedTab.category_id;
    },
    assetGroupChange(e) {
      this.$router.push(`/EditAssetGroup/${e.target.value}`);
    },
    getAssetId(e) {
      this.asset_id.push(...e);
      this.uniqueassetId = this.asset_id.filter((c, index) => {
        return this.asset_id.indexOf(c) === index;
      });
    },
    getModifiedAssetId(e) {
      this.uniqueassetId = e;
    },
    saveAssetGroup() {
      this.AssetManagementService.editAssignGroupSave(
        this.$route.params.id,
        this.certification,
        this.uniqueassetId
      )
        .then((res) => {
          if (res.status == 200) {
            this.$router.push(`/assetListSelection`);
          }
        })
        .catch((err) => {
          return;
        });
    },
  },
};
</script>

<style lang="scss">
.history_wrap input[type="text"] {
  width: 220px;
  height: 43px;
  padding: 6px 18px;
  margin-left: 10px;
  border: 1px solid #cfcfcf;
  font-size: 14px;
}
</style>
