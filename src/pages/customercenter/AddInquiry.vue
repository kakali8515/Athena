<template>
  <div class="info_protection">
    <Breadcrumb link="dashboard" text1="Home" text2="고객센터" text3="1:1문의하기"/>
    <div class="heading bordered_head flex justify-between align-end">
      <h4>1:1 문의 작성</h4>
    </div>
    <div class="notice-wrap addinquiry">
      <form
        action=""
        @submit="(e) => e.preventDefault()"
        enctype="multipart/form-data"
      >
        <div class="form-wrap">
          <div class="form">
            <p>제목</p>
            <input
              type="text"
              v-model="inquiry_title"
              placeholder="제목"
              required
            />
            <span class="error-msg">{{ error.inquiry_title }}</span>
          </div>
          <div class="form">
            <p>문의 유형</p>
            <div class="form_wrapper">
              <select @change="getTypeId" v-model="inquiry_type" required>
                <option value="" disabled>선택</option>
                <option
                  v-for="(item, index) of InquiryTypeList"
                  :key="index"
                  :value="item.id"
                >
                  {{ item.inquiry_type_name }}
                </option>
              </select>
              <select v-model="sub_type_id">
              <option value="" disabled>선택</option>
              <option :value="item.id" v-for="(item,index) in InquirySubTypeList" :key="index">{{item.inquiry_subtype_name}}</option>
            </select>
            </div>
            <span class="error-msg">{{ error.inquiry_type }}</span>
          </div>
        </div>
      <div class="image">
        <img v-if="url" :src="url" />
        <a v-if="pdfurl" :href="pdfurl" target="_blank">{{fileName}}</a>
      </div>
      <div class="attached_file">
        <span>첨부 파일</span>
        <div class="flex justify-start">
        <div class="flex flex-direction">
        <input
          type="text" v-model="fileName" readonly
          placeholder="(파일은 최대 20mb까지 업로드 가능합니다)"
        />
        <span class="fileErrorMsg">{{ errorMsg }}</span>
        </div>
        <div class="attached_wrapper">
          <button type="button">파일 첨부</button>
          <input type="file" v-on:change="onFileChange" required />
        </div>
        </div>
        
      </div>

      <div class="form-wrap description_wrap">
          <div class="form">
            <p>설명</p>
            <textarea v-model="inquiry_details" placeholder="설명"></textarea>
          </div>
          <span class="error-msg">{{ error.inquiry_details }}</span>
      </div>
      <div class="button-wrap fixed-button-wrap">
        <button type="button" class="bordered"  @click="submitData">완료</button>
      </div>
      </form>
    </div>
  </div>
</template>


<script>
import CustomerCenterService from "@/services/CustomerCenterService";
import { errorMsg } from "@/config/Message";
import validator from "validator";
import Breadcrumb from "@/components/Breadcrumb.vue";
import inquiryValidation from "@/validation/inquiryValidation";
export default {
  name: "AddInquiry",
  components: {
    Breadcrumb
  },
  data() {
    return {
      inquiry_title: "",
      inquiry_type: "",
      InquiryTypeList: [],
      fileName: "",
      file: "",
      files: null,
      errorMsg: "",
      render: false,
      url: null,
      pdfurl: null,
      fileExtension: "",
      fileSize: "",
      error: {},
      inquiry_details:"",
      InquirySubTypeList:"",
      sub_type_id:"",
    };
  },
  created() {
    this.CustomerCenterService = new CustomerCenterService();
  },
  mounted() {
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
    getTypeId() {
      this.inquirySubTypeList();
    },
    inquirySubTypeList() {
      this.CustomerCenterService.inquirySubTypeList(this.inquiry_type)
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data.sub_type_list);
            this.InquirySubTypeList=res.data.sub_type_list;
            // this.InquirySubTypeList = res.data.type_list;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.file = files[0];
      this.fileSize = e.target.files[0].size;
      let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
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
        // console.log(this.fileExtension);
        if (this.fileExtension == "pdf") {
          this.url = "";
          this.pdfurl = URL.createObjectURL(e.target.files[0]);
        } else {
          this.url = URL.createObjectURL(e.target.files[0]);
          this.pdfurl = "";
        }
      }
      this.errorMsg = "";
    },

    checkError() {
      let credential = {
        inquiry_title: this.inquiry_title,
        inquiry_type: this.inquiry_type,
        inquiry_details: this.inquiry_details,
        sub_type_id:this.sub_type_id
      };

      const { isInvalid, error } = inquiryValidation(credential);

      if (isInvalid) {
        this.error = error;
        return false;
      } else {
        this.error = {};
        return true;
      }
    },
    async submitData() {
      if(!this.checkError()) {
        return;
      } else {
        let formData = new FormData();
        formData.append("inquiry_title", this.inquiry_title);
        formData.append("company_id", localStorage.getItem("compid"));
        formData.append("inquiry_type", this.inquiry_type);
        formData.append("inquiry_subtype", this.sub_type_id);
        formData.append("inquiry_details", this.inquiry_details);
        formData.append("file_name", this.file);
        // const data1 = await axios.post("/inquery/add", formData);
        try {
          const res = await axios.post("/inquiry/add", formData);
          this.$router.push(`/NoticeInquiry`);
        } catch (error) {
          return;
        }
      }
    },
  },
};
</script>


<style lang="scss">
</style>