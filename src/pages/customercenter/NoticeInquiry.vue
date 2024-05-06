<template>
  <div class="info_protection">
    <Breadcrumb link="dashboard" text1="Home" text2="고객센터"/>
    <div class="heading bordered_head flex justify-between align-end">
      <h4>1:1 문의</h4>
    </div>

    <DataTable
      :HeadersColumn="colData"
      :BodyData="InquiryList"
      :rowClickable="true"
      @clickEvent="ShowDetails($event)"
      :Page="page"
      :records="totalItems"
      :options="chunkPage"
      :perPage="limit"
      @clickPaginate="ShowPaginate($event)"
      clickCellIndex="1"
    />
    <div class="inquiry_button_wrap fixed-button-wrap">
      <button @click="this.$router.push(`/AddInquiry`)" type="button" class="bordered grey">1:1 문의하기</button>
    </div>
  </div>
</template>


<script>
import moment from "moment";
import DataTable from "@/components/DataTable.vue";
import CustomerCenterService from "@/services/CustomerCenterService";
import Breadcrumb from "@/components/Breadcrumb.vue";
export default {
  name: "NoticeInquiry",
  components: {
    DataTable,
    Breadcrumb
  },
  data() {
    return {
      InquiryList: [],
      page: 1,
      limit: 50,
      chunkPage: { chunk: 5 },
      totalItems: 0,
      colData: [
        {
          name: "No",
          id: "no",
          isSortable: false,
          type: "number",
        },
        {
          name: "제목",
          id: "inquiry_title",
          isSortable: false,
          type: "text",
        },
        {
          name: "작성자",
          id: "writer_name",
          isSortable: false,
          type: "text",
        },
        {
          name: "작성일",
          id: "created_date",
          isSortable: false,
          type: "text",
        },
        {
          name: "답변여부",
          id: "answer_or_not",
          isSortable: false,
          type: "text",
        },
        {
          name: "답변일",
          id: "reply_date",
          isSortable: false,
          type: "text",
        },
      ],
    };
  },
  created() {
    this.CustomerCenterService = new CustomerCenterService();
  },
  mounted() {
    this.allInquiryList();
    this.dateformat();
  },
  methods: {
    ShowPaginate(e) {
      this.myCallback(e);
    },
    myCallback(ClickPage) {
      this.page = ClickPage;
      this.allInquiryList();
    },

    allInquiryList() {
      this.CustomerCenterService.inquiryList(this.page, this.limit)
        .then((res) => {
          if (res.status == 200) {
            // console.log(res.data.inquiry);
            this.InquiryList = res.data.inquiry;
            this.totalItems = res.data.total_records;
            for (let i = 0; i < this.InquiryList.length; i++) {
              this.InquiryList[i]["no"] = this.totalItems - i - (this.page - 1) * this.limit;
            }
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
    ShowDetails(event) {
      console.log(event);
      if(event.answer_or_not=='Waiting for reply') {
        this.$router.push(`/editInquiry/${event.id}`);
      }
      else {
        this.$router.push(`/AddInquiryDetails/${event.id}`);
      }
    },
  },
};
</script>


<style lang="scss">
</style>