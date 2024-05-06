<template>
  <div class="overflow-x-auto protection_table">
    <div class="inline-block min-w-full">
      <div class="overflow-hidden">
        <table class="min-w-full text-center">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="text-sm font-medium text-gray-900 px-6 py-4 white-space"
              >
                No
              </th>
              <template v-if="assetListColumns.length > 0">
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 white-space"
                  v-for="column in assetListColumns"
                  :key="column.category_field_id"
                >
                  {{ column.field_name }}
                  <!-- <img src="@/assets/icon/DownSquare.svg" /> -->
                </th>
              </template>
            </tr>
          </thead>
          <tbody>
            <template v-if="assetListTableData.length > 0">
              <tr
                class="bg-white border-b"
                v-for="(row, i) in assetListTableData"
                :key="i"
              >
                <td class="px-6 py-4 text-sm font-medium text-gray-900">
                  {{ row.no }}
                </td>
                <!-- <template v-if="assetListTableData.row_item.length > 0"> -->
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4"
                  v-for="(item, index) in row.row_item"
                  :key="index"
                  :class="
                    !item.field_value && item.is_required == 'y'
                      ? 'empty-cell'
                      : ''
                  "
                >
                  <template v-if="tabType == 'default'">
                    <select
                      :disabled="
                        item.field_value != '' &&
                        item.field_id &&
                        row.already_diagnosed == 'y'
                      "
                      :value="item.field_value"
                      v-if="item.field_name == '진단여부'"
                      @change="
                        getUpdatedStatus(
                          $event,
                          row.asset_id,
                          item.field_id,
                          false
                        )
                      "
                    >
                      <option value="Y">Y</option>
                      <option value="N">N</option>
                    </select>
                    <select
                      :disabled="
                        item.field_value != '' &&
                        item.field_id &&
                        row.already_diagnosed == 'y'
                      "
                      :value="item.field_value"
                      v-if="
                        item.field_name == '가용성' ||
                        item.field_name == '무결성' ||
                        item.field_name == '기밀성'
                      "
                      @change="
                        getUpdatedStatus(
                          $event,
                          row.asset_id,
                          item.field_id,
                          false
                        )
                      "
                    >
                      <option
                        v-for="(value, name, i) in rank_list"
                        :key="i"
                        :value="name"
                      >
                        {{ value }}
                      </option>
                    </select>
                    <select
                      :disabled="
                        item.field_value != '' &&
                        item.field_id &&
                        row.already_diagnosed == 'y'
                      "
                      :value="item.field_value"
                      v-if="index == 1 && assetDivisionList.length"
                      @change="
                        getUpdatedStatus(
                          $event,
                          row.asset_id,
                          item.field_id,
                          false
                        )
                      "
                    >
                      <option
                        v-for="(division, i) in assetDivisionList"
                        :key="i"
                      >
                        {{ division.value }}
                      </option>
                    </select>
                    <p
                      v-if="index == 1 && assetDivisionList.length == 0"
                      class="white-space"
                      contenteditable
                      @input="
                        getUpdatedStatus(
                          $event,
                          row.asset_id,
                          item.field_id,
                          true
                        )
                      "
                    >
                      {{ item.field_value }}
                    </p>

                    <p
                      v-if="
                        item.field_name !== '진단여부' &&
                        index !== 1 &&
                        item.field_name !== '가용성' &&
                        item.field_name !== '무결성' &&
                        item.field_name !== '기밀성' &&
                        item.field_name !== '등급'
                      "
                      class="white-space"
                      contenteditable
                      @input="
                        getUpdatedStatus(
                          $event,
                          row.asset_id,
                          item.field_id,
                          true
                        )
                      "
                    >
                      {{ item.field_value }}
                    </p>
                    <p
                      v-if="item.field_name == '등급'"
                      class="white-space"
                      readonly
                    >
                      {{ item.field_value }}
                    </p>
                  </template>
                  <template v-else>
                     <p
                      v-if="index == 1 && assetDivisionList.length == 0"
                      class="white-space"
                      contenteditable
                      @input="
                        getUpdatedStatus(
                          $event,
                          row.asset_id,
                          item.field_id,
                          true
                        )
                      "
                    >
                      {{ item.field_value }}
                    </p>
                    <select
                      :disabled="
                        item.field_value != '' &&
                        item.field_id &&
                        row.already_diagnosed == 'y'
                      "
                      :value="item.field_value"
                      v-if="
                        item.field_name == '가용성' ||
                        item.field_name == '무결성' ||
                        item.field_name == '기밀성'
                      "
                      @change="
                        getUpdatedStatus(
                          $event,
                          row.asset_id,
                          item.field_id,
                          false
                        )
                      "
                    >
                      <option
                        v-for="(value, name, i) in rank_list"
                        :key="i"
                        :value="name"
                      >
                        {{ value }}
                      </option>
                    </select>
                    <p
                      class="white-space"
                      contenteditable
                      v-if="
                        item.field_name !== '기밀성' &&
                        item.field_name !== '무결성' &&
                        item.field_name !== '가용성' &&
                        item.field_name !== '등급'
                      "
                      @input="
                        getUpdatedStatusCustomTab(
                          $event,
                          row.asset_id,
                          item.field_id,
                          true
                        )
                      "
                    >
                      {{ item.field_value }}
                    </p>
                    <p
                      v-if="item.field_name == '등급'"
                      class="white-space"
                      readonly
                    >
                      {{ item.field_value }}
                    </p>
                  </template>
                </td>
                <!-- </template> -->
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div
    class="modal-footer flex flex-shrink-0 items-center justify-center p-4 rounded-b-md"
  >
    <button
      type="button"
      @click="getMoreRow"
      :disabled="isAddMore"
      class="full_button bordered mx-4 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
    >
      추가하기
    </button>
    <button
      type="button"
      :disabled="isSave"
      @click="saveAsset"
      class="full_button bordered mx-4 px-10 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
    >
      저장
    </button>
  </div>
  <!-- <Pagination /> -->
  <pagination
    v-model="page"
    :records="total_records"
    :per-page="limit"
    @paginate="myCallback"
  />
