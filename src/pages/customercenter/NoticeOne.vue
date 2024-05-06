<template>
  <div class="info_protection">
    <Breadcrumb link="dashboard" text1="Home" text2="고객센터"/>
    <div class="heading bordered_head flex justify-between align-end">
      <h4>공지사항</h4>
    </div>

    <DataTable
      :HeadersColumn="colData"
      :BodyData="NoticeList"
      :rowClickable="true"
      @clickEvent="ShowDetails($event)"
      :Page="page"
      :records="totalItems"
      :options="chunkPage"
      :perPage="limit"
      @clickPaginate="ShowPaginate($event)"
      clickCellIndex="1"
    />
  </div>
</template>


<script>
import CustomerCenterService from "@/services/CustomerCenterService";
import DataTable from "@/components/DataTable.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import Toast from "@/alert/alert.js";
export default {
  name: "NoticeOne",
  components: {
    DataTable,
    Breadcrumb
  },
  data() {
    return {
      NoticeList: [],
      page: 1,
      limit: 50,
      totalItems: 0,
      chunkPage: { chunk: 5 },
      colData: [
        {
          name: "No",
          id: "no",
          isSortable: false,
          type: "number",
        },
        {
          name: "제목",
          id: "notice_title",
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
          type: "date",
        },
        {
          name: "조회수",
          id: "no_views",
          isSortable: false,
          type: "number",
        },
      ],
    };
  },
  created() {
    this.CustomerCenterService = new CustomerCenterService();
  },
  mounted() {
    this.allNoticeList();
    // this.dateformat();
  },
  methods: {
    ShowPaginate(e) {
      this.myCallback(e);
    },
    myCallback(ClickPage) {
      this.page = ClickPage;
      this.allNoticeList();
    },

    allNoticeList() {
      this.CustomerCenterService.noticeList(this.page, this.limit)
        .then((res) => {
          if (res.status == 200) {
            // console.log(res.data.notice);
            this.NoticeList = res.data.notice;
            this.totalItems = res.data.total_records;
            for (let i = 0; i < this.NoticeList.length; i++) {
              this.NoticeList[i]["no"] = this.totalItems - i - (this.page - 1) * this.limit;
            }
          }
          else if (res.response.status == 401) {
              Toast.fire({ title: res.response.data.error });
            }
        })
        .catch((err) => {
          return false;
        });
    },
    ShowDetails(event) {
      // console.log(event.id);
      this.$router.push(`/NoticeDetails/${event.id}`);
    },
  },
};
</script>


<style lang="scss">
</style>