<template>
  <div class="modal-overlap waitingcompanyapproval">
    <div
      class="
        modal-dialog modal-dialog-centered
        relative
        w-auto
        pointer-events-none
      "
    >
      <div
        class="
          modal-content
          border-none
          shadow-lg
          relative
          flex flex-col
          w-full
          pointer-events-auto
          bg-white bg-clip-padding
          rounded-md
          outline-none
          text-current
        "
      >
        <div
          class="
            modal-header
            flex flex-shrink-0
            items-center
            justify-between
            p-4
            rounded-t-md
          "
        >
          <h5
            class="text-xl font-medium leading-normal text-gray-800"
            id="exampleModalScrollableLabel"
          >
            수동 진단 선택
          </h5>
          <button
            type="button"
            class="
              btn-close
              box-content
              w-4
              h-4
              p-1
              text-black
              border-none
              rounded-none
              opacity-50
              focus:shadow-none focus:outline-none focus:opacity-100
              hover:text-black hover:opacity-75 hover:no-underline
            "
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="close"
          ></button>
        </div>
        <div class="modal-body relative">
          <div class="document_pssword diagnosis_wrap">
            <div class="flex items-center mb-4">
              <input
                :disabled="
                  status == '1st_complete' ||
                  status == '2nd_ongoing' ||
                  status == '2nd_complete'
                "
                v-model="radioButtonValue"
                :checked="status == 'not_yet' || status == '1st_ongoing'"
                id="default-radio-1"
                type="radio"
                value="initial"
                name="default-radio"
                class="
                  w-4
                  h-4
                  text-blue-600
                  bg-gray-100
                  border-gray-300
                  focus:ring-blue-500
                  dark:focus:ring-blue-600 dark:ring-offset-gray-800
                  focus:ring-2
                  dark:bg-gray-700 dark:border-gray-600
                "
              />
              <label
                for="default-radio-1"
                class="
                  ml-2
                  text-sm
                  font-medium
                  text-gray-900
                  dark:text-gray-300
                "
                >초행진단 (최초진단)</label
              >
            </div>
            <div class="input_wrap" v-if="radioButtonValue == 'initial'">
              <div class="flex items-center">
                <select v-model="template_id" @change="RemoveError($event)">
                  <option value="" disabled>템플릿 선택</option>
                  <option
                    :value="template.id"
                    v-for="(template, index) in $store.state.diagnosisManagement
                      .templateList"
                    :key="index"
                  >
                    {{ template.template_name }}
                  </option>
                </select>
                <button @click="setTemplate" type="button">설정</button>
              </div>
              <span class="error-msg">{{ error.initial }}</span>
            </div>
            <div class="flex items-center mb-4 second-radio">
              <input
                :disabled="
                  status == 'not_yet' ||
                  status == '1st_ongoing' ||
                  status == '2nd_complete'
                "
                v-model="radioButtonValue"
                :checked="status == '1st_complete' || status == '2nd_ongoing'"
                id="default-radio-2"
                type="radio"
                value="implementation"
                name="default-radio"
                class="
                  w-4
                  h-4
                  text-blue-600
                  bg-gray-100
                  border-gray-300
                  focus:ring-blue-500
                  dark:focus:ring-blue-600 dark:ring-offset-gray-800
                  focus:ring-2
                  dark:bg-gray-700 dark:border-gray-600
                "
              />
              <label
                for="default-radio-2"
                class="
                  ml-2
                  text-sm
                  font-medium
                  text-gray-900
                  dark:text-gray-300
                "
                >이행진단 (취약점 조치 후 진단 )</label
              >
            </div>
            <div class="input_wrap" v-if="radioButtonValue == 'implementation'">
              <div class="flex items-center">
                <select v-model="template_id" @change="RemoveError($event)">
                  <option value="" disabled>템플릿 선택</option>
                  <option
                    :value="template.id"
                    v-for="(template, index) in $store.state.diagnosisManagement
                      .templateList"
                    :key="index"
                  >
                    {{ template.template_name }}
                  </option>
                </select>
                <button type="button" @click="setTemplate">설정</button>
              </div>
              <span class="error-msg">{{ error.implementation }}</span>
            </div>
            <!-- <div class="file_upload_wrap">
                    <p>Upload file</p>
                        <div class="input_wrap">
                            <input type="text" placeholder="file-name.extension">
                            <div class="file_wrap">
                                <button type="button">Choose File</button>
                                <input type="file">
                            </div>
                        </div>
                    </div> -->
          </div>
        </div>
        <div
          class="
            modal-footer
            flex flex-shrink-0
            items-center
            justify-center
            p-4
            rounded-b-md
          "
        >
          <button
            type="button"
            class="
              full_button
              bordered
              px-6
              py-2.5
              bg-blue-600
              text-white
              font-medium
              text-xs
              leading-tight
              uppercase
              rounded
              focus:bg-blue-700 focus:outline-none focus:ring-0
              active:bg-blue-800
              transition
              duration-150
              ease-in-out
            "
            @click="close"
          >
            취소
          </button>
          <button
            type="button"
            @click="gotoNext"
            :disabled="status == '2nd_complete'"
            :class="status == '2nd_complete' ? 'cursor-not-allowed' : ''"
            class="
              full_button
              solid
              px-6
              py-2.5
              bg-blue-600
              text-white
              font-medium
              text-xs
              leading-tight
              uppercase
              rounded
              hover:bg-blue-700
              focus:bg-blue-700 focus:outline-none focus:ring-0
              active:bg-blue-800
              transition
              duration-150
              ease-in-out
            "
            style="font-size: 18px"
          >
            결정
          </button>
        </div>
      </div>
    </div>
  </div>
  <StartDiagnosisButtonSelectedWithoutAnyPreviousResult
    v-show="isPermissionSet"
    headerText="템플릿 설정권한 없음"
    firstBtn="확인"
    bodyText="템플릿 설정권한 없음"
    @confirm="closeStartDiagnosisFirstModal"
    @close="closeStartDiagnosisFirstModal"
  />
