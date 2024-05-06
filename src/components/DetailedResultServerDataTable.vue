<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto protection_table border-0">
      <div class="inline-block min-w-full">
        <div class="overflow-hidden">
          <table class="min-w-full text-center">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4"
                >
                  구분
                  <!-- <img src="@/assets/icon/DownSquare.svg" /> -->
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4"
                >
                  호스트명
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4"
                >
                  항목코드
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4"
                >
                  항목명
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4"
                >
                  중요도
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4"
                >
                  중요도
                </th>
                <th
                  v-show="importPrev"
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4"
                >
                  결과
                </th>
                <th
                  v-show="importPrev"
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4"
                >
                  이전 현황
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4"
                >
                  현황
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4"
                >
                  진행결과
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4"
                >
                  비고
                </th>
              </tr>
            </thead>
            <tbody v-for="(item, index) in diagnosisResultList" :key="index">
              <tr class="bg-white border-b">
                <td class="text-sm text-gray-900 font-light px-6 py-4">
                  {{ item.asset_classification }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4">
                  {{ item.asset_code }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4">
                  {{ item.hostname }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4">
                  {{ item.item_code }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4">
                  {{ item.item_name }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4">
                  {{ item.importance }}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4"
                  v-show="importPrev"
                >
                  {{ item.previous_result }}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4"
                  v-show="importPrev"
                >
                  {{ item.previous_situation }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4">
                  {{ item.current_situation }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4">
                  <Select
                    disabled
                    v-if="item.progress_result"
                    :class="{
                      'bg-orange': item.progress_result === 'manual',
                      'bg-red': item.progress_result === 'weak',
                    }"
                  >
                    <!-- <option value="">All</option> -->
                    <!-- <option>Manual</option>
                    <option>weak</option>
                    <option>Good</option> -->
                    <option
                      v-for="(result, index) in Object.entries(
                        $store.state.diagnosisManagement.testResultList
                      )"
                      :value="result[0]"
                      :key="index"
                      :selected="item.progress_result === result[0]"
                    >
                      {{ result[1] }}
                    </option>
                  </Select>
                  <Select disabled v-else>
                    <option value=""></option>
                  </Select>
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4">
                  {{ item.remark }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!-- data table-->
  <!-- <Pagination /> -->

  <pagination
    v-model="page"
    :records="totalRecords"
    :per-page="limit"
    @paginate="myCallback"
  />

  <!-- <div class="flex justify-center">
                            <nav aria-label="Page navigation example">
                                <ul class="flex list-style-none">
                                <li class="page-item"><a
                                    class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 focus:shadow-none"
                                    href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    </a></li>
                                <li class="page-item"><a
                                    class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                                    href="#">1</a></li>
                                <li class="page-item"><a
                                    class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                                    href="#">2</a></li>
                                <li class="page-item"><a
                                    class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                                    href="#">3</a></li>
                                <li class="page-item"><a
                                    class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                                    href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                    </a></li>
                                </ul>
                            </nav>
                        </div> -->
</template>

<script>
export default {
  name: "DetailedResultServerDataTable",
  components: {},
  props: {
    importPrev: Boolean,
  },
  data() {
    return {
      diagnosisResultList: [],
      currentPage: "",
      totalPages: "",
      totalRecords: "",
      page: 1,
      limit: 50,
    };
  },

  watch: {
    "$store.state.diagnosisManagement.diagnosisResult": {
      handler(newVal, oldVal) {
        if (newVal) {
          this.diagnosisResultList =
            this.$store.state.diagnosisManagement.diagnosisResult.technical_diagnosis_settings;
          this.currentPage =
            this.$store.state.diagnosisManagement.diagnosisResult.current_page;
          this.totalPages =
            this.$store.state.diagnosisManagement.diagnosisResult.total_pages;
          this.totalRecords =
            this.$store.state.diagnosisManagement.diagnosisResult.total_records;

          this.$emit("assetValue", {
            classification:
              this.$store.state.diagnosisManagement.assetClassificationValue,
            code: this.$store.state.diagnosisManagement.assetCodeValue,
          });
        }
      },
    },
  },

  methods: {
    myCallback(clickedPage) {
      this.page = clickedPage;
      this.$emit("pagination", this.page);
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-orange {
  background-color: #fb8832 !important;
}
.bg-red {
  background-color: #ec3007 !important;
}
</style>
