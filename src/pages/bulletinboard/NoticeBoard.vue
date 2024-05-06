<template>
  <div class="info_protection">
    <div class="headwrap">
      <div class="headingbutton">
        <div class="left-wrap">
          <!-- <p>{{ $store.state.latestBoardId }}</p>
          <p>{{ $store.state.latestBoardAccess }}</p> -->
          <select id="selectedBoard" @change="getdropdownValue($event)">
            <option
              v-for="(value, index) in bullietinNameList"
              :key="index"
              :value="value.id"
              :selected="this.$route.query.id == value.id"
            >
              {{ value.board_name }}
            </option>
          </select>
        </div>
      </div>
      <div
        class="right_head"
        v-if="isAddName || this.$store.state.signin.is_user_admin == 'y'"
      >
        <div class="input-group">
          <input
            type="text"
            placeholder="게시판명을 입력해 주세요"
            v-model="board_name"
          />
          <span class="error-msg">{{ error.board_name }}</span>
        </div>
        <button type="button" class="bordered" @click="addBoardName">
          게시판 만들기
        </button>
      </div>
    </div>

    <div class="datatable_wrap bulletintable notice-table border_wrap">
      <div class="tab-content border-0" id="tabs-tabContent">
        <div v-if="isBoard">
          <div class="bulletinhead">
            <h4 v-if="selectedBoardName">{{ selectedBoardName }}</h4>
          </div>
          <div v-if="bullietinPostList.length">
            <DataTable
              :HeadersColumn="colData"
              :BodyData="bullietinPostList"
              :rowClickable="true"
              @clickEvent="ShowDetails($event)"
              :Page="page"
              :records="totalItems"
              :options="chunkPage"
              :perPage="limit"
              @clickPaginate="myCallback($event)"
              clickCellIndex="1"
            />
          </div>
          <div v-else>
            <div class="no-notice-board">
              <p>게시판이 존재하지 않습니다.</p>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="no-notice-board">
            <p>게시판이 존재하지 않습니다.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="button_wrap fixed-button-wrap flex justify-between">
      <button
        type="button"
        class="bordered gray"
        @click="
          this.$router.push(
            `/Writeabulletinboardpost/${board_id}/${selectedBoardName}`
          )
        "
        v-if="isWritePost"
      >
        글 작성하기
      </button>
      <button type="button" class="bordered blue" @click="show" v-if="toManage">
        관리하기
      </button>
    </div>
  </div>
  <template v-if="board_id">
    <ManageBulletinBoardsforCorrection
      v-if="isModal"
      @close="close"
      :boardName="selectedBoardName"
      :boardId="board_id"
    />
  </template>
</template>

<script>
import bulletinBoard from "@/services/bulletinBoard";
import DataTable from "@/components/DataTable.vue";
import { noticecolData } from "@/config/TableColData";
import validator from "validator";
import { errorMsg } from "@/config/Message";
import ManageBulletinBoardsforCorrection from "@/components/modals/ManageBulletinBoardsforCorrection.vue";