</template>
<script>
import TechnicalDiagnosticResultsService from "@/services/TechnicalDiagnosticResultsService";
import StartDiagnosisButtonSelectedWithoutAnyPreviousResult from "@/components/modals/StartDiagnosisButtonSelectedWithoutAnyPreviousResult.vue";
export default {
  name: "ResultReportManualUpload",
  props: [
    "assetId",
    "status",
    "technical_risk_code",
    "used_template_id",
    "catName",
    "activeCategoryID",
  ],
  components: {
    StartDiagnosisButtonSelectedWithoutAnyPreviousResult,
  },
  data() {
    return {
      template_id: "",
      radioButtonValue:
        this.status == "not_yet" || this.status == "1st_ongoing"
          ? "initial"
          : "implementation",
      error: {},
      isPermissionSet: false,
      code_type: "",
    };
  },
  created() {
    this.TechnicalDiagnosticResultsService =
      new TechnicalDiagnosticResultsService();
    this.$store.dispatch("diagnosisManagement/getTemplateList");
  },
  computed: {
    permission() {
      return this.$store.state.sideBar.permission.technical_diagnosis_setting;
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    setTemplate() {
      if (
        this.permission == "edit" ||
        this.$store.state.signin.is_user_admin == "y"
      ) {
        this.$router.push("/TechnicalDiagnosisSettingSelection");
      } else {
        this.isPermissionSet = true;
      }
    },
    gotoNext() {
      if (this.radioButtonValue == "initial") {
        if (this.template_id == "") {
          this.error.initial = "템플릿을 선택해주세요";
        } else {
          if (this.code_type == "") {
            this.error.initial = "잘못된 템플릿 양식입니다.";
          } else if (this.technical_risk_code != this.code_type) {
            this.error.initial = "잘못된 템플릿 양식입니다.";
          } else {
            this.$router.push(
              `/DetailedTechnicalDiagnosisResultSecondOngoingDiagnosis/${
                this.template_id
              }/${this.activeCategoryID}/${JSON.stringify(this.assetId)}`
            );
          }
        }
      } else {
        if (this.template_id == "") {
          this.error.implementation = "템플릿을 선택해주세요";
        } else {
          if (this.code_type == "") {
            this.error.implementation = "잘못된 템플릿 양식입니다.";
          } else if (this.technical_risk_code != this.code_type) {
            this.error.implementation = "잘못된 템플릿 양식입니다.";
          } else if (this.used_template_id !== this.template_id) {
            this.error.implementation = "잘못된 템플릿 양식입니다.";
          } else {
            this.$router.push(
              `/ManualDiagnosisImplementation/${this.template_id}/${
                this.activeCategoryID
              }/${JSON.stringify(this.assetId)}`
            );
          }
        }
      }
    },
    RemoveError(event) {
      const obj = this.$store.state.diagnosisManagement.templateList.find(
        (x) => x.id == event.target.value
      );
      this.code_type = obj.code_type;
      this.error.initial = "";
      this.error.implementation = "";
    },
    closeStartDiagnosisFirstModal() {
      this.isPermissionSet = false;
    },
  },
};
</script>