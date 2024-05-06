<template>
  <div class="modal-overlap waitingcompanyapproval z-10">
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
            rounded-t-m
          "
        >
          <h5 class="text-xl font-medium leading-normal text-gray-800">
            게시판 관리하기
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
            @click="close"
          ></button>
        </div>
        <div class="modal-body relative">
          <div class="bulletin_modal">
            <div class="name_heading">
              <h4>게시판 이름</h4>
              <span class="sub_head">{{ boardName }}</span>
            </div>
            <div class="search_wrap">
              <div class="input_wrap">
                <img src="@/assets/icon/Search.svg" />
                <input
                  type="text"
                  placeholder="검색..."
                  v-model="search_text"
                />
              </div>
              <button type="button" class="bordered grey" @click="searchResult">
                검색
              </button>
            </div>
            <div class="user_list">
              <div class="user_head">
                <h4>전체 사용자 목록</h4>
              </div>
              <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden border-table fixed-height">
                      <table class="min-w-full text-center ">
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
                                  "
                                  @click="selectAll"
                                  v-model="allSelected"
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
                              v-for="(value, index) of UserListCol"
                              :key="index"
                            >
                              {{ value.item }}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            class="bg-white border-b"
                            v-for="(item, index) of userDataSet"
                            :key="index"
                            :class="item.edit_status=='edit' ? 'grey-background' : ''"
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
                                <input v-if="item.edit_status !=='edit'"
                                  class="
                                    w-4
                                    h-4
                                    text-blue-600
                                    bg-gray-100
                                    rounded
                                    border-gray-300
                                    dark:ring-offset-gray-800 
                                  "
                                  :id="index"
                                  v-model="selectedItem"
                                  @change="selectSingle"
                                  type="checkbox"
                                  :value="item.id"
                                />
                                <span v-else>전체 액세스</span>
                              </div>
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
                focus:outline-none
                focus:ring-0
                transition
                duration-150
                ease-in-out
                m-t-16
              "
              @click="addBulletineUser"
            >
              추가하기
            </button>
            <div class="user_list">
              <div class="user_head">
                <h4>게시판 사용자</h4>
              </div>
              <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden border-table fixed-height">
                      <table class="min-w-full text-center">
                        <thead class=" bg-gray-50">
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
                              <div class="flex items-center">R</div>
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
                              <div class="flex items-center">W</div>
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
                              v-for="(value, index) of UserListCol"
                              :key="index"
                            >
                              {{ value.item }}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            class="bg-white border-b"
                            v-for="(item, index) of BulletineUser"
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
                                  class="
                                    w-4
                                    h-4
                                    text-blue-600
                                    bg-gray-100
                                    rounded
                                    border-gray-300
                                    dark:ring-offset-gray-800
                                  "
                                  :id="'view' + item.id"
                                  @change="selectSingle2"
                                  type="checkbox"
                                  :value="item.id"
                                  :checked="
                                    item.user_access_type == 'view' ||
                                    item.user_access_type == 'edit'
                                  "
                                />
                              </div>
                            </td>
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
                                  class="
                                    w-4
                                    h-4
                                    text-blue-600
                                    bg-gray-100
                                    rounded
                                    border-gray-300
                                    dark:ring-offset-gray-800
                                    
                                  "
                                  :id="'edit' + item.id"
                                  @change="selectSingle3"
                                  type="checkbox"
                                  :value="item.id"
                                  :checked="item.user_access_type == 'edit'"
                                />
                              </div>
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
              m-t-16
            "
            @click="correction"
          >
            수정
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import bulletinBoard from "@/services/bulletinBoard";
import { FullUserListCol } from "@/config/TableColData";

export default {
  name: "ManageBulletinBoardsforCorrection",
  props: {
    boardId: Number,
    boardName: String,
  },
  data() {
    return {
      search_text: "",
      UserListCol: FullUserListCol,
      userDataSet: [],
      boardUserDataSet: [],
      selectedItem: [],
      selectedItem2: false,
      selectedItem3: false,
      newArray: [],
      allSelected: false,
      BulletineUser: [],
      uId: "",
      read: false,
      write: false,
      userAccess: [],
    };
  },
  created() {
    this.bulletinBoard = new bulletinBoard();
  },
  mounted() {
    this.UserData();
    this.getboardUserList();
  },

  methods: {
    // full user list
    userList(id, search_text) {
      this.bulletinBoard
        .getUserList(id, search_text)
        .then((res) => {
          if (res.status == 200) {
            this.userDataSet = res.data.user_list;
            this.search_text = "";
          }
        })
        .catch((err) => {
          return false;
        });
    },

    // Get user data
    UserData() {
      this.userList(this.boardId);
    },
    // get search result
    searchResult() {
      this.userList(this.boardId, this.search_text);
    },
    // add user to bulletine user

    correction() {
      this.BulletineUser.filter((x)=>{
        if( x.user_access_type != ''){
          this.userAccess.push({id: x.id, user_access: x.user_access_type })
          return x;
        }
      });
      this.bulletinBoard
        .userPermission(this.userAccess, this.boardId)
        .then((res) => {
          if (res.status == 200) {
            this.getboardUserList();
            this.close();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // add to bulletine board user
    addBulletineUser() {
      this.bulletinBoard
        .addUser(this.boardId, this.newArray)
        .then((res) => {
          if (res.status == 200) {
            this.getboardUserList();
            this.UserData();
            if (this.allSelected) {
              this.allSelected = false;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getboardUserList() {
      this.bulletinBoard
        .boardUserList(this.boardId)
        .then((res) => {
          if (res.status == 200) {
            this.BulletineUser = res.data.userlist;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // all select check box
    selectAll() {
      if (!this.allSelected) {
        const selected = this.userDataSet.map((u) => u.id);
        this.selectedItem = selected;
        this.newArray = this.userDataSet.map((u) => {
          return u.id;
        });
      } else {
        this.selectedItem = [];
        this.newArray = [];
      }
    },
    // checkbox select event
    selectSingle(event) {
      const id = event.target.value;
      const click = event.target.checked;
      const obj = this.userDataSet.find((x) => x.id == id);
      if (click) {
        this.newArray.push(obj.id);
      } else {
        this.newArray.splice(this.newArray.indexOf(obj), 1);
      }
    },

    selectSingle3(event) {
      this.uId = +event.target.value;
      const click = event.target.checked;
      const index = this.BulletineUser.findIndex((x) => x.id == this.uId);

      if (click) {
        this.BulletineUser[index].user_access_type = "edit";
      } 
      else if (!document.querySelector("#view" + this.uId).checked) {
        this.BulletineUser[index].user_access_type = "";
      } 
      else {
        this.BulletineUser[index].user_access_type = "view";
      }
    },
    selectSingle2(event) {
      this.uId = +event.target.value;
      const click = event.target.checked;
      const index = this.BulletineUser.findIndex((x) => x.id == this.uId);

      if (!click) {
        if (!document.querySelector("#edit" + this.uId).checked) {
          this.BulletineUser[index].user_access_type = "";
        }
      } else {
        if (!document.querySelector("#edit" + this.uId).checked) {
          this.BulletineUser[index].user_access_type = "view";
        }
      }
    },

    // modal close
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss">
.delete_img {
  display: flex;
  justify-content: center;
  img {
    cursor: pointer;
  }
}
.grey-background {
  background: #BDBDBD;
}
</style>