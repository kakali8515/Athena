<template>
  <div class="info_protection">
    <div class="breadcrumb">
      <Breadcrumb
        link="dashboard"
        text1="Home"
        text2="증적관리"
        text3="증적목록"
      />
    </div>
    <div class="heading flex justify-between align-end">
      <h4>증적 상세보기</h4>
      <!-- <div class="history_wrap">
        <button
          type="button"
          @click="
            () => {
              showDeleteModal = true;
            }
          "
        >
          Delete
        </button>
      </div> -->
    </div>

    <div class="managmenttable">
      <div class="delete_wrap">
        <p>
          * 증적목록에서 해당 증적을 삭제합니다.
        </p>
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400 evidence-table"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">통제영역</th>
              <th scope="col" class="px-6 py-3">증적 코드 </th>
              <th scope="col" class="px-6 py-3">증적 명</th>
              <th scope="col" class="px-6 py-3">실사여부</th>
              <th scope="col" class="px-6 py-3">주기</th>
              <th scope="col" class="px-6 py-3 flex space-between">
                결재
                <button
                  class="blue-underline primary-btn"
                  @click="
                    () => {
                      showChooseApproval = true;
                    }
                  "
                >
                설정
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                <select v-model="control_area" :disabled="showControlDropdown">
                  <option v-for="(i, e) in control_area_list" :key="e">
                    {{ i.class }}
                  </option>
                </select>
              </th>
              <td class="px-6 py-4">
                <input
                  type="text"
                  placeholder="ISMS-00-00"
                  v-model="evidence_code"
                />
              </td>
              <td class="px-6 py-4">
                <input
                  type="text"
                  placeholder="Information Security Management System Specification"
                  v-model="evidence"
                />
              </td>
              <td class="px-6 py-4">
                <select v-model="dueDilligenceValue">
                  <option v-for="(i, e) in due_diligence" :key="e">
                    {{ i }}
                  </option>
                </select>
              </td>
              <td class="px-6 py-4 text-right">
                <select v-model="cycle">
                  <option v-for="(i, e) in cycleList" :key="e">{{ i }}</option>
                </select>
              </td>
              <td class="px-6 py-4">
                <input
                  type="text"
                  placeholder=""
                  :value="paymentStep"
                  readonly
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="explenation">
      <div class="details">
        <div class="left">
          <p>설명</p>
        </div>
        <div class="right">
          <textarea
            v-model="explanation"
            rows="6"
            style="width: 100%; height: 100%"
          >
          </textarea>
        </div>
      </div>
      <div class="details">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">영역</th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
                  <p class="grow">통제항목</p>
                  <button
                    class="blue-underline primary-btn"
                    @click="
                      () => {
                        showControlsModal = true;
                      }
                    "
                  >
                    추가
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white border-b"
              v-for="(i, e) in control_items"
              :key="e"
            >
              <td class="px-6 py-4">{{ i.control_item }}</td>
              <td class="px-6 py-4">{{ i.area }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="extra_wrap">
        <div class="details longdiv">
          <div class="left">
            <p>담당자</p>
            <button
              class="blue-underline primary-btn"
              @click="
                () => {
                  showTraceManagement = true;
                }
              "
            >
              추가
            </button>
          </div>
          <div class="right">
            <p>
              {{ managers_name }}
            </p>
          </div>
        </div>
        <!-- <div class="select" v-if="secondBtnSet">
          <span>Recent upload history</span>
          <div>
            <select>
              <option value="" selected>All</option>
              <option
                v-for="(recentHistory, i) in recentHistoryList"
                :key="i"
                :value="recentHistory.history_id"
              >
                {{ recentHistory.history_date }}
              </option>
            </select>
          </div>
        </div> -->
      </div>
    </div>
    <div class="evidence_wrap" v-if="!showTemplate">
      <div class="file_extension" v-if="file">
        <span>{{ fileName }}</span>
        <img src="@/assets/icon/Close_square.svg" @click="removeFile" />
      </div>
      <div class="spacebar" v-if="!file">
        <h4>
         증적이 등록되지 않았습니다.<br/> 하단 버튼에서 증적파일 업로드 하거나 증적 양식 중 선택 하여 저장 혹은 결재 진행 하실 수 있습니다.
        </h4>
      </div>
      <div
        class="spacebar"
        :style="{ 'background-image': `url(${image})` }"
        v-if="file"
      >
        <!-- <h4>You can preview when saving is complete...</h4> -->
      </div>
    </div>
    <div class="evidence_wrap" v-if="showTemplate">
      <!-- <Tiptap v-model="templateDetails.template" /> -->

      <ContentEditor v-model:get="templateDetails.template" :set="templateDetails.templateData" />

      <!-- <p>{{ templateDetails.template }}</p> -->
    </div>

    <div class="button_wrap fixed-button-wrap flex justify-between">
      <div class="buttons flex justify-start">
        <button
          type="button"
          class="gray"
          @click="
            () => {
              showTemplateModal = true;
            }
          "
          v-if="!edittable"
        >
         증적 양식 선택하기
        </button>
        <div class="custom-select" @click="selectImage" v-if="!edittable">
          <input type="file" class="select-file" v-on:change="onFileChange" />
          <button type="button" class="gray">증적파일 업로드</button>
        </div>
      </div>

      <div class="buttons flex justify-end" v-if="permission=='edit' || this.$store.state.signin.is_user_admin == 'y'">
        <button type="button" @click="editEvidence">저장하기</button>
      </div>
    </div>
  </div>
  <ChooseApproval
    v-show="showChooseApproval"
    v-if="showChooseApproval"
    :existingPayment="paymentLine"
    @closeModal="closeChooseApprovalModal($event)"
    @paymentOrder="setPaymentOrder($event)"
  />
  <ControlsModal
    v-show="showControlsModal"
    v-if="showControlsModal"
    :storedControlItems="storedControlItem"
    @closeModal="closeControlsModal($event)"
    @itemsSelected="controlItemSelected($event)"
  />
  <TraceManagement
    v-show="showTraceManagement"
    v-if="showTraceManagement"
    :preSelectedManagers="managers"
    @closeModal="closeTraceManagement($event)"
    @addManagers="AddManagers($event)"
  />
  <SelectTemplateModal
    v-show="showTemplateModal"
    v-if="showTemplateModal"
    @closeModal="closeTemplateModal($event)"
    @selectMethod="templateSelection($event)"
  />
  <ApprovalPayment
    v-show="showApprovalPayment"
    v-if="showApprovalPayment"
    :EvidenceId="evidenceId"
    @closeModal="closeApprovalPayment($event)"
  />
  <EvidenceDelete
    v-show="showDeleteModal"
    v-if="showDeleteModal"
    @closeModal="closeDeleteModal($event)"
    @deleteEvidenceList="deleteEvidenceList"
  />
  <EvidenceDeleteHistory
    v-show="showDeleteHistoryModal"
    v-if="showDeleteHistoryModal"
    @closeModal="closeDeleteHistoryModal($event)"
    @DeleteHistoryList="deleteHistoryList"
  />
</template>

<script>
import DataTable from "@/components/DataTable.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import EvidenceManagement from "@/services/EvidenceManagement";
import ChooseApproval from "@/components/modals/ChooseApproval.vue";
import ControlsModal from "@/components/modals/ListOfControlsModal.vue";
import TraceManagement from "@/components/modals/TraceManagementControl.vue";
import SelectTemplateModal from "@/components/modals/SelectFormModalOne.vue";
import ApprovalPayment from "@/components/modals/ApprovalPayment.vue";
import EvidenceDelete from "@/components/modals/EvidenceDelete.vue";
import EvidenceDeleteHistory from "@/components/modals/EvidenceDeleteHistory.vue";
// import Tiptap from "@/components/Utils/TipTap.vue";
import Toast from "@/alert/alert";
import EvidenceValidate from "@/validation/EvidenceValidation";

export default {
  name: "PresetDetails",
  components: {
    // Tabs,
    // TabWrapper,
    DataTable,
    Breadcrumb,
    ChooseApproval,
    ControlsModal,
    TraceManagement,
    SelectTemplateModal,
    ApprovalPayment,
    EvidenceDelete,
    EvidenceDeleteHistory,
    // Tiptap,
  },

  created() {
    this.evidenceManagement = new EvidenceManagement();
  },

  data() {
    return {
      showControlDropdown: true,
      due_diligence: [],
      cycleList: [],
      dueDilligenceValue: "",
      evidence: "",
      evidence_code: "",
      cycle: "",
      explanation: "",
      control_items: [],
      control_area: "",
      control_area_list: [],
      managers: [],
      managers_name: "",
      certification_name: "ISMS-P",
      showChooseApproval: false,
      showControlsModal: false,
      showTraceManagement: false,
      showTemplateModal: false,
      showDeleteModal: false,
      showDeleteHistoryModal: false,
      storedControlItem: [],
      templateDetails: {
        template_id: null,
        template: "",
        template_name: "",
        templateData:""
      },
      showTemplate: false,
      template_content: "",
      paymentLine: [],
      paymentStep: "",
      showApprovalPayment: false,
      evidence_type: "",
      file: "",
      fileName: "",
      image: "",
      evidenceId: this.$route.params.id,
      edittable: false,
      secondBtnSet: false,
      recentHistoryList: [],
    };
  },

computed:{
    permission(){
      return this.$store.state.sideBar.permission.evidence_list;
    }
  },
  // beforeMount() {
  //   this.getRecentUploadHistory();
  // },

  mounted() {
    this.getDetails();
    this.getDueDilligence();
    this.getCyleList();
  },

  methods: {
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.file = files[0];
      this.fileName = this.file.name;
      if (files && this.file) {
        this.showTemplate = false;
        this.templateDetails.template_id = "";
        this.templateDetails.template = "";
        this.templateDetails.template_name = "";
        this.templateDetails.templateData = "";
        this.evidence_type = "file";
        let reader = new FileReader();
        reader.onload = (e) => {
          this.image = e.target.result;
          console.log(this.image);
        };
        reader.readAsDataURL(this.file);
        console.log(this.file, this.image);
      }
    },

    removeFile() {
      this.evidence_type = "";
      this.file = "";
      this.fileName = "";
      this.image = "";
    },

    getDetails() {
      this.evidenceManagement
        .viewEvidence({ id: this.$route.params.id, list_type: "preset" })
        .then((res) => {
          console.log(res);
          this.dueDilligenceValue = res.data.due_diligence;
          this.evidence = res.data.evidence;
          this.evidence_code = res.data.evidence_code;
          this.cycle = res.data.cycle;
          this.explanation = res.data.explanation;
          this.control_items = res.data.area_control_item_information;
          // this.storedControlItem = res.data.control_items;
          this.certification_name = res.data.certification_name;
          this.control_area = res.data.control_area;
          if (this.control_items.length !== 0 && this.control_area !== null) {
            this.getcontrolAreaList();
          }
          this.templateDetails = {
            template_id: res.data.template_information.id,
            templateData: res.data.template_information.template,
            template_name: res.data.template_information.template_name,
          };
          if (
            Object.keys(this.templateDetails).length > 0 &&
            res.data.template_information.id
          ) {
            this.showTemplate = true;
            this.evidence_type = "template";
          }
          this.paymentStep = res.data.current_step + " Step";
          let approvalArr = ["approved", "save"];
          if (approvalArr.includes(res.data.current_status)) {
            this.edittable = true;
            this.secondBtnSet = true;
          }
        });
    },
    getDueDilligence() {
      this.evidenceManagement.dueDilligence().then((res) => {
        console.log(res);
        this.due_diligence = res.data.due_diligence;
      });
    },
    getCyleList() {
      this.evidenceManagement.cyclelist().then((res) => {
        console.log(res);
        this.cycleList = res.data.cycle;
      });
    },
    getcontrolAreaList() {
      this.control_area_list = [];
      let item_number = [];
      this.control_items.map((i) => {
        item_number.push(i.area);
      });
      this.evidenceManagement
        .controlAreaList({ item_number: [...item_number] })
        .then((res) => {
          console.log(res);
          this.control_area_list = res.data.data;
          this.showControlDropdown = false;
        });
    },
    controlItemSelected(event) {
      this.showControlsModal = event.display;
      this.storedControlItem = event.item;
      this.control_items = [];
      this.control_items = event.item.map((i) => {
        return {
          control_item: i.item_title,
          area: i.item_number,
        };
      });
      this.getcontrolAreaList();
      console.log(this.control_items);
    },
    templateSelection(event) {
      this.showTemplateModal = event.display;
      this.templateDetails = {
        template_id: event.value.id,
        templateData: event.value.template,
        template_name: event.value.template_name,
      };
      console.log(this.templateDetails);
      if (
        Object.keys(this.templateDetails).length > 0 &&
        event.value.template
      ) {
        this.showTemplate = true;
        this.evidence_type = "template";
      }
    },
    AddManagers(event) {
      this.showTraceManagement = event.display;
      this.managers = event.value;
      this.managers_name = event.value.map((i) => i.name).toString();
    },
    setPaymentOrder(event) {
      this.showChooseApproval = event.display;
      this.paymentLine = event.value;
      this.paymentStep = `${event.value.length}steps`;
    },
    // checkError() {
    //   let inputdata = {
    //     certification_name: this.certification_name,
    //     control_area: this.control_area,
    //     evidence_code: this.evidence_code,
    //     evidence: this.evidence,
    //     due_diligence: this.dueDilligenceValue,
    //     cycle: this.cycle,
    //     template_id: this.templateDetails.template_id,
    //     manager_list: this.managers.map((i) => {
    //       return `${i.id}`;
    //     }),
    //     user_list: this.paymentLine.map((i, e) => {
    //       return {
    //         id: `${i.id}`,
    //         payment_line: `${e + 1}`,
    //       };
    //     }),
    //     control_items: this.control_items,
    //     explanation: this.explanation,
    //   };
    //   console.log(inputdata);
    //   const { isInvalid, error } = EvidenceValidate(inputdata);

    //   if (isInvalid) {
    //     Toast.fire({ title: `${error.alertMessage}` });
    //     // this.error = error;
    //     return false;
    //   } else {
    //     this.error = {};
    //     return true;
    //   }
    // },
    editEvidence() {
      if (this.edittable) {
        this.edittable = false;
      } else {
        let managerArr = [];
        this.managers.forEach((i) => {
          managerArr.push(i.user_id);
        });

        let paymentData = [];
        this.paymentLine.forEach((i, e) => {
          paymentData.push({
            id: i.user_id,
            payment_line: e + 1,
          });
        });
        this.certification_name = this.$store.state.header.certificate;
        this.formData = new FormData();
        // console.log(paymentData, managerArr);
        if (this.evidence_type === "file") {
          this.formData.append("file_name", this.file);
        }
        this.formData.append("certification_name", this.certification_name);
        this.formData.append("control_area", this.control_area);
        this.formData.append("evidence_code", this.evidence_code);
        this.formData.append("evidence", this.evidence);
        this.formData.append("evidence_type", this.evidence_type);
        this.formData.append("due_diligence", this.dueDilligenceValue);
        this.formData.append("cycle", this.cycle);
        // this.formData.append("template_id", this.templateDetails.template_id);
        this.formData.append(
          "template_name",
          this.templateDetails.template_name
        );
        this.formData.append("template", `${this.templateDetails.template.toString()}`);
        for (let i = 0; i < managerArr.length; i++) {
          this.formData.append(`manager_list[${i}]`, managerArr[i]);
        }
        for (let k = 0; k < paymentData.length; k++) {
          this.formData.append(
            `user_list[${k}][id]`,
            String(paymentData[k].id)
          );
          this.formData.append(
            `user_list[${k}][payment_line]`,
            String(paymentData[k].payment_line)
          );
        }
        // this.formData.append("user_list", paymentData);
        for (let j = 0; j < this.control_items.length; j++) {
          this.formData.append(
            `control_items[${j}][control_item]`,
            String(this.control_items[j].area)
          );
          this.formData.append(
            `control_items[${j}][area]`,
            String(this.control_items[j].control_item)
          );
          // this.formData.append("control_items", this.control_items[j]);
        }
        this.formData.append("explanation", this.explanation);

        // if (this.evidence_type === "template") {
        //   this.evidenceManagement
        //     .EditTemplate({
        //       id: this.templateDetails.template_id,
        //       template: this.templateDetails.template,
        //     })
        //     .then((res) => {
        //       console.log(res);
        //     });
        // }

        this.evidenceManagement
          .addEvidence(this.formData)
          .then((res) => {
            console.log("preset Add", res);
            if (res.status == 200) {
              this.formData = null;
              Toast.fire({ title: res.data.message });
              this.$router.push({ name: "EvidenceListPage" });
            } else if (res.response.status == 401) {
            Toast.fire({ title: res.response.data.error });
          } else {

            if (res.response.data.validation.body.keys == 'control_area') {
              Toast.fire({ title: "통제영역을 입력해주세요" });
            }
            if (res.response.data.validation.body.keys == 'evidence_code') {
              Toast.fire({ title: "증적코드를 입력해주세요" });
            }
            if (res.response.data.validation.body.keys == 'evidence') {
              Toast.fire({ title: "증적을 입력해주세요" });
            }
            if (res.response.data.validation.body.keys == 'due_diligence') {
              Toast.fire({ title: "실사여부를 입력해주세요" });
            }
            if (res.response.data.validation.body.keys == 'cycle') {
              Toast.fire({ title: "주기를 입력해주세요" });
            }
            if (res.response.data.validation.body.keys == 'manager_list') {
              Toast.fire({ title: "담당자를 입력해주세요" });
            }
            if (res.response.data.validation.body.keys == 'explanation') {
              Toast.fire({ title: "설명을 입력해주세요" });
            }
            if (res.response.data.validation.body.keys == 'evidence_type') {
              Toast.fire({ title: "증적은 파일 혹은 템플릿을 설정하셔야 합니다" });
            }
            if (res.response.data.validation.body.keys == 'user_list') {
              Toast.fire({ title: "결재 설정을 입력해주세요" });
            }
          }
          })
          .catch((err) => {
            console.log("error message",err);
            if (err.response.status == 401) {
            Toast.fire({ title: err.response.data.error });
          } else if (err.response.status == 400) {
            if (err.response.data.validation.body.keys == 'control_area') {
              Toast.fire({ title: "통제영역을 입력해주세요" });
            }
            if (err.response.data.validation.body.keys == 'evidence_code') {
              Toast.fire({ title: "증적코드를 입력해주세요" });
            }
            if (err.response.data.validation.body.keys == 'evidence') {
              Toast.fire({ title: "증적을 입력해주세요" });
            }
            if (err.response.data.validation.body.keys == 'due_diligence') {
              Toast.fire({ title: "실사여부를 입력해주세요" });
            }
            if (err.response.data.validation.body.keys == 'cycle') {
              Toast.fire({ title: "주기를 입력해주세요" });
            }
            if (err.response.data.validation.body.keys == 'manager_list') {
              Toast.fire({ title: "담당자를 입력해주세요" });
            }
            if (err.response.data.validation.body.keys == 'explanation') {
              Toast.fire({ title: "설명을 입력해주세요" });
            }
            if (err.response.data.validation.body.keys == 'evidence_type') {
              Toast.fire({ title: "증적은 파일 혹은 템플릿을 설정하셔야 합니다" });
            }
            if (err.response.data.validation.body.keys == 'user_list') {
              Toast.fire({ title: "결재 설정을 입력해주세요" });
            }
            // Toast.fire({ title: err.response.data.validation.body.message });
          }
          });
      }
    },

    downloadEvidence() {
      this.evidenceManagement
        .downloadEvidenceById({
          id: this.$route.params.id,
        })
        .then((res) => {
          console.log("Evidence Download", res);

          if (res.status == 200) {
            let path = res.data.path;
            path = path + "type=unlink";
            let data = { url: path, fileName: "full-trace" };
            this.$store.dispatch(
              "diagnosisManagement/createDownloadFiles",
              data
            );
          }
        });
    },

    deleteEvidenceList() {
      this.showDeleteModal = false;
      this.evidenceManagement
        .deleteEvidenceById({
          id: this.$route.params.id,
        })
        .then((res) => {
          console.log("Evidence Delete", res);
          if (res.status == 200) {
            this.$router.push({ name: "EvidenceListPage" });
          }
        });
    },

    deleteHistoryList() {
      this.evidenceManagement
        .deleteHistoryList({
          evidence_id: this.$route.params.id,
        })
        .then((res) => {
          // this.storeEvidenceList();
          console.log(res);
          if (res.status == 200) {
            this.showDeleteHistoryModal = false;
          }
        });
    },

    // for recent upload history
    getRecentUploadHistory() {
      this.evidenceManagement
        .evidenceDetailUploadHistory(this.evidenceId)
        .then((res) => {
          console.log("recent-upload-history", res);
          if (res.status == 200) {
            this.recentHistoryList = res.data.evidence_upload_histrory_list;
          }
        });
    },

    // close modals
    closeChooseApprovalModal(event) {
      this.showChooseApproval = event;
    },
    closeControlsModal(event) {
      this.showControlsModal = event;
    },
    closeTraceManagement(event) {
      this.showTraceManagement = event;
    },
    closeTemplateModal(event) {
      this.showTemplateModal = event;
    },
    closeApprovalPayment(event) {
      this.showApprovalPayment = event;
    },
    closeDeleteModal(event) {
      this.showDeleteModal = event;
    },
    closeDeleteHistoryModal(event) {
      this.showDeleteHistoryModal = event;
    },
  },
};
</script>

<style scoped>
.custom-select {
  position: relative;
  /* border: 1px solid #cecece; */
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 15px;
  cursor: pointer;
}
.select-file {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0%;
  z-index: 2;
  opacity: 0;
}
.SelectBtn {
  max-width: 100px;
}
.custom-select span {
  max-width: 140px;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
