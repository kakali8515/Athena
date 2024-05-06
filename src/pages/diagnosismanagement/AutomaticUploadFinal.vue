<template>
  <div class="info_protection">
    <div class="breadcrumb">
      <Breadcrumb
        link="/dashboard"
        text1="Home"
        text2="진단관리"
        text3="기술적 진단"
        link2="../../detailedResult"
      />
    </div>
    <div class="heading flex justify-between align-end">
      <h4>이행진단 ({{ this.$route.params.catName }})</h4>
      <div class="history_wrap">
        <div class="">
          <ul>
            <li>
              (초행진단) <span class="skyblue m-l-10">전체항목</span>:
              {{ $store.state.diagnosisManagement.allCount.prev }}
            </li>
            <li>
              <span class="blue">양호</span>:
              {{ $store.state.diagnosisManagement.initialCount.good }}
            </li>
            <li>
              <span class="red">취약</span>:{{
                $store.state.diagnosisManagement.initialCount.weak
              }}
            </li>
            <li>
              <span class="skyblue">N/A</span>:
              {{ $store.state.diagnosisManagement.initialCount.na }}
            </li>
            <li>
              <span class="orange">수동</span>:
              {{ $store.state.diagnosisManagement.initialCount.manual }}
            </li>
          </ul>
          <ul>
            <li>
              (이행진단) <span class="skyblue m-l-10">전체항목</span>:
              {{ $store.state.diagnosisManagement.allCount.current }}
            </li>
            <li>
              <span class="blue">양호</span>:
              {{ $store.state.diagnosisManagement.finalCount.good }}
            </li>
            <li>
              <span class="red">취약</span>:
              {{ $store.state.diagnosisManagement.finalCount.weak }}
            </li>
            <li>
              <span class="skyblue">N/A</span>:
              {{ $store.state.diagnosisManagement.finalCount.na }}
            </li>
            <li>
              <span class="orange">수동</span>:
              {{ $store.state.diagnosisManagement.finalCount.manual }}
            </li>
          </ul>
        </div>
        <div class="flex items-center">
          <input
            @change="importPrevCheck"
            ref="importPreviousCheck"
            id="link-checkbox"
            type="checkbox"
            value=""
            class="
              w-4
              h-4
              text-blue-600
              bg-gray-100
              rounded
              border-gray-300
              dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600
            "
          />
          <label
            for="link-checkbox"
            class="
              text-sm
              font-medium
              text-gray-900
              dark:text-gray-300
              checkbox-element
            "
            >이전현황 불러오기</label
          >
        </div>
      </div>
    </div>
    <div class="datatable_wrap_new protection_table">
      <div class="tab-content" id="tabs-tabContent">
        <div
          class="tab-pane fade show active"
          id="tabs-one"
          role="tabpanel"
          aria-labelledby="tabs-one-tab"
        >
          <div class="flex flex-col">
            <div class="overflow-x-auto protection_table">
              <div class="inline-block min-w-full">
                <div class="overflow-hidden">
                  <table class="min-w-full text-center">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          <div class="sortable-cell">
                            항목코드 <img src="@/assets/icon/DownSquare.svg" />
                          </div>
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          <div class="sortable-cell">
                            자산코드 <img src="@/assets/icon/DownSquare.svg" />
                          </div>
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          <div class="sortable-cell">
                            항목명 <img src="@/assets/icon/DownSquare.svg" />
                          </div>
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          <div class="sortable-cell">
                            중요도 <img src="@/assets/icon/DownSquare.svg" />
                          </div>
                        </th>
                        <th
                          v-show="isImportPrev"
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          <div class="sortable-cell">
                            진행결과<img src="@/assets/icon/DownSquare.svg" />
                          </div>
                        </th>
                        <th
                          v-show="isImportPrev"
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          <div class="sortable-cell">
                            현황 <img src="@/assets/icon/DownSquare.svg" />
                          </div>
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          <div class="sortable-cell">
                            진행결과 <img src="@/assets/icon/DownSquare.svg" />
                          </div>
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          <div class="sortable-cell">
                            현황 <img src="@/assets/icon/DownSquare.svg" />
                          </div>
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          <div class="sortable-cell">
                            비고 <img src="@/assets/icon/DownSquare.svg" />
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in evaluationResults"
                        :key="index"
                        class="bg-white border-b"
                      >
                        <td class="text-sm text-gray-900 font-light px-6 py-4">
                          {{ item.code }}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4">
                          {{ item.asset_code }}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4">
                          {{ item.item }}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4">
                          {{ item.grade }}
                        </td>
                        <td
                          class="text-sm text-gray-900 font-light px-6 py-4"
                          v-show="isImportPrev"
                        >
                          {{ item.previous_result }}
                        </td>
                        <td
                          class="text-sm text-gray-900 font-light px-6 py-4"
                          v-show="isImportPrev"
                        >
                          <div class="flex-row">
                            <p>기준 : {{ item.prev_standard }}</p>
                            <p>혠황: {{ item.previous_explain }}</p>
                          </div>
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4">
                          <select
                            @change="
                              isUpdateEvaluationResult(
                                $event,
                                item.tech_evaluation_id,
                                item.explain,
                                item.standard,
                                item.asset_id
                              )
                            "
                          >
                            <option value=""></option>
                            <option
                              v-for="(result, index) in Object.entries(
                                $store.state.diagnosisManagement.testResultList
                              )"
                              :value="result[0]"
                              :key="index"
                              :selected="result[1] == item.result"
                            >
                              {{ result[1] }}
                            </option>
                          </select>
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4">
                          <div class="flex items-center">
                            <label class="whitespace-nowrap">기준:</label>
                            <input
                              type="text"
                              class="tableInput"
                              :value="item.standard"
                              @change="
                                isUpdateStandard(
                                  $event,
                                  item.tech_evaluation_id,
                                  item.explain,
                                  item.asset_id
                                )
                              "
                            />
                          </div>
                          <div class="flex items-center">
                            <label class="whitespace-nowrap">혠황:</label>
                            <input
                              type="text"
                              class="tableInput"
                              :value="item.explain"
                              @change="
                                isUpdateExplain(
                                  $event,
                                  item.tech_evaluation_id,
                                  item.standard,
                                  item.asset_id
                                )
                              "
                            />
                          </div>
                        </td>

                        <td class="text-sm text-gray-900 font-light px-6 py-4">
                          <input
                            type="text"
                            class="tableInput"
                            @change="
                              isUpdateNote(
                                $event,
                                item.tech_evaluation_id,
                                item.explain,
                                item.standard,
                                item.asset_id
                              )
                            "
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- <pagination
                  v-model="page"
                  :records="records"
                  :per-page="limit"
                  @paginate="myCallback"
                /> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="button_wrap fixed-button-wrap flex justify-between">
      <div class="buttons flex justify-start">
        <button type="button" class="gray" @click="downloadResultReport">
          결과보고서 다운로드
        </button>
      </div>
      <div class="buttons flex justify-end">
        <!-- <button type="button">My Revision History</button> -->
        <button :disabled="isSave == false" @click="save" type="button">
          저장
        </button>
      </div>
    </div>
  </div>

  <!--Save -->
  <ConfirmChangesModal
    v-if="isConfirmModal"
    @close="closeModal"
    :edit="updatedResult"
    :asset_id="assetId"
    :tid="template_id"
    diagnosis_status="2nd_ongoing"
    automatic="y"
    :category_id="this.$route.params.cid"
  />
