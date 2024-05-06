<template>
  <div class="info_protection">
    <div class="headwrap">
      <div class="headingbutton">
        <button type="button" class="bordered grey">bulletin board 1</button>
        <button type="button" class="bordered grey">bulletin board 2</button>
      </div>
      <div class="right_head">
        <div class="input-group">
          <input
            type="text"
            placeholder="Enter the bulletin board name"
            v-model="board_name"
          />
          <span>{{ error.board_name }}</span>
        </div>
        <button type="button" class="btn-blue-outline bordered blue" @click="addBoardName">
          Create a bulletin board
        </button>
      </div>
    </div>
    <div class="datatable_wrap bulletintable notice-table border_wrap">
      <div class="tab-content" id="tabs-tabContent">
        <div class="no-notice-board">
          <p>Notice board</p>
        </div>
      </div>
    </div>
    <div class="button_wrap fixed-button-wrap flex justify-end">
      <button type="button" class="  bordered blue">To Manage</button>
    </div>
  </div>
</template>


<script>
import bulletinBoard from "@/services/bulletinBoard";
import validator from "validator";
import { errorMsg } from "@/config/Message";

export default {
  name: "NoticeBoardForUserAdminRight",
  data() {
    return {
      board_name: "",
      error: {},
    };
  },
  created() {
    this.bulletinBoard = new bulletinBoard();
  },
  methods: {
    boardNameCheck() {
      if (validator.isEmpty(this.board_name)) {
        this.error.board_name = errorMsg.boardName;
      } else {
        return false;
      }
    },
    addBoardName() {
      if (this.boardNameCheck()) {
        return;
      } else {
        this.bulletinBoard
          .addBulletinBoardName(this.board_name)
          .then((res) => {
            if (res.status == 200) {
              return;
            } else {
              return false;
            }
          })
          .catch((err) => {
            return false;
          });
      }
    },
  },
};
</script>


<style lang="scss">
.right_head{
    display: flex;
    align-items: flex-start;
    .input-group{
       display: flex;
       flex-direction: column;
       span{
        margin-top: 5px;
       } 
    }
    button{
      background-color: #fff;
      border:1px solid #3780E6;
    }
}
.footer-button{
  background-color: #fff !important;
  border:1px solid #3780E6 !important;
  color:#3780E6 !important;
}

</style>
