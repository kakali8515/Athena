<template>
  <div class="modal-overlap waitingcompanyapproval z-20">
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
            일정 공유
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
              hover:text-black hover:opacity-75 hover:no-underline
            "
            aria-label="Close"
            @click="close"
          ></button>
        </div>
        <div class="modal-body relative">
          <div class="bulletin_modal">
            <div class="search_wrap m-t-0">
              <div class="input_wrap">
                <img src="@/assets/icon/Search.svg" />
                <input
                  type="text"
                  v-model="search_text"
                  placeholder="검색..."
                />
              </div>
              <button type="button" @click="search" class="bordered grey">
                검색
              </button>
            </div>
            <div class="user_list">
              <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden border-table">
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
                                  @click="selectAll" v-model="allSelected"
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
                            v-for="(item, index) in user_list"
                            :key="index"
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
                              <div class="flex items-center ">
                                <input
                                  :id="'id' + index"
                                  v-model="selected_user_id"
                                  @click="getUserEmail"
                                  type="checkbox"
                                  :value="item.id"
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
                                <input
                                  type="hidden"
                                  :id="'email' + item.id"
                                  :value="item.email"
                                />
                              </div>
                            </td>
                            <td
                              class="text-sm text-gray-900 font-light px-6 py-4"
                            >
                              {{ index + 1 }}
                            </td>
                            <td
                              class="text-sm text-gray-900 font-light px-6 py-4"
                            >
                              {{ item.department }}
                            </td>
                            <td
                              class="text-sm text-gray-900 font-light px-6 py-4"
                            >
                              {{ item.rank }}
                            </td>
                            <td
                              class="text-sm text-gray-900 font-light px-6 py-4"
                            >
                              {{ item.name }}
                            </td>
                            <td
                              class="text-sm text-gray-900 font-light px-6 py-4"
                            >
                              {{ item.email }}
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
            @click="getUserId"
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
          >
            선택완료
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import ScheduleManagementService from "@/services/ScheduleManagementService";
export default {
  name: "CalenderSharing",
  props:['userId','userEmail'],
  data() {
    return {
      search_text: "",
      selected_user_id: this.userId,
      user_list: [],
      newUserList: [],
      selected_user_email: this.userEmail,
      allSelected: false,
      selectedItem:[],
    };
  },
  created() {
    this.ScheduleManagementService = new ScheduleManagementService();
  },
  mounted() {
    this.userList();
  },
  methods: {
    close() {
      this.$emit("close");
    },
    userList() {

      if(this.selected_user_id.length > 0) {
        this.ScheduleManagementService.userList(
        this.search_text,this.selected_user_id
      )
        .then((res) => {
          if (res.status == 200) {
            this.user_list = res.data.userlist;
          }
        })
        .catch((err) => {
          return;
        });
      }
      else {
        this.ScheduleManagementService.userList(
        this.search_text
      )
        .then((res) => {
          if (res.status == 200) {
            this.user_list = res.data.userlist;
          }
        })
        .catch((err) => {
          return;
        });
      }
    },
    search() {
      this.userList();
    },
    getUserEmail(event) {
      // if (event.target.checked) {
      //   this.selected_user_email.push(
      //     document.querySelector("#email" + event.target.value).value
      //   );
      // } else {
      //   this.selected_user_email.pop(
      //     document.querySelector("#email" + event.target.value).value
      //   );
      // }
      const id = event.target.value;
      const click = event.target.checked;
      const obj = this.user_list.find((x) => x.id == id);
      if (click) {
        this.selected_user_email.push(obj.email);
        this.selected_user_id.push(id);
      }
      else {
        this.selected_user_email.splice(this.selected_user_email.indexOf(obj.email), 1);
        this.selected_user_id.splice(this.selected_user_id.indexOf(Number(id)), 1);
      }
    },
    getUserId() {
      this.$emit("getUserId", this.selected_user_id);
      this.$emit("getUserEmail", this.selected_user_email);
      this.$emit("close");
    },

    // all threat select check box
    selectAll() {
      if (!this.allSelected) {
        const selected = this.user_list.map((u) => u.id);
        this.selected_user_id = selected;
        this.selected_user_email = this.user_list.map((u) => {
          return u.email;
        });
      } else {
        this.selected_user_email = [];
        this.selected_user_id=[];
      }
    },
  },
};
</script>

<style lang="scss">
</style>