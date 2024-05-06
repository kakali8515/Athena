<template>
  <div class="info_protection Evidence_group">
    <Breadcrumb
      link="dashboard"
      text1="Home"
      text2="증적관리"
      text3="증적그룹"
      text2link="EvidenceListPage"
    />
    <div class="heading flex justify-between align-end">
      <h4>증적그룹</h4>
    </div>
    <div class="policy_setting_wrap">
      <div
        class="left_wrap wrap_width_100 flex justify-between align-end flex-wrap"
      >
        <div class="select_group flex justify-start">
          <input v-model="search_text" type="text" placeholder="검색어 입력" />
          <button type="button" @click="EntireEvidenceList" class="add">
            검색
          </button>
        </div>
        <div>
          <div class="flex justify-between align-end flex-wrap">
            <div class="select_group flex justify-end">
              <span>증적그룹 추가</span>
              <input
                v-model="group_name_Add"
                type="text"
                placeholder="그룹명 입력"
              />
              <button type="button" @click="addGroup" class="add">추가</button>
            </div>
            <div class="select_group flex justify-end ml-5">
              <select v-model="selectedGroup" @change="evidenceChange">
                <option value="" selected disabled>
                  증적그룹을 선택해 주세요
                </option>
                <option value="all">전체</option>
                <option
                  v-for="(item, index) in groupList"
                  :value="item"
                  :key="index"
                >
                  {{ item.group_name }}
                </option>
              </select>
              <button @click="deleteEvidenceGroup" type="button">삭제</button>
            </div>
          </div>
          <p class="error-msg flex justify-start m-l-95">{{ error.gname }}</p>
        </div>
      </div>
    </div>
    <div class="policy_setting_wrap">
      <div class="left_wrap">
        <!-- <span class="error-msg">{{ error.groupId }}</span> -->
        <div class="flex flex-col">
          <h4>전체 증적목록</h4>
          <div class="overflow-x-auto protection_table border-0">
            <div class="inline-block min-w-full">
              <div class="overflow-hidden">
                <table class="min-w-full text-center">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        class="justify-center text-sm font-medium text-gray-900 px-6 py-4"
                      >
                        <div class="flex justify-center items-center">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            value=""
                            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                            @click="selectAll"
                            v-model="allSelected"
                            :checked="selectedEvi.length == evidenceList.length"
                          />
                        </div>
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4"
                      >
                        번호
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4"
                      >
                        영역구분
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4"
                      >
                        증적 명
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in evidenceList"
                      :key="index"
                      class="bg-white border-b"
                    >
                      <td class="text-sm text-gray-900 font-light px-6 py-4">
                        <div class="flex justify-center items-center">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                            v-model="selectedItem"
                            @click="selectSingle"
                            :value="item.evidence_id"
                          />
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
          <button
            :disabled="evidenceGroupId == 0 || selectedEvi.length == 0"
            :class="{
              no_cursor: evidenceGroupId == 0 || selectedEvi.length == 0,
            }"
            @click="allLeftToRight"
            type="button"
          >
            <img src="@/assets/icon/right_single.svg" />
          </button>
          <!-- <button  @click="singleLeftToRight" type="button"><img src="@/assets/icon/right_single.svg"></button> -->
        </div>
        <div class="down_button">
          <!-- <button  @click="singleRightToLeft" type="button"><img src="@/assets/icon/left_single.svg"></button> -->
          <button
            :disabled="evidenceGroupId == 0 || selectedPolicy.length == 0"
            :class="{
              no_cursor: evidenceGroupId == 0 || selectedPolicy.length == 0,
            }"
            @click="allRightToLeft"
            type="button"
          >
            <img src="@/assets/icon/left_single.svg" />
          </button>
        </div>
      </div>
      <div class="left_wrap">
        <div class="flex flex-col">
          <h4>증적 목록 {{ group_name }}</h4>
          <div class="overflow-x-auto protection_table border-0">
            <div class="inline-block min-w-full">
              <div class="overflow-hidden">
                <table class="min-w-full text-center">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        class="justify-center text-sm font-medium text-gray-900 px-6 py-4"
                      >
                        <div class="flex justify-center items-center">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            value=""
                            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                            @click="selectAllPolicy"
                            v-model="allSelectedPolicy"
                            :checked="
                              selectedPolicy.length == policyList.length
                            "
                          />
                        </div>
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4"
                      >
                        번호.
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4"
                      >
                        영역구분
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4"
                      >
                        증적 명
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in policyList"
                      :key="index"
                      class="bg-white border-b"
                    >
                      <td class="text-sm text-gray-900 font-light px-6 py-4">
                        <div class="flex justify-center items-center">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                            v-model="selectedPolicyItem"
                            @click="selectSinglePolicy"
                            :value="item.evidence_id"
                          />
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
      <button
        @click="savePolicy"
        :class="{ no_cursor: policyIds.length == 0 }"
        :disabled="policyIds.length == 0"
        type="button"
      >
        저장
      </button>
    </div>
  </div>
  <!--Save -->
  <InformationProtectionPolicyaddedSucessfulModal
    v-if="isAddModal"
    @close="closeModal"
    :gname="group_name"
  />
