<template>
  <div class="modal-overlap waitingcompanyapproval">
    <div
      class="
        modal-dialog modal-dialog-centered
        relative
        w-auto
        pointer-events-none
      "
    >
      <div
        class="
          modal-content
          border-none
          shadow-lg
          relative
          flex flex-col
          w-full
          pointer-events-auto
          bg-white bg-clip-padding
          rounded-md
          outline-none
          text-current
        "
      >
        <div
          class="
            modal-header
            flex flex-shrink-0
            items-center
            justify-between
            p-4
            rounded-t-md
          "
        >
          <h5 class="text-xl font-medium leading-normal text-gray-800">
            증적 관리 담당자
          </h5>
          <button
            type="button"
            class="
              btn-close
              box-content
              w-4
              h-4
              p-1
              text-black
              border-none
              rounded-none
              opacity-50
              focus:shadow-none focus:outline-none focus:opacity-100
              hover:text-black hover:opacity-75 hover:no-underline
            "
            aria-label="Close"
            @click="$emit('closeModal', false)"
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
                @click="searchManager"
              >
                검색
              </button>
            </div>
            <div class="user_list">
              <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden border-table fixed-height">
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
                            #
                              <!-- <div class="flex items-center">
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
                                    focus:ring-blue-500
                                    dark:focus:ring-blue-600
                                    dark:ring-offset-gray-800
                                    focus:ring-2
                                    dark:bg-gray-700 dark:border-gray-600
                                  "
                                />
                              </div> -->
                            </th>
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
                              No
                            </th>
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
                            부서
                            </th>
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
                            직급
                            </th>
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
                            이름
                            </th>
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
                            이메일
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            class="bg-white border-b"
                            v-for="(i, e) in managerList"
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
                                  v-model="selectedManager"
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
                                />
                              </div>
                            </td>

                            <td
                              class="text-sm text-gray-900 font-light px-6 py-4"
                            >
                              {{ e + 1 }}
                            </td>
                            <td
                              class="text-sm text-gray-900 font-light px-6 py-4"
                            >
                              {{ i.department }}
                            </td>
                            <td
                              class="text-sm text-gray-900 font-light px-6 py-4"
                            >
                              {{ i.rank }}
                            </td>
                            <td
                              class="text-sm text-gray-900 font-light px-6 py-4"
                            >
                              {{ i.name }}
                            </td>
                            <td
                              class="text-sm text-gray-900 font-light px-6 py-4"
                            >
                              {{ i.email }}
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
            type="button"
            class="
              blue_bordered
              full-button
              px-6
              py-2.5
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
            @click="AddManagers"
          >
            담당자 변경
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import EvidenceManagement from "@/services/EvidenceManagement";
export default {
  name: "TraceManagementControl",
  data() {
    return {
      managerList: [],
      searchItem: "",
      selectedManager: [],
    };
  },
  props: {
    preSelectedManagers: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    this.evidenceManagement = new EvidenceManagement();
  },
  mounted() {
    this.getmanagersList();
  },
  methods: {
    getmanagersList(data) {
      this.evidenceManagement.managersList(data).then((res) => {
        // console.log(res);

        this.managerList = res.data.data;
        this.selectedManager = this.managerList.filter(
          (e) => (this.preSelectedManagers.findIndex((i) => i.user_id == e.user_id) !== -1)
        );
        console.log(this.selectedManager);
      });
    },
    searchManager() {
      let inputData = {
        searchByText: this.searchItem,
      };
      this.evidenceManagement.managersList(inputData).then((res) => {
        // console.log(res);
        this.managerList = res.data.data;
        console.log(this.selectedManager);
      });
    },
    AddManagers() {
      this.$emit("addManagers", {
        display: false,
        value: this.selectedManager,
      });
    },
  },
};
</script>

<style lang="scss">
</style>