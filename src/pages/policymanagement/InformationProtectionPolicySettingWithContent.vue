<template>
  <div class="info_protection">
    <Breadcrumb link="dashboard" text1="Home" text2="정책관리" text3="정보보호정책" link2="/informationProtectionPolicyadded" />
    <div class="heading flex justify-between align-end">
      <h4>정보보호정책</h4>
    </div>
    <div class="policy_setting_wrap">
      <div class="left_wrap">
        <div class="select_group flex justify-start">
          <select v-model="groupId" @change="evidenceChange">
            <option value="" disabled selected>정책그룹을 선택하주세요</option>
            <option :value="item.id" v-for="(item, index) in groupList" :key="index">
              {{ item.group_name }}
            </option>
          </select>
          <button @click="deletePolicyGroup" type="button" v-if="permission=='edit' || this.$store.state.signin.is_user_admin == 'y'">삭제</button>
        </div>
        <span class="error-msg">{{ error.groupId }}</span>
        <div class="flex flex-col">
          <div class="overflow-x-auto protection_table border-0">
            <div class="inline-block min-w-full">
              <div class="overflow-hidden">
                <table class="min-w-full text-center">
                  <thead class="border-b  bg-gray-50">
                    <tr>
                      <th scope="col" class="
                          justify-center
                          text-sm
                          font-medium
                          text-gray-900
                          px-6
                          py-4
                        ">
                        <div class="flex items-center justify-center">
                          <input id="default-checkbox" type="checkbox" value="" class="
                              w-4
                              h-4
                              text-blue-600
                              bg-gray-100
                              rounded
                              border-gray-300
                              dark:ring-offset-gray-800
                              dark:bg-gray-700 dark:border-gray-600
                            " @click="selectAll" v-model="allSelected"
                            :checked="selectedEvi.length == evidenceList.length" />
                        </div>
                      </th>
                      <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                        번호
                      </th>
                      <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                        증적 코드
                      </th>
                      <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                        증적 명
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in evidenceList" :key="index" class="bg-white border-b">
                      <td class="text-sm text-gray-900 font-light px-6 py-4">
                        <div class="flex items-center justify-center">
                          <input id="default-checkbox" type="checkbox" class="
                              w-4
                              h-4
                              text-blue-600
                              bg-gray-100
                              rounded
                              border-gray-300
                              dark:ring-offset-gray-800
                              dark:bg-gray-700 dark:border-gray-600
                            " v-model="selectedItem" @click="selectSingle" :value="item.evidence_id" />
                        </div>
                      </td>
                      <td class="px-6 py-4 text-sm font-medium text-gray-900">
                        {{ index + 1 }}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4">
                        {{ item.evidence_code }}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4">
                        {{ item.evidence }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="arrow_btn_wrap">
        <div class="up_button">
          <button :disabled="groupId == 0 || selectedEvi.length == 0"
            :class="{ no_cursor: groupId == 0 || selectedEvi.length == 0 }" @click="allLeftToRight" type="button">
            <img src="@/assets/icon/right_single.svg" />
          </button>
          <!-- <button  @click="singleLeftToRight" type="button"><img src="@/assets/icon/right_single.svg"></button> -->
        </div>
        <div class="down_button">
          <!-- <button  @click="singleRightToLeft" type="button"><img src="@/assets/icon/left_single.svg"></button> -->
          <button :disabled="groupId == 0 || selectedPolicy.length == 0"
            :class="{ no_cursor: groupId == 0 || selectedPolicy.length == 0 }" @click="allRightToLeft" type="button">
            <img src="@/assets/icon/left_single.svg" />
          </button>
        </div>
      </div>
      <div class="left_wrap">
        <div class="select_group flex justify-end">
          <span>전체 증적 생성</span>
          <div>
          <input v-model="group_name" type="text" placeholder="그룹명 입력" />
          <button v-if="permission=='edit' || this.$store.state.signin.is_user_admin == 'y'" type="button" @click="addGroup" class="add">추가</button>
          </div>
        </div>
        <p class="error-msg">{{ error.gname }}</p>
        <div class="flex flex-col">
          <div class="overflow-x-auto protection_table border-0">
            <div class="inline-block min-w-full">
              <div class="overflow-hidden">
                <table class="min-w-full text-center">
                  <thead class="border-b bg-gray-50">
                    <tr>
                      <th scope="col" class="
                          justify-center
                          text-sm
                          font-medium
                          text-gray-900
                          px-6
                          py-4
                        ">
                        <div class="flex items-center justify-center">
                          <input id="default-checkbox" type="checkbox" value="" class="
                              w-4
                              h-4
                              text-blue-600
                              bg-gray-100
                              rounded
                              border-gray-300
                              dark:ring-offset-gray-800
                              dark:bg-gray-700 dark:border-gray-600
                            " @click="selectAllPolicy" v-model="allSelectedPolicy"
                            :checked="selectedPolicy.length == policyList.length" />
                        </div>
                      </th>
                      <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                        번호
                      </th>
                      <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                        증적 코드
                      </th>
                      <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                        증적 명
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in policyList" :key="index" class="bg-white border-b">
                      <td class="text-sm text-gray-900 font-light px-6 py-4">
                        <div class="flex items-center justify-center">
                          <input id="default-checkbox" type="checkbox" class="
                              w-4
                              h-4
                              text-blue-600
                              bg-gray-100
                              rounded
                              border-gray-300
                              dark:ring-offset-gray-800
                              dark:bg-gray-700 dark:border-gray-600
                            " v-model="selectedPolicyItem" @click="selectSinglePolicy" :value="item.evidence_id" />
                        </div>
                      </td>
                      <td class="px-6 py-4 text-sm font-medium text-gray-900">
                        {{ index + 1 }}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4">
                        {{ item.evidence_code }}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4">
                        {{ item.evidence }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="save_button_wrap fixed-button-wrap">
      <button v-if="permission=='edit' || this.$store.state.signin.is_user_admin == 'y'" @click="savePolicy" :class="{ no_cursor: policyIds.length == 0 }" :disabled="policyIds.length == 0"
        type="button">
        저장
      </button>
    </div>
  </div>
  <!--Save -->
  <InformationProtectionPolicyaddedSucessfulModal v-if="isAddModal" @close="closeModal" :gname="group_name"
    @confirm="save" />
</template>


<script>
import PolicyManagementService from "@/services/PolicyManagementService";
import InformationProtectionPolicyaddedSucessfulModal from "@/components/modals/InformationProtectionPolicyaddedSucessfulModal.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
export default {
  name: "InformationProtectionPolicySettingWithContent",
  components: {
    InformationProtectionPolicyaddedSucessfulModal,
    Breadcrumb,
  },
  data() {
    return {
      group_name: "",
      error: {},
      groupList: [],
      groupId: this.$route.params.id ? this.$route.params.id : "",
      certification: localStorage.getItem("certificationName"),
      evidenceList: [],
      policyList: [],
      policyIds: [],
      isAddModal: false,
      group_name: "",
      evidenceIndex: "",
      policyIndex: "",
      allSelected: false,
      selectedItem: [],
      selectedEvi: [],
      allSelectedPolicy: false,
      selectedPolicyItem: [],
      selectedPolicy: [],
    };
  },
  created() {
    this.PolicyManagementService = new PolicyManagementService();
  },
   computed:{
    permission(){
      return this.$store.state.sideBar.permission.information_protection_policy;
    }
  },
  beforeMount() {
    this.policyGroupList();
    this.policyEvidenceList();
    this.groupPolicyList();
  },
  watch: {
    "$store.state.header.certificate": function (newVal, oldVal) {
      if (newVal != oldVal && newVal) {
        this.policyGroupList();
        this.policyEvidenceList();
        this.groupPolicyList();
      }
    },
  },
  methods: {
    addGroup() {
      if (this.group_name == "") {
        this.error.gname = "그룹명 입력";
      } else {
        this.PolicyManagementService.addPolicyGroup(this.group_name)
          .then((res) => {
            if (res.status == 200) {
              this.policyGroupList();
              this.error.gname = "";
              this.group_name = "";
              this.$router.push(
                `/InformationProtectionPolicySettingWithContent/${res.data.group_id}`
              );
            } else {
              this.error.gname = res.response.data.error;
            }
          })
          .catch((err) => {
            return;
          });
      }
    },
    policyGroupList() {
      this.PolicyManagementService.policyGroupList()
        .then((res) => {
          if (res.status == 200) {
            this.groupList = res.data.policy_group_list;
          }
        })
        .catch((err) => {
          return;
        });
    },
    deletePolicyGroup() {
      if (this.groupId == "") {
        this.error.groupId = "정책그룹을 선택하주세요";
      } else {
        this.PolicyManagementService.deletePolicyGroup(this.groupId)
          .then((res) => {
            if (res.status == 200) {
              this.policyGroupList();
              this.error.groupId = "";
              this.groupId = "";
              this.$router.push(
                "/InformationProtectionPolicySettingWithContent"
              );
            } else {
              this.error.groupId = res.response.data.error;
            }
          })
          .catch((err) => {
            return;
          });
      }
    },
    policyEvidenceList() {
      if (this.groupId) {
        this.PolicyManagementService.policyEvidenceList(
          this.certification,
          this.groupId
        )
          .then((res) => {
            if (res.status == 200) {
              this.evidenceList = res.data.policy_evidence_list;
            }
          })
          .catch((err) => {
            return;
          });
      }
    },
    groupPolicyList() {
      if (this.groupId) {
        this.PolicyManagementService.groupPolicyList(
          this.certification,
          this.$route.params.id
        )
          .then((res) => {
            if (res.status == 200) {
              this.policyList = res.data.group_policy_list;
              for (let i = 0; i < this.policyList.length; i++) {
                this.policyIds.push({
                  evidence_id: this.policyList[i].evidence_id,
                });
              }
            }
          })
          .catch((err) => {
            return;
          });
      }
    },

    allLeftToRight() {
      for (let i = 0; i < this.selectedEvi.length; i++) {
        this.policyList.push({
          id: "",
          evidence_id: this.selectedEvi[i].evidence_id,
          evidence_code: this.selectedEvi[i].evidence_code,
          evidence: this.selectedEvi[i].evidence,
        });
        this.policyIds.push({ evidence_id: this.selectedEvi[i].evidence_id });
        this.evidenceList = this.evidenceList.filter((item) => {
          return item.evidence_id != this.selectedEvi[i].evidence_id;
        });
      }
      this.selectedEvi = [];
      this.selectedItem = [];
      this.allSelected = false;
    },
    allRightToLeft() {
      for (let i = 0; i < this.selectedPolicy.length; i++) {
        this.evidenceList.push({
          evidence_id: this.selectedPolicy[i].evidence_id,
          evidence_code: this.selectedPolicy[i].evidence_code,
          evidence: this.selectedPolicy[i].evidence,
        });
        this.policyIds = this.policyIds.filter((item) => {
          return item.evidence_id != this.selectedPolicy[i].evidence_id;
        });
        this.policyList = this.policyList.filter((item) => {
          return item.evidence_id != this.selectedPolicy[i].evidence_id;
        });
      }
      this.selectedPolicy = [];
      this.selectedPolicyItem = [];
      this.allSelectedPolicy = false;
    },
    singleLeftToRight() {
      if (this.evidenceIndex != "") {
        this.evidenceList.splice(
          this.evidenceList.indexOf(this.evidenceIndex),
          1
        );
        this.policyList.push({
          id: "",
          evidence_id: this.evidenceIndex.evidence_id,
          evidence_code: this.evidenceIndex.evidence_code,
          evidence: this.evidenceIndex.evidence,
        });
      }
      this.evidenceIndex = "";
    },
    singleRightToLeft() {
      if (this.policyIndex != "") {
        this.policyList.splice(this.policyList.indexOf(this.policyIndex), 1);
        this.evidenceList.push({
          evidence_id: this.policyIndex.evidence_id,
          evidence_code: this.policyIndex.evidence_code,
          evidence: this.policyIndex.evidence,
        });
      }
      this.policyIndex = "";
    },
    choose_evidence(item) {
      this.evidenceIndex = item;
    },
    choose_policy(item) {
      this.policyIndex = item;
    },
    save() {
      this.$router.push("/informationProtectionPolicyadded");
    },
    savePolicy() {
      this.PolicyManagementService.assignGroup(
        this.$route.params.id,
        this.policyIds
      )
        .then((res) => {
          if (res.status == 200) {
            this.group_name = res.data.group_name;
            this.isAddModal = true;
          }
        })
        .catch((err) => {
          return;
        });
    },
    closeModal() {
      this.isAddModal = false;
    },
    evidenceChange(e) {
      this.$router.push(
        `/InformationProtectionPolicySettingWithContent/${e.target.value}`
      );
    },
    // all threat select check box
    selectAll() {
      this.selectedPolicyItem = [];
      this.selectedPolicy = [];
      this.allSelectedPolicy = false;
      if (!this.allSelected) {
        const selected = this.evidenceList.map((u) => u.evidence_id);
        this.selectedItem = selected;
        this.selectedEvi = this.evidenceList.map((u) => {
          return u;
        });
      } else {
        this.selectedItem = [];
        this.selectedEvi = [];
      }
    },
    // checkbox select event
    selectSingle(event) {
      this.selectedPolicyItem = [];
      this.selectedPolicy = [];
      const id = event.target.value;
      const click = event.target.checked;
      const obj = this.evidenceList.find((x) => x.evidence_id == id);
      if (click) {
        this.selectedEvi.push(obj);
        this.selectedItem.push(Number(id));
      } else {
        this.selectedEvi.splice(this.selectedEvi.indexOf(obj), 1);
        this.selectedItem.splice(this.selectedItem.indexOf(Number(id)), 1);
      }
      if(this.selectedEvi.length == this.evidenceList.length) {
        this.allSelected =true;
      }
    },

    selectAllPolicy() {
      this.selectedItem = [];
      this.selectedEvi = [];
      this.allSelected = false;
      if (!this.allSelectedPolicy) {
        const selected = this.policyList.map((u) => u.evidence_id);
        this.selectedPolicyItem = selected;
        this.selectedPolicy = this.policyList.map((u) => {
          return u;
        });
      } else {
        this.selectedPolicyItem = [];
        this.selectedPolicy = [];
      }
    },
    selectSinglePolicy(event) {
      this.selectedItem = [];
      this.selectedEvi = [];
      const id = event.target.value;
      const click = event.target.checked;
      const obj = this.policyList.find((x) => x.evidence_id == id);
      if (click) {
        this.selectedPolicy.push(obj);
        this.selectedPolicyItem.push(Number(id));
      } else {
        this.selectedPolicy.splice(this.selectedPolicy.indexOf(obj), 1);
        this.selectedPolicyItem.splice(
          this.selectedPolicyItem.indexOf(Number(id)),
          1
        );
      }
      if(this.selectedPolicy.length == this.policyList.length) {
        this.allSelectedPolicy=true;
      }
    },
  },
};
</script>

<style scoped>
p.error-msg {
  margin-left: 224px;
}
</style>