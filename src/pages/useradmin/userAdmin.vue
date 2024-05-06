<template>
  <div class="info_protection UserAdmin">
    <Breadcrumb link="dashboard" text1="Home" text2="관리자" />
    <div class="heading flex justify-between align-end">
      <h4>사용자관리</h4>
    </div>
    <div class="policy_setting_wrap">
      <div class="datatable_head flex justify-between">
        <div class="oneside flex justify-start">
          <SortingDropdown :obj="userFilterData" @selectedCol="selectedCol" @selectedOrd="selectedOrd" />
          <!-- <select @change="getdropdownValue($event)" v-model="searchKey">
            <option disabled selected>선택</option>
            <option v-for="(value, name, index) in userFilterData" :key="index" :value="name">
              {{ value }}
            </option>
          </select>
          <select v-model="sortOrder">
            <option disabled selected>선택</option>
            <option value="asc"> Ascending </option>
            <option value="desc"> Descending </option>
          </select> -->
          <div class="flex flex-col">
            <div class="flex justify-between mr-4">
              <div class="search_wrap flex justify-between mr-4">
                <button type="button" class="userAdmin-search-icon">
                  <img src="@/assets/icon/Search.svg" />
                </button>
                <input type="text" placeholder="입력" v-model="searchBy" />
              </div>
              <div class="buttons">
                <button type="button" class="gray" @click="searchResult">
                  확인
                </button>
              </div>
            </div>
            <span class="error-msg" v-if="error">{{ error }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="m-t-0">
      <!-- <div class="limit_wrap">
        <select @change="changeLimit($event)">
          <option>25</option>
          <option>50</option>
        </select>
      </div> -->
      <!-- <TableLimit @newLimit="getLimit"/> -->
      <DataTable :HeadersColumn="colData" :BodyData="rowData" :rowClickable="true" @clickEvent="ShowDetails($event)"
        :Page="page" :records="totalItems" :options="chunkPage" :perPage="limit" @clickPaginate="myCallback($event)"
        clickCellIndex="2" />
    </div>
    <div class="button_wrap fixed-button-wrap flex justify-between">
      <div class="buttons flex justify-start">
        <!-- <button type="button" class="gray">Set Payment Order</button> -->
      </div>
      <div class="buttons flex justify-end w-100">
        <button type="button" class="gray" @click="$router.push({ name: 'AddPermissionClasification' })" v-if="
          permission2 == 'edit' ||
          this.$store.state.signin.is_user_admin == 'y'
        ">
          권한분류추가
        </button>
        <button v-if="
          permission2 == 'edit' ||
          this.$store.state.signin.is_user_admin == 'y'
        " type="button" class="gray" @click="$router.push({ name: 'permissionClassificationManagement' })">
          권한분류관리
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import DataTable from "@/components/DataTable.vue";
import { userAdminCol } from "@/config/TableColData";
import Breadcrumb from "@/components/Breadcrumb.vue";
// API Service
import userAdmin from "@/services/userAdmin";
import TableLimit from "@/components/LimitDropdown.vue";
import SortingDropdown from "@/components/SortingDropdown.vue"
export default {
  name: "ThreatAnalysisSelection",
  components: {
    DataTable,
    Breadcrumb,
    TableLimit,
    SortingDropdown
  },

  data() {
    return {
      page: 1,
      limit: 50,
      totalItems: 0,
      chunkPage: { chunk: 5 },
      rowData: [],
      userFilterData: [],
      colData: userAdminCol,
      searchBy: "",
      searchKey: "선택",
      error: "",
      sortOrder: "선택"
    };
  },
  created() {
    this.userAdmin = new userAdmin();
  },
  computed: {
    permission2() {
      return this.$store.state.sideBar.permission.user_management;
    },
  },
  mounted() {
    this.UserAdminData();
    this.userFilterList();
    console.log(this.UserAdminData())
  },
  methods: {
    // getLimit(value){
    //   this.userData(this.page, value);
    // },
    selectedCol(value) {
      this.searchKey = value;
      // console.log(value)
    },
    selectedOrd(value) {
      this.sortOrder = value;
      // console.log(value)
    },
    ShowDetails(event) {
      if (
        this.permission2 == "edit" ||
        this.$store.state.signin.is_user_admin == "y"
      ) {
        if (event.certification_status == "active") {
          this.$router.push(`/user-aprove-complete/${event.id}`);
        } else if (event.certification_status == "inactive") {
          this.$router.push(`/user-aprove-pending/${event.id}`);
        }
      }
    },

    getdropdownValue(event) {
      this.searchKey = event.target.value;
    },

    updated() {
      this.UserAdminData();
      this.userData();
    },

    myCallback(ClickPage) {
      this.page = ClickPage;
      this.UserAdminData();
    },

    // API call

    // common for search and and uster table data
    userData(page, limit, searchKey, searchBy, sortBy, sortOrder) {
      this.userAdmin
        .getUserData(page, limit, searchKey, searchBy, sortBy, sortOrder)
        .then((res) => {
          if (res.status == 200) {
            this.rowData = res.data.user;
            this.totalItems = res.data.total_records;
            for (let i = 0; i < this.rowData.length; i++) {

              this.rowData[i]["no"] = (this.page - 1) * this.limit + i + 1;

              if (this.rowData[i].is_authenticator_enable == "n") {
                this.rowData[i].login_otp_enabled = "Off";
              } else {
                this.rowData[i].login_otp_enabled = "On";
              }

              if (this.rowData[i].access_date) {
                this.rowData[i].user_access_date = this.rowData[i].access_date;
              } else {
                this.rowData[i].user_access_date = "-";
              }

              if (this.rowData[i].status == "active") {
                this.rowData[i].user_status = "활성";
              }
              else if (this.rowData[i].status == "inactive") {
                this.rowData[i].user_status = "비활성";
              }
              else {
                this.rowData[i].user_status = this.rowData[i].status;
              }

              if (this.rowData[i].certification_status == "active") {
                this.rowData[i].user_certification_status = "활성";
              }
              else if (this.rowData[i].certification_status == "inactive") {
                this.rowData[i].user_certification_status = "비활성";
              }
              else if (this.rowData[i].certification_status == "rejected") {
                this.rowData[i].user_certification_status = "거절";
              }
              else {
                this.rowData[i].user_certification_status = this.rowData[i].certification_status;
              }

            }
          }
        })
        .catch((err) => {
          return;
        });
    },
    // Get user data
    UserAdminData() {
      this.userData(this.page, this.limit);
    },
    // get search result
    searchResult() {
      if (
        this.searchKey == "is_authenticator_enable" &&
        (this.searchBy == "on" ||
          this.searchBy == "off" ||
          this.searchBy == "Off" ||
          this.searchBy == "On")
      ) {
        this.error = "Y 혹은 N만 입력 가능합니다";
      } else {
        this.error = "";
        // if (this.searchBy == "") {
        //   return;
        // }
        this.userData(this.page, this.limit, this.searchKey, this.searchBy, this.searchKey, this.sortOrder);
      }
    },
    // get filer list
    userFilterList() {
      this.userAdmin
        .userFilterList()
        .then((res) => {
          if (res.status == 200) {
            this.userFilterData = res.data;
          }
        })
        .catch((err) => {
          return;
        });
    },
  },
};
</script>


<style lang="scss">

</style>