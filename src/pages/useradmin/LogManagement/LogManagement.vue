<template>
  <div class="info_protection UserAdmin">
    <div class="breadcrumb">
      <Breadcrumb link="dashboard" text1="Home" text2="관리자" />
    </div>
    <div class="heading flex justify-between align-end">
      <h4>로그관리</h4>
    </div>
    <div class="policy_setting_wrap">
      <div class="datatable_head flex justify-between flex-wrap item-center">
        <div class="oneside margin-break flex justify-end items-center w-full">
          <datepicker
            :startDate="date"
            :endDate="dateEnd"
            @StartDate="getStartDate($event)"
            @EndDate="getEndDate($event)"
          />
        </div>
        <div class="oneside flex justify-start">
          <div class="flex items-center">
            <p class="grow mr-2.5">ID</p>
            <select
              @change="getUserName($event)"
              :disabled="!end_date"
              v-model="logUserSelect"
            >
              <option disabled selected :value="undefined">선택</option>
              <option
                v-for="(item, index) of logUser"
                :key="index"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="flex items-center">
            <p class="grow mr-2.5">이벤트 유형</p>
            <select class="m-r-0"
              @change="getEventList($event)"
              :disabled="!end_date"
              v-model="logEventSelect"
            >
              <option disabled selected :value="undefined">선택</option>
              <option
                v-for="(item, index) in Object.entries(logEvent)"
                :value="item[0]"
                :key="index"
              >
                {{ item[1] }}
              </option>
            </select>
            <SortingDropdown
              :obj="logFilterData"
              @selectedCol="selectedCol"
              @selectedOrd="selectedOrd"
            />
          </div>
        </div>
        <div class="oneside flex justify-start gap-x-3">
          <p>이벤트 결과</p>
          <div class="radio-group">
            <input
              type="checkbox"
              id="IP-access-control-1"
              class="mr-2.5"
              :disabled="!end_date"
              v-model="eventSuccess"
              @change="successCheck($event)"
            />
            <label for="IP-access-control-1">성공</label>
          </div>
          <div class="radio-group">
            <input
              type="checkbox"
              id="IP-access-control-2"
              class="mr-2.5"
              :disabled="!end_date"
              v-model="eventFali"
              @change="failCheck($event)"
            />
            <label for="IP-access-control-2">실패</label>
          </div>
        </div>
      </div>
    </div>
    <div class="m-t-0">
      <DataTable
        :HeadersColumn="columnData"
        :BodyData="rowData"
        :Page="page"
        :records="totalItems"
        :options="chunkPage"
        :perPage="limit"
        @clickPaginate="myCallback($event)"
      />
    </div>
    <div class="button_wrap fixed-button-wrap flex justify-between">
      <div class="buttons flex justify-start">
        <button
          type="button"
          class="gray"
          @click="getSaveLog"
          :disabled="!start_date || !end_date ? true : false"
        >
          로그저장
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "@/components/DataTable.vue";
import { logUserCol } from "@/config/TableColData";
import userAdmin from "@/services/userAdmin";
import datepicker from "@/components/RangeDatePicker.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { logFilterData } from "@/config/SortingDropdownData";
import SortingDropdown from "@/components/SortingDropdown.vue";
export default {
  name: "LogManagement",
  components: {
    DataTable,
    datepicker,
    Breadcrumb,
    SortingDropdown,
  },
  data() {
    return {
      page: 1,
      limit: 50,
      totalItems: 0,
      chunkPage: { chunk: 5 },
      columnData: logUserCol,
      rowData: [],
      logUser: [],
      logEvent: [],
      logUserSelect: undefined,
      logEventSelect: undefined,
      eventSuccess: false,
      eventFali: false,
      start_date: "",
      end_date: "",
      user_id: "",
      result_success: "0",
      result_fail: "0",
      type: "",
      date: "",
      dateEnd: "",
      logFilterData: logFilterData,
      sort_by: "",
      sortOrder: "",
    };
  },

  created() {
    this.userAdmin = new userAdmin();
  },

  mounted() {
    this.getLogUserList();
    this.getLogEventList();
  },
  methods: {
    selectedCol(value) {
      this.sort_by = value;
      if (this.start_date && this.end_date) {
        this.getLogManagementList();
      }
    },
    selectedOrd(value) {
      this.sortOrder = value;
      if (this.start_date && this.end_date) {
        this.getLogManagementList();
      }
    },
    getStartDate(event) {
      this.start_date = event;
      // console.log(this.start_date);
    },
    getEndDate(event) {
      this.end_date = event;
      // console.log(this.end_date);
      this.getLogManagementList();
      if (!event) {
        this.logUserSelect = undefined;
        this.logEventSelect = undefined;
        this.eventSuccess = false;
        this.eventFali = false;
      }
    },

    // dropdown onchange event
    getEventList(event) {
      this.type = event.target.value;
      this.getLogManagementList();
      // console.log(event.target.value);
    },
    getUserName(event) {
      this.user_id = event.target.value;
      this.getLogManagementList();
      // console.log(event.target.value);
    },

    // checkbox event
    successCheck(event) {
      if (event.target.checked == true) {
        this.result_success = "1";
        this.getLogManagementList();
      } else {
        this.result_success = "0";
        this.getLogManagementList();
      }
    },
    failCheck(event) {
      if (event.target.checked == true) {
        this.result_fail = "1";
        this.getLogManagementList();
      } else {
        this.result_fail = "0";
        this.getLogManagementList();
      }
    },

    // log user dropdown list name
    getLogUserList() {
      this.userAdmin
        .logUserList()
        .then((res) => {
          if (res.status == 200) {
            this.logUser = res.data.user_list;
          }
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    // log user event dropdown list
    getLogEventList() {
      this.userAdmin
        .logEventList()
        .then((res) => {
          if (res.status == 200) {
            this.logEvent = res.data.list;
          }
        })
        .catch((err) => {
          // console.log(err);
        });
    },

    // log management list

    getLogManagementList() {
      this.userAdmin
        .logManagementList(
          this.start_date,
          this.end_date,
          this.page,
          this.limit,
          this.user_id,
          this.result_success,
          this.result_fail,
          this.type,
          this.sort_by,
          this.sortOrder
        )
        .then((res) => {
          if (res.status == 200) {
            this.rowData = res.data.log;
            this.totalItems = res.data.total_records;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // save log
    getSaveLog() {
      this.userAdmin
        .saveLog(
          this.start_date,
          this.end_date,
          this.user_id,
          this.result_success,
          this.result_fail,
          this.type,
          this.sort_by,
          this.sortOrder
        )
        .then((res) => {
          if (res.status == 200) {
            this.JsonData = res.data;
            // console.log(res);
            let path = res.data.path;
            path = path + "type=unlink";
            let data = { url: path, fileName: "Evidence" };
            this.$store.dispatch(
              "diagnosisManagement/createDownloadFiles",
              data
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    },

    // pagination callback
    myCallback(clickPage) {
      this.page = clickPage;
      this.getLogManagementList();
    },
  },
};
</script>


<style lang="scss">
.date_input_wrap {
  margin-right: 30px;

  &:last-child {
    margin: 0;
  }

  .date_input {
    min-width: 220px;
    height: 36px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 16px;
    font-weight: 500;
    color: #828282;
    border: 1px solid #cfcfcf;
  }
}
.w-full{
  width:100% !important;
}
</style>
