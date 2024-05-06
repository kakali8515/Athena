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
                <td class="px-6 py-4 text-sm font-medium text-gray-900">
                  {{ (current_page - 1) * limit + i + 1 }}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4"
                  v-for="(item, index) in row.row_item"
                  :key="index"
                >
                  {{ item.field_value }}
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
    categoryName: String,
    activeId: Number,
  },
  data() {
    return {
      page: 1,
      limit: 50,
      certification: localStorage.getItem("certificationName"),
      assets_data_list: [],
      assetListColumns: [],
      shared_request_id: this.$route.params.id ? this.$route.params.id : "",
      current_page: "",
      total_records: "",
    };
  },
  created() {
    this.AssetManagementService = new AssetManagementService();
  },
  watch: {
    "$store.state.header.certificate": function (newVal, oldVal) {
      if (newVal != oldVal && newVal) {
        if (this.activeId == this.categoryId) {
          this.assets_list();
        }
      }
    },
    // following function will reset table data after clicking a new tab
    activeId: function (newVal, oldVal) {
      if (newVal != oldVal) {
        if (this.activeId == this.categoryId) {
          this.getAssetTableColumns();
          this.assets_list();
        }
      }
    },
  },
  mounted() {
    if (this.activeId == this.categoryId) {
      this.getAssetTableColumns();
      this.assets_list();
    }
  },
  methods: {
    getAssetTableColumns() {
      this.AssetManagementService.allFieldList(this.categoryId).then((res) => {
        this.assetListColumns = res.data.all_assets_category_field_list;
      });
    },
    assets_list() {
      this.AssetManagementService.viewShareRequestDetails(
        this.shared_request_id,
        this.categoryId,
        this.certification,
        this.page,
        this.limit
      )
        .then((res) => {
          if (res.status == 200) {
            this.assets_data_list = res.data.assets_list;
            this.current_page = res.data.current_page;
            this.total_records = res.data.total_records;
          }
        })
        .catch((err) => {
          return;
        });
    },
    myCallback(clickedPage) {
      this.page = clickedPage;
      this.assets_list();
    },
  },
};
</script>