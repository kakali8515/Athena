<template>
  <div class="info_protection">
    <div class="breadcrumb">
      <Breadcrumb
        link="dashboard"
        text1="Home"
        text2="증적관리"
        text3="재-개정 이력"
      />
    </div>
    <div class="heading flex justify-between align-end">
      <h4>운영명세서</h4>
      <div class="history_wrap">
        <div class="flex items-center">
          <input
            id="default-checkbox"
            type="checkbox"
            value=""
            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            @change="
              (e) => {
                setChange(e.target.checked);
              }
            "
          />
          <label
            for="default-checkbox"
            class="text-sm font-medium text-gray-900 dark:text-gray-300 checkbox-element"
            >관련문서 보기</label
          >
        </div>
      </div>
    </div>

    <div class="managmenttable">
      <div class="managment_main_wrap">
        <div class="select_wrap mb-15">
          <span>통제영역</span>
          <select v-model="selected_class" @change="GetChange">
            <option value="">전체</option>
            <option v-for="(i, e) in control_area_list" :key="e">
              {{ i.class }}
            </option>
          </select>
        </div>
        <SortingDropdown
          :obj="operatingStatementFilterData"
          @selectedCol="selectedCol"
          @selectedOrd="selectedOrd"
        />
        <div class="select_wrap mb-15">
          <!-- <select>
            <option>All</option>
            <option>All</option>
            <option>All</option>
            <option>All</option>
          </select> -->
          <input
            type="text"
            placeholder="검색"
            class="searchBar"
            v-model="searchedOperatingList"
          />
          <button @click="lookup" type="button">조회</button>
        </div>
      </div>

      <div class="datatable_wrap_new protection_table mtop-10">
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
                            <div class="sortable-cell">항목번호</div>
                          </th>
                          <th
                            scope="col"
                            class="text-sm font-medium text-gray-900 px-6 py-4"
                          >
                            <div class="sortable-cell">항목명</div>
                          </th>
                          <th
                            scope="col"
                            class="text-sm font-medium text-gray-900 px-6 py-4"
                          >
                            <div class="sortable-cell">상세내용</div>
                          </th>
                          <th
                            scope="col"
                            class="text-sm font-medium text-gray-900 px-6 py-4"
                          >
                            <div class="sortable-cell">운영여부</div>
                          </th>
                          <th
                            scope="col"
                            class="text-sm font-medium text-gray-900 px-6 py-4"
                          >
                            <div class="sortable-cell">
                              운영현황(또는 미선택사유)
                            </div>
                          </th>
                          <th
                            scope="col"
                            class="text-sm font-medium text-gray-900 px-6 py-4"
                          >
                            <div class="sortable-cell">
                              관련문서(정책,지침 등 세부조항번호까지)
                            </div>
                          </th>
                          <th
                            scope="col"
                            class="text-sm font-medium text-gray-900 px-6 py-4"
                          >
                            <div class="sortable-cell">기록(증적자료)</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, index) in operatingList"
                          :key="index"
                          class="bg-white border-b"
                        >
                          <td
                            class="text-sm text-gray-900 font-light px-6 py-4"
                          >
                            {{ item.item_number }}
                          </td>
                          <td
                            class="text-sm text-gray-900 font-light px-6 py-4"
                          >
                            {{ item.class }}
                          </td>
                          <td
                            class="text-sm text-gray-900 font-light px-6 py-4"
                          >
                            <p
                              class="detail-content"
                              v-for="(content, index) in item.detailed_contents"
                              :key="index"
                            >
                              {{ content }}
                            </p>
                          </td>
                          <td
                            class="text-sm text-gray-900 font-light px-6 py-4"
                          >
                            <Select
                              name="result"
                              v-model="result"
                              @change="
                                isUpdateOperationSet(
                                  $event,
                                  item.id,
                                  item.diagnosis_status,
                                  item.score,
                                  item.item_number,
                                  item.operating_statement_id
                                )
                              "
                            >
                              <option
                                :selected="item.operation_set == 'n'"
                                value="n"
                              >
                                No
                              </option>
                              <option
                                :selected="item.operation_set == 'y'"
                                value="y"
                              >
                                Yes
                              </option>
                            </Select>
                          </td>
                          <td
                            class="text-sm text-gray-900 font-light px-6 py-4 whole-area"
                          >
                            <textarea
                              contenteditable
                              class="tableInput full-text-tablInput"
                              :value="item.diagnosis_status"
                              @change="
                                isUpdateDiagnosisStatus(
                                  $event,
                                  item.id,
                                  item.operation_set,
                                  item.score,
                                  item.item_number,
                                  item.operating_statement_id
                                )
                              "
                            />
                          </td>
                          <td
                            class="text-sm text-gray-900 font-light px-6 py-4 whole-area"
                          >
                            <textarea
                              class="tableInput full-text-tablInput"
                              :value="item.related_documents"
                              v-if="!isRelatedModal && isTextareaView == true"
                              @change="
                                isUpdateRelatedDocuments(
                                  $event,
                                  item.id,
                                  item.operation_set,
                                  item.diagnosis_status,
                                  item.item_number,
                                  item.operating_statement_id
                                )
                              "
                            />
                            <template
                              v-if="isRelatedModal || isTextareaView == false"
                            >
                              <div class="relatedDocP">
                                <p
                                  @click="isTextareaView = true"
                                  @dblclick="
                                    () => {
                                      showRelatedDocumentModal = true;
                                      item_Number = item.item_number;
                                      operation_set = item.operation_set;
                                      diagnosis_status = item.diagnosis_status;
                                      related_documents =
                                        item.related_documents;
                                      id = item.id;
                                      operating_statement_id =
                                        item.operating_statement_id;
                                    }
                                  "
                                  v-for="(tag, index) in splitJoin(
                                    item.related_documents
                                  )"
                                  :key="index"
                                  v-text="tag"
                                ></p>
                              </div>
                            </template>
                            <!-- <textarea
                              type="text"
                              rows="4"
                              class="tableInput"
                              readonly
                              :value="item.related_documents"
                              
                            >
                            </textarea> -->
                          </td>
                          <td
                            @dblclick="
                              () => {
                                showRecordEvidenceModal = true;
                                item_Number = item.item_number;
                              }
                            "
                            class="text-sm text-gray-900 font-light px-6 py-4"
                          >
                            <p
                              v-for="(record, index) in item.records"
                              :key="index"
                            >
                              {{ record }}
                            </p>
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
      </div>

      <!-- <DataTable
        :HeadersColumn="colData"
        :BodyData="operatingList"
        :rowClickable="true"
        @clickEvent="ShowDetails($event)"
        :Page="page"
        :records="totalItems"
        :options="chunkPage"
        :perPage="limit"
        @clickPaginate="myCallback($event)"
        clickCellIndex="1"
      /> -->
      <!-- <div class="info">
        <p class="guidelines-info">
          *(up to the number of detailed clauses such as policies, guidelines,
          etc.)
        </p>
      </div> -->
    </div>

    <div class="button_wrap fixed-button-wrap flex justify-between">
      <div class="buttons flex justify-start">
        <button type="button" class="gray" @click="downloadOperatingStatement">
          운영명세서 다운로드
        </button>
        <button
          @click="openCallingModal"
          type="button"
          class="gray"
          v-if="
            permission == 'edit' ||
            this.$store.state.signin.is_user_admin == 'y'
          "
        >
          진단결과 불러오기
        </button>
      </div>
      <div class="buttons  flex justify-end">
        <button
          @click="$router.push({ name: 'EnactmentRevisionHistory' })"
          type="button"
          v-if="
            permission == 'edit' ||
            this.$store.state.signin.is_user_admin == 'y'
          "
        >
          재-개정 이력
        </button>
        <button
          type="button"
          @click="saveOperatingStatement"
          v-if="
            permission == 'edit' ||
            this.$store.state.signin.is_user_admin == 'y'
          "
        >
          저장
        </button>
      </div>
    </div>
  </div>
  <RelatedDocument
    v-if="showRelatedDocumentModal"
    :itemNumber="item_Number"
    :rowId="id"
    :documents="related_documents"
    :current_status="diagnosis_status"
    :operationSet="operation_set"
    :statementId="operating_statement_id"
    @closeModal="closeRelatedDocumentModal($event)"
    @policyName="updatedRelatedDocument"
  />
  <RecordEvidence
    v-if="showRecordEvidenceModal"
    v-show="showRecordEvidenceModal"
    :itemNumber="item_Number"
    @closeModal="closeRecordEvidenceModal($event)"
  />
  <CallingDiagnosticResults
    v-if="showCallingDiagnosticResults"
    @closeModal="closeRecordEvidenceModal($event)"
    @confirm="CallingUpResult"
  />
