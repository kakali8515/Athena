<template>
  <div class="info_protection">
    <div class="notice-wrap">
      <div class="heading m-t-0">
        <p>{{ notice_title }}</p>
      </div>
      <div class="id_wrap">
        <p>{{ writer_name }}</p>
        <p>{{ dateformat(created_date) }}</p>
        <p>조회수: {{no_of_hits}}</p>
      </div>
      <div class="description" v-html="notice_description"></div>
      <!-- <div class="image" v-if="file_name">
        <img :src="imgBaseUrl+file_name_path" />
      </div> -->
      <div class="attached_file" v-if="file_name">
        <div class="attached_wrapper">
          <img src="@/assets/icon/attached-icon.svg" />
          <!-- <input type="file" /> -->
        </div>
        <!-- <p>{{file_name}}</p> -->
        <a :href="imgBaseUrl+file_name_path" download target="blank">{{file_name}}</a>
      </div>
      <div class="button-wrap fixed-button-wrap">
        <div class="buttons">
          <button type="button" :disabled="previous_notice_id==''" :class="{ no_cursor: previous_notice_id=='' }" class="bordered gray_border" @click="this.$router.push(`/NoticeDetails/${previous_notice_id}`)">
           이전 글
          </button>
          <span>{{previous_notice_title}}</span>
        </div>
        <div class="buttons">
          <button type="button" class="solid blue" @click="this.$router.push(`/NoticeOne`)">목록으로</button>
        </div>
        <div class="buttons">
          <span>{{next_notice_title}}</span>
          <button type="button" :disabled="next_notice_id==''" :class="{ no_cursor: next_notice_id=='' }" class="bordered blue_bordered" @click="this.$router.push(`/NoticeDetails/${next_notice_id}`)">다음 글 </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import moment from "moment";
import CustomerCenterService from "@/services/CustomerCenterService";

export default {
  name: "NoticeDetails",
  data() {
    return {
      noticeDetailsID: null,
      notice_title: "",
      writer_name: "",
      created_date: "",
      no_of_hits:'',
      file_name:'',
      previous_notice_title:'',
      previous_notice_id:'',
      next_notice_title:'',
      next_notice_id:'',
      file_name_path:'',
      imgBaseUrl: process.env.VUE_APP_IMAGE_BASE_URL,
      notice_description: ''
    };
  },
  created() {
    this.CustomerCenterService = new CustomerCenterService();
  },
  mounted() {
    this.NoticeDetails();
    this.dateformat();
  },
  methods: {
    NoticeDetails() {
      this.noticeDetailsID = this.$route.params.id;
      this.CustomerCenterService.noticeDetails(this.noticeDetailsID).then(
        (res) => {
          if (res.status == 200) {
            this.noticeDetailsData = res.data;
            this.notice_title = res.data.notice_title;
            this.writer_name = res.data.writer_name;
            this.created_date = res.data.created_date;
            this.no_of_hits=res.data.no_of_hits;
            this.file_name=res.data.file_name;
            this.previous_notice_title=res.data.previous_notice_title;
            this.next_notice_title=res.data.next_notice_title;
            this.file_name_path=res.data.file_name_path;
            this.next_notice_id=res.data.next_notice_id;
            this.previous_notice_id=res.data.previous_notice_id;
            this.notice_description = res.data.notice_description;
          } else {
            console.log("error");
          }
        }
      );
    },
    dateformat(value) {
      if (value) {
        return moment(String(value)).format("YYYY.MM.DD hh:mm");
      }
    },
  },
};
</script>


<style lang="scss">
  .description{
    margin-top: 20px;
    height: 388px;
    overflow: auto;
    border: 1px solid #bdbdbd;
    padding: 20px;
  }
</style>