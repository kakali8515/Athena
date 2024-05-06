<template>
  <div class="modal-overlap waitingcompanyapproval">
    <div
      class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none"
    >
      <div
        class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
      >
        <div
          class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md"
        >
          <h5 class="text-xl font-medium leading-normal text-gray-800">
            통제항목 목록
          </h5>
          <button
            type="button"
            class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            aria-label="Close"
            @click="
              () => {
                $emit('closeModal', false);
              }
            "
          ></button>
        </div>
        <div class="modal-body relative">
          <div class="bulletin_modal">
            <div class="search_wrap m-t-0">
              <div class="input_wrap">
                <img src="@/assets/icon/Search.svg" />
                <input
                  type="text"
                  placeholder="검색..."
                  v-model="searchItem"
                />
              </div>
              <button
                type="button"
                class="bordered grey"
                @click="searchItemsOfControl"
              >
                검색
              </button>
            </div>
            <div class="user_list">
              <div class="tab-style-two">
                <div class="flex flex-col">
                  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full sm:px-6 lg:px-8">
                      <div class="overflow-hidden border-table fixed-height">
                        <table class="min-w-full text-center">
                          <thead class="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                class="justify-center text-sm font-medium text-gray-900 px-6 py-4"
                              >
                                <div class="flex items-center ">
                                  <input
                                    id="default-checkbox"
                                    type="checkbox"
                                    value=""
                                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                  />
                                </div>
                              </th>
                              <th
                                scope="col"
                                class="justify-center text-sm font-medium text-gray-900 px-6 py-4"
                              >
                                No
                              </th>
                              <th
                                scope="col"
                                class="justify-center text-sm font-medium text-gray-900 px-6 py-4"
                              >
                                통제항목
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              class="bg-white border-b"
                              v-for="(i, e) in itemsList"
                              :key="e"
                            >
                              <td
                                class="text-sm text-gray-900 font-light px-6 py-4"
                              >
                                <div class="flex items-center">
                                  <input
                                    id="default-checkbox"
                                    type="checkbox"
                                    :value="i"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                    v-model="selectedItems"
                                  />
                                </div>
                              </td>
                              <td
                                class="text-sm text-gray-900 font-light px-6 py-4"
                              >
                                {{ i.item_number }}
                              </td>
                              <td
                                class="text-sm text-gray-900 font-light px-6 py-4"
                              >
                                {{ i.item_title }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <TabWrapper>
                  <Tabs title="Tab 1">
                    </Tabs
                  >
                  <Tabs title="Tab 2"> Tab 2 Cont</Tabs>
                </TabWrapper> -->
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal-footer flex flex-shrink-0 items-center justify-center p-4 rounded-b-md"
        >
          <button
            type="button"
            class="solid blue_bordered px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
            style="font-size: 18px"
            @click="AddControlItems"
          >
            추가
          </button>
          <button
            type="button"
            class="bordered px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
            @click="
              () => {
                $emit('closeModal', false);
              }
            "
          >
            취소
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EvidenceManagement from "@/services/EvidenceManagement";
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
export default {
  name: "ListOfControlsModal",
  components: {
    Tabs,
    TabWrapper,
  },
  data() {
    return {
      itemsList: [],
      searchItem: "",
      selectedItems: [],
    };
  },
  props: {
    storedControlItems: {
      type: Array,
      default: [],
    },
    controlValues: {
      type: Array,
      default: [],
    },
  },
  created() {
    this.evidenceManagement = new EvidenceManagement();
  },
  mounted() {
    // this.getItemsOfControl();
    // this.itemsList = this.controlValues;
    if (this.controlValues.length > 0) {
      this.itemsList = this.controlValues;
    } else{
      this.getItemsOfControl();
    }
  },
  watch:{
    controlValues: function (newValue, oldValue){
      if (newValue != oldValue && newValue) {
        this.itemsList = newValue;
      }
    }
  },
  methods: {
    getItemsOfControl() {
      this.evidenceManagement.ListOfItems().then((res) => {
        console.log(res);
        this.itemsList = [...res.data.data];
        this.selectedItems = this.itemsList.filter(
          (e) =>
            this.storedControlItems.findIndex(
              (i) => i.item_number == e.item_number
            ) !== -1
        );
      });

      console.log("controlValuess",this.controlValues);

      // this.selectedItems = [...this.storedControlItems];
      console.log(this.selectedItems, this.storedControlItems, "assdasd");
    },
    searchItemsOfControl() {
      let inputData = {
        searchBy: this.searchItem,
      };
      this.evidenceManagement.ListOfItems(inputData).then((res) => {
        console.log(res);
        this.itemsList = [...res.data.data];
      });
    },
    AddControlItems() {
      console.log("testing", this.selectedItems);
      this.$emit("itemsSelected", { display: false, item: this.selectedItems });
    },
  },
};
</script>

<style lang="scss"></style>
