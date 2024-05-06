<template>
  <div class="overflow-x-auto protection_table">
    <div class="inline-block min-w-full">
      <div class="overflow-hidden">
        <table class="min-w-full text-center">
          <thead class=" bg-gray-50">
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
            <tr class="bg-white border-b" v-for="(row, i) in assetListTableData" :key="i">
              <td class="px-6 py-4 text-sm font-medium text-gray-900">{{((current_page-1) * limit) + i+1}}</td>
              <!-- <template v-if="assetListTableData.row_item.length > 0"> -->
              <td class="text-sm text-gray-900 font-light px-6 py-4" v-for="(item, index) in row.row_item" :key="index">
                <!-- <select disabled :value="item.field_value" v-if="(row.row_item.length -1) == index && tabType == 'default'">
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                </select> -->
                <!-- <select :value="item.field_value" v-if="index == 1">
                    <option v-for="(division, i) in assetDivisionList" :key="i">{{division}}</option>
                </select> -->
                <!-- <span v-if="(row.row_item.length -1) !== index">{{item.field_value}}</span> -->
                <span>{{item.field_value}}</span>
              </td>
              <!-- </template> -->
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
  name: "AssetManagementDataTable",
  props: {
    categoryId: Number,
    assetGroupId : Number,
    tabName : String,
    tabType : String,
    searchByCriteria : String,
    searchByText : String,
    activeId: Number,
  },
  data() {
    return {
      page: 1,
      limit: 50,
      assetListColumns: [],
      assetListTableData: [],
      assetDivisionList : [],
      certification: this.$store.state.header.certificate,
      current_page :"",
      total_records : "",
      group_id : "",
      searchCriteria : "",
      searchText : "",
    };
  },
  created() {
    this.AssetManagementService = new AssetManagementService();
  },
  beforeMount() {
    if(this.activeId==this.categoryId) {
    this.getAssetTableColumns(this.categoryId);
    this.getAllTableData(this.categoryId, this.group_id, this.searchByCriteria, this.searchText);
    this.getAssetDivisionList();
    }
  },

  watch : {
   assetGroupId : function(newVal, oldVal){
     if(newVal && newVal != oldVal){
      this.group_id = newVal.toString();
      if(this.activeId==this.categoryId) {
      this.getAllTableData(this.categoryId, this.group_id, this.searchByCriteria, this.searchText);
      }
     }
   },

   tabName : function(newVal, oldVal){
      if(newVal && newVal != oldVal){
        if(this.activeId==this.categoryId) {
        this.getAssetTableColumns(this.categoryId);
        this.getAllTableData(this.categoryId, this.group_id, this.searchByCriteria, this.searchText);
        }
      }
   },

   searchByCriteria : function(newVal, oldVal){
      if(newVal && newVal != oldVal){
        // this.searchCriteria = newVal;
        if(this.activeId==this.categoryId) {
        this.getAllTableData(this.categoryId, this.group_id, this.searchByCriteria, this.searchText);
        }
        //this.searchCriteria = "";
      }
   },
   searchByText : function(newVal, oldVal){
      if(newVal && newVal != oldVal){
        this.searchText = newVal;
        if(this.activeId==this.categoryId) {
        this.getAllTableData(this.categoryId, this.group_id, this.searchByCriteria, this.searchText);
        }
        // this.searchText = "";
      }
   }
  },
  methods: {
    
     getAssetTableColumns(id) {
      this.AssetManagementService.fieldList(id).then((res) => {
        console.log("asset-columns-list", res);
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
        search_text : searchText, //optional
        search_by : criteria, // optional
      };
      this.AssetManagementService.getAllAssetList(credentials).then((res) => {
        console.log("asset-list", res);
        this.assetListTableData = res.data.assets_list;
        this.current_page = res.data.current_page;
        this.total_records = res.data.total_records;
      });
    },

    getAssetDivisionList(){
      this.AssetManagementService.assetDivisionList(this.categoryId).then(res => {
              console.log("division-list", res)
            this.assetDivisionList = res.data.divisionList;
      })
    },


    myCallback(clickedPage){
        this.page = clickedPage;
       this.getAllTableData(this.categoryId, this.group_id, this.searchByCriteria, this.searchText);
    }
  },
};
</script>

<style>
</style>