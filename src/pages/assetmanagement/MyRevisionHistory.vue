<template>
  <div class="info_protection">
    <Breadcrumb
      link="dashboard"
      text1="Home"
      text2="자산관리"
      text3="자산 목록"
      link2="/assetListSelection"
      text2link="/assetListSelection"
    />
    <!-- <div class="breadcrumb">
           <p><a href="#">Home </a><span>></span> Asset management<span>></span> Asset list</p>
       </div> -->
    <div class="heading flex justify-between align-end">
      <h4>제·개정 이력</h4>
    </div>
    <div class="policy_setting_wrap">
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

      <div class="datatable_wrap_new m-t-0 protection_table">
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
                        <template v-if="myHistoryList.length > 0">
                          <tr v-for="(history, i) in myHistoryList" :key="i">
                            <td
                              class="
                                text-sm 
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
                                text-sm 
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
                            <td
                              class="
                                text-sm
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
                                    'articles_amendments'
                                  )
                                "
                              >
                                {{ history.articles_amendments }}
                              </p>
                            </td>
                            <td
                              class="
                                text-sm 
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
                                text-sm 
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
              :records="totalRecords"
              :per-page="limit"
              @paginate="myCallback"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="button_wrap fixed-button-wrap flex justify-between">
      <div class="buttons flex justify-start"></div>

      <div class="buttons flex justify-end full">
        <button type="button" @click="$router.push('assetListSelection')">
          뒤로가기
        </button>
        <button type="button" @click="saveMyRevisionHistory">저장</button>
      </div>
    </div>
  </div>
  <!-- <ValidationModal
    v-if="isValidate"
    bodyText="Required data to save"
    @close="closeValidationModal"
    @confirm="closeValidationModal"
    firstBtn="Confirm"
  /> -->
</template>


<script>
import DataTable from "@/components/DataTable.vue";
import { diagnosisSettingCol } from "@/config/TableColData";
import ValidationModal from "@/components/modals/ValidationModal.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import AssetManagementService from "@/services/AssetManagementService";
import Toast from "@/alert/alert.js";
export default {
  name: "MyRevisionHistory",
  components: {
    Breadcrumb,
    DataTable,
    ValidationModal,
  },
  data() {
    return {
      isAddMore: false,
      myHistoryList: [],
      saveHistory: [],
      showInput: true,
      isValidate: false,
      isAddBtn: "",
      page: 1,
      limit: 50,
      totalRecords: "",
      chunkPage: { chunk: 5 },
      totalItems: 0,
      colData: [
        {
          name: "버전",
          isSortable: false,
          type: "text",
        },
        {
          name: "수정일",
          isSortable: false,
          type: "text",
        },
        {
          name: "내용",
          isSortable: false,
          type: "text",
        },
        {
          name: "담당자",
          isSortable: false,
          type: "text",
        },
        {
          name: "제-개정일",
          isSortable: false,
          type: "text",
        },
      ],
    };
  },
  created() {
    this.AssetManagementService = new AssetManagementService();
  },
  beforeMount() {
    this.getMyRevisionHistory();
  },

  methods: {
    getMyRevisionHistory() {
      this.AssetManagementService.revisionHistoryList(
        this.page,
        this.limit
      ).then((res) => {
        console.log("myhistory-list", res);
        if (res.status == 200) {
          this.myHistoryList = res.data.my_revision_history_list;
          this.totalRecords = res.data.total_records;
          if (res.data.current_page > 1) {
            this.isAddBtn = false;
          } else {
            this.isAddBtn = true;
          }
        }
      });
    },

    getUpdatedHistory(e, id, key = null) {
      let rowData = this.myHistoryList.find((item) => item.id == id);

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
            articles_amendments: rowData.articles_amendments,
            manager_name: rowData.manager_name,
            revision_history_id: rowData.id,
          });
        } else {
          this.saveHistory[index][key] = e.target.innerText;
        }
      } else {
        this.saveHistory.push({
          version: rowData.version,
          articles_amendments: rowData.articles_amendments,
          manager_name: rowData.manager_name,
          revision_history_id: rowData.id,
        });
      }

      console.log("store-save-history-data", this.saveHistory);
    },

    // To create a new row
    getNewRow() {
      this.isAddMore = true;
      this.myHistoryList.push({
        version: "",
        revision_date: "",
        articles_amendments: "",
        manager_name: "",
        updated_date: "",
      });
      console.log("my-history-row", this.myHistoryList);
    },

    getNewHistory(e, key = null) {
      // let rowData = this.myHistoryList.find(
      //   (item) => item.id == id
      // );
      let rowData = { version: "", manager_name: "", articles_amendments: "" };
      console.log("history-field-name", key);
      console.log("history-field-value", e.target.innerText);
      rowData[key] = e.target.innerText;
      console.log("row-data", rowData);

      if (this.saveHistory.length > 0) {
        this.saveHistory[0][key] = e.target.innerText;
      } else {
        this.saveHistory.push({ ...rowData });
      }
      console.log("store-add-history-data", this.saveHistory);
    },

    saveMyRevisionHistory() {
      if (this.saveHistory == "") {
        this.isValidate = true;
        return;
      }
      this.AssetManagementService.saveRevisionHistory(this.saveHistory).then(
        (res) => {
          console.log("save-history-data", res);
          if (res.status == 200) {
            this.isAddMore = false;
            Toast.fire({ title: res.data.message});
            this.saveHistory = [];
            this.getMyRevisionHistory();
          }
        }
      );
    },

    myCallback(clickedPage) {
      this.page = clickedPage;
      this.getMyRevisionHistory();
    },

    closeValidationModal() {
      this.isValidate = false;
    },
  },
};
</script>


<style lang="scss">
</style>