</template>

<script>
import PolicyManagementService from "@/services/PolicyManagementService";
import EvidenceManagement from "@/services/EvidenceManagement";
import InformationProtectionPolicyaddedSucessfulModal from "@/components/modals/InformationProtectionPolicyaddedSucessfulModal.vue";
import { left } from "@popperjs/core";
import Toast from "@/alert/alert";
import Breadcrumb from "@/components/Breadcrumb.vue";
export default {
  name: "EvidenceGrouping",
  components: {
    InformationProtectionPolicyaddedSucessfulModal,
    Breadcrumb,
  },
  data() {
    return {
      group_name: "",
      group_name_Add: "",
      error: {},
      groupList: [],
      groupId: this.$route.params.id,
      certification: localStorage.getItem("certificationName"),
      evidenceList: [],
      policyList: [],
      policyIds: [],
      isAddModal: false,
      //   group_name: "",
      evidenceIndex: "",
      policyIndex: "",
      allSelected: false,
      selectedItem: [],
      selectedEvi: [],
      allSelectedPolicy: false,
      selectedPolicyItem: [],
      selectedPolicy: [],
      evidenceGroupId: "",
      selectedGroup: {},
      search_text: "",
    };
  },
  created() {
    this.PolicyManagementService = new PolicyManagementService();
    this.evidenceManagement = new EvidenceManagement();
  },
  watch: {
    "$store.state.header.certificate": function (newVal, oldVal) {
      if (newVal != oldVal && newVal) {
        this.EvidenceGrouplist();
        this.EntireEvidenceList();
      }
    },
  },
  mounted() {
    this.EvidenceGrouplist();
    this.EntireEvidenceList();
    // this.groupPolicyList();
  },
  methods: {
    addGroup() {
      this.selectedEvi = [];
      this.selectedItem = [];
      this.selectedPolicy = [];
      this.selectedPolicyItem = [];
      this.policyList = [];
      this.evidenceList = [];
      this.policyIds = [];

      if (this.group_name_Add == "") {
        this.error.gname = "그룹명 입력";
      } else {
        this.evidenceManagement
          .addEvidenceGroup({ group_name: this.group_name_Add })
          .then(async (res) => {
            if (res.status == 200) {
              console.log(res.data);
              this.error.gname = "";
              this.group_name = res.data.group_name;
              this.evidenceGroupId = res.data.group_id;
              this.EntireEvidenceList();
              this.EvidenceGrouplist();
              console.log(this.group_name);
              Toast.fire({
                title: `증적그룹 ${this.group_name}이 추가되었습니다`,
              });
            } else if (res.response.status == 400) {
              Toast.fire({
                title: res.response.data.error,
              });
            }
          })
          .catch((err) => {
            Toast.fire({
              title: err.response.data.error,
            });
          });
      }
    },
    async EvidenceGrouplist() {
      await this.evidenceManagement
        .evidenceGroupList()
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data);
            this.groupList = res.data.group_list;
            let filterGroup = this.groupList.filter(
              (item) => item.group_name == this.group_name
            );
            this.selectedGroup = filterGroup[0];
          }
        })
        .catch((err) => {
          return;
        });
    },
    deleteEvidenceGroup() {
      if (this.evidenceGroupId == "") {
        this.error.evidenceGroupId = "증적그룹을 선택해 주세요";
      } else {
        this.evidenceManagement
          .EvidenceDeleteGroup({ id: this.evidenceGroupId })
          .then((res) => {
            if (res.status == 200) {
              console.log(res);
              this.EvidenceGrouplist();
              this.error.evidenceGroupId = "";
              this.evidenceGroupId = "";
              if (res.status === 200) {
                Toast.fire({
                  title: `증적그룹 ${this.group_name}이 삭제되었습니다`,
                });
              }
              this.group_name = "";
              //   this.$router.push("/InformationProtectionPolicySetting");
            }
          })
          .catch((err) => {
            return;
          });
      }
    },
    EntireEvidenceList() {
      if (this.evidenceGroupId) {
        this.evidenceManagement
          .EvidenceGroupEntireEvidence({
            certification: this.certification,
            search_text: this.search_text,
            group_id: `${this.evidenceGroupId}`,
          })
          .then((res) => {
            if (res.status == 200) {
              this.evidenceList = res.data.evidence_list;
            }
          })
          .catch((err) => {
            return;
          });
      }
    },
    EvidenceAssigneGroup() {
      if (this.evidenceGroupId) {
        this.evidenceManagement
          .EvidenceAssigneGroup({
            certification: this.certification,
            group_id: `${this.evidenceGroupId}`,
          })
          .then((res) => {
            if (res.status == 200) {
              this.policyList = res.data.evidence_list;
              for (let i = 0; i < this.policyList.length; i++) {
                this.policyIds.push(this.policyList[i].evidence_id);
              }
            }
          })
          .catch((err) => {
            return;
          });
      }
    },

    allLeftToRight() {
      console.log(this.selectedGroup);
      if (Object.values(this.selectedGroup).length !== 0) {
        for (let i = 0; i < this.selectedEvi.length; i++) {
          this.policyList.push({
            id: "",
            evidence_id: this.selectedEvi[i].evidence_id,
            evidence_code: this.selectedEvi[i].evidence_code,
            evidence: this.selectedEvi[i].evidence,
          });
          this.policyIds.push(this.selectedEvi[i].evidence_id);
          this.evidenceList = this.evidenceList.filter((item) => {
            return item.evidence_id != this.selectedEvi[i].evidence_id;
          });
        }
        this.selectedEvi = [];
        this.selectedItem = [];
        this.allSelected = false;
      } else {
        // this.error.evidenceGroupId = "Please select a evidence group";
      }
    },

    allRightToLeft() {
      if (this.selectedGroup.length !== 0) {
        for (let i = 0; i < this.selectedPolicy.length; i++) {
          this.evidenceList.push({
            evidence_id: this.selectedPolicy[i].evidence_id,
            evidence_code: this.selectedPolicy[i].evidence_code,
            evidence: this.selectedPolicy[i].evidence,
          });
          this.policyIds = this.policyIds.filter((item) => {
            return item != this.selectedPolicy[i].evidence_id;
          });
          this.policyList = this.policyList.filter((item) => {
            return item.evidence_id != this.selectedPolicy[i].evidence_id;
          });
        }
        this.selectedPolicy = [];
        this.selectedPolicyItem = [];
        this.allSelectedPolicy = false;
      } else {
        // this.error.evidenceGroupId = "Please select a evidence group";
      }
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
    savePolicy() {
      this.evidenceManagement
        .SaveEvidenceGroup({
          group_id: `${this.evidenceGroupId}`,
          evidenceArary: this.policyIds,
        })
        .then((res) => {
          if (res.status == 200) {
            // this.group_name = res.data.group_name;
            console.log(this.group_name);
            // this.isAddModal = true;
            this.$router.push({
              name: "EvidenceListPage",
            });
            Toast.fire({
              title: `증적그룹 추가되었습니다`,
            });
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
      //   this.$router.push(
      //     `/InformationProtectionPolicySettingWithContent/${e.target.value}`
      //   );
      console.log(this.selectedGroup);
      this.group_name = this.selectedGroup.group_name;
      this.evidenceGroupId = this.selectedGroup.id;
      this.EvidenceAssigneGroup();
      this.EntireEvidenceList();
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
      if (this.selectedEvi.length == this.evidenceList.length) {
        this.allSelected = true;
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
      if (this.selectedPolicy.length == this.policyList.length) {
        this.allSelectedPolicy = true;
      }
    },
  },
};
</script>
