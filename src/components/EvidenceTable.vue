<template>
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
                        <div>증적코드</div>
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4"
                      >
                        <div>영역구분</div>
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4"
                      >
                        <div>증적명</div>
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4"
                      >
                        <div>이행주기</div>
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4"
                      >
                        <div>담당자</div>
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4"
                        v-for="(item, index) in evidencePaymentHeader"
                        :key="index"
                      >
                        <div>
                          {{ item }}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in evidenceListItems"
                      :key="index"
                      class="bg-white border-b click-pointer"
                      @click="$emit('showEvidenceDetails', item.id)"
                    >
                      <td class="text-sm text-gray-900 font-light px-6 py-4">
                        {{ item.evidence_code }}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4">
                        {{ item.control_area }}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4">
                        {{ item.evidence }}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4">
                        {{ item.cycle }}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4">
                        {{ item.managers }}
                      </td>
                      <td
                        class="text-sm text-gray-900 font-light px-6 py-4"
                        v-for="(i, e) in evidencePaymentHeader"
                        :key="e"
                        :style="{
                          background:
                            item.payment_lines[i].color === 'blue'
                              ? '#0000ff5c'
                              : item.payment_lines[i].color === 'red'
                              ? '#ff000054'
                              : '#ffffff',
                              color:
                            item.payment_lines[i].color === 'blue'
                              ? '#181818' : '#a4a4a4'
                        }"
                      >
                        {{
                          item.payment_lines[i].no_of_payment > 0
                            ? item.payment_lines[i].no_of_payment
                            : ""
                        }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <!-- pagination -->
        <template v-if="evidenceListItems != ''">
          <pagination
            v-model="Page"
            :records="records"
            :per-page="perPage"
            @paginate="myCallback"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EvidenceTable",
  props: {
    Page: Number,
    records: Number,
    perPage: Number,
    evidenceListItems: {
      type: Array,
      required: true,
      default: () => [],
    },
    evidencePaymentHeader: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    myCallback(Page) {
      this.$emit("clickPaginate", Page);
    },
  }
};
</script>

<style scoped>
.click-pointer{
  cursor: pointer;
}
</style>
