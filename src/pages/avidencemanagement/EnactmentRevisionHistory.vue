<template>
  <div class="info_protection">
    <div class="breadcrumb">
      <Breadcrumb
        link="dashboard"
        text1="Home"
        text2="증적관리"
        text3="재-개정 내역"
      />
    </div>
    <div class="heading flex justify-between align-end">
      <h4>재-개정 내역</h4>
    </div>

    <div class="managmenttable">
      <!-- <DataTable
                :HeadersColumn="colData"
                :BodyData="bullietinPostList"
                :rowClickable="true"
                @clickEvent="ShowDetails($event)"
                :Page="page"
                :records="totalItems"
                :options="chunkPage"
                :perPage="limit"
                @clickPaginate="myCallback($event)"
                clickCellIndex="1"
            /> -->

      <div class="datatable_wrap_new protection_table m-t-0">
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
                            v-for="(item, index) in colData"
                            :key="index"
                          >
                            <div
                              :class="`${
                                item.isSortable ? 'sortable-cell' : ''
                              }`"
                            >
                              {{ item.name }}
                              <img
                                src="@/assets/icon/DownSquare.svg"
                                v-if="item.isSortable"
                              />
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <!-- <p class="empty-msg" v-if="tableMsg">{{ tableMsg }}</p> -->
                        <template v-if="evidenceHistoryList.length > 0">
                          <tr
                            v-for="(history, i) in evidenceHistoryList"
                            :key="i"
                          >
                            <td
                              class="
                                text-sm text-gray-900
                                font-light
                                px-6
                                py-4
                                click-pointer
                                bg-white
                                border-b
                              "
                            >
                              <p
                                contenteditable
                                class="text-center"
                                @input="
                                  getUpdatedHistory(
                                    $event,
                                    history.id,
                                    'version'
                                  )
                                "
                              >
                                {{ history.version }}
                              </p>
                            </td>
                            <td
                              class="
                                text-sm text-gray-900
                                font-light
                                px-6
                                py-4
                                click-pointer
                                bg-white
                                border-b
                              "
                            >
                              <p class="text-center">
                                 {{ history.updated_date.slice(0, 10) }}
                              </p>
                            </td>
                            <!-- <td
                              class="
                                text-sm text-gray-900
                                font-light
                                px-6
                                py-4
                                click-pointer
                                bg-white
                                border-b
                              "
                            >
                              <p class="text-center">{{ time }}</p>
                            </td> -->
                            <td
                              class="
                                text-sm text-gray-900
                                font-light
                                px-6
                                py-4
                                click-pointer
                                bg-white
                                border-b
                              "
                            >
                              <p
                                contenteditable
                                class="text-center"
                                @input="
                                  getUpdatedHistory(
                                    $event,
                                    history.id,
                                    'manager_name'
                                  )
                                "
                              >
                                {{ history.manager_name }}
                              </p>
                            </td>
                            <td
                              class="
                                text-sm text-gray-900
                                font-light
                                px-6
                                py-4
                                click-pointer
                                bg-white
                                border-b
                              "
                            >
                              <p class="text-center">
                                {{
                                  history.revision_date
                                    ? history.revision_date.slice(0, 10)
                                    : ""
                                }}
                              </p>
                            </td>
                          </tr>
                        </template>
                 
                      </tbody>
                    </table>
                  </div>
                </div>
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
    v-show="isAddBtn"
      type="button"
      @click="getNewRow"
      :disabled="isAddMore"
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
        focus:outline-none focus:ring-0
        transition
        duration-150
        ease-in-out
      "
    >
    추가하기
    </button>
  </div>
            <!-- <Pagination /> -->
            
              <pagination
                v-model="page"
                :records="10"
                :per-page="limit"
                @paginate="myCallback"
              />
            
          </div>
        </div>
      </div>
    </div>

    <div class="button_wrap fixed-button-wrap flex justify-between">
      <div class="buttons flex justify-start"></div>

      <div class="buttons flex justify-end">
        <!-- <button type="button">My Revision History</button> -->
        <button type="button" @click="saveRevisionHistory">저장</button>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "@/components/DataTable.vue";
import { diagnosisSettingCol } from "@/config/TableColData";
import Breadcrumb from "@/components/Breadcrumb.vue";
import EvidenceManagement from "@/services/EvidenceManagement";
import Toast from "@/alert/alert.js";
export default {
  name: "EnactmentRevisionHistory",
  components: {
    // Tabs,
    // TabWrapper,
    DataTable,
    Breadcrumb,
  },
  data() {
    return {
      isAddMore:false,
      evidenceHistoryList: [],
      saveHistory: [],
      page: 1,
      limit: 50,
      isAddBtn : "",
      totalRecords: "",
      chunkPage: { chunk: 5 },
      totalItems: 0,
      colData: [
        {
          name: "버전",
          id: "no",
          isSortable: false,
          type: "text",
        },
        {
          name: "수정일",
          id: "inquiry_title",
          isSortable: false,
          type: "text",
        },
        // {
        //   name: "Time",
        //   id: "writer_name",
        //   isSortable: false,
        //   type: "text",
        // },
        {
          name: "담당자",
          id: "created_date",
          isSortable: false,
          type: "text",
        },
        {
          name: "개정일",
          id: "answer_or_not",
          isSortable: false,
          type: "text",
        },
      ],
    };
  },

  created() {
    this.EvidenceManagement = new EvidenceManagement();
  },
  beforeMount(){
   this.getEvidenceHistoryList(this.page, this.limit);
  },
  methods: {
  // API to display history data
  getEvidenceHistoryList(page, limit){
    this.EvidenceManagement.revisionHistoryList(page, limit).then((res)=>{
          console.log("evidence-history-list", res);
          this.evidenceHistoryList = res.data.my_revision_history_list;
          this.totalRecords = res.data.total_records;
          if(res.data.current_page > 1 ){
            this.isAddBtn = false;
          }else{
            this.isAddBtn = true;
          }
    })
  },

    // To get updated data from existing row
    getUpdatedHistory(e, id=null, key ) {

   
       let rowData = this.evidenceHistoryList.find((item) => item.id == id);

      console.log("history-field-name", key);
      console.log("history-field-value", e.target.innerText);
      rowData[key] = e.target.innerText;

      if (this.saveHistory.length > 0) {
        let index = this.saveHistory.findIndex(
          (i) => i.revision_history_id == id
        );
        if (index < 0) {
          this.saveHistory.push({
            version: rowData.version,
            manager_name: rowData.manager_name,
            revision_history_id: rowData.id,
          });
        } else {
          this.saveHistory[index][key] = e.target.innerText;
        }
      } else {
        this.saveHistory.push({
          version: rowData.version,
          manager_name: rowData.manager_name,
          revision_history_id: rowData.id,
        });
      }

 
    
      

      console.log("store-save-history-data", this.saveHistory);
    },

     // To create a new row
    getNewRow() {
      this.isAddMore=true;
      this.evidenceHistoryList.push({ version : "", revision_date : "", manager_name : "", updated_date : "" });
      console.log("my-history-row", this.evidenceHistoryList);
    },

    // API to save updated or added data
    saveRevisionHistory() {
      if (this.saveHistory == "") {
        this.isValidate = true;
        return;
      }
      this.EvidenceManagement.revisionHistorySave(this.saveHistory).then(
        (res) => {
          console.log("save-evidence-history", res);
          if (res.status == 200) {
            Toast.fire({ title: res.data.message});
            this.isAddMore=false;
            this.saveHistory=[];
            this.getEvidenceHistoryList(this.page, this.limit);
          }
        }
      );
    },

    // pagination
    myCallback(clickedPage) {
      this.page = clickedPage;
      // call API for history records...
      this.getEvidenceHistoryList(this.page, this.limit);
    },
  },
};
</script>


<style lang="scss">
</style>