<template>
  <div class="info_protection">
    <div class="breadcrumb">
      <Breadcrumb link="dashboard" text1="Home" text2="증적관리" text3="증적목록" />
    </div>
    <div class="heading flex justify-between align-end">
      <h4>증적 추가 등록</h4>
      <!-- <div class="history_wrap">
        <button type="button">Delete</button>
      </div> -->
    </div>

    <div class="managmenttable">
      <div class="delete_wrap">
        <p>
          * 증적목록에서 해당 증적을 삭제합니다.
        </p>
      </div>

      <div class="relative overflow-x-auto bordered-table2">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 evidence-table">
          <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">통제영역</th>
              <th scope="col" class="px-6 py-3">증적 코드</th>
              <th scope="col" class="px-6 py-3">증적 명</th>
              <th scope="col" class="px-6 py-3">실사여부</th>
              <th scope="col" class="px-6 py-3">주기</th>
              <th scope="col" class="px-6 py-3 flex space-between">
                결재
                <button class="blue-underline primary-btn" @click="
                  () => {
                    showChooseApproval = true;
                  }
                ">
                  설정
                </button>
              </th>
            </tr>
          </thead>
          
          <tbody>
            <tr class="bg-white border-b ">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                <select v-model="control_area" :disabled="showControlDropdown" @click="clickControl(control_area)">
                  <option v-for="(i, e) in control_area_list" :key="e">
                    {{ i.class }}
                  </option>
                </select>
              </th>
              <td class="px-6 py-4">
                <input type="text" placeholder="증적코드를 입력해주세요" v-model="evidence_code" />
              </td>
              <td class="px-6 py-4">
                <input type="text" placeholder="설명을 입력해주세요"
                  v-model="evidence" />
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
                <input type="text" placeholder="" :value="paymentStep" readonly />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="explenation ">
      <div class="details m-10">
        <div class="left">
          <p>설명</p>
        </div>
        <div class="right">
          <textarea v-model="explanation" rows="6" style="width: 100%; height: 100%">
          </textarea>
        </div>
      </div>
      <div class="details m-10">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase dark:text-gray-400 bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">영역</th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
                  <p class="grow">통제항목</p>
                  <button class="blue-underline primary-btn disabled" v-if="controldisabled" :disabled="addcontrol" @click="
                    () => {
                      showControlsModal = true;
                    }
                  ">
                    추가
                  </button>
                  <button class="blue-underline primary-btn" v-else :disabled="addcontrol" @click="
                    () => {
                      showControlsModal = true;
                    }
                  ">
                    추가
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b" v-for="(i, e) in control_items" :key="e">
              <td class="px-6 py-4">{{ i.area }}</td>
              <td class="px-6 py-4">{{ i.control_item }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="details m-10">
        <div class="left">
          <p>담당자</p>
          <button class="blue-underline primary-btn" @click="
            () => {
              showTraceManagement = true;
            }
          ">
            추가
          </button>
        </div>
        <div class="right">
          <p>
            {{ managers_name }}
            <!-- <span v-for="(i, e) in managers" class="inline-block pr-1" :key="e">
              {{ i.name }},
            </span> -->
          </p>
        </div>
      </div>
    </div>
    <div class="evidence_wrap" v-if="!showTemplate">
      <div class="file_extension" v-if="file">
        <span>{{ fileName }}</span>
        <img src="@/assets/icon/Close_square.svg" @click="removeFile" />
      </div>
      <div class="spacebar" v-if="!file">
        <h4>
          증적이 등록되지 않았습니다.<br />하단 버튼에서 증적파일 업로드 하거나 증적 양식 중 선택 하여 저장 혹은 결재 진행 하실 수 있습니다.
        </h4>
      </div>
      <div class="spacebar" :style="{ 'background-image': `url(${image})` }" v-if="file">
        <!-- <h4>You can preview when saving is complete...</h4> -->
      </div>
    </div>
    <div class="evidence_wrap" v-if="showTemplate">
      <!-- <Tiptap v-model="templateDetails.template" /> -->
      <ContentEditor v-model:get="templateDetails.template" :set="templateDetails.templateData" />
    </div>

    <div class="button_wrap fixed-button-wrap flex justify-between">
      <div class="buttons flex justify-start">
        <button type="button" class="gray" @click="
          () => {
            showTemplateModal = true;
          }
        ">
          증적 양식 선택하기
        </button>
        <div class="custom-select" @click="selectImage">
          <!-- <input ref="fileInput"
          class="select-file"
      type="file"
      @input="pickFile" /> -->
          <input type="file" class="select-file" v-on:change="onFileChange" />
          <button type="button" class="gray">증적파일 업로드</button>
        </div>
        <!-- <button type="button" class="gray">Evidence File Upload</button> -->
      </div>
      <!-- <div class="buttons flex justify-center">
        <button type="button" class="gray" @click="showApprovalPayment = true">
          Approval
        </button>
      </div> -->
      <div class="buttons flex justify-end">
        <!-- <button type="button">My Revision History</button> -->
        <button type="button" @click="addEvidence">저장하기</button>
      </div>
    </div>
  </div>
  <ChooseApproval v-show="showChooseApproval" v-if="showChooseApproval" :existingPayment="paymentLine"
    @closeModal="closeChooseApprovalModal($event)" @paymentOrder="setPaymentOrder($event)" />
  <ControlsModal v-show="showControlsModal" v-if="showControlsModal" :storedControlItems="storedControlItem" :controlValues="controlValue"
    @closeModal="closeControlsModal($event)" @itemsSelected="controlItemSelected($event)" />
  <TraceManagement v-show="showTraceManagement" v-if="showTraceManagement" :preSelectedManagers="managers"
    @closeModal="closeTraceManagement($event)" @addManagers="AddManagers($event)" />
  <SelectTemplateModal v-show="showTemplateModal" v-if="showTemplateModal" @closeModal="closeTemplateModal($event)"
    @selectMethod="templateSelection($event)" />
  <ApprovalPayment v-show="showApprovalPayment" v-if="showApprovalPayment" @closeModal="closeApprovalPayment($event)" />
  <EvidenceDelete v-show="showDeleteModal" v-if="showDeleteModal" @closeModal="closeDeleteModal($event)" />
</template>

<script>
import DataTable from "@/components/DataTable.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import EvidenceManagement from "@/services/EvidenceManagement";
// import Tiptap from "@/components/Utils/TipTap.vue";
import ChooseApproval from "@/components/modals/ChooseApproval.vue";
import ControlsModal from "@/components/modals/ListOfControlsModal.vue";
import TraceManagement from "@/components/modals/TraceManagementControl.vue";
import SelectTemplateModal from "@/components/modals/SelectFormModalOne.vue";
import ApprovalPayment from "@/components/modals/ApprovalPayment.vue";
import EvidenceDelete from "@/components/modals/EvidenceDelete.vue";
import Toast from "@/alert/alert";
// import VueFroala from 'vue-froala-wysiwyg';
// import Editor from "@tinymce/tinymce-vue";

export default {
  name: "DetailsOfEvidenceOne",
  components: {
    // Tabs,
    // TabWrapper,
    DataTable,
    Breadcrumb,
    // Tiptap,
    ChooseApproval,
    ControlsModal,
    TraceManagement,
    SelectTemplateModal,
    ApprovalPayment,
    EvidenceDelete,
    // 'editor': Editor
    // 'froala': VueFroala
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
      evidence_type: "",
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
      storedControlItem: [],
      templateDetails: {
        template_id: "",
        template: "",
        template_name: "",
        templateData : ""
      },
      showTemplate: false,
      template_content: "",
      paymentLine: [],
      paymentStep: "",
      showApprovalPayment: false,
      file: null,
      image: "",
      fileName: "",
      formData: null,
      controlValue:[],
    };
  },

  mounted() {
    this.getDueDilligence();
    this.getCyleList();
    this.getcontrolAreaList();
  },

  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
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

    clickControl(e){
      console.log("click drop", e);
      this.addcontrol = true;
      this.controldisabled = true;
      this.control_items = [];
      
      if (e != '') {     
           
        this.evidenceManagement
        .ListOfItems()
        .then((res) => {
          // console.log(res);
          this.controlValue = res.data.data.filter((f) => f.class === e);
          this.showControlsModal = true;

          // this.control_items = controlValues.map((m) => {
          //   return {
          //     control_item: m.item_number,
          //     area: m.item_title,
          //   };
          // })
          // console.log("this.control_itemsthis.control_items",this.control_items);
          
        });
        
      }
        // console.log("control_items_control_items",this.control_items);
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
            } else {
              this.control_area = ''
            }            
          }
          // this.showControlDropdown = false;
        });
    },
    controlItemSelected(event) {
      console.log("controlItemSelected", event);
      this.showControlsModal = event.display;
      this.storedControlItem = event.item;
      this.control_items = [];
      this.control_items = event.item.map((i) => {
        return {
          control_item: i.item_number,
          area: i.item_title,
        };
      });
      // this.getcontrolAreaList();
      // this.showControlDropdown = true;
      console.log(this.control_items);
    },
    templateSelection(event) {
      this.showTemplateModal = event.display;
      this.templateDetails = {
        template_id: event.value.id,
        templateData: event.value.template,
        template_name: event.value.template_name,
      };
      console.log("asasds", this.templateDetails, event.value.template);
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
      console.log(this.managers);
      this.managers_name = event.value.map((i) => i.name).join(", ");
    },
    setPaymentOrder(event) {
      this.showChooseApproval = event.display;
      this.paymentLine = event.value;
      this.paymentStep = `${event.value.length}steps`;
    },
    addEvidence() {
      // let inputdata = {
      //   // certification_name: `${localStorage.getItem('certificationName')}`,
      //   certification_name: "ISMS-P",
      //   control_area: this.control_area,
      //   evidence_code: this.evidence_code,
      //   evidence: this.evidence,
      //   due_diligence: this.dueDilligenceValue,
      //   cycle: this.cycle,
      //   template_id: this.templateDetails.template_id,
      //   manager_list: this.managers.map((i) => {
      //     return `${i.id}`;
      //   }),
      //   user_list: this.paymentLine.map((i, e) => {
      //     return {
      //       id: `${i.id}`,
      //       payment_line: `${e + 1}`,
      //     };
      //   }),
      //   control_items: [...this.control_items],
      //   explanation: this.explanation,
      // };

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
      this.file ? this.formData.append("file_name", this.file) : null;

      this.formData.append("certification_name", this.certification_name);
      this.formData.append("control_area", this.control_area);
      this.formData.append("evidence_code", this.evidence_code);
      this.formData.append("evidence", this.evidence);
      this.formData.append("evidence_type", this.evidence_type);
      this.formData.append("due_diligence", this.dueDilligenceValue);
      this.formData.append("cycle", this.cycle);
      // this.formData.append("template_id", this.templateDetails.template_id);
      this.formData.append("template_name", this.templateDetails.template_name);
      this.formData.append("template", `${this.templateDetails.template.toString()}`);
      for (let i = 0; i < managerArr.length; i++) {
        this.formData.append(`manager_list[${i}]`, managerArr[i]);
      }
      for (let k = 0; k < paymentData.length; k++) {
        this.formData.append(`user_list[${k}][id]`, String(paymentData[k].id));
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
          console.log(res);
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
          console.log(err);
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

      // console.log(this.formData);
    },

    removeFile() {
      this.evidence_type = "";
      this.file = null;
      this.fileName = "";
      this.image = "";
    },

    // modal close methods
    closeChooseApprovalModal(event) {
      this.showChooseApproval = event;
    },
    closeControlsModal(event) {
      this.showControlsModal = event;
      this.control_area = '';
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
  cursor: pointer;
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

.bordered-table2 {
  border: 1px solid #d3d4d8;
}
</style>
