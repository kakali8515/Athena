<template>
  <div class="info_protection">
    <Breadcrumb
      link="/dashboard"
      text1="Home"
      :text2="$route.params.ul"
      :text2link="`/establishmentOperationManagementSystem/${$route.params.ul}`"
    />
    <!-- <div class="breadcrumb">
      <p><a href="#">Home </a><span>></span> Diagnosis management</p>
    </div> -->
    <div class="heading flex justify-between align-end">
      <h4>{{ $route.params.ul }}</h4>
      <div class="history_wrap" v-show="moreThanOneTime">
        <div class="flex items-center mr-50">
          <!-- add this if you need to disable the checkbox ":disabled="isBtnFinsish"" -->
          <input
            id="default-checkbox"
            type="checkbox"
            ref="compareCheck"
            v-model="compare"
            value="compare"
            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="default-checkbox"
            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >비교하기</label
          >
        </div>
        <span>이전현황 불러오기</span>
        <select
          @change="changeHistory($event)"
          :disabled="isHistoryDisable"
          ref="selectDate"
        >
          <option value="0"></option>
          <option
            v-for="(date, index) in historyList"
            :key="index"
            :value="date.upload_date"
          >
            {{ date.upload_date }}
          </option>
        </select>
      </div>
    </div>
    <div class="policy_setting_wrap no-padding">
      <div class="datatable_head flex justify-between m-t-o">
        <div class="oneside flex justify-start item-center">
          <span>통제영역</span>
          <select
            class="small_select"
            v-model="controlArea"
            @change="searchControlArea($event)"
            v-if="draftClass"
          >
            <!-- <option value="" selected disabled v-if="selectedClass">{{selectedClass}}</option> -->
            <option
              value="all"
              :class="draftClass && draftClass != 'all' ? '' : 'item_disabled'"
            >
              전체
            </option>
            <option
              v-for="(item, index) in newClass"
              :key="index"
              :value="item"
              :class="draftClass == item ? 'item_disabled' : ''"
            >
              {{ item }}
            </option>
          </select>
          <select
            class="small_select"
            v-model="controlArea"
            @change="searchControlArea($event)"
            v-else
          >
            <!-- <option value="" selected disabled v-if="selectedClass">{{selectedClass}}</option> -->
            <option value="all">전체</option>
            <option
              v-for="(item, index) in newClass"
              :key="index"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
          <div class="mb-0">
          <SortingDropdown
            :obj="diagnosisFilterData"
            @selectedCol="selectedCol"
            @selectedOrd="selectedOrd"
          />
        </div>
          <div class="datepicker flex justify-between">
            <input
              v-model="optionalSearch"
              type="text"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="입력"
            />
            <button type="button" @click="getListOfRows">조회</button>
          </div>
        </div>
        <div class="oneside flex justify-end">
          <button type="button" @click="openEvaluationModal">평가기준</button>
        </div>
      </div>
    </div>
    <div class="tab-content">
      <div class="flex flex-col">
        <div class="overflow-x-auto protection_table">
          <div class="inline-block min-w-full">
            <div class="overflow-hidden">
              <table
                class="min-w-full text-center"
                ref="dataTable"
                id="diagnosTable"
              >
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4"
                    >
                      세부항목번호
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4"
                    >
                      상세내용
                    </th>
                    <th
                      v-if="showCol"
                      scope="col"
                      class="extra_width text-sm font-medium text-gray-900 px-6 py-4"
                    >
                      이전 현황
                    </th>
                    <th
                      v-if="showCol"
                      scope="col"
                      class="extra_width text-sm font-medium text-gray-900 px-6 py-4"
                    >
                      이전 점수
                    </th>
                    <th
                      scope="col"
                      class="extra_width text-sm font-medium text-gray-900 px-6 py-4"
                    >
                      현재 현황
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4"
                    >
                      현재 점수
                    </th>
                  </tr>
                </thead>
                <tbody
                  v-for="(result, index) in diagnosisResultList"
                  :key="index"
                >
                  <tr class="bg-white border-b">
                    <td class="text-sm text-gray-900 font-light px-6 py-4">
                      {{ result.code }}
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4">
                      {{ result.detailed_contents }}
                    </td>
                    <td
                      v-if="showCol"
                      class="text-sm text-gray-900 font-light px-6 py-4"
                    >
                      {{ result.previous_status }}
                    </td>
                    <td
                      v-if="showCol"
                      class="text-sm text-gray-900 font-light px-6 py-4"
                    >
                      {{ result.previous_score }}
                    </td>
                    <td
                      class="extra_width text-sm text-gray-900 font-light px-6 py-4"
                    >
                      <p
                        :contenteditable="isContentEditable"
                        class="p-2"
                        @input="getStatusValue($event, result.id)"
                        v-if="dropdownChange"
                      ></p>
                      <p
                        :contenteditable="isContentEditable"
                        class="p-2"
                        @input="getStatusValue($event, result.id)"
                        v-else
                      >
                        {{ result.diagnosis_status }}
                      </p>
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4">
                      <select
                        ref="currentScore"
                        :disabled="isBtnFinsish == false"
                        class="selectScore"
                        v-if="dropdownChange"
                        @change="getScoreValue($event, result.id)"
                      >
                        <option value=""></option>
                        <option
                          ref="selectedScore"
                          v-for="(score, index) in diagnosisScoreList"
                          :key="index"
                          :value="score.value"
                        >
                          {{ score.text }}
                        </option>
                      </select>
                      <select
                        v-else
                        ref="currentScore"
                        :disabled="isBtnFinsish == false"
                        class="selectScore"
                        :value="result.score"
                        @change="getScoreValue($event, result.id)"
                      >
                        <option value=""></option>
                        <option
                          ref="selectedScore"
                          v-for="(score, index) in diagnosisScoreList"
                          :key="index"
                          :value="score.value"
                        >
                          {{ score.text }}
                        </option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="button_wrap fixed-button-wrap flex justify-between">
      <div class="buttons flex justify-start">
        <button
          type="button"
          class="gray"
          @click="startDownloadResult"
          :disabled="isDiagnosisDisabled"
        >
          결과보고서 다운로드
        </button>
      </div>
      <div class="buttons flex justify-end">
        <button
          v-if="
            permission == 'edit' ||
            this.$store.state.signin.is_user_admin == 'y'
          "
          type="button"
          @click="startEvaluation"
          :disabled="isDiagnosisDisabled"
          :class="{ no_cursor: isDiagnosisDisabled , hide_btn: diagnosisBtn == '진단완료' && controlArea != 'all'}"
        >
          {{ diagnosisBtn }}
        </button>
        <!-- isBtnFinsish && isActive -->
        <button
          type="button"
          @click="startDiagnosisEvaluationSave('temp')"
          v-if="diagnosisBtn != '진단시작'"
        >
          저장
        </button>
      </div>
    </div>
    <StartDiagnosisButtonSelectedWithoutAnyPreviousResult
      v-show="isStartDiagnosisFirst"
      headerText="진단시작"
      firstBtn="확인"
      bodyText="진단이 시작되었습니다.진단 진행중에는 “저장”을 모든 항목 진단이 완료 될 경우 “진단완료”를 선택해주세요."
      @confirm="startFinishFirstTime"
      @close="closeStartDiagnosisFirstModal"
    />

    <StartDiagnosisButtonSelectedWithoutAnyPreviousResult
      v-show="isStartDiagnosisSecond"
      headerText="진단시작"
      firstBtn="예"
      secondBtn="아니요"
      bodyText="진단을 시작 하시겠습니까? 진단을 시작하면 기존의 위험이 삭제됩니다."
      @close="closeStartDiagnosisSecondModal"
      @confirm="startFinishFirstTime"
      @cancel="closeStartDiagnosisSecondModal"
    />

    <StartDiagnosisButtonSelectedWithoutAnyPreviousResult
      v-show="isCompleteDiagnosis"
      headerText="진단완료"
      firstBtn="예"
      secondBtn="아니요"
      bodyText="진단을 완료 하시겠습니까?
