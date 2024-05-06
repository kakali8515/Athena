<template>
  <div class="login_base_wrap bulletinboardpost">
    <div class="wraper">
      <p>게시판명 <span>{{ boardName }}</span></p>
      <form class="form_wrap m-t-0" @submit="(e) => e.preventDefault()" enctype="multipart/form-data">
        <div class="form">
          <p>제목</p>
          <input v-model="title" class="form-control" type="text" placeholder="제목" />
          <span class="error-msg">{{ error.title }}</span>
        </div>
        <div class="form">
          <p>상세</p>
          <textarea v-model="details" placeholder="상세"></textarea>
          <span class="error-msg">{{ error.details }}</span>
        </div>
        <div class="form">
          <p>첨부 파일</p>
          <div class="f-wrap">
            <input type="text" placeholder="(파일은 최대 20mb까지 업로드 가능합니다)" v-model="fileName"
              disabled />
            <div class="attachment">
              <button type="button">파일첨부</button>
              <input type="file" v-on:change="onFileChange" />
            </div>
          </div>
          <span v-if="errorMsg" class="fileErrorMsg">{{ errorMsg }}</span>
        </div>
      </form>
      <div class="button_wrap fixed-button-wrap">
        <button type="button" @click="submitData">작성완료</button>
      </div>
    </div>
  </div>
</template>

<script>
import bulletinBoard from "@/services/bulletinBoard";
import validator from "validator";
import Toast from "@/alert/alert.js";
import { errorMsg } from "@/config/Message";
export default {
  name: "Writeabulletinboardpost",
  data() {
    return {
      company_bulletin_board_id: this.$route.params.id,
      boardName: this.$route.params.board_name,
      title: "",
      details: "",
      fileName: "",
      file: "",
      files: null,
      fileSize: "",
      errorMsg: "",
      render: false,
      error: {},
    };
  },
  created() {
    this.bulletinBoard = new bulletinBoard();
  },
  mounted() {
    // this.bulletinBoardDetails();
  },
  methods: {
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.file = files[0];
      this.fileSize = e.target.files[0].size;
      let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      if (!allowedExtensions.exec(this.file.name)) {
        this.render = true;
        this.errorMsg = "jpg, jpeg, png 파일만 업로드 가능합니다";
        this.url = "";
        return false;
      } else if (this.fileSize > 1024 * 1024 * 20) {
        this.render = true;
        this.errorMsg = "업로드 파일 용량은 최대 20mb입니다";
        this.url = "";
        this.fileName = "";
        return false;
      } else if (allowedExtensions.exec(this.file.name)) {
        this.errorMsg = "";
        this.render = false;
        this.fileName = this.file.name;
        this.fileExtension = this.fileName.replace(/^.*\./, "");
      }
      this.errorMsg = "";
    },

    checkError() {
      if (validator.isEmpty(this.title)) {
        this.error.title = errorMsg.title;
        return false;
      }
      if (validator.isEmpty(this.details)) {
        this.error.title = "";
        this.error.details = errorMsg.schedule_details;
        return false;
      } else {
        this.error = {};
        return true;
      }
    },

    async submitData() {
      if (!this.checkError()) {
        return;
      } else {
        let formData = new FormData();
        formData.append(
          "company_bulletin_board_id",
          this.company_bulletin_board_id
        );
        formData.append("title", this.title);
        formData.append("details", this.details);
        formData.append("file_name", this.file);
        try {
          const res = await axios.post("/bulletine-board/post-add", formData);
          console.log(res)
          if (res.status == 200) {
            Toast.fire({ title: res.data.message });
            this.$router.push(`/NoticeBoard`);
          }
        } catch (error) {
          return;
        }
      }
    },

    // bulletinBoardDetails() {
    //   this.bulletinBoard.bulletinBoardDetails(this.member_id)
    //     .then((res) => {
    //       if (res.status == 200) {

    //       }
    //     })
    //     .catch((err) => {
    //       return;
    //     });
    // }
  },
};
</script>


<style lang="scss">
</style>