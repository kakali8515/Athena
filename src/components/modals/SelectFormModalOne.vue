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
            양식 선택
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
              focus:outline-none focus:opacity-100
              hover:text-black hover:opacity-75 hover:no-underline
            "
            aria-label="Close"
            @click="$emit('closeModal', false)"
          ></button>
        </div>
        <div class="modal-body relative">
          <div class="bulletin_modal">
            <div class="search_wrap">
              <div class="input_wrap">
                <img src="@/assets/icon/Search.svg" />
                <input
                  type="text"
                  placeholder="입력하기..."
                  v-model="searchItem"
                />
              </div>
              <button
                type="button"
                class="bordered grey"
                @click="searchTemplate"
              >
                검색
              </button>
            </div>
            <div class="user_list">
              <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden fixed-height">
                      <table class="min-w-full text-center" v-if="!isEmpty">
                        <thead class="backgroundf2">
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
                                  disabled
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
                                    dark:bg-gray-700
                                    dark:border-gray-600
                                  "
                                />
                              </div>
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
                              Proof
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            :class="`bg-white border-b ${
                              selectedID === e ? 'bg-slate-100' : ''
                            }`"
                            v-for="(i, e) in templatesList"
                            :key="e"
                          >
                            <td
                              class="
                                px-6
                                py-4
                                text-sm
                                font-medium
                                text-gray-900
                              "
                            >
                              <div class="flex items-center">
                                <input
                                  :id="'id' + e"
                                  @click="selectTemp($event, i, e)"
                                  type="checkbox"
                                  :value="i.id"
                                  class="
                                    w-4
                                    h-4
                                    text-blue-600
                                    bg-gray-100
                                    rounded
                                    border-gray-300
                                    dark:ring-offset-gray-800
                                    dark:bg-gray-700
                                    dark:border-gray-600
                                    my-checkSelect
                                  "
                                />
                              </div>
                            </td>
                            <td
                              class="text-sm text-gray-900 font-light px-6 py-4"
                            >
                              {{ i.id }}
                            </td>
                            <td
                              class="text-sm text-gray-900 font-light px-6 py-4"
                            >
                              {{ i.template_name }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p v-if="isEmpty">
                        “검색어” 증적양식이 없습니다. [증적 등록]을 선택하여
                        증적을 추가 등록해주시거나 검색어를 변경해주세요.
                      </p>
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
            @click="chooseTemplate"
          >
            변경하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import EvidenceManagement from "@/services/EvidenceManagement";
export default {
  name: "SelectFormModalOne",
  data() {
    return {
      templatesList: [],
      searchItem: "",
      selectedID: null,
      selectedTemplate: {},
      isEmpty: false,
    };
  },
  created() {
    this.evidenceManagement = new EvidenceManagement();
  },
  mounted() {
    this.getTemplateList();
  },
  methods: {
    getTemplateList() {
      this.evidenceManagement.templateList().then((res) => {
        // console.log(res);
        this.templatesList = res.data.templates;
        if (!res.data.templates.length) {
          this.isEmpty = false;
        } else {
          this.isEmpty = false;
        }
      });
    },
    searchTemplate() {
      this.evidenceManagement
        .templateList({ searchByTitle: this.searchItem })
        .then((res) => {
          this.templatesList = res.data.templates;
          if (!res.data.templates.length) {
            this.isEmpty = true;
          } else {
            this.isEmpty = false;
          }
        });
    },
    // selected(data, id) {
    //   this.selectedID = id;
    //   this.selectedTemplate = data;
    // },
    chooseTemplate() {
      this.$emit("selectMethod", {
        display: false,
        value: this.selectedTemplate,
      });
    },
    selectTemp(event, data, id) {
      if (event.target.checked) {
        Array.from(document.querySelectorAll(".my-checkSelect")).forEach(
          (element) => {
            element.checked = false;
          }
        );
        event.target.checked = true;
        this.selectedID = id;
        this.selectedTemplate = data;
      }
      else {
        this.selectedID = "";
        this.selectedTemplate = {};
      }
    },
  },
};
</script>

<style lang="scss">
</style>