</template>

<script>
import AssetManagementService from "@/services/AssetManagementService";
import Toast from "@/alert/alert.js";
export default {
  name: "AssetManagementEditTable",
  props: {
    categoryId: Number,
    activeId: Number,
    isResetAfterSave: Boolean,
    tabType: String,
    addEnable: Boolean,
    saveEnable: Boolean,
    uploadDone: Boolean,
  },
  data() {
    return {
      page: 1,
      limit: 50,
      current_page: "",
      total_records: 0,
      isAddBtn: "",
      assetListColumns: [],
      assetListTableData: [],
      certification: this.$store.state.header.certificate,
      group_id: "",
      searchCriteria: "",
      searchText: "",
      assetDivisionList: [],
      saveTableData: [],
      showInput: true,
      isAddMore: false,
      isSave: true,
      total_pages: "",
      rank_list: [],
      myObjArray: [],
      total_rating: "",
    };
  },
  created() {
    this.AssetManagementService = new AssetManagementService();
  },
  beforeMount() {
    if (this.activeId == this.categoryId) {
      this.getAssetDivisionList();
      this.getAssetTableColumns(this.categoryId);
      this.getAllTableData(
        this.categoryId,
        this.group_id,
        this.searchCriteria,
        this.searchText
      );
      this.getRankingList();
    }
  },

  watch: {
    uploadDone: function (newVal, oldVal) {
      if (newVal != oldVal && newVal) {
        this.page = 1;
        if (this.activeId == this.categoryId) {
          this.getAllTableData(
            this.categoryId,
            this.group_id,
            this.searchCriteria,
            this.searchText
          );
        }
      }
    },
    addEnable: function (newVal, oldVal) {
      if (newVal != oldVal && newVal) {
        this.isAddMore = false;
      }
    },

    isResetAfterSave: function (newVal) {
      if (newVal) {
        this.page = 1;
        if (this.activeId == this.categoryId) {
          this.getAllTableData(
            this.categoryId,
            this.group_id,
            this.searchCriteria,
            this.searchText
          );
        }
      }
    },

    // following function will reset table data after clicking a new tab
    activeId: function (newVal, oldVal) {
      if (newVal != oldVal) {
        this.page = 1;
        if (this.activeId == this.categoryId) {
          this.saveTableData = [];
          this.assetListColumns = [];
          this.assetListTableData = [];
          this.isSave = true;
          this.isAddMore = false;
          this.getAssetDivisionList();
          this.getAssetTableColumns(this.categoryId);
          this.getAllTableData(
            this.categoryId,
            this.group_id,
            this.searchCriteria,
            this.searchText
          );
          this.getRankingList();
        }
      }
    },
  },
  methods: {
    saveAsset() {
      // console.log(this.saveTableData);
      let empty;
      for (let i = 0; i < this.saveTableData.length; i++) {
        if (
          Array.from(this.saveTableData[i].row_item).some(
            (item) => item.field_value == "" && item.is_required == "y"
          )
        ) {
          empty = true;
          break;
        }
      }
      if (empty) {
        Toast.fire({ title: "필수항목란을 입력해주세요" });
        return;
      } else {
        this.$emit("save");
        this.isSave = true;
        this.saveTableData = [];
      }
    },
    getAssetTableColumns(id) {
      this.AssetManagementService.fieldList(id).then((res) => {
        // console.log("asset-columns-list", res);
        this.assetListColumns = res.data.all_assets_category_field_list;
      });
    },

    getAllTableData(id, groupId, criteria, searchText) {
      let credentials = {
        category_id: id,
        certification: this.$store.state.header.certificate,
        page: this.page,
        limit: this.limit,
        group_id: groupId, // optional,
        search_text: searchText, //optional
        search_by: criteria, // optional
      };
      this.AssetManagementService.getAllAssetList(credentials).then((res) => {
        // console.log("asset-list", res);
        this.assetListTableData = res.data.assets_list;
        this.current_page = res.data.current_page;
        this.total_pages = res.data.total_pages;

        if (this.assetListTableData.length == 0) {
          this.total_records = 0;
        } else {
          this.total_records = res.data.total_records;
        }

        for (let i = 0; i < this.assetListTableData.length; i++) {
          this.assetListTableData[i]["no"] =
            (this.page - 1) * this.limit + i + 1;
        }

        this.$emit("excelDone");
        // if(res.data.current_page > 1 ){
        //     this.isAddBtn = false;
        //   }else{
        //     this.isAddBtn = true;
        //   }
      });
    },

    getAssetDivisionList() {
      this.AssetManagementService.assetDivisionList(this.categoryId).then(
        (res) => {
          // console.log("division-list", res);
          this.assetDivisionList = res.data.divisionList;
        }
      );
    },

    getRankingList() {
      this.AssetManagementService.getRankingList().then((res) => {
        this.rank_list = res.data.list;
      });
    },

    getUpdatedStatus(e, assetId, fieldId, txtVal) {
      this.isSave = false;
      let rowData = this.assetListTableData.find(
        (item) => item.asset_id == assetId
      );
      console.log(rowData);
      let index = rowData.row_item.findIndex((i) => i.field_id == fieldId);
      rowData.row_item[index].field_value = txtVal
        ? e.target.innerText
        : e.target.value;

      function checkRankValue(rank) {
        return rank.field_id == fieldId;
      }

      let getrank = rowData.row_item.find(checkRankValue);

      if (
        getrank.field_name == "가용성" ||
        getrank.field_name == "무결성" ||
        getrank.field_name == "기밀성"
      ) {
        this.myObjArray.push({
          fieldVal: getrank.field_value,
          fieldName: getrank.field_name,
        });
        let uniqueObjArray = [
          ...new Map(
            this.myObjArray.map((item) => [item["fieldName"], item])
          ).values(),
        ];

        if (uniqueObjArray.length == 3) {
          let threatrating = {
            confidentiality: uniqueObjArray[0].fieldVal,
            integrity: uniqueObjArray[1].fieldVal,
            availability: uniqueObjArray[2].fieldVal,
          };
          this.AssetManagementService.calculateThreatRating(threatrating).then(
            (res) => {
              rowData.row_item.map((item) => {
                if (item.field_name == "등급") {
                  item.field_value = res.data.threat_ranking;
                }
              });
            }
          );
        }
      }

      if (this.saveTableData.length > 0) {
        if (!this.saveTableData.find((item) => item.asset_id == assetId)) {
          Object.assign(rowData, {
            category_id: this.categoryId,
            certification: this.$store.state.header.certificate,
          });
          this.saveTableData.push({ ...rowData });
          this.$emit("savedData", this.saveTableData);
        } else {
          let x = this.saveTableData.findIndex((i) => i.asset_id == assetId);
          let a = this.saveTableData[x].row_item.findIndex(
            (i) => i.field_id == fieldId
          );
          console.log("index", a);
          //console.log("row value", this.saveTableData[x].row_item)
          this.saveTableData[x].row_item[a].field_value = txtVal
            ? e.target.innerText
            : e.target.value;
          this.$emit("savedData", this.saveTableData);
        }
      } else {
        Object.assign(rowData, {
          category_id: this.categoryId,
          certification: this.$store.state.header.certificate,
        });
        this.saveTableData.push({ ...rowData });
        this.$emit("savedData", this.saveTableData);
      }
      console.log("save-data", this.saveTableData);
    },

    getUpdatedStatusCustomTab(e, assetId, fieldId, txtVal) {
      this.isSave = false;
      let rowData = this.assetListTableData.find(
        (item) => item.asset_id == assetId
      );
      // console.log(rowData);
      let index = rowData.row_item.findIndex((i) => i.field_id == fieldId);
      rowData.row_item[index].field_value = txtVal
        ? e.target.innerText
        : e.target.value;

      if (this.saveTableData.length > 0) {
        if (!this.saveTableData.find((item) => item.asset_id == assetId)) {
          Object.assign(rowData, {
            category_id: this.categoryId,
            certification: this.$store.state.header.certificate,
          });
          this.saveTableData.push({ ...rowData });
          this.$emit("savedData", this.saveTableData);
        } else {
          let x = this.saveTableData.findIndex((i) => i.asset_id == assetId);
          let a = this.saveTableData[x].row_item.findIndex(
            (i) => i.field_id == fieldId
          );
          // console.log("index", a);
          //console.log("row value", this.saveTableData[x].row_item)
          this.saveTableData[x].row_item[a].field_value = txtVal
            ? e.target.innerText
            : e.target.value;
          this.$emit("savedData", this.saveTableData);
        }
      } else {
        Object.assign(rowData, {
          category_id: this.categoryId,
          certification: this.$store.state.header.certificate,
        });
        this.saveTableData.push({ ...rowData });
        this.$emit("savedData", this.saveTableData);
      }
      // console.log("save-data", this.saveTableData);
    },

    doEdit(e) {
      this.showInput = false;
      // console.log("element", e.target);
      e.target.focus();
    },

    getMoreRow() {
      this.isAddMore = true;
      this.isSave = false;
      this.myCallback(this.total_pages);
      setTimeout(() => {
        // this.isAddMore = true;
        let row_item = [];

        Array.from(this.assetListColumns).forEach((item) => {
          row_item.push({
            field_id: item.category_field_id,
            field_value: "",
            field_name: item.field_name,
            is_required: item.is_required,
            is_save: "not_save",
          });
        });
        //console.log("asset-row-count",this.assetListTableData[0].row_item.length)
        this.assetListTableData.push({
          row_item: row_item,
          no: this.total_records + 1,
        });
        // console.log(this.assetListTableData)

        this.saveTableData.push({
          category_id: this.categoryId,
          certification: this.$store.state.header.certificate,
          row_item: row_item,
        });
        this.$emit("savedData", this.saveTableData);
        // console.log("asset-row-count", row_item);
        // console.log("asset-row-count", this.saveTableData);
      }, 1000);
    },

    myCallback(clickedPage) {
      this.page = clickedPage;
      this.getAllTableData(
        this.categoryId,
        this.group_id,
        this.searchCriteria,
        this.searchText
      );
      this.saveTableData = [];
      this.assetListTableData = [];
      this.isSave = true;
      // this.isAddMore = false;
    },
  },
};
</script>

<style scoped>
.empty-cell {
  background-color: #e5f2ff;
}
</style>
