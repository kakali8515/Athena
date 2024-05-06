<template>
  <div class="info_protection UserAdmin">
    <div class="breadcrumb">
    <Breadcrumb link="dashboard" text1="Home" text2="관리자" />
    </div>
    <div class="heading flex justify-between align-end">
      <h4>권한 분류 관리</h4>
      <div class="history_wrap">
        <span>권한명</span>
        <div class="authority_outer new-outer">
          <div class="authority_wrap">
            <div class="input-field">
              <input type="text" class="form-control" placeholder="권한명" v-model="authority_name" />
            </div>
            <button type="button" class="primary-btn btn-blue-outline" @click="addAuthority">
              추가
            </button>
          </div>
          <span v-if="error" class="error-msg">{{ error }}</span>
        </div>
      </div>
    </div>
<div class="policy_setting_wrap ">
    <div class="tab-style-two m-t-50" v-if="Object.keys(permissionList).length > 0">
      <DynamicTabWrapper @getResponseTitle="changeTab">
        <DynamicTabs
          v-for="(data, index) in permissionList"
          :key="index"
          :title="index"
        >
          <div class="list-main-wrap">
            <div
              class="list-warp"
              v-for="(data, i) in permissionList[index]"
              :key="i"
            >
              <div class="left">
                <p>{{ i }}</p>
              </div>
              <div class="right">
                <div
                  class="first_list"
                  v-for="(item, j) in permissionList[index][i]"
                  :key="j"
                >
                  <ul>
                    <li>{{ item.section_name }}</li>
                     <li>
                      <ul>
                        <li class="modifyd">
                          <input
                            type="checkbox"
                            id="default-checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                            :checked="
                              item.access_type === 'edit' ? true : false
                            "
                            @click="
                              item.access_type === 'read' ||
                              item.access_type === 'download' ||
                              item.access_type === 'edit_download' ||
                              item.access_type === 'none'
                                ? (item.access_type = 'edit')
                                : (item.access_type = 'none')
                            "
                          />
                          수정
                        </li>
                        <li class="modifyd">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                            :checked="
                              item.access_type === 'read' ? true : false
                            "
                            @click="
                              item.access_type === 'edit' ||
                              item.access_type === 'download' ||
                              item.access_type === 'edit_download' ||
                              item.access_type === 'none'
                                ? (item.access_type = 'read')
                                : (item.access_type = 'none')
                            "
                          />
                          보기
                        </li>
                      </ul>
                    </li>
                    <li>
                      <ul>
                        <li class="modifyd">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                            :checked="
                              item.access_type === 'download' ? true : false
                            "
                            @click="
                              item.access_type === 'none' ||
                              item.access_type === 'read' ||
                              item.access_type === 'edit' ||
                              item.access_type === 'edit_download'
                                ? (item.access_type = 'download')
                                : (item.access_type = 'none')
                            "
                          />
                          다운로드
                        </li>
                        <li class="modifyd">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                            :checked="
                              item.access_type === 'edit_download'
                                ? true
                                : false
                            "
                            @click="
                              item.access_type === 'edit' ||
                              item.access_type === 'download' ||
                              item.access_type === 'none' ||
                              item.access_type === 'read'
                                ? (item.access_type = 'edit_download')
                                : (item.access_type = 'none')
                            "
                          />
                          전체
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </DynamicTabs>
      </DynamicTabWrapper>
    </div>
</div>
    <!-- ========== -->
    <!-- <div class="tab-style-two">
      <TabWrapper>
        <Tabs title="ISMS">
          <div class="table-style-strips">
            <table>
              <tr>
                <th>Asset management</th>
                <td>Vulnerability Ranking</td>
                <td>Correction</td>
                <td>Download</td>
                <td>Network diagram</td>
                <td>Correction</td>
                <td></td>
              </tr>
              <tr>
                <th>Diagnosis management</th>
                <td>Establishment of management system</td>
                <td>Correction</td>
                <td>Download</td>
                <td>technical diagnosis</td>
                <td>Correction</td>
                <td>Download</td>
              </tr>
              <tr>
                <th rowspan="2">risk management</th>
                <td>Threat Analysis</td>
                <td>Correction</td>
                <td></td>
                <td>risk assessment</td>
                <td>Correction</td>
                <td>Download</td>
              </tr>
              <tr>
                <td>Risk management level</td>
                <td>correction</td>
                <td></td>
                <td>information protection plan</td>
                <td>correction</td>
                <td>Download</td>
              </tr>
              <tr>
                <th>Evidence management</th>
                <td>evidence list</td>
                <td>Correction</td>
                <td>Download</td>
                <td>operating statement</td>
                <td>Correction</td>
                <td>Download</td>
              </tr>
              <tr>
                <th>Bulletin Board</th>
                <td></td>
                <td>Correction</td>
                <td>Download</td>
                <td>operating statement</td>
                <td>Correction</td>
                <td>Download</td>
              </tr>
              <tr>
                <th rowspan="3">manager</th>
                <td>User Management</td>
                <td>Correction</td>
                <td></td>
                <td>Contact Management</td>
                <td>Correction</td>
                <td></td>
              </tr>
              <tr>
                <td>Log management</td>
                <td>Correction</td>
                <td></td>
                <td>menu management</td>
                <td>Correction</td>
                <td></td>
              </tr>
              <tr>
                <td>Add-on settings</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table></div
        ></Tabs>
        <Tabs title="ISO27001"> Tab 2 Cont</Tabs>
      </TabWrapper>
    </div> -->

    <div class="button_wrap fixed-button-wrap flex justify-between">
      <div class="buttons flex justify-start">
        <!-- <button type="button" class="gray">Set Payment Order</button> -->
      </div>
      <div class="buttons flex justify-end w-100">
        <button v-if="authority_id"
          type="button"
          class="primary-btn btn-blue-outline btn-lg"
          @click="savePermission"
        >
          수정완료
        </button>
      </div>
    </div>
  </div>
  <AuthorityName :showModal="showAuthorityModal" @submit="closeModal($event)" />
