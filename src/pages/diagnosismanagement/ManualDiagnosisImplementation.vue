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
      <h4>이행진단 (취약점 조치 후 진단 )</h4>
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
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4"
                        >
                          <div class="sortable-cell">
                            진행결과<img src="@/assets/icon/DownSquare.svg" />
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
                        <td class="text-sm text-gray-900 font-light px-6 py-4">
                          {{ item.previous_result }}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4">
                          {{ item.previous_explain }}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4">
                          <select
                            @change="
                              isUpdateEvaluationResult(
                                $event,
                                item.id,
                                item.current_explain,
                                item.current_note,
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
                            >
                              {{ result[1] }}
                            </option>
                          </select>
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4">
                          <input
                            type="text"
                            class="tableInput"
                            :value="item.current_explain"
                            @change="
                              isUpdateExplain(
                                $event,
                                item.id,
                                item.current_note,
                                item.asset_id
                              )
                            "
                          />
                        </td>

                        <td class="text-sm text-gray-900 font-light px-6 py-4">
                          <input
                            type="text"
                            :value="item.current_note"
                            class="tableInput"
                            @change="
                              isUpdateNote(
                                $event,
                                item.id,
                                item.current_explain,
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
    automatic="n"
    :category_id="this.$route.params.cId"
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
      template_id: this.$route.params.id,
      assetId: JSON.parse(this.$route.params.assetId),
      diagnosis_status: "1st_complete",
      updatedResult: [],
      note: "",
      result: "",
      isConfirmModal: false,
      explain: "",
      isSave: false,
    };
  },
  created() {
    this.TechnicalDiagnosticResultsService =
      new TechnicalDiagnosticResultsService();
    this.$store.dispatch("diagnosisManagement/getTestResultList");
  },
  mounted() {
    this.evaluationList();
  },
  methods: {
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
      this.TechnicalDiagnosticResultsService.evaluationResults(
        this.template_id,
        this.assetId,
        this.$store.state.header.certificate,
        this.diagnosis_status
      )
        .then((res) => {
          if (res.status == 200) {
            this.evaluationResults = res.data.technical_evaluation_settings;
            this.records = res.data.total_records;
            for (
              let i = 0;
              i < res.data.technical_evaluation_settings.length;
              i++
            ) {
              this.updatedResult.push({
                id: res.data.technical_evaluation_settings[i].id,
                result: this.result,
                explain: this.explain,
                note: this.note,
                asset_id: res.data.technical_evaluation_settings[i].asset_id,
              });
            }
            console.log(this.updatedResult);
          }
        })
        .catch((err) => {
          return;
        });
    },

    isUpdateEvaluationResult(event, id, explain, note, asset_id) {
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
            explain: this.explain,
            note: this.note,
            asset_id: asset_id,
          });
        }
      } else {
        this.updatedResult.push({
          id: id,
          result: event.target.value,
          explain: this.explain,
          note: this.note,
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
    isUpdateExplain(event, id, note, asset_id) {
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
            asset_id: asset_id,
          });
        }
      } else {
        this.updatedResult.push({
          id: id,
          result: this.result,
          explain: event.target.value,
          note: this.note,
          asset_id: asset_id,
        });
      }

      console.log(this.updatedResult);
    },
    isUpdateNote(event, id, explain, asset_id) {
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
            explain: this.explain,
            note: event.target.value,
            asset_id: asset_id,
          });
        }
      } else {
        this.updatedResult.push({
          id: id,
          result: this.result,
          explain: this.explain,
          note: event.target.value,
          asset_id: asset_id,
        });
      }

      console.log(this.updatedResult);
    },

    downloadResultReport() {
      this.TechnicalDiagnosticResultsService.downloadEvaluation(
        this.diagnosis_status,
        this.assetId,
        this.template_id,
        this.$store.state.header.certificate,
        this.$route.params.cId
      ).then((res) => {
        if (res.status == 200) {
          const url = `${process.env.VUE_APP_API_BASE_URL}/download/file?url=${res.data.path}&type=unlink`; // later required base url to dynamic
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "DownloadEvaluation");
          document.body.appendChild(link);
          link.click();
        }
      });
    },
  },
};
</script>


<style lang="scss">
</style>