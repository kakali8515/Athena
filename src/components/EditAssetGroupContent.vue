<template>
  <div class="datatable_wrap shadow-none">
    <div class="tab-content" id="tabs-tabContent">
      <div class="policy_setting_wrap_inner">
        <div class="left_wrap">
          <h4>전체 자산목록</h4>
          <div class="flex flex-col">
            <div class="overflow-x-auto protection_table border-0">
              <div class="inline-block min-w-full">
                <div class="overflow-hidden">
                  <table class="min-w-full text-center">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          class="
                            justify-center
                            text-sm
                            font-medium
                            text-gray-900
                            px-6
                            py-4
                          "
                        >
                          <div class="flex items-center">
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              value=""
                              class="
                                w-4
                                h-4
                                text-blue-600
                                bg-gray-100
                                rounded
                                border-gray-300
                                dark:ring-offset-gray-800
                                dark:bg-gray-700 dark:border-gray-600
                              "
                              @click="selectAllFullList"
                              v-model="allSelectedFullList"
                              :checked="
                                selectedFullList.length == full_list.length
                              "
                            />
                          </div>
                        </th>
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
                      <tr
                        class="bg-white"
                        v-for="(row, i) in full_list"
                        :key="i"
                      >
                        <td class="text-sm text-gray-900 font-light px-6 py-4">
                          <div class="flex justify-center items-center">
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              class="
                                w-4
                                h-4
                                text-blue-600
                                bg-gray-100
                                rounded
                                border-gray-300
                                dark:ring-offset-gray-800
                                dark:bg-gray-700 dark:border-gray-600
                              "
                              v-model="selectedFullItem"
                              @click="selectSingleFullList"
                              :value="row.asset_id"
                            />
                          </div>
                        </td>
                        <td class="px-6 py-4 text-sm font-medium text-gray-900">
                          {{ i + 1 }}
                        </td>
                        <td
                          v-for="(item, index) in row.row_item"
                          :key="index"
                          class="text-sm text-gray-900 font-light px-6 py-4"
                        >
                          {{ item.field_value }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="arrow_btn_wrap">
          <div class="up_button">
            <!-- <button type="button">
              <img src="@/assets/icon/right_double.svg" />
            </button> -->
            <button
              :disabled="assetGroupId == '' || selectedFullList.length == 0"
              :class="{
                no_cursor: assetGroupId == '' || selectedFullList.length == 0,
              }"
              @click="allLeftToRight"
              type="button"
            >
              <img src="@/assets/icon/right_single.svg" />
            </button>
          </div>
          <div class="down_button">
            <button
              :disabled="assetGroupId == '' || selectedGroupList.length == 0"
              :class="{
                no_cursor: assetGroupId == '' || selectedGroupList.length == 0,
              }"
              @click="allRightToLeft"
              type="button"
            >
              <img src="@/assets/icon/left_single.svg" />
            </button>
            <!-- <button type="button">
              <img src="@/assets/icon/left_double.svg" />
            </button> -->
          </div>
        </div>
        <div class="left_wrap">
          <!-- <h4>Group's {{ categoryName }} 자산 목록</h4> -->
          <h4>{{ categoryName }} 자산 목록</h4>
          <div class="flex flex-col">
            <div class="overflow-x-auto protection_table border-0">
              <div class="inline-block min-w-full">
                <div class="overflow-hidden">
                  <table class="min-w-full text-center">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          class="
                            justify-center
                            text-sm
                            font-medium
                            text-gray-900
                            px-6
                            py-4
                          "
                        >
                          <div class="flex items-center">
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              value=""
                              class="
                                w-4
                                h-4
                                text-blue-600
                                bg-gray-100
                                rounded
                                border-gray-300
                                dark:ring-offset-gray-800
                                dark:bg-gray-700 dark:border-gray-600
                              "
                              @click="selectAllGroup"
                              v-model="allSelectedGroup"
                              :checked="
                                selectedGroupList.length == groupList.length &&  selectedGroupList.length !=0
                              "
                            />
                          </div>
                        </th>
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
                      <tr
                        class="bg-white border-b"
                        v-for="(row, i) in groupList"
                        :key="i"
                      >
                        <td class="text-sm text-gray-900 font-light px-6 py-4">
                          <div class="flex justify-center items-center">
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              class="
                                w-4
                                h-4
                                text-blue-600
                                bg-gray-100
                                rounded
                                border-gray-300
                                dark:ring-offset-gray-800
                                dark:bg-gray-700 dark:border-gray-600
                              "
                              v-model="selectedGroupItem"
                              @click="selectSingleGroup"
                              :value="row.asset_id"
                            />
                          </div>
                        </td>
                        <td class="px-6 py-4 text-sm font-medium text-gray-900">
                          {{ i + 1 }}
                        </td>
                        <td
                          v-for="(item, index) in row.row_item"
                          :key="index"
                          class="text-sm text-gray-900 font-light px-6 py-4"
                        >
                          {{ item.field_value }}
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
      <!-- <div class="btn_wrap">
        <button
          :disabled="asset_id.length == 0"
          :class="{ no_cursor: asset_id.length == 0 }"
          @click="saveAssetGroup"
          type="button"
        >
          Save
        </button>
      </div> -->
    </div>
  </div>
