<template>
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
                No
              </th>
              <template v-if="assetListColumns.length > 0">
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4"
                  v-for="column in assetListColumns"
                  :key="column.category_field_id"
                >
                  {{ column.field_name }}
                </th>
              </template>
            </tr>
          </thead>
          <tbody>
            <template v-if="assets_data_list.length > 0">
              <tr
                class="bg-white border-b"
                v-for="(row, i) in assets_data_list"
                :key="i"
              >
                <!-- <td>{{row.access_type}}-{{row.asset_id}}</td> -->
                <td class="px-6 py-4 text-sm font-medium text-gray-900">
                  {{ i + 1 }}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4"
                  v-for="(item, index) in row.row_item"
                  :key="index"
                >
                  <template
                    v-if="
                      isBackBtn === false &&
                      row.access_type == 'edit' &&
                      tabType == 'default'
                    "
                  >
                    <select
                      :disabled="row.already_diagnosed == 'y'"
                      :value="item.field_value"
                      v-if="row.row_item.length - 1 == index"
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
                      :disabled="row.already_diagnosed == 'y'"
                      v-if="index == 1"
                      :value="item.field_value"
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
                     <select
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
                    <textarea
                      :class="
                        !item.field_value && item.is_required == 'y'
                          ? 'empty-cell'
                          : ''
                      "
                       v-if="
                        item.field_name !== '진단여부' &&
                        index !== 1 &&
                        item.field_name !== '가용성' &&
                        item.field_name !== '무결성' &&
                        item.field_name !== '기밀성' &&
                        item.field_name !== '등급'
                      "
                      class="p-2"
                      :disabled="contentEdit"
                      :data-type="row.asset_id"
                      rows="4"
                      cols="30"
                      @input="getUpdatedStatus($event, row.asset_id, item.field_id, true)">{{ item.field_value }}</textarea>  
                      <p
                      v-if="item.field_name == '등급'"
                      class="white-space"
                      readonly
                    >
                      {{ item.field_value }}
                    </p>
                  </template>
                  <template v-else>
                    <textarea
                    :class="
                        !item.field_value && item.is_required == 'y'
                          ? 'empty-cell'
                          : ''
                      "
                      v-if="row.access_type == 'edit'"
                      class="p-2"
                      :data-type="row.asset_id"
                      :contenteditable="contentEdit"
                      rows="4"
                      cols="30"
                      @input="getUpdatedStatusCustomTab($event, row.asset_id, item.field_id, true)">{{ item.field_value }}</textarea>
                    <p v-else :data-type="row.asset_id">
                      {{ item.field_value }}
                    </p>
                  </template>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
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
export default {
  name: "AssetSharingHistoryContent",
  props: {
    categoryId: Number,
    activeCatId: Number,
    categoryName: String,
    contentEdit: Boolean,
    isBackBtn: Boolean,
    tabType: String,
  },
  data() {
    return {
      page: 1,
      limit: 50,
      certification: this.$store.state.header.certificate,
      assets_data_list: [],
      assetListColumns: [],
      assetDivisionList: [],
      saveTableData: [],
      shared_request_id: this.$route.params.id ? this.$route.params.id : "",
      current_page: "",
      total_records: "",
       rank_list: [],
       myObjArray: [],
      total_rating: "",
    };
  },
  created() {
    this.AssetManagementService = new AssetManagementService();
  },
  beforeMount() {
    if (this.activeCatId == this.categoryId) {
      this.getAssetDivisionList();
      this.getAssetTableColumns();
      this.assets_list();
      this.getRankingList();
    }
  },

  watch: {
    activeCatId: function (newVal, oldVal) {
      if (newVal != oldVal) {
        if (this.categoryId == newVal) {
          console.log("new active id ", newVal);
          this.checkIsEditableContent();
          this.getAssetTableColumns();
          this.assets_list();
          this.getAssetDivisionList();
          this.getRankingList();
        }
      }
    },
  },
  methods: {
    getRankingList() {
      this.AssetManagementService.getRankingList().then((res) => {
        this.rank_list = res.data.list;
      });
    },

    getAssetDivisionList() {
      this.AssetManagementService.assetDivisionList(this.categoryId).then(
        (res) => {
          console.log("division-list", res);
          this.assetDivisionList = res.data.divisionList;
        }
      );
    },
    getAssetTableColumns() {
      this.AssetManagementService.fieldList(this.categoryId).then((res) => {
        this.assetListColumns = res.data.all_assets_category_field_list;
      });
    },
    assets_list() {
      this.AssetManagementService.viewShareRequestDetails(
        this.shared_request_id,
        this.categoryId,
        this.$store.state.header.certificate,
        this.page,
        this.limit
      )
        .then((res) => {
          if (res.status == 200) {
            this.assets_data_list = res.data.assets_list;
            this.current_page = res.data.current_page;
            this.total_records = res.data.total_records;
            if (this.activeCatId == this.categoryId) {
              this.checkIsEditableContent();
            }
          }

          // if(res.response.status == 400){
          //   if(res.resonse.hasOwnProperty("key"))
          // }
        })
        .catch((err) => {
          return;
        });
    },

    getUpdatedStatus(e, assetId, fieldId, txtVal) {
      let rowData = this.assets_data_list.find(
        (item) => item.asset_id == assetId
      );
      let index = rowData.row_item.findIndex((i) => i.field_id == fieldId);
      // rowData.row_item[index].field_value = txtVal ? e.target.innerText : e.target.value;
      // above code is commented and below line is added due to replacement of p tag with textarea
      rowData.row_item[index].field_value = e.target.value;

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
        let uniqueObjArray = [...new Map(this.myObjArray.map((item) => [item["fieldName"], item])).values()];

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
          // this.saveTableData[x].row_item[a].field_value = txtVal ? e.target.innerText : e.target.value;
          // above code is commented and below line is added due to replacement of p tag with textarea
          this.saveTableData[x].row_item[a].field_value = e.target.value;
          this.$emit("savedData", this.saveTableData);
        }
      } else {
        Object.assign(rowData, {
          category_id: this.categoryId,
        });
        this.saveTableData.push({ ...rowData });
        this.$emit("savedData", this.saveTableData);
      }

      console.log("save-data", this.saveTableData);
    },

    getUpdatedStatusCustomTab(e, assetId, fieldId, txtVal) {
      let rowData = this.assets_data_list.find(
        (item) => item.asset_id == assetId
      );
      let index = rowData.row_item.findIndex((i) => i.field_id == fieldId);
      // rowData.row_item[index].field_value = txtVal ? e.target.innerText : e.target.value;
      // above code is commented and below line is added due to replacement of p tag with textarea
      rowData.row_item[index].field_value = e.target.value;
     

      if (this.saveTableData.length > 0) {
        if (!this.saveTableData.find((item) => item.asset_id == assetId)) {
          Object.assign(rowData, {
            category_id: this.categoryId,
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
          // this.saveTableData[x].row_item[a].field_value = txtVal ? e.target.innerText : e.target.value;
          // above code is commented and below line is added due to replacement of p tag with textarea
          this.saveTableData[x].row_item[a].field_value = e.target.value;
          this.$emit("savedData", this.saveTableData);
        }
      } else {
        Object.assign(rowData, {
          category_id: this.categoryId,
        });
        this.saveTableData.push({ ...rowData });
        this.$emit("savedData", this.saveTableData);
      }

      console.log("save-data", this.saveTableData);
    },

    // To check if any cell has edit access
    checkIsEditableContent() {
      if (this.assets_data_list.length > 0) {
        let isEditable = Array.from(this.assets_data_list).some(
          (item) => item.access_type == "edit"
        );
        if (!isEditable) {
          console.log("asset-no-editable");
          this.$emit("noEdit", true);
        } else {
          console.log("asset-editable");
          this.$emit("noEdit", false);
        }
      } else {
        this.$emit("noEdit", true);
      }
    },

    myCallback(clickedPage) {
      this.page = clickedPage;
      this.assets_list();
    },
  },
};
</script>
<style lang="scss" scoped>
textarea {
  height: 100px;
  min-height: 100px;
  padding: 0;
  white-space: pre-wrap;
}
.empty-cell {
  background-color: #e5f2ff;
}
</style>