</template>

<script>
import DataTable from "@/components/DataTable.vue";
import RelatedDocument from "@/components/modals/RelatedDocument.vue";
import RecordEvidence from "@/components/modals/RecordEvidence.vue";
// import { diagnosisSettingCol } from "@/config/TableColData";
import EvidenceManagement from "@/services/EvidenceManagement.js";
import Breadcrumb from "@/components/Breadcrumb.vue";
import CallingDiagnosticResults from "@/components/modals/CallingDiagnosticResults.vue";
import Toast from "@/alert/alert.js";
import { operatingStatementFilterData } from "@/config/SortingDropdownData";
import SortingDropdown from "@/components/SortingDropdown.vue";
export default {
  name: "OperatingStatement",
  components: {
    // Tabs,
    // TabWrapper,
    DataTable,
    Breadcrumb,
    RelatedDocument,
    RecordEvidence,
    CallingDiagnosticResults,
    SortingDropdown,
  },
  data() {
    return {
      page: 1,
      limit: 50,
      chunkPage: { chunk: 5 },
      totalItems: 0,
      control_area_list: [],
      operatingList: [],
      search_item: "",
      selected_class: "",
      updatedResult: [],
      isRelatedModal: false,
      showRelatedDocumentModal: false,
      showRecordEvidenceModal: false,
      item_Number: "",
      searchedOperatingList: "",
      operation_set: "",
      diagnosis_status: "",
      related_documents: "",
      id: "",
      operating_statement_id: "",
      isTextareaView: true,
      showCallingDiagnosticResults: false,
      operatingStatementFilterData: operatingStatementFilterData,
      sort_by: "",
      sortOrder: "",
    };
  },

  created() {
    this.evidenceManagement = new EvidenceManagement();
  },
  computed: {
    permission() {
      return this.$store.state.sideBar.permission.operating_statement;
    },
  },

  watch: {
    "$store.state.header.certificate": function (newVal, oldVal) {
      if (newVal != oldVal && newVal) {
        this.getOperatingList();
      }
    },
  },

  mounted() {
    this.getControlAreaList();
    this.getOperatingList();
  },

  methods: {
    selectedCol(value) {
      this.sort_by = value;
      this.getOperatingList();
    },
    selectedOrd(value) {
      this.sortOrder = value;
      this.getOperatingList();
    },
    splitJoin(theText) {
      // console.log(theText.split(','))
      return theText.split(",");
    },
    getControlAreaList() {
      this.control_area_list = [];
      this.evidenceManagement
        .controlAreaList({ searchBy: this.search_item })
        .then((res) => {
          // console.log(res);
          this.control_area_list = res.data.data;
        });
    },
    getOperatingList() {
      this.operatingList = [];
      this.evidenceManagement
        .OperatingStatement({
          control_area: this.selected_class,
          certification: this.$store.state.header.certificate,
          search_text: this.searchedOperatingList,
          sortBy: this.sort_by,
          sortOrder: this.sortOrder,
        })
        .then((res) => {
          // console.log(res);
          this.operatingList = res.data.statement_list;
        });
    },
    GetChange() {
      // console.log(this.selected_class);
      this.getOperatingList();
    },
    lookup() {
      this.getOperatingList();
    },
    isUpdateOperationSet(
      event,
      id,
      diagnosis_status,
      Related_document,
      item_number,
      operating_statement_id
    ) {
      if (this.updatedResult.length > 0) {
        let checkId = this.updatedResult.find(function (item) {
          return item.id == id;
        });
        if (checkId) {
          checkId.operation_set = event.target.value;
        } else {
          this.updatedResult.push({
            id: id,
            operating_statement_id: operating_statement_id,
            operation_set: event.target.value,
            current_status: diagnosis_status,
            related_documents: Related_document,
            item_number: item_number,
            certification_name: this.$store.state.header.certificate,
          });
        }
      } else {
        this.updatedResult.push({
          id: id,
          operating_statement_id: operating_statement_id,
          operation_set: event.target.value,
          current_status: diagnosis_status,
          related_documents: Related_document,
          item_number: item_number,
          certification_name: this.$store.state.header.certificate,
        });
      }

      // console.log(this.updatedResult);
    },
    isUpdateDiagnosisStatus(
      event,
      id,
      operation_set,
      related_documents,
      item_number,
      operating_statement_id
    ) {
      if (this.updatedResult.length > 0) {
        let checkId = this.updatedResult.find(function (item) {
          return item.id == id;
        });
        if (checkId) {
          checkId.current_status = event.target.value;
        } else {
          this.updatedResult.push({
            id: id,
            operating_statement_id: operating_statement_id,
            operation_set: operation_set,
            current_status: event.target.value,
            related_documents: related_documents,
            item_number: item_number,
            certification_name: this.$store.state.header.certificate,
          });
        }
      } else {
        this.updatedResult.push({
          id: id,
          operating_statement_id: operating_statement_id,
          operation_set: operation_set,
          current_status: event.target.value,
          related_documents: related_documents,
          item_number: item_number,
          certification_name: this.$store.state.header.certificate,
        });
      }
      // console.log(this.updatedResult);
    },
    isUpdateRelatedDocuments(
      event,
      id,
      operation_set,
      current_status,
      item_number,
      operating_statement_id
    ) {
      this.operatingList.forEach((item) => {
        if (item.id == id) {
          item.related_documents = event.target.value;
        }
      });
      if (this.updatedResult.length > 0) {
        let checkId = this.updatedResult.find(function (item) {
          return item.id == id;
        });
        if (checkId) {
          checkId.related_documents = event.target.value;
        } else {
          this.updatedResult.push({
            id: id,
            operating_statement_id: operating_statement_id,
            operation_set: operation_set,
            current_status: current_status,
            related_documents: event.target.value,
            item_number: item_number,
            certification_name: this.$store.state.header.certificate,
          });
        }
      } else {
        this.updatedResult.push({
          id: id,
          operating_statement_id: operating_statement_id,
          operation_set: operation_set,
          current_status: current_status,
          related_documents: event.target.value,
          item_number: item_number,
          certification_name: this.$store.state.header.certificate,
        });
      }
      // console.log(this.updatedResult);
    },
    setChange(event) {
      console.log(event);
      this.isTextareaView = true;
      this.isRelatedModal = event;
    },
    closeRelatedDocumentModal(event) {
      this.showRelatedDocumentModal = event;
    },
    closeRecordEvidenceModal(event) {
      this.showRecordEvidenceModal = event;
      this.showCallingDiagnosticResults = event;
    },
    saveOperatingStatement() {
      console.log(this.updatedResult);
      if (this.updatedResult.length > 0) {
        this.evidenceManagement
          .OperatingStatementSave({ operating_statement: this.updatedResult })
          .then((res) => {
            // console.log(res);
            if (res.status === 200) {
              this.getOperatingList();
              Toast.fire({ title: res.data.message });
              this.updatedResult = [];
            }
          });
      } else {
        // console.log("No data to save");
      }
    },

    updatedRelatedDocument() {
      this.getOperatingList();
    },
    openCallingModal() {
      this.showCallingDiagnosticResults = true;
    },
    downloadOperatingStatement() {
      this.evidenceManagement
        .operatingStatementDownload({
          control_area: this.selected_class,
          certification: this.$store.state.header.certificate,
          search_text: this.searchedOperatingList,
          sortBy: this.sort_by,
          sortOrder: this.sortOrder,
        })
        .then((res) => {
          if (res.status == 200) {
            const url = `${process.env.VUE_APP_API_BASE_URL}/download/file?url=${res.data.path}&type=unlink`; // later required base url to dynamic
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "OperatingStatement");
            document.body.appendChild(link);
            link.click();
          } else if (res.response.status == 401) {
            Toast.fire({ title: res.response.data.error });
          }
          else{
            return;
          }
        });
    },

    CallingUpResult() {
      this.evidenceManagement
        .callingUpResult({
          control_area: this.selected_class,
          certification: this.$store.state.header.certificate,
          search_text: this.searchedOperatingList,
        })
        .then((res) => {
          if (res.status == 200) {
            this.showCallingDiagnosticResults = false;
            this.getOperatingList();
          }
        });
    },
  },
};
</script>

<style lang="scss">
.whole-area {
  height: 185px;

  .full-text-tablInput {
    height: 100%;
    padding: 0;
    margin: 0;
    display: block;
    outline: none;
    background-color: transparent;
  }
  .relatedDocP {
    height: 100%;
  }
}

.tableInput {
  border: 0 !important;
}

.protection_table table tbody tr td select {
  min-width: 8rem;
  background-color: transparent;
}

.searchBar {
  border: 1px solid #cfcfcf;
  height: 36px;
  padding: 0 20px;
}

.detail-content {
  padding-bottom: 10px;
}

// To last child
tr td p:nth-last-child(1) {
  padding-bottom: 0;
}
.mtop-10{
  margin-top: 10px !important;
}
</style>
