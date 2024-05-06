<template>
  <div class="info_protection">
    <div class="breadcrumb">
      <Breadcrumb
        link="dashboard"
        text1="Home"
        text2="자산관리"
        text3="자산목록"
        link2="/assetListSelection"
        text2link="/assetListSelection"
      />
      <!-- <p><a href="#">Home </a> <span>></span> Asset management <span>></span> Asset list</p> -->
    </div>
    <div class="heading flex justify-between align-end">
      <h4>자산 공유</h4>
    </div>
    <div class="policy_setting_wrap no-padding">
      <p>
        * 공유자산은 다른 기업과 자산을 공동으로 사용 할 경우 공유 할 수 있는
        깆능으로 공유하기 시 해당 자산은 양 기업간의 동기화가 이루어집니다.
      </p>
      <div class="datatable_head flex justify-between">
        <div class="select_wrap">
          <select v-model="assetGroupId">
            <option value="" selected disabled>자산그룹을 선택해주세요</option>
            <option v-for="(item, i) in groupList" :key="i" :value="item.id">
              {{ item.group_name }}
            </option>
          </select>
        </div>
        <div class="company_code">
          <div class="flex justify-end">
            <span>공유 기업코드</span>
            <div class="wrap">
              <div class="input_wrap">
                <input
                  type="text"
                  v-model="company_code"
                  placeholder="코드 입력"
                />
                <button @click="chechCompanyCode" type="button">
                  코드확인
                </button>
              </div>
            </div>
          </div>
          <a
            v-if="error.verified"
            :class="
              error.verified != '기업코드가 확인되었습니다' ? 'error-msg' : ''
            "
            href="#"
            >{{ error.verified }}</a
          >
        </div>
      </div>
      <div class="tab-style-two" v-if="categoryList.length > 0">
        <DynamicTabWrapper @getResponseTitle="onChangeTab">
          <DynamicTabs
            v-for="(category, i) in categoryList"
            :key="i"
            :title="category.category_name"
          >
            <AssetSharingContent
              :categoryId="category.category_id"
              :categoryName="category.category_name"
              :tabName="clickedTab"
              :assetId="assetGroupId"
              :shared_company_id="company_id"
              :compName="company_name"
              @openModal="shareModal"
              @savedData="getModifiedData"
              :modifiedSaveData="saveData"
              @assetId="getAssetId"
              @afterRead="getData"
              :activeId="activeCategoryID"
            />
          </DynamicTabs>
        </DynamicTabWrapper>
      </div>

      <div class="button_wrap fixed-button-wrap flex justify-end">
        <div class="buttons flex justify-end">
          <button
            type="button"
            @click="this.$router.push('/AssetSharingHistory')"
          >
            공유이력 확인
          </button>
          <button
            :disabled="asset_id.length == 0 || company_id == ''"
            :class="{
              no_cursor: asset_id.length == 0 || company_id == '',
            }"
            @click="shareAssetGroup"
            type="button"
          >
            공유하기
          </button>
        </div>
      </div>
    </div>
  </div>
  <!--share modal -->
  <AssetShareRequest v-if="isShareModal" @close="closeModal" />
</template>

<script>
import AssetManagementService from "@/services/AssetManagementService";
import DynamicTabWrapper from "@/components/DynamicTabWrapper.vue";
import DynamicTabs from "@/components/DynamicTabs.vue";
import AssetSharingContent from "@/components/AssetSharingContent.vue";
import ChangeUserInfoService from "@/services/ChangeUserInfoService";
import AssetShareRequest from "@/components/modals/AssetShareRequest.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
export default {
  name: "AssetSharing",
  components: {
    DynamicTabWrapper,
    DynamicTabs,
    AssetSharingContent,
    AssetShareRequest,
    Breadcrumb,
  },
  data() {
    return {
      groupList: [],
      assetGroupId: "",
      group_name: "",
      error: {},
      categoryList: [],
      clickedTab: "",
      company_code: "",
      company_id: "",
      isShareModal: false,
      company_name: "",
      saveData: [],
      asset_id: [],
      certification: localStorage.getItem("certificationName"),
      activeCategoryID: "",
    };
  },
  created() {
    this.AssetManagementService = new AssetManagementService();
    this.ChangeUserInfoService = new ChangeUserInfoService();
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
    onChangeTab(tab) {
      let selectedTab = this.categoryList.find(function (item) {
        return item.category_name == tab;
      });
      this.clickedTab = tab;
      this.activeCategoryID = selectedTab.category_id;
    },

    chechCompanyCode() {
      if (this.company_code == "") {
        this.error.verified = "기업코드를 입력해 주세요";
      } else {
        this.ChangeUserInfoService.verifyCompanyCode(this.company_code)
          .then((res) => {
            if (res.status == 200) {
              this.error.verified = "기업코드가 확인되었습니다";
              this.company_id = res.data.company_id;
              this.company_name = res.data.company_name;
            } else {
              this.error.verified = res.response.data.error;
            }
          })
          .catch((err) => {
            return;
          });
      }
    },
    assetGroupChange(e) {
      this.$router.push(`/AssetSharing/${e.target.value}`);
    },
    getAssetId(e) {
      this.asset_id = e;
    },

    closeModal() {
      this.isShareModal = false;
    },
    shareModal() {
      this.isShareModal = true;
    },
    getModifiedData(data) {
      this.saveData.push(data);
    },
    getData(data) {
      this.saveData = data;
    },
    shareAssetGroup() {
      this.AssetManagementService.shareWithCompany(
        this.company_id,
        this.assetGroupId,
        this.certification,
        this.saveData
      )
        .then((res) => {
          if (res.status == 200) {
            this.isShareModal = true;
          }
        })
        .catch((err) => {
          return false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.info_protection .policy_setting_wrap .datatable_head .company_code a {
  margin-left: 114px;
}
</style>