</template>


<script>
import TechnicalDiagnosticResultsService from "@/services/TechnicalDiagnosticResultsService";
import ConfirmChangesModal from "@/components/modals/ConfirmChangesModal.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
export default {
  name: "ManualDiagnosisImplementation",
  components: {
    ConfirmChangesModal,
    Breadcrumb,
  },
  data() {
    return {
      evaluationResults: [],
      page: 1,
      limit: 50,
      records: "",
      template_id: this.$route.params.tId,
      assetId: JSON.parse(this.$route.params.assetId),
      diagnosis_status: "1st_complete",
      updatedResult: [],
      note: "",
      result: "",
      isConfirmModal: false,
      explain: "",
      isSave: false,
      categoryId: this.$route.params.cid,
      isImportPrev: false,
    };
  },
  created() {
    this.TechnicalDiagnosticResultsService =
      new TechnicalDiagnosticResultsService();
    this.$store.dispatch("diagnosisManagement/getTestResultList");
  },
  mounted() {
    this.getDiagnosisResultCount();
    setTimeout(() => {
      this.evaluationList();
    }, 1000);
  },
  methods: {
    getDiagnosisResultCount() {
      let credentials = {
        category_id: this.categoryId,
        certification: this.$store.state.header.certificate,
      };
      this.$store.dispatch("diagnosisManagement/getResultCount", credentials);
    },
    // it will show columns on checkbox select
    importPrevCheck() {
      if (this.$refs.importPreviousCheck.checked == true) {
        this.isImportPrev = true;
      } else {
        this.isImportPrev = false;
      }
    },
    closeModal() {
      this.isConfirmModal = false;
    },
    myCallback(ClickPage) {
      this.page = ClickPage;
      this.evaluationList();
    },
    save() {
      this.isConfirmModal = true;
    },
    // evaluation List
    evaluationList() {
      this.evaluationResults = JSON.parse(localStorage.getItem("automaticRes"));

      for (let i = 0; i < this.evaluationResults.length; i++) {
        for (const [key, value] of Object.entries(
          this.$store.state.diagnosisManagement.testResultList
        )) {
          if (value == this.evaluationResults[i].result) {
            this.result = key;
          }
        }

        this.updatedResult.push({
          id: this.evaluationResults[i].tech_evaluation_id,
          result: this.result ? this.result : "",
          explain: this.evaluationResults[i].explain
            ? this.evaluationResults[i].explain
            : "",
          note: this.note,
          standard: this.evaluationResults[i].standard
            ? this.evaluationResults[i].standard
            : "",
          asset_id: this.evaluationResults[i].asset_id,
        });
      }

      if (Array.from(this.updatedResult).some((item) => item.result == "")) {
        this.isSave = false;
      } else {
        this.isSave = true;
      }

      console.log(this.updatedResult);
    },

    isUpdateEvaluationResult(event, id, explain, standard, asset_id) {
      if (this.updatedResult.length > 0) {
        let checkId = this.updatedResult.find(function (item) {
          return item.id == id && item.asset_id == asset_id;
        });
        if (checkId) {
          checkId.result = event.target.value;
        } else {
          this.updatedResult.push({
            id: id,
            result: event.target.value,
            explain: explain,
            note: this.note,
            standard: standard,
            asset_id: asset_id,
          });
        }
      } else {
        this.updatedResult.push({
          id: id,
          result: event.target.value,
          explain: explain,
          note: this.note,
          standard: standard,
          asset_id: asset_id,
        });
      }

      if (Array.from(this.updatedResult).some((item) => item.result == "")) {
        this.isSave = false;
      } else {
        this.isSave = true;
      }

      console.log(this.updatedResult);
    },
    isUpdateExplain(event, id, standard, asset_id) {
      if (this.updatedResult.length > 0) {
        let checkId = this.updatedResult.find(function (item) {
          return item.id == id && item.asset_id == asset_id;
        });
        if (checkId) {
          checkId.explain = event.target.value;
        } else {
          this.updatedResult.push({
            id: id,
            result: this.result,
            explain: event.target.value,
            note: this.note,
            standard: standard,
            asset_id: asset_id,
          });
        }
      } else {
        this.updatedResult.push({
          id: id,
          result: this.result,
          explain: event.target.value,
          note: this.note,
          standard: standard,
          asset_id: asset_id,
        });
      }

      console.log(this.updatedResult);
    },
    isUpdateStandard(event, id, explain, asset_id) {
      if (this.updatedResult.length > 0) {
        let checkId = this.updatedResult.find(function (item) {
          return item.id == id && item.asset_id == asset_id;
        });
        if (checkId) {
          checkId.standard = event.target.value;
        } else {
          this.updatedResult.push({
            id: id,
            result: this.result,
            explain: explain,
            note: this.note,
            standard: event.target.value,
            asset_id: asset_id,
          });
        }
      } else {
        this.updatedResult.push({
          id: id,
          result: this.result,
          explain: explain,
          note: this.note,
          standard: event.target.value,
          asset_id: asset_id,
        });
      }

      console.log(this.updatedResult);
    },
    isUpdateNote(event, id, explain, standard, asset_id) {
      if (this.updatedResult.length > 0) {
        let checkId = this.updatedResult.find(function (item) {
          return item.id == id && item.asset_id == asset_id;
        });
        if (checkId) {
          checkId.note = event.target.value;
        } else {
          this.updatedResult.push({
            id: id,
            result: this.result,
            explain: explain,
            note: event.target.value,
            standard: standard,
            asset_id: asset_id,
          });
        }
      } else {
        this.updatedResult.push({
          id: id,
          result: this.result,
          explain: explain,
          note: event.target.value,
          standard: standard,
          asset_id: asset_id,
        });
      }

      console.log(this.updatedResult);
    },

    downloadResultReport() {
      const url = `${
        process.env.VUE_APP_API_BASE_URL
      }/download/file?url=${localStorage.getItem(
        "automaticDownloadPath"
      )}&type=unlink`; // later required base url to dynamic
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "DownloadEvaluation");
      document.body.appendChild(link);
      link.click();
    },
  },
};
</script>


<style lang="scss">
</style>