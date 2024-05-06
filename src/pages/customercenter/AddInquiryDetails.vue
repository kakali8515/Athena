<template>
  <div class="info_protection">
    <Breadcrumb link="dashboard" text1="Home" text2="고객센터" text3="1:1문의하기"/>
    <div class="heading bordered_head flex justify-between align-end">
      <h4>1:1 문의 작성</h4>
    </div>
    <div class="notice-wrap addinquiry">
      <div class="form-wrap">
        <div class="form">
          <p>제목</p>
          <input type="text" placeholder="제목" v-model="inquiry_title" readonly />
        </div>
        <div class="form">
          <p>문의 유형</p>
          <div class="form_wrapper">
            <select disabled>
              <option value="" disabled>선택</option>
              <option
                v-for="(item, index) of InquiryTypeList"
                :key="index"
                :value="item.id"
                :disabled="item.id!=inquiry_type_id"
                :selected="item.id==inquiry_type_id"
              >
                {{ item.inquiry_type_name }}
              </option>
            </select>
           <select disabled>
              <option value="" disabled>선택</option>
              <option :disabled="item.id!=sub_type_id" :selected="item.id==sub_type_id" :value="item.id" v-for="(item,index) in InquirySubTypeList" :key="index">{{item.inquiry_subtype_name}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="image" v-if="file_name_path">
        <!-- <img src="@/assets/images/noticeimg.jpg" /> -->
        <img :src="imgBaseUrl+file_name_path" />
      </div>

      <div class="attached_file" v-if="file_name">
        <span>첨부 파일</span>
        <div class="imgname_wrap">
          <div class="imagename">
            <img src="@/assets/icon/attachedpin.svg" />
            <span>{{file_name}}</span>
          </div>
          <!-- <div class="imagename">
            <img src="@/assets/icon/attachedpin.svg" />
            <span>Client.jpg</span>
            <a href="#"><img src="@/assets/icon/cancel.svg" /></a>
          </div> -->
        </div>
      </div>
      <div class="form-wrap description_wrap mt-30">
          <div class="form">
            <p>설명</p>
            <textarea v-model="inquiry_description" placeholder="설명" readonly></textarea>
          </div>
      </div>
    </div>
    <div class="notice-wrap addinquiry">
      <div class="form-wrap datepicker">
        <div class="form">
          <div class="form_wrapper">
            <div class="wrap">
              <p>작성일</p>
              <input type="text" readonly :value="dateformat(created_date)" />
            </div>
            <div class="wrap">
              <p>답변일</p>
              <input type="text" readonly :value="dateformat(replied_at)" />
            </div>
          </div>
        </div>
      </div>
      
      <div class="image" v-if="replay_file_name">
        <!-- <img src="@/assets/images/noticeimg.jpg" /> -->
         <img :src="imgBaseUrl+replay_file_name_path" />
      </div>
      <div class="attached_file" v-if="replay_file_name">
        <span>첨부 파일 </span>
        <div class="imgname_wrap">
          <div class="imagename">
            <img src="@/assets/icon/attachedpin.svg" />
            <span>{{replay_file_name}}</span>
          </div>
          <!-- <div class="imagename">
            <img src="@/assets/icon/attachedpin.svg" />
            <span>Client.jpg</span>
            <a href="#"><img src="@/assets/icon/cancel.svg" /></a>
          </div> -->
        </div>
      </div>
      <div class="form-wrap description_wrap m-t-30" v-if="reply_text">
          <div class="form">
            <p>설명</p>
            <div class="p-text" v-html="reply_text"></div>
            <!-- <textarea v-model="reply_text" placeholder="설명" readonly></textarea> -->
          </div>
      </div>
      <div class="button-wrap fixed-button-wrap details_button">
        <button
          @click="this.$router.push(`/NoticeInquiry`)"
          type="button"
          class="bordered gray"
        >
          목록
        </button>
        <button @click="this.$router.push(`/AddInquiry`)" type="button" class="bordered blue">추가 문의하기</button>
      </div>
    </div>
  </div>
</template>


<script>
import moment from "moment";
import CustomerCenterService from "@/services/CustomerCenterService";
import Breadcrumb from "@/components/Breadcrumb.vue";
export default {
  name: "AddInquiryDetails",
  components: {
    Breadcrumb
  },
  data() {
    return {
      inquiry_id: "",
      InquiryTypeList: [],
      inquiry_type_id:'',
      inquiry_title:'',
      file_name:'',
      file_name_path:'',
      created_date:'',
      replied_at:'',
      replay_file_name:'',
      replay_file_name_path:'',
      inquiry_description:'',
      reply_text:'',
      InquirySubTypeList:'',
      sub_type_id:'',
      imgBaseUrl: process.env.VUE_APP_IMAGE_BASE_URL,
    };
  },
  created() {
    this.CustomerCenterService = new CustomerCenterService();
  },
  mounted() {
    this.inquiryDetails();
    this.dateformat();
    this.inquiryTypeList();
  },
  methods: {
    inquiryTypeList() {
      this.CustomerCenterService.inquiryTypeList()
        .then((res) => {
          if (res.status == 200) {
            // console.log(res.data.type_list);
            this.InquiryTypeList = res.data.type_list;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    inquirySubTypeList() {
      this.CustomerCenterService.inquirySubTypeList(this.inquiry_type_id)
        .then((res) => {
          if (res.status == 200) {
            // console.log(res.data.sub_type_list);
            this.InquirySubTypeList=res.data.sub_type_list;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    inquiryDetails() {
      this.inquiry_id = this.$route.params.id;
      this.CustomerCenterService.inquiryDetails(this.inquiry_id)
        .then((res) => {
          if (res.status == 200) {
            // console.log(res.data);
            this.inquiry_type_id=res.data.inquiry_type_id;
            this.sub_type_id=res.data.inquiry_subtype_id;
            this.inquiry_title=res.data.inquiry_title;
            this.file_name_path=res.data.file_name_path;
            this.file_name=res.data.file_name;
            this.created_date=res.data.created_date;
            this.replied_at=res.data.replied_at;
            this.replay_file_name=res.data.replay_file_name;
            this.replay_file_name_path=res.data.replay_file_name_path;
            this.inquiry_description=res.data.inquiry_description;
            this.reply_text=res.data.reply_text;
            this.inquirySubTypeList();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dateformat(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.p-text {
  width: 100%;
    border: 1px solid #a4a4a4;
    border-radius: 5px;
    margin-top: 10px;
    padding: 10px 20px;
}
.mt-30{
  margin-top: 30px;
}
 .attached_file{
  padding-bottom: 10px !important;
 }
</style>