</template>
<script>
import AssetManagementService from "@/services/AssetManagementService";
export default {
  name: "EditAssetGroupContent",
  props: {
    categoryId: Number,
    categoryName: String,
    saveAssetId: Array,
    activeId: Number,
  },
  data() {
    return {
      certification: localStorage.getItem("certificationName"),
      full_list: [],
      assetListColumns: [],
      assetGroupId: this.$route.params.id ? this.$route.params.id : "",
      groupList: [],
      asset_id: [],
      allSelectedFullList: false,
      selectedFullItem: [],
      selectedFullList: [],
      allSelectedGroup: false,
      selectedGroupItem: [],
      selectedGroupList: [],
    };
  },
  created() {
    this.AssetManagementService = new AssetManagementService();
  },
  watch: {
    "$store.state.header.certificate": function (newVal, oldVal) {
      if (newVal != oldVal && newVal) {
        if (this.activeId == this.categoryId) {
          this.fullList();
          this.getAssetTableColumns();
          this.getListByGroup();
        }
      }
    },
    // following function will reset table data after clicking a new tab
    activeId: function (newVal, oldVal) {
      if (newVal != oldVal) {
        if (this.activeId == this.categoryId) {
          this.fullList();
          this.getAssetTableColumns();
          this.getListByGroup();
          console.log(this.selectedGroupList);
          this.allSelectedGroup = false;
        }
        this.selectedGroupList = [];
      }
    },
  },
  mounted() {
    if (this.activeId == this.categoryId) {
      this.fullList();
      this.getAssetTableColumns();
      this.getListByGroup();
    }
  },
  methods: {
    fullList() {
      if (this.assetGroupId) {
        this.AssetManagementService.editAssetFullList(
          this.categoryId,
          this.certification,
          'n'
        )
          .then((res) => {
            if (res.status == 200) {
              this.full_list = res.data.assets_list;
            }
          })
          .catch((err) => {
            return;
          });
      }
    },
    getAssetTableColumns() {
      this.AssetManagementService.allFieldList(this.categoryId).then((res) => {
        this.assetListColumns = res.data.all_assets_category_field_list;
      });
    },
    getListByGroup() {
      if (this.assetGroupId) {
        this.AssetManagementService.editListByGroup(
          this.categoryId,
          this.certification,
          this.assetGroupId
        ).then((res) => {
          this.groupList = res.data.assets_list;
          for (let i = 0; i < this.groupList.length; i++) {
            this.asset_id.push(this.groupList[i].asset_id);
            this.$emit("assetId", this.asset_id);
          }
        });
      }
    },
    // all threat select check box
    selectAllFullList() {
      this.selectedGroupList = [];
      this.selectedGroupItem = [];
      this.allSelectedGroup = false;
      if (!this.allSelectedFullList) {
        const selected = this.full_list.map((u) => u.asset_id);
        this.selectedFullItem = selected;
        this.selectedFullList = this.full_list.map((u) => {
          return u;
        });
      } else {
        this.selectedFullItem = [];
        this.selectedFullList = [];
      }
    },
    allLeftToRight() {
      for (let i = 0; i < this.selectedFullList.length; i++) {
        let obj = this.groupList.find(
          (x) => x.asset_id == this.selectedFullList[i].asset_id
        );
        if (!obj) {
          this.groupList.push(this.selectedFullList[i]);
          this.asset_id.push(this.selectedFullList[i].asset_id);
        }
        this.full_list = this.full_list.filter((item) => {
          return item.asset_id != this.selectedFullList[i].asset_id;
        });
      }
      this.selectedFullItem = [];
      this.selectedFullList = [];
      this.allSelectedFullList = false;
      this.$emit("assetId", this.asset_id);
    },

    // checkbox select event
    selectSingleFullList(event) {
      this.selectedGroupList = [];
      this.selectedGroupItem = [];
      this.allSelectedFullList = false;
      const id = event.target.value;
      const click = event.target.checked;
      const obj = this.full_list.find((x) => x.asset_id == id);
      if (click) {
        this.selectedFullList.push(obj);
        this.selectedFullItem.push(Number(id));
      } else {
        this.selectedFullList.splice(this.selectedFullList.indexOf(obj), 1);
        this.selectedFullItem.splice(
          this.selectedFullItem.indexOf(Number(id)),
          1
        );
      }
      if (this.selectedFullList.length == this.full_list.length) {
        this.allSelectedFullList = true;
      }
    },

    selectAllGroup() {
      this.selectedFullItem = [];
      this.selectedFullList = [];
      this.allSelectedFullList = false;
      if (!this.allSelectedGroup) {
        const selected = this.groupList.map((u) => u.asset_id);
        this.selectedGroupItem = selected;
        this.selectedGroupList = this.groupList.map((u) => {
          return u;
        });
      } else {
        this.selectedGroupItem = [];
        this.selectedGroupList = [];
      }
    },

    allRightToLeft() {
      console.log(this.saveAssetId);
      for (let i = 0; i < this.selectedGroupList.length; i++) {
        let obj = this.full_list.find(
          (x) => x.asset_id == this.selectedGroupList[i].asset_id
        );
        if (!obj) {
          this.full_list.push(this.selectedGroupList[i]);
        }
        this.asset_id = this.asset_id.filter((item) => {
          return item != this.selectedGroupList[i].asset_id;
        });
        this.groupList = this.groupList.filter((item) => {
          return item.asset_id != this.selectedGroupList[i].asset_id;
        });

        this.saveAssetId.splice(
          this.saveAssetId.indexOf(this.selectedGroupList[i].asset_id),
          1
        );
      }
      this.selectedGroupList = [];
      this.selectedGroupItem = [];
      this.allSelectedGroup = false;
      // this.$emit("assetId", this.asset_id);
      this.$emit("modifiedAssetId", this.saveAssetId);
    },

    selectSingleGroup(event) {
      this.selectedFullItem = [];
      this.selectedFullList = [];
      this.allSelectedGroup = false;
      const id = event.target.value;
      const click = event.target.checked;
      const obj = this.groupList.find((x) => x.asset_id == id);
      if (click) {
        this.selectedGroupList.push(obj);
        this.selectedGroupItem.push(Number(id));
      } else {
        this.selectedGroupList.splice(this.selectedGroupList.indexOf(obj), 1);
        this.selectedGroupItem.splice(
          this.selectedGroupItem.indexOf(Number(id)),
          1
        );
      }
      if (this.selectedGroupList.length == this.groupList.length) {
        this.allSelectedGroup = true;
      }
    },
  },
};
</script>

<style lang="scss">
.protection_table table tbody tr td{
      word-wrap: break-word;
}
</style>