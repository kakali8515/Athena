<template>
  <div class="datatable_wrap_new protection_table">
    <div class="tab-content" id="tabs-tabContent">
      <div class="tab-pane fade show active" id="tabs-one" role="tabpanel" aria-labelledby="tabs-one-tab">
        <div class="flex flex-col">
          <div class="overflow-x-auto protection_table">
            <div class="inline-block min-w-full">
              <div class="overflow-hidden">
                <table class="min-w-full text-center">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4"
                        v-for="(item, index) in HeadersColumn" :key="index">
                        <div :class="`${item.isSortable ? 'sortable-cell' : ''}`">
                          {{ item.name }}
                          <!-- <img src="@/assets/icon/DownSquare.svg" v-if="item.isSortable" /> -->
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <p class="empty-msg" v-if="tableMsg">{{ tableMsg }}</p>
                    <template v-for="(i, e) in BodyData">
                      <tr :key="e" v-if="BodyData">
                        <td :class="`${
                          rowClickable ? 'click-pointer' : ''
                        } bg-white border-b`" class="text-sm text-gray-900 font-light px-6 py-4"
                          v-for="(item, index) in HeadersColumn" :key="index" @click="Clickable(i, index)">
                          <textarea type="text" rows="5" :value="findData(item, e)" v-if="item.editable" @change="
                            (event) =>
                              changedData(event.target.value, e, index)
                          " />
                          <span v-else :class="findData(item, e) == '-' ? 'dash' : ''">{{ findData(item, e) }}</span>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <!-- <Pagination /> -->
        <template v-if="BodyData != ''">
          <pagination v-model="Page" :records="records" :per-page="perPage" @paginate="myCallback" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// import Pagination from "@/components/Pagination.vue";
import moment from "moment";
export default {
  name: "DataTable",
  components: {},
  props: {
    HeadersColumn: Array,
    BodyData: Array,
    rowClickable: {
      type: Boolean,
      default: false,
    },
    Page: Number,
    records: Number,
    perPage: Number,
    clickCellIndex: String,
    tableMsg: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.dateformat();
  },
  methods: {
    findData(data, id) {
      if (data.id == "created_date" || data.id == "reply_date") {
        return this.dateformat(this.BodyData[id][data.id]);
      } else {
        return this.BodyData[id][data.id];
      }
    },
    Clickable(item, cellIndex) {
      if (this.rowClickable || cellIndex == this.clickCellIndex) {
        this.$emit("clickEvent", item);
      }
    },

    myCallback(Page) {
      this.$emit("clickPaginate", Page);
    },
    dateformat(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
    },
  },
};
</script>