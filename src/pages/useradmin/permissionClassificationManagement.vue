<template>
  <div class="info_protection UserAdmin">
    <div class="breadcrumb">
      <Breadcrumb link="dashboard" text1="Home" text2="관리자" />
    </div>
    <div class="heading flex justify-between align-end">
      <h4>권한 분류 관리</h4>
      <div
        class="history_wrap justify-end"
        v-if="
          permission == 'edit' || this.$store.state.signin.is_user_admin == 'y'
        "
      >
        <span>권한명</span>
        <div class="authority_outer">
          <div class="authority_wrap">
            <div class="input-field">
              <input
                type="text"
                class="form-control"
                placeholder="권한명"
                v-model="authority_name"
              />
            </div>
            <button
              type="button"
              class="primary-btn btn-blue-outline"
              @click="addAuthority"
            >
              추가
            </button>
          </div>
          <span v-if="error" class="error-msg">{{ error }}</span>
        </div>
      </div>
    </div>
    <div class="policy_setting_wrap">
      <div class="datatable_head flex justify-between">
        <div class="oneside flex justify-start items-center">
          <span class="mr-2.5">권한명</span>
          <select
            v-model="selected_authority_id"
            @change="getClassificationList"
          >
            <option value="0" disabled>선택</option>
            <option
              v-for="(option, index) in AuthorityList"
              v-bind:value="option.id"
              :key="index"
            >
              {{ option.authority_name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="tab-style-two" v-if="Object.keys(permissionList).length > 0">
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

    <div class="button_wrap fixed-button-wrap flex justify-between" v-if="selected_authority_id">
      <div class="buttons flex justify-start">
        <!-- <button type="button" class="gray">Set Payment Order</button> -->
      </div>
      <div class="buttons flex justify-end w-100">
        <button
          type="button"
          class="primary-btn btn-blue-outline btn-lg"
          v-if="
            permission == 'edit' ||
            this.$store.state.signin.is_user_admin == 'y'
          "
          @click="isDeletePermissionConfirmation = true"
        >
          권한 삭제
        </button>
        <button
          type="button"
          class="primary-btn btn-blue-outline btn-lg"
          @click="editPermissionClassification"
          v-if="
            permission == 'edit' ||
            this.$store.state.signin.is_user_admin == 'y'
          "
        >
          수정완료
        </button>
      </div>
    </div>
  </div>
  <AuthorityName :showModal="showAuthorityModal" @submit="closeModal($event)" />
  <DeletePermissionConfirmation
    v-if="isDeletePermissionConfirmation"
    @deletePermission="deletePermission()"
    @closeModal="isDeletePermissionConfirmation = false"
  />
</template>

<script>
import DynamicTabWrapper from "@/components/DynamicTabWrapper.vue";
import DynamicTabs from "@/components/DynamicTabs.vue";
import AuthorityName from "./Modal/AuthorityName.vue";
import PermissionClassificationService from "@/services/PermissionClassificationService";
import DeletePermissionConfirmation from "@/components/modals/DeletePermissionConfirmation.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import Toast from "@/alert/alert.js";
export default {
  name: "permissionClassificationManagement",
  components: {
    AuthorityName,
    DynamicTabWrapper,
    DynamicTabs,
    DeletePermissionConfirmation,
    Breadcrumb,
  },
  data() {
    return {
      isDeletePermissionConfirmation: false,
      showAuthorityModal: false,
      authority_name: "",
      AuthorityList: [],
      certificationList: [],
      permissionList: [],
      selected_authority_id: this.$route.params.id ? this.$route.params.id : 0,
      // member_id: this.$route.params.member_id
      //   ? this.$route.params.member_id
      //   : 0,
      activeTab: "",
      error: "",
    };
  },
  created() {
    this.PermissionClassificationService =
      new PermissionClassificationService();
  },
  computed: {
    permission() {
      return this.$store.state.sideBar.permission.user_management;
    },
  },

  async mounted() {
    await this.authorityList();
    if (this.selected_authority_id) {
      await this.getClassificationList();
    }
  },
  methods: {
    closeModal(event) {
      this.showAuthorityModal = event;
    },
    changeTab(value) {
      this.activeTab = value;
    },
    async addAuthority() {
      if (this.authority_name == "") {
        this.showAuthorityModal = true;
      } else {
        let res = await this.PermissionClassificationService.addAuthorityName(
          this.authority_name
        );
        if (res.status === 200) {
          await this.authorityList();
          let length = this.AuthorityList.length - 1;
          let added_id = this.AuthorityList[length].id;
          let authority_name = this.AuthorityList[length].authority_name;
          this.$router.push(
            "/add-permission-clasification/" + added_id + "/" + authority_name
          );
          this.error = "";
        } else {
          this.error = res.response.data.error;
        }
      }
    },
    async authorityList() {
      await this.PermissionClassificationService.authorityList()
        .then((res) => {
          if (res.status == 200) {
            this.AuthorityList = res.data.authorityList;
          }
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    },

    async getClassificationList() {
      // let user_data;
      // if (this.$route.params.id) {
      //   user_data = {
      //     authority_id: this.selected_authority_id,
      //     user_id: this.member_id,
      //   };
      // } else {
      let user_data = {
        authority_id: this.selected_authority_id,
      };
      // }

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

    async deletePermission() {
      // let user_data;
      // if (this.$route.params.id) {
      //   user_data = {
      //     authority_id: this.selected_authority_id,
      //     user_id: this.member_id,
      //   };
      // } else {
      let user_data = {
        authority_id: this.selected_authority_id,
      };
      // }
      const res =
        await this.PermissionClassificationService.deletePermissionByathorityId(
          user_data
        );
      if (res.status == 200) {
        this.permissionList = this.authorityList();
        this.isDeletePermissionConfirmation = false;
      } else if (res.response.status == 400) {
        Toast.fire({ title: res.response.data.error });
        this.isDeletePermissionConfirmation = false;
      }
    },

    async editPermissionClassification() {
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

      // let user_data;
      // if (this.$route.params.id) {
      //   user_data = {
      //     authority_id: this.selected_authority_id,
      //     user_id: this.member_id,
      //     permission: editPermissionList,
      //   };
      // } else {
      let user_data = {
        authority_id: this.selected_authority_id,
        permission: editPermissionList,
      };
      // }
      const res =
        await this.PermissionClassificationService.addPermissionClassification(
          user_data
        );
      if (res.status == 200) {
        this.permissionList = this.getClassificationList();
        Toast.fire({ title: "수정이 완료되었습니다." });
        this.$router.push("/user-admin");
      }
    },
  },
};
</script>

<style lang="scss">
.UserAdmin {
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
  .list-main-wrap {
    .list-warp {
      .right {
        .first_list {
          ul {
            li {
              ul {
                .modifyd {
                  white-space: nowrap;
                  display: flex;
                  align-items: center;
                  gap: 5px;
                }
              }
            }
          }
        }
      }
    }
  }
  .tabs-header {
    overflow: hidden !important;
  }
}
</style>