export default {
  name: "NoticeBoard",
  components: {
    DataTable,
    ManageBulletinBoardsforCorrection,
  },
  data() {
    return {
      bullietinNameList: [],
      bullietinPostList: [],
      board_id: "",
      page: 1,
      limit: 50,
      totalItems: 0,
      colData: noticecolData,
      chunkPage: { chunk: 5 },
      board_name: "",
      error: {},
      isAddName: false,
      isBoard: true,
      toManage: false,
      isWritePost: false,
      updatedBoardName: "",
      selectedBoardName: "",
      isModal: false,
    };
  },
  created() {
    this.bulletinBoard = new bulletinBoard();
    // this.getBulletineName();
  },
  mounted() {
     setTimeout(() => {
      this.getBulletineName();
    }, 2000);
    // console.log( this.$store.state.latestBoardId,this.$store.state.latestBoardAccess)
  },
  watch:{
    $route (to, from){
       if(to.fullPath=='/NoticeBoard') {
        this.getBulletineName();
       }
    }
} ,

  computed: {
    permission() {
      return this.$store.state.sideBar.permission.bulletin_board;
    },
  },

  methods: {
    // dropdown select event
    getdropdownValue(event) {
      console.log("event.target.value", event.target.value);
      let boardId = event.target.value;
      const newData = this.bullietinNameList.find((x) => x.id == boardId);
      this.selectedBoardName = newData.board_name;
      this.getBulletinBoardList(newData.id, newData.access_type);
      // this.$store.state.latestBoardId = event.target.value
      // this.$store.state.latestBoardAccess = newData.access_type
      this.$router.push({
        path: "NoticeBoard",
        query: { id: newData.id, accessType: newData.access_type },
      });
    },

    // get dropdown name list
    getBulletineName() {
      this.bulletinBoard
        .bulletinBoardName()
        .then((res) => {
          if (res.status == 200) {
            if (this.permission == "edit") {
              this.isAddName = true;
            }

            this.bullietinNameList = res.data.bulletineBoardList;
            this.board_id = res.data.bulletineBoardList[0].id;
            localStorage.setItem("bId", this.board_id);
            // this.bullietinNameList[0].board_name = this.board_name
            this.selectedBoardName = this.bullietinNameList[0].board_name;
            // console.log('selectedBoardName', this.bullietinNameList[0])
            if (this.$route.query.id && this.$route.query.accessType) {
              const newData = this.bullietinNameList.find(
                (x) => x.id == this.$route.query.id
              );
              this.selectedBoardName = newData.board_name;
              this.getBulletinBoardList(
                this.$route.query.id,
                this.$route.query.accessType
              );
            } else {
              this.getBulletinBoardList(
                this.board_id,
                res.data.bulletineBoardList[0].access_type
              );
            }

            // this.$store.state.latestBoardId = this.bullietinNameList[0].id
            // this.$store.state.latestBoardAccess = this.bullietinNameList[0].access_type

            // if (this.latestBoardId && this.latestBoardAccess) {
            //   this.getBulletinBoardList(this.board_id, res.data.bulletineBoardList[0].access_type);
            // }

            // condition rendering based on user access
            // if (
            //   this.bullietinNameList[0].access_type == "edit" ||
            //   this.bullietinNameList[0].access_type == "view"
            // ) {
            //   this.isBoard = true;
            // }
            if (
              this.bullietinNameList[0].access_type == "edit" ||
              this.permission == "edit"
            ) {
              this.isBoard = true;
              this.toManage = true;
              this.isWritePost = true;
            } else if (
              this.bullietinNameList[0].access_type == "view" ||
              this.permission == "read"
            ) {
              this.isBoard = true;
            } else if (
              this.bullietinNameList[0].access_type == "none" ||
              this.permission == "read"
            ) {
              this.isBoard = false;
              this.toManage = false;
              this.isWritePost = false;
            }
          } else {
            return false;
          }
        })
        .catch((err) => {
          return false;
        });
    },

    // get selected list data
    getBulletinBoardList(id, type) {
      // console.log('type', type)
      // console.log("this.permission", this.permission)
      if (type == "edit" || this.permission == "edit") {
        this.isWritePost = true;
        this.isBoard = true;
        this.toManage = true;
      } else if (type == "view" || this.permission == "read") {
        this.isBoard = true;
        this.isWritePost = false;
        this.toManage = false;
      } else if (type == "none" || this.permission == "none") {
        this.isWritePost = false;
        this.isBoard = false;
        this.toManage = false;
      }

      // if (this.isWritePost) {
      this.board_id = id;
      localStorage.setItem("bId", this.board_id);
      this.bulletinBoard
        .bulletinBoardList(id, this.page, this.limit)
        .then((res) => {
          if (res.status == 200) {
            this.bullietinPostList = res.data.postlist;
            this.totalItems = res.data.postlist.length;
            for (let i = 0; i < this.bullietinPostList.length; i++) {
              this.bullietinPostList[i]["no"] = i + 1;
            }
          } else {
            return false;
          }
        })
        .catch((err) => {
          return false;
        });
      // }
    },
    // board name add validation
    boardNameCheck() {
      if (validator.isEmpty(this.board_name)) {
        this.error.board_name = errorMsg.boardName;
      } else {
        return false;
      }
    },
    // add board name
    addBoardName() {
      if (this.boardNameCheck()) {
        return;
      } else {
        this.bulletinBoard
          .addBulletinBoardName(this.board_name)
          .then((res) => {
            if (res.status == 200) {
              let SelectedItem = document.querySelector("#selectedBoard");
              SelectedItem.value = this.bullietinNameList[0].board_name;
              this.board_name = "";
              this.getBulletineName();
              this.error.board_name = "";
              return;
            } else if (res.response.status == 400) {
              this.error.board_name = "게시판명을 입력해 주세요";
            } else {
              return false;
            }
          })
          .catch((err) => {
            return false;
          });
      }
    },

    ShowDetails(event) {
      if (
        this.permission == "read" ||
        this.permission == "edit" ||
        this.$store.state.signin.is_user_admin == "y"
      ) {
        this.$router.push(`/bulletinboarddetails/${event.id}`);
      } else {
        return false;
      }
    },

    // show modal
    show() {
      this.isModal = true;
    },
    close() {
      this.isModal = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.datatable_wrap_new {
  margin-top: 0px;
}

.border-0 {
  .protection_table {
    border: 0;
  }
}
</style>
