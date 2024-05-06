<template>
  <div class="info_protection">
    <div class="notice-wrap bulletinboarddetails">
      <div class="board_heading">
        <h4>{{ board_name }}</h4>
      </div>
      <div class="heading">
        <p>{{ title }}</p>
      </div>
      <div class="id_wrap">
        <p>{{ writer_name }}</p>
        <p>{{ dateformat(created_date) }}</p>
        <p>조회수: {{ no_of_hits }}</p>
      </div>
      <div class="image" v-if="file_name">
        <img :src="$store.state.imgBaseURL + file_name_path" />
      </div>
      <div class="desc">
        <p>{{ details }}</p>
      </div>
      <div class="attached_file" v-if="file_name">
        <div class="attached_wrapper">
          <img src="@/assets/icon/attached-icon.svg" />
        </div>
        <p @click="donwloadImgae" class="attatched_file_name">
          {{ file_name }}
        </p>
      </div>
      <div class="comment_main_wrap">
        <div class="all-comments">
          <div
            class="comment"
            v-for="(comment, index) in commentlist"
            :key="index"
          >
            <div class="candidate">
              <img src="@/assets/images/person.svg" />
            </div>
            <div class="details">
              <h5>{{ comment.writer_name }} <span class="cmnt-date">{{ dateOnly(comment.created_date) }} </span><span>{{ timeOnly(comment.created_date) }} </span></h5>
              <p>{{ comment.comment }}</p>
            </div>
          </div>
        </div>
        <div class="comment_box">
          <span>작성자</span>
          <input type="text" placeholder="Text box" v-model="comment" />
          <button type="button" @click="addComment">
            <img src="@/assets/icon/send.svg" />
          </button>
        </div>
      </div>
      <div class="button-wrap">
        <div class="buttons">
          <button
            type="button"
            :disabled="previous_post_id == ''"
            :class="{ no_cursor: previous_post_id == '' }"
            class="bordered gray_border"
            @click="
              this.$router.push(`/bulletinboarddetails/${previous_post_id}`)
            "
          >
            이전 글
          </button>
          <span>{{ previous_post_title }}</span>
        </div>
        <div class="buttons">
          <button
            type="button"
            class="solid blue"
            @click="this.$router.push(`/NoticeBoard`)"
          >
            목록으로    
          </button>
        </div>
        <div class="buttons">
          <span>{{ next_post_title }}</span>
          <button
            type="button"
            :disabled="next_post_id == ''"
            :class="{ no_cursor: next_post_id == '' }"
            class="bordered blue_border"
            @click="this.$router.push(`/bulletinboarddetails/${next_post_id}`)"
          >
           다음 글 >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bulletinBoard from "@/services/bulletinBoard";
import moment from "moment";
import Toast from "@/alert/alert.js";


export default {
  name: "bulletinboarddetails",
  data() {
    return {
      id: this.$route.params.id,
      board_name: "",
      title: "",
      writer_name: "",
      created_date: "",
      no_of_hits: "",
      file_name: "",
      file_name_path: "",
      previous_post_title: "",
      previous_post_id: "",
      next_post_title: "",
      next_post_id: "",
      commentlist: [],
      comment: "",
      details: "",
      board_id: localStorage.getItem('bId', this.board_id),
      isPageReload: 'no',
    };
  },
  created() {
    this.bulletinBoard = new bulletinBoard();
  },
  computed: {
    permission() {
      return this.$store.state.sideBar.permission.bulletin_board;
    }
  },
  mounted() {
    this.bulletinBoardDetails();
    this.dateformat();
  },
  methods: {
    bulletinBoardDetails() {
      this.bulletinBoard
        .bulletinBoardDetails(this.id, this.isPageReload)
        .then((res) => {
          if (res.status == 200) {
            this.details = res.data.details;
            this.board_name = res.data.board_name;
            this.title = res.data.title;
            this.writer_name = res.data.writer_name;
            this.created_date = res.data.created_date;
            this.no_of_hits = res.data.no_of_hits;
            this.file_name = res.data.file_name;
            this.file_name_path = res.data.file_name_path;
            this.next_post_id = res.data.next_post_id;
            this.previous_post_id = res.data.previous_post_id;
            this.previous_post_title = res.data.previous_post_title;
            this.next_post_title = res.data.next_post_title;
            this.commentlist = res.data.commentlist;
          }
        })
        .catch((err) => {
          return;
        });
    },
    dateformat(value) {
      if (value) {
        return moment(String(value)).format("YYYY.MM.DD hh:mm");
      }
    },
    dateOnly(value) {
      if (value) {
        return moment(String(value)).format("YYYY.MM.DD");
      }
    },
    timeOnly(value) {
      if (value) {
        return moment(String(value)).format("HH:MM");
      }
    },
    addComment() {
      this.bulletinBoard
        .addComment(this.id, this.comment)
        .then((res) => {
          if (res.status == 200) {
            this.isPageReload = 'yes';
            this.comment = ''
            this.bulletinBoardDetails();
          }
        })
        .catch((err) => {
          return;
        });
    },

    // download image
    donwloadImgae() {
      this.bulletinBoard.downloadPostedImage(this.board_id, this.id).then((res)=>{
        console.log("response", res)
        if(res.status == 200){
          console.log('download')
          let obj = {url : res.data.url, fileName : this.file_name}
          this.$store.dispatch('diagnosisManagement/createDownloadFiles', obj)
        }
        else if(res.response.status == 401){
           Toast.fire({ title: res.response.data.error });
        }
      })
      .catch((err)=>{
        console.log(err);
      })
    },
  },
};
</script>


<style lang="scss">
.desc {
  font-size: 18px;
  margin-top: 15px;
  width: 100%;
  border: 1px solid #cfcfcf;
  border-radius: 10px;
  padding: 20px 30px;
  height: 222px;
  overflow: auto;
}
.attachment{
  input{
    cursor: pointer;
  }
}
.attatched_file_name{
  cursor: pointer;
}
.cmnt-date{
  margin: 0 10px;
}
</style>