진단을 완료하면 수정이 불가합니다."
      @confirm="finishDiagnosisComplete"
      @close="closeCompleteDiagnosisModal"
      @cancel="closeCompleteDiagnosisModal"
    />

    <StartDiagnosisButtonSelectedWithoutAnyPreviousResult
      v-show="isCompleteDiagnosisFinal"
      headerText=" 진단완료"
      firstBtn="확인"
      bodyText="진단이 완료되었습니다."
      @close="closeCompleteDiagnosisFinalModal"
      @confirm="closeCompleteDiagnosisFinalModal"
    />

    <StartDiagnosisButtonSelectedWithoutAnyPreviousResult
      v-show="isDiagnosisFailed"
      headerText="진단완료실패"
      firstBtn="확인"
      bodyText="현재현황을 입력해주세요"
      @close="closeDiagnosisFailedModal"
      @confirm="closeDiagnosisFailedModal"
    />

    <establishmentOperationManagementSystemmodal
      v-if="isEvaluation"
      @close="closeEvaluationStandard"
    />
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import DiagnosisManagementService from "@/services/DiagnosisManagementService";
import StartDiagnosisButtonSelectedWithoutAnyPreviousResult from "@/components/modals/StartDiagnosisButtonSelectedWithoutAnyPreviousResult.vue";
import establishmentOperationManagementSystemmodal from "@/components/modals/establishmentOperationManagementSystemmodal.vue";
import Toast from "@/alert/alert.js";
import { diagnosisFilterData } from "@/config/SortingDropdownData";
import SortingDropdown from "@/components/SortingDropdown.vue";
export default {
  name: "DetailsEstablishmentOperationOfManagementSystem",
  components: {
    StartDiagnosisButtonSelectedWithoutAnyPreviousResult,
    Breadcrumb,
    establishmentOperationManagementSystemmodal,
    SortingDropdown,
  },
  data() {
    return {
      diagnosisResultList: [],
      diagnosisScoreList: [],
      classList: [],
      newScore: [],
      optionalSearch: "",
      controlArea: "",
      evalStatus: "finish",
      certification: this.$store.state.header.certificate,
      moreThanOneTime: false,
      isStartDiagnosisFirst: false,
      isStartDiagnosisSecond: false,
      isCompleteDiagnosis: false,
      isCompleteDiagnosisFinal: false,
      isDiagnosisFailed: false,
      diagnosisBtn: "진단시작", //Start Diagnosis
      isBtnFinsish: false,
      selectedData: "",
      compare: "",
      showCol: false,
      historyList: [],
      searchByUploadDate: "",
      isFieldEmpty: false,
      isDiagnosisDisabled: true,
      isContentEditable: false,
      isHistoryDisable: true,
      isEvaluation: false,
      isActive: false,
      dropdownChange: false,
      searchByMenu: this.$route.params.ul,
      diagnosisFilterData: diagnosisFilterData,
      sort_by: "",
      sortOrder: "",
      showControl: true,
      newClass: [],
      draftClass: "",
    };
  },

  created() {
    this.diagnosisManagementService = new DiagnosisManagementService();

    this.getClassList();
    this.getscoreList();
    // this.getHistoryList();
  },

  computed: {
    permission() {
      return this.$store.state.sideBar.permission
        .establishment_of_management_system;
    },
  },

  updated() {
    const table = document.querySelector("#diagnosTable");
    //console.log("table data", table.rows[1].cells)
    if (this.$refs.compareCheck.checked == true) {
      this.showCol = true;
      this.isHistoryDisable = false;
    } else {
      this.showCol = false;
      this.isHistoryDisable = true;
    }
  },

  watch: {
    diagnosisBtn: function (n, o) {
      if (n && n != o) {
        console.log("check disable", n, o);
      }
      if (n != "진단시작") {
        this.showControl = false;
      } else {
        this.showControl = true;
      }
    },
    // this.diagnosisBtn = "진단완료"
    diagnosisBtn: function (n, o) {
      if (n == "진단완료") {
        this.isContentEditable = true;
      } else {
        this.isContentEditable = false;
      }
    },
    compare(newVal, oldVal) {
      if (newVal == "compare") {
        this.showCol = true;
      } else {
        this.showCol = false;
      }
    },
    // on change of certificate
    "$store.state.header.certificate": function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getClassList();
      }
    },
  },

  methods: {
    selectedCol(value) {
      this.sort_by = value;
      this.getListOfRows();
    },
    selectedOrd(value) {
      this.sortOrder = value;
      this.getListOfRows();
    },
    getStatusValue(event, key) {
      this.selectedData = event.target.innerText;
      // console.log("1", this.diagnosisResultList);
      let index = this.diagnosisResultList.findIndex((x) => x.id == key);
      this.diagnosisResultList[index].diagnosis_status = this.selectedData;
      // console.log("2", this.diagnosisResultList);
    },

    getScoreValue(event, key) {
      this.selectedData = event.target.value;
      // console.log("1", this.diagnosisResultList);
      let index = this.diagnosisResultList.findIndex((x) => x.id == key);
      this.diagnosisResultList[index].score = this.selectedData;
      // console.log("2", this.diagnosisResultList);
    },

    getListOfRows() {
      this.diagnosisManagementService
        .evaluateListofRows(
          this.controlArea,
          this.optionalSearch,
          this.searchByUploadDate,
          this.searchByMenu,
          this.sort_by,
          this.sortOrder,
          this.certification
        )
        .then((res) => {
          if (res.status == 200) {
            if (res.data.risk_evaluation[0].status == "active") {
              this.isActive = true;
            } else {
              this.isActive = false;
              this.diagnosisBtn = "진단완료";
              this.isBtnFinsish = true;
            }

            let compareChecking = true;
            for (const item of res.data.risk_evaluation) {
              if (item.previous_status == "") {
                compareChecking = false;
                break;
              }
            }
            // console.log(compareChecking, "compareChecking");
            if (
              (compareChecking && res.data.diagnosis_count > 1) ||
              (res.data.risk_evaluation[0].previous_status == "" &&
                this.searchByUploadDate) ||
              (res.data.diagnosis_count == "1" &&
                this.isContentEditable == true) ||
              res.data.diagnosis_count > 1
            ) {
              this.moreThanOneTime = true;
              // console.log("this.moreThanOneTime", this.moreThanOneTime);
            } else {
              this.$refs.compareCheck.checked = false;
              this.moreThanOneTime = false;
            }
            this.diagnosisResultList = res.data.risk_evaluation;
            if (this.dropdownChange) {
              this.diagnosisResultList.forEach((element) => {
                element.score = "";
                element.diagnosis_status = "";
              });
            }
            //Array.from(this.$refs.currentScore).forEach(ele => ele.value = "" )
            let select = document.querySelectorAll(".selectScore");
            // console.log("table data", select);
          }
        });
    },

    searchControlArea(event) {
      this.isDiagnosisDisabled = false;
      this.optionalSearch = "";
      this.searchByUploadDate = "";
      // if (event.target.value != '' && event.target.value != 'all') {
      //   this.getHistoryList();
      // }
      this.getListOfRows();

      setTimeout(() => {
        if (event.target.value != "" && this.moreThanOneTime == true) {
          this.getHistoryList();
        }
      }, 1500);
    },

    getscoreList() {
      this.diagnosisManagementService
        .diagnosisScoreList(this.$store.state.header.certificate)
        .then((res) => {
          // console.log("scoreList res :", res);

          if (res.status == 200) {
            this.diagnosisScoreList = res.data.score_list;
          }
        });
    },

    getClassList() {
      this.diagnosisManagementService
        .classList(this.$store.state.header.certificate, this.$route.params.ul)
        .then((res) => {
          if (res.status == 200) {
            this.classList = res.data.data;
            // this.classList.unshift('전체')
            this.draftClass = res.data.lastDraftClass;
            this.classList.forEach((i) => {
              if(this.newClass.length < this.classList.length){
                this.newClass.push(i.class);
              }
            });
            if (res.data.lastDraftClass) {
              const index = this.newClass.indexOf(res.data.lastDraftClass);
              if (index >= 0) {
                this.newClass.splice(index, 1);
                this.newClass.unshift(res.data.lastDraftClass);
              }
            }
          }
        });
        console.log('new class', this.newClass.length);
        console.log('classList', this.classList.length);
    },

    startEvaluation() {
      if (this.moreThanOneTime) {
        this.isStartDiagnosisSecond = true;
        if (this.isBtnFinsish && this.diagnosisBtn == "진단완료") {
          this.isStartDiagnosisSecond = false;
          this.isCompleteDiagnosis = true;
        }
      } else {
        this.isStartDiagnosisFirst = true;
        if (this.isBtnFinsish) {
          this.isStartDiagnosisFirst = false;
          this.isCompleteDiagnosis = true;
        }
      }
    },

    getHistoryList() {
      this.diagnosisManagementService
        .uploadHistory(this.controlArea, this.searchByMenu, this.certification)
        .then((res) => {
          // console.log("history :", res);
          this.historyList = res.data.upload_history;
        });
    },

    changeHistory($event) {
      // alert("change history");
      this.searchByUploadDate = $event.target.value;
      this.getListOfRows();
    },

    startDiagnosisEvaluation(evalStat) {
      let evalArr = [];
      if (
        Array.from(this.diagnosisResultList).some(
          (item) => item.diagnosis_status == "" || item.score == "" || item.score == null
        )
      ) {
        this.isDiagnosisFailed = true;
        this.isFieldEmpty = true;
        this.isCompleteDiagnosis = false;
        return;
      } else {
        this.isFieldEmpty = false;
      }
      this.diagnosisResultList.forEach((element) => {
        evalArr.push({
          id: element.previous_evolution_id.toString(),
          score: element.score.toString(),
          company_risk_profile_diagnosis_settins_id: element.id.toString(),
          code: element.code.toString(),
          diagnosis_status: element.diagnosis_status.toString(),
          detailed_contents: element.detailed_contents.toString(),
        });
      });
      let credentials = {
        evaluationArray: evalArr,
        certification: this.$store.state.header.certificate,
        evaluation_status: evalStat,
      };

      if (this.isFieldEmpty) {
        this.isCompleteDiagnosis = false;
      } else {
        this.diagnosisManagementService
          .doRiskEvaluation(credentials)
          .then((res) => {
            // console.log("risk-eval :", res);
            if (res.status == 200) {
              this.dropdownChange = false;
              this.getClassList();
              if (evalStat == "finish") {
                this.isCompleteDiagnosis = false;
                this.isCompleteDiagnosisFinal = true;
                this.isContentEditable = false;
                this.diagnosisBtn = "진단시작"; // start Diagnosis
                this.getListOfRows();
                this.getHistoryList();
                this.showControl = true;
                //Array.from(this.$refs.currentScore).forEach(ele => ele.value = "" )
              } else {
                Toast.fire({ title: res.data.message });
                this.getListOfRows();
              }
            }
          });
      }
    },

    startDiagnosisEvaluationSave(evalStat) {
      let evalArr = [];

      this.diagnosisResultList.forEach((element) => {
        evalArr.push({
          id: element.previous_evolution_id.toString(),
          score: element.score?.toString(),
          company_risk_profile_diagnosis_settins_id: element.id.toString(),
          code: element.code.toString(),
          diagnosis_status: element.diagnosis_status.toString(),
          detailed_contents: element.detailed_contents.toString(),
        });
      });
      let credentials = {
        evaluationArray: evalArr,
        certification: this.$store.state.header.certificate,
        evaluation_status: evalStat,
      };

      if (this.isFieldEmpty) {
        this.isCompleteDiagnosis = false;
      } else {
        this.diagnosisManagementService
          .doRiskEvaluation(credentials)
          .then((res) => {
            // console.log("risk-eval :", res);
            if (res.status == 200) {
              this.dropdownChange = false;
              this.isContentEditable = true;
              if (evalStat == "finish") {
                this.isCompleteDiagnosis = false;
                this.isCompleteDiagnosisFinal = true;
                this.isContentEditable = true;
                this.diagnosisBtn = "진단시작"; // start Diagnosis
                this.getListOfRows();
                this.getHistoryList();
                this.getClassList();
                //Array.from(this.$refs.currentScore).forEach(ele => ele.value = "" )
              } else {
                Toast.fire({ title: res.data.message });
                this.getListOfRows();
              }
            }
          });
        // console.log("isBtnFinsish", this.isBtnFinsish, this.isActive);
      }
    },

    startFinishFirstTime() {
      // console.log("enter");
      this.dropdownChange = true;
      this.isStartDiagnosisFirst = false;
      this.isStartDiagnosisSecond = false;
      this.isBtnFinsish = true;
      this.isContentEditable = true;
      this.diagnosisBtn = "진단완료"; // Diagnosis complete
      this.showControl = false;

      // to reset records and date
      this.$refs.compareCheck.checked = false;
      this.$refs.selectDate.selectedIndex = 0;
      this.searchByUploadDate = "";
      this.getListOfRows();
      // console.log("select ele", this.$refs.selectDate.selectedIndex)
    },

    // for downloading result
    startDownloadResult() {
      this.diagnosisManagementService
        .downloadDiagnosisResult(
          this.controlArea,
          this.$store.state.header.certificate,
          this.optionalSearch,
          this.searchByUploadDate
        )
        .then((res) => {
          console.log("diagnosis-download-result", res);
          if (res.status == 200) {
            let path = res.data.path;
            path = path + "type=unlink";
            let data = { url: path, fileName: "Diagnosis-result" };
            this.$store.dispatch(
              "diagnosisManagement/createDownloadFiles",
              data
            );
          } else if (res.response.status == 401) {
            Toast.fire({ title: res.response.data.error });
          } else {
            return;
          }
        });
    },

    finishDiagnosisComplete() {
      //alert("Finish")
      this.startDiagnosisEvaluation("finish");
    },

    closeStartDiagnosisFirstModal() {
      this.isStartDiagnosisFirst = false;
    },

    closeStartDiagnosisSecondModal() {
      this.isStartDiagnosisSecond = false;
    },

    closeCompleteDiagnosisModal() {
      this.isCompleteDiagnosis = false;
    },

    closeCompleteDiagnosisFinalModal() {
      this.isCompleteDiagnosisFinal = false;
      this.isBtnFinsish = false;
    },

    closeDiagnosisFailedModal() {
      this.isDiagnosisFailed = false;
    },

    openEvaluationModal() {
      this.isEvaluation = true;
    },

    closeEvaluationStandard() {
      this.isEvaluation = false;
    },
  },
};
</script>

<style lang="scss">
.item_disabled {
  // color: black;
  // font-weight: 600;
}
.hide_btn{
  display: none;
}

</style>