</template>


<script>
import DynamicTabWrapper from "@/components/DynamicTabWrapper.vue";
import DynamicTabs from "@/components/DynamicTabs.vue";
// import TabWrapper from "@/components/TabWrapper.vue";
// import Tabs from "@/components/Tabs.vue";
import AuthorityName from "./Modal/AuthorityName.vue";
import PermissionClassificationService from "@/services/PermissionClassificationService";
import Breadcrumb from "@/components/Breadcrumb.vue";
import Toast from "@/alert/alert.js";
export default {
  name: "AddPermissionClasification",
  components: {
    // Tabs,
    // TabWrapper,
    AuthorityName,
    DynamicTabWrapper,
    DynamicTabs,
    Breadcrumb
  },
  data() {
    return {
      showAuthorityModal: false,
      authority_id: this.$route.params.id ? this.$route.params.id : 0,
      authority_name: this.$route.params.authority_name
        ? this.$route.params.authority_name
        : "",
      permissionList: [],
      activeTab: "",
      error:""
    };
  },
  created() {
    this.PermissionClassificationService =
      new PermissionClassificationService();
  },
  mounted() {
    if (this.authority_id) {
      this.getClassificationList();
    }
  },
  methods: {
    closeModal(event) {
      this.showAuthorityModal = event;
    },
    changeTab(value) {
      this.activeTab = value;
    },
    async authorityList() {
      const res = await this.PermissionClassificationService.authorityList();
      if (res.status == 200) {
        let length = res.data.authorityList.length - 1;
        this.authority_id = res.data.authorityList[length].id;
      }
    },
    async addAuthority() {
      if (this.authority_name == "") {
        this.showAuthorityModal = true;
      } else {
        const res = await this.PermissionClassificationService.addAuthorityName(
          this.authority_name
        );
        if (res.status == 200) {
          await this.authorityList();
          await this.getClassificationList();
          this.error=""
        }
        else {
          this.error = res.response.data.error;
        }
      }
    },

    async getClassificationList() {
      let user_data;
      user_data = {
        authority_id: this.authority_id,
      };
      const res =
        await this.PermissionClassificationService.getClassificationTableList(
          user_data
        );
      if (res.status == 200) {
        this.activeTab = Object.keys(res.data.permission_list)[0];
        this.permissionList = res.data.permission_list;
      } else {
        this.permissionList = [];
      }
    },

    async savePermission() {
      let editPermissionList = [];
      let keys = Object.keys(this.permissionList[this.activeTab]);
      for (let i = 0; i < keys.length; i++) {
        let tempKey = keys[i];
        for (
          let j = 0;
          j < this.permissionList[this.activeTab][tempKey].length;
          j++
        ) {
            editPermissionList.push({
              id: this.permissionList[this.activeTab][tempKey][j].id,
              certification: this.activeTab,
              access_type:
                this.permissionList[this.activeTab][tempKey][j].access_type,
            });
        }
      }

      let user_data;
      user_data = {
        authority_id: this.authority_id,
        permission: editPermissionList,
      };

      const res =
        await this.PermissionClassificationService.addPermissionClassification(
          user_data
        );
      if (res.status === 200) {
        this.permissionList = this.getClassificationList();
        Toast.fire({ title: "수정이 완료되었습니다." });
        this.$router.push("/user-admin");
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}

.authority_outer {
  position: relative;

  .authority_wrap {
    display: flex;
  }

  .error-msg {
    position: absolute;
    bottom: -18px;
    left: 10px;
  }
}
</style>