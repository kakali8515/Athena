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
      <div class="history_wrap">
        <button
          v-if="!edittable"
          type="button"
          @click="
            () => {
              showDeleteModal = edittable ? false : true;
            }
          "
        >
          삭제
        </button>
      </div>
    </div>

    <div class="managmenttable">
      <div class="delete_wrap">
        <p>* 증적목록에서 해당 증적을 삭제합니다.</p>
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400 evidence-table"
        >
          <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">통제영역</th>
              <th scope="col" class="px-6 py-3">증적 코드</th>
              <th scope="col" class="px-6 py-3">증적 명</th>
              <th scope="col" class="px-6 py-3">실사여부</th>
              <th scope="col" class="px-6 py-3">주기</th>
              <th scope="col" class="px-6 py-3 flex space-between">
                결재
                <button
                  class="blue-underline primary-btn"
                  @click="
                    () => {
                      showChooseApproval = edittable ? false : true;
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
                <select
                  v-model="control_area"
                  @click="clickControl(control_area)"
                  :disabled="showControlDropdown || edittable"
                >
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
                  :readonly="edittable"
                />
              </td>
              <td class="px-6 py-4">
                <input
                  type="text"
                  placeholder="Information Security Management System Specification"
                  v-model="evidence"
                  :readonly="edittable"
                />
              </td>
              <td class="px-6 py-4">
                <select v-model="dueDilligenceValue" :disabled="edittable">
                  <option v-for="(i, e) in due_diligence" :key="e">
                    {{ i }}
                  </option>
                </select>
              </td>
              <td class="px-6 py-4 text-right">
                <select v-model="cycle" :disabled="edittable">
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
            :readonly="edittable"
          >
          </textarea>
        </div>
      </div>
      <div class="details">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase dark:text-gray-400 bg-gray-50"
          >
            <tr>
              <th scope="col" class="px-6 py-3">영역</th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
                  <p class="grow">통제항목</p>
                  <button
                    class="blue-underline primary-btn disabled"
                    :disabled="addcontrol"
                    v-if="controldisabled"
                    @click="
                      () => {
                        showControlsModal = edittable ? false : true;
                      }
                    "
                  >
                    추가
                  </button>
                  <button
                    class="blue-underline primary-btn"
                    v-else
                    :disabled="addcontrol"
                    @click="
                      () => {
                        showControlsModal = edittable ? false : true;
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
        <div :class="`details ${secondBtnSet ? 'shortdiv' : 'longdiv'}`">
          <div class="left">
            <p>담당자</p>
            <button
              class="blue-underline primary-btn"
              @click="
                () => {
                  showTraceManagement = edittable ? false : true;
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
        <div class="select" v-if="secondBtnSet">
          <span>최근 업로드 이력</span>
          <div class="history-wrapper">
            <select v-model="history_id" @change="changeHistoryList">
              <option value="" selected>최근</option>
              <option
                v-for="(recentHistory, i) in recentHistoryList"
                :key="i"
                :value="recentHistory.history_id"
              >
                {{ recentHistory.history_date }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- <template v-if="showPdf == false"> -->
    <div class="evidence_wrap" v-if="!showTemplate">
      <div class="evidance_img" v-if="file">
        <div
          class="file_extension pdf_wrap"
          v-if="
            fileName.replace(/^.*\./, '') == 'pdf' ||
            fileName.replace(/^.*\./, '') == 'xls' ||
            fileName.replace(/^.*\./, '') == 'xlsx' ||
            fileName.replace(/^.*\./, '') == 'doc' ||
            fileName.replace(/^.*\./, '') == 'docx' ||
            fileName.replace(/^.*\./, '') == 'hwp'
          "
        >
          <iframe
            :src="pdfSource"
            style="width: 100%; height: 650px; border: none"
          ></iframe>
        </div>
        <div
          v-else
          class="spacebar"
          :style="{ 'background-image': `url(${image})` }"
          @click.right="rightClickPrevent($event)"
        ></div>
      </div>
      <div class="spacebar" v-if="!file">
        <h4>
          증적이 등록되지 않았습니다.<br />하단 버튼에서 증적파일 업로드 하거나
          증적 양식 중 선택 하여 저장 혹은 결재 진행 하실 수 있습니다.
        </h4>
      </div>
    </div>
    <!-- </template> -->

    <div class="evidence_wrap" v-if="showTemplate">
      <!-- <Tiptap v-model="templateDetails.template" /> -->
      <ContentEditor
        v-model:get="templateDetails.template"
        :set="templateDetails.templateData"
      />

      <!-- <p>{{ templateDetails.template }}</p> -->
    </div>

    <div class="button_wrap fixed-button-wrap flex justify-between">
      <div class="buttons flex justify-start">
        <button
          type="button"
          @click="downloadOriginaFile"
          class="download_attatchment"
          v-if="!showTemplate"
        >
          파일첨부
        </button>

        <div v-if="!secondBtnSet && showNonApprovalBtn">
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
            증적 다운로드
          </button>
          <div class="custom-select" @click="selectImage" v-if="!edittable">
            <input type="file" class="select-file" v-on:change="onFileChange" />
            <button type="button" class="gray">증적 파일 업로드</button>
          </div>
        </div>

        <div
          class="buttons flex justify-start"
          v-if="showNonApprovalBtn && secondBtnSet"
        >
          <button
            type="button"
            class="gray"
            v-if="!edittable"
            @click="downloadEvidence"
          >
            증적 다운로드
          </button>
          <button
            type="button"
            class="gray"
            v-if="!edittable"
            @click="
              () => {
                showDeleteHistoryModal = true;
              }
            "
          >
            증적 삭제 내역
          </button>
          <div class="custom-select" @click="selectImage" v-if="!edittable">
            <input type="file" class="select-file" v-on:change="onFileChange" />
            <button type="button" class="gray">증적 파일 업로드</button>
          </div>
        </div>
      </div>
      <div
        :class="`flex f-width ${
          !secondBtnSet && !unEdittable ? 'justify-center' : ''
        }`"
        v-if="!unEdittable && !secondBtnSet"
      >
        <button
          type="button"
          class="gray"
          @click="showApprovalPayment = true"
          v-if="showAprovalBtn"
        >
          승인
        </button>
      </div>
      <div
        class="buttons flex justify-end"
        v-if="!unEdittable && showNonApprovalBtn"
      >
        <button type="button" @click="editEvidence">
          {{ !edittable ? "저장하기" : "수정하기" }}
        </button>
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
    :controlValues="controlValue"
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
    :TransactionId="transaction_id"
    @closeModal="closeApprovalPayment($event)"
    @reStart="reStart"
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
  <Loading
    :active="isLoading"
    :can-cancel="true"
    :on-cancel="onCancel"
    :is-full-page="fullPage"
  ></Loading>
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

export default {
  name: "DetailsOfEvidenceOne",
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
      showControlDropdown: false,
      addcontrol: false,
      controldisabled: false,
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
        templateData: "",
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
      showAprovalBtn: false,
      userStatus: "pending",
      unEdittable: false,
      showNonApprovalBtn: true,
      login_userId: localStorage.getItem("uid"),
      transaction_id: "",
      All_permissions: [],
      access_permission: "",
      imgBaseUrl: process.env.VUE_APP_IMAGE_BASE_URL,
      history_id: "",
      isLoading: false,
      showPdf: false,
      pdfSource: "",
      controlValue: [],
      originalDownloadUrl: "",
    };
  },

  beforeMount() {
    this.getRecentUploadHistory();
  },

  mounted() {
    if (this.permission != "") {
      this.getDetails();
      this.getDueDilligence();
      this.getCyleList();
      this.getcontrolAreaList();
    }
  },

  watch: {
    permission: function (n, o) {
      console.log(n);
      if (n != o && n) {
        this.getDetails();
      }
    },
  },

  computed: {
    permission() {
      return this.$store.state.sideBar.permission.evidence_list;
    },
  },

  methods: {
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.file = files[0];
      this.fileName = this.file.name;
      if (files && this.file) {
        this.showTemplate = false;
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

    clickControl(e) {
      this.showControlDropdown = false;
      this.addcontrol = true;
      this.controldisabled = true;

      if (e != "") {
        this.evidenceManagement.ListOfItems().then((res) => {
          // console.log("asdghfdjgf", res);

          this.controlValue = res.data.data.filter((f) => f.class === e);
          console.log("controlValues", this.controlValue);
          this.showControlsModal = true;

          // this.control_items = controlValues.map((m) => {
          //   return {
          //     control_item: m.item_number,
          //     area: m.item_title,
          //   };
          // });
        });
      }
    },

    removeFile() {
      this.evidence_type = "";
      this.file = "";
      this.fileName = "";
      this.image = "";
    },

    getDetails() {
      this.managers = [];
      this.evidenceManagement
        .viewEvidence({
          id: this.$route.params.id,
          list_type: "",
          history_id: this.history_id,
        })
        .then((res) => {
          // console.log(res);
          this.originalDownloadUrl = res.data.download_original_file_name;
          this.dueDilligenceValue = res.data.due_diligence;
          this.evidence = res.data.evidence;
          this.evidence_code = res.data.evidence_code;
          this.cycle = res.data.cycle;
          this.explanation = res.data.explanation;
          this.control_items = res.data.area_control_item_information;
          res.data.area_control_item_information.forEach((item) => {
            this.storedControlItem.push({
              item_number: item.area,
              control_item: item.control_item,
            });
          });
          this.certification_name = res.data.certification_name;
          this.control_area = res.data.control_area;
          this.evidence_type = res.data.evidence_type;
          this.transaction_id = res.data.transaction_id;
          res.data.manager_information.forEach((item) => {
            this.managers.push({
              user_id: item.id,
              name: item.name,
            });
          });
          // this.All_permissions = this.$store.state.sideBar.sideBarData;
          // // setting access permission
          // let step_1 = this.All_permissions.filter(
          //   (item) => item.menu === "evidence_management"
          // ).map((i) => i.sections);
          // step_1[0]?.filter((j) => j.section === "evidence_list").forEach((k) => {
          //     this.access_permission = k.access_type;
          //   });
          // console.log(
          //   "check evidence permission",
          //   this.All_permissions,
          //   step_1[0],
          //   this.access_permission
          // );
          this.managers_name = this.managers.map((i) => i.name).toString();
          // if (this.control_items.length !== 0 && this.control_area !== null) {
          //   this.getcontrolAreaList();
          // }
          if (Object.keys(res.data.template_information).length > 0) {
            this.templateDetails = {
              template_id: res.data.template_information.id,
              templateData: res.data.template_information.template,
              template_name: res.data.template_information.template_name,
            };
          }
          if (
            Object.keys(this.templateDetails).length > 0 &&
            res.data.template_information.id
          ) {
            this.showTemplate = true;
            this.evidence_type = "template";
          } else if (this.evidence_type === "file") {
            this.showTemplate = false;
            this.image = this.imgBaseUrl + res.data.file_name;
            this.file = res.data.file_name;
            this.fileName = res.data.file_name;
            this.convertDocument();
          }
          this.paymentStep = res.data.current_step + " Step";
          if (res.data.order_of_payment.length > 0) {
            this.userStatus = res.data.order_of_payment
              .filter((i) => {
                return i.user_id === Number(this.login_userId);
              })
              .map((i) => i.status)
              .toString();
            console.log("status check", this.userStatus, this.login_userId);
          }
          // this.userStatus = res.data.user_status;
          let approvalArr = ["completed"];
          let checkUserStatus = ["complete", "cc", ""];
          if (
            this.permission == "edit" ||
            this.$store.state.signin.is_user_admin == "y"
          ) {
            if (approvalArr.includes(res.data.current_status)) {
              this.edittable = true;
              this.secondBtnSet = true;
              this.showNonApprovalBtn = true;
              this.unEdittable = false;
            } else if (
              res.data.current_status === "ongoing" &&
              this.userStatus === "pending"
            ) {
              this.showAprovalBtn = true;
              this.showNonApprovalBtn = false;
              this.edittable = true;
              this.unEdittable = false;
              this.secondBtnSet = false;
            } else if (
              res.data.current_status === "ongoing" &&
              checkUserStatus.includes(this.userStatus)
            ) {
              this.edittable = true;
              this.unEdittable = true;
            }
          } else {
            this.edittable = true;
            this.unEdittable = true;
          }
        });
    },
    getDueDilligence() {
      this.evidenceManagement.dueDilligence().then((res) => {
        // console.log(res);
        this.due_diligence = res.data.due_diligence;
      });
    },
    getCyleList() {
      this.evidenceManagement.cyclelist().then((res) => {
        // console.log(res);
        this.cycleList = res.data.cycle;
      });
    },
    getcontrolAreaList() {
      this.control_area_list = [];
      let item_number = [];
      this.control_items.map((i) => {
        item_number.push(i.control_item);
      });
      this.evidenceManagement
        .controlAreaList({ item_number: [...item_number] })
        .then((res) => {
          console.log(res);
          this.control_area_list = res.data.data;
          for (let j = 0; j < res.data.data.length; j++) {
            if (this.showControlDropdown === true) {
              this.control_area = res.data.data[j].class;
            }
            // else {
            //   this.control_area = ''
            // }
          }
          // this.showControlDropdown = false;
        });
    },
    controlItemSelected(event) {
      this.showControlsModal = event.display;
      this.storedControlItem = event.item;
      this.control_items = [];
      this.control_items = event.item.map((i) => {
        return {
          control_item: i.item_number,
          area: i.item_title,
        };
      });
      // this.showControlDropdown = true;
      // this.getcontrolAreaList();
      console.log("this.control_items_this.control_items", this.control_items);
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
      this.managers_name = event.value.map((i) => i.name).join(", ");
    },
    setPaymentOrder(event) {
      this.showChooseApproval = event.display;
      this.paymentLine = event.value;
      this.paymentStep = `${event.value.length} steps`;
    },
    // editEvidence() {
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
    // },
    editEvidence() {
      if (this.edittable) {
        this.paymentStep = "";
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
        this.formData.append("id", this.$route.params.id);
        this.formData.append("certification_name", this.certification_name);
        this.formData.append("control_area", this.control_area);
        this.formData.append("evidence_code", this.evidence_code);
        this.formData.append("evidence", this.evidence);
        this.formData.append("evidence_type", this.evidence_type);
        this.formData.append("due_diligence", this.dueDilligenceValue);
        this.formData.append("cycle", this.cycle);
        // this.formData.append("template_id", this.templateDetails.template_id);
        // console.log(this.templateDetails)
        this.formData.append(
          "template_name",
          this.templateDetails.template_name
        );
        this.formData.append(
          "template",
          `${this.templateDetails.template.toString()}`
        );
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
            String(this.control_items[j].control_item)
          );
          this.formData.append(
            `control_items[${j}][area]`,
            String(this.control_items[j].area)
          );
          // this.formData.append("control_items", this.control_items[j]);
        }
        this.formData.append("explanation", this.explanation);

        this.evidenceManagement
          .editEvidence(this.formData)
          .then((res) => {
            console.log(res);
            if (res.status == 200) {
              this.formData = null;
              this.$router.push({ name: "EvidenceListPage" });
            } else if (res.response.status == 401) {
              Toast.fire({ title: res.response.data.error });
            } else if (res.response.status == 400) {
              if (err.response.data.validation.body.keys == "control_area") {
                Toast.fire({ title: "통제영역을 입력해주세요" });
              }
              if (err.response.data.validation.body.keys == "evidence_code") {
                Toast.fire({ title: "증적코드를 입력해주세요" });
              }
              if (err.response.data.validation.body.keys == "evidence") {
                Toast.fire({ title: "증적을 입력해주세요" });
              }
              if (err.response.data.validation.body.keys == "due_diligence") {
                Toast.fire({ title: "실사여부를 입력해주세요" });
              }
              if (err.response.data.validation.body.keys == "cycle") {
                Toast.fire({ title: "주기를 입력해주세요" });
              }
              if (err.response.data.validation.body.keys == "manager_list") {
                Toast.fire({ title: "담당자를 입력해주세요" });
              }
              if (err.response.data.validation.body.keys == "explanation") {
                Toast.fire({ title: "설명을 입력해주세요" });
              }
              if (err.response.data.validation.body.keys == "evidence_type") {
                Toast.fire({
                  title: "증적은 파일 혹은 템플릿을 설정하셔야 합니다",
                });
              }
              if (err.response.data.validation.body.keys == "user_list") {
                Toast.fire({ title: "결재 설정을 입력해주세요" });
              }
            }
          })
          .catch((err) => {
            console.log(err);
            if (err.response.status == 401) {
              Toast.fire({ title: err.response.data.error });
            } else if (err.response.status == 400) {
              if (err.response.data.validation.body.keys == "control_area") {
                Toast.fire({ title: "통제영역을 입력해주세요" });
              }
              if (err.response.data.validation.body.keys == "evidence_code") {
                Toast.fire({ title: "증적코드를 입력해주세요" });
              }
              if (err.response.data.validation.body.keys == "evidence") {
                Toast.fire({ title: "증적을 입력해주세요" });
              }
              if (err.response.data.validation.body.keys == "due_diligence") {
                Toast.fire({ title: "실사여부를 입력해주세요" });
              }
              if (err.response.data.validation.body.keys == "cycle") {
                Toast.fire({ title: "주기를 입력해주세요" });
              }
              if (err.response.data.validation.body.keys == "manager_list") {
                Toast.fire({ title: "담당자를 입력해주세요" });
              }
              if (err.response.data.validation.body.keys == "explanation") {
                Toast.fire({ title: "설명을 입력해주세요" });
              }
              if (err.response.data.validation.body.keys == "evidence_type") {
                Toast.fire({
                  title: "증적은 파일 혹은 템플릿을 설정하셔야 합니다",
                });
              }
              if (err.response.data.validation.body.keys == "user_list") {
                Toast.fire({ title: "결재 설정을 입력해주세요" });
              }
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
          // console.log("Evidence Download", res);

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
          // console.log(res);
          if (res.status == 200) {
            this.showDeleteHistoryModal = false;
            this.getRecentUploadHistory();
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
    reStart() {
      this.showApprovalPayment = false;
      this.getDetails();
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
    changeHistoryList() {
      this.getDetails();
    },
    hexaDecode(hexx) {
      var hex = hexx.toString(); //force conversion
      var str = "";
      for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      return this.imgBaseUrl + str;
    },
    convertDocument() {
      this.isLoading = true;
      this.evidenceManagement
        .convertPdf(this.evidenceId, this.fileName)
        .then((res) => {
          if (res.status == 200) {
            const url = `${process.env.VUE_APP_API_BASE_URL}/download/file?url=${res.data.url}`; // later required base url to dynamic
            // const link = document.createElement("a");
            // link.href = url;
            // console.log(link)
            // link.setAttribute('download', 'download');
            // document.body.appendChild(link);
            // link.click();
            this.isLoading = false;
            this.pdfSource = this.hexaDecode(res.data.url) + "#toolbar=0";
            setTimeout(() => {
              this.showPdf = true;
            }, 500);
          } else if (res.response.status == 401) {
            this.isLoading = false;
            Toast.fire({ title: res.response.data.error });
          } else {
            this.isLoading = false;
          }
        });
    },
    downloadOriginaFile() {
      if (this.originalDownloadUrl) {
        const url = `${process.env.VUE_APP_API_BASE_URL}/download/file?url=${this.originalDownloadUrl}`; // later required base url to dynamic
        const link = document.createElement("a");
        link.href = url;
        console.log(link);
        link.setAttribute("download", "download");
        document.body.appendChild(link);
        link.click();
      } else {
        Toast.fire({ title: "접근 권한이 없습니다" });
      }
    },
    rightClickPrevent(e) {
      e.preventDefault();
    },
  },
};
</script>

<style lang="scss" scoped>
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
.history-wrapper {
  width: 95%;
  select {
    padding: 0 20px !important;
    width: 95% !important;
  }
}
.f-width {
  width: 100%;
}
.info_protection .button_wrap .buttons {
  width: auto;
}
.download_attatchment {
  margin-right: 15px;
  white-space: nowrap;
}
.pdf_wrap {
  height: 650px;
}
</style>
