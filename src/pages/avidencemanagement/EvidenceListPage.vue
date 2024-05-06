<template>
  <div class="info_protection">
    <div class="breadcrumb">
      <Breadcrumb link="dashboard" text1="Home" text2="증적관리" />
    </div>
    <div class="heading flex justify-between item-center">
      <h4>증적 목록</h4>
      <div class="history_wrap">
        <span>증적목록</span>
        <select @change="filterByGroup($event.target.value)">
          <option value="" selected disabled>전체</option>
          <option
            v-for="(item, index) in groupList"
            :value="item.id"
            :key="index"
          >
            {{ item.group_name }}
          </option>
        </select>
        <!-- <button type="button" class="apply">Apply</button> -->
        <button v-if="permission=='edit' || this.$store.state.signin.is_user_admin == 'y'"
          type="button"
          @click="this.$router.push({ name: 'EvidenceGrouping' })"
        >
          증적그룹 편집
        </button>
      </div>
    </div>

    <div class="managmenttable">
      <div class="device_wrap">
        <p>
          *증적명을 선택 하시거나 업로드된 숫자를 선택 하시면 증적을 자세하게 보실 수 있습니다 .
        </p>
        <div class="search_wrap">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            v-model="searchByCertification"
          />
          <button type="button" @click="searchCertification">검색</button>
        </div>
      </div>
      <div class="tab-style-two">
        <TabWrapper @getResponseTitle="getTitle($event)">
          <Tabs title="프리셋">
            <DataTable
              :HeadersColumn="presetHeader"
              :BodyData="evidencePresetListItems"
              :rowClickable="true"
              @clickEvent="ShowDetails($event)"
              :Page="page"
              :records="totalItems"
              :options="chunkPage"
              :perPage="limit"
              :tableMsg="tableMsg"
              @clickPaginate="myCallback($event)"
              clickCellIndex="1"
            />
          </Tabs>
          <Tabs title="증적 목록">
            <!-- <DataTable
              :HeadersColumn="EvidenceHeader"
              :BodyData="evidencePresetListItems"
              :rowClickable="true"
              @clickEvent="ShowDetails($event)"
              :Page="page"
              :records="totalItems"
              :options="chunkPage"
              :perPage="limit"
              :tableMsg="tableMsg"
              @clickPaginate="myCallback2($event)"
              clickCellIndex="1"
            /> -->
            <EvidenceTable
              :evidencePaymentHeader="evidencePaymentHeader"
              :evidenceListItems="evidenceListItems"
              :Page="page2"
              :records="totalEvidence"
              :options="chunkPage"
              :perPage="limit2"
              @clickPaginate="myCallback2($event)"
              @showEvidenceDetails="showEvidenceDetails($event)"
            />
          </Tabs>
        </TabWrapper>
      </div>
    </div>
    <div
      :class="
        activeTab == false
          ? 'button_wrap fixed-button-wrap flex justify-end'
          : 'button_wrap fixed-button-wrap flex justify-between'
      "
    >
      <div class="buttons flex justify-start" v-if="activeTab">
        <button type="button" class="gray" @click="downloadFullTrace">
         전체 증적 다운로드
        </button>
      </div>
      <div class="buttons flex justify-end">
        <!-- <button type="button">My Revision History</button> -->
        <button v-if="permission=='edit' || this.$store.state.signin.is_user_admin == 'y'"
          type="button"
          @click="
            () => {
              this.$router.push('/add-evidence');
            }
          "
        >
          증적 목록 추가
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import DataTable from "@/components/DataTable.vue";
import { presetHeader, EvidenceHeader } from "@/config/TableColData";
import EvidenceManagement from "@/services/EvidenceManagement";
import Breadcrumb from "@/components/Breadcrumb.vue";
import EvidenceTable from "@/components/EvidenceTable.vue";

export default {
  name: "EvidenceListPage",
  components: {
    Tabs,
    TabWrapper,
    DataTable,
    Breadcrumb,
    EvidenceHeader,
    presetHeader,
    EvidenceTable,
  },

  created() {
    this.evidenceManagement = new EvidenceManagement();
  },

  data() {
    return {
      InquiryList: [],
      page: 1,
      limit: 50,
      page2: 1,
      limit2: 50,
      chunkPage: { chunk: 5 },
      totalItems: 0,
      totalEvidence: 0,
      presetHeader: presetHeader,
      EvidenceHeader: EvidenceHeader,
      evidencePresetListItems: [],
      evidenceListItems: [],
      searchByCertification: "",
      tableMsg: "",
      groupList: [],
      evidencePaymentHeader: [],
      activeTab: false,
    };
  },
 computed:{
    permission(){
      return this.$store.state.sideBar.permission.evidence_list;
    }
  },
  mounted() {
    this.storePresetlistData();
    this.storeEvidenceList();
    this.EvidenceGrouplist();
  },

  methods: {
    getTitle(event) {
      this.searchByCertification = "";
      if (event == "프리셋") {
        this.activeTab = false;
        this.storePresetlistData();
      }
      if (event == "증적 목록") {
        this.activeTab = true;
        this.storeEvidenceList();
      }
      console.log(event);
    },
    getPresetList(data) {
      this.evidencePresetListItems = [];
      this.tableMsg = "Table loading...";
      this.evidenceManagement.getEvidenceListPreset(data).then((res) => {
        console.log(res);
        this.totalItems = res.data.total_records;
        if (res.status === 200) {
          this.evidencePresetListItems = [...res.data.evidence];
          this.tableMsg = "";
        } else {
          this.tableMsg = "No Data";
        }
      });
    },
    getEvidenceList(data) {
      this.evidenceListItems = [];
      this.tableMsg = "Table loading...";
      this.evidenceManagement.getEvidenceList(data).then((res) => {
        console.log(res);
        this.totalEvidence = res.data.total_records;
        if (res.data.evidence) {
          this.evidenceListItems = [...res.data.evidence];
          this.evidencePaymentHeader = res.data.payment_lines;
          this.tableMsg = "";
        } else {
          this.tableMsg = "No Data";
        }
      });
    },
    storeEvidenceList() {
      let inputdata = {
        page: this.page2,
        limit: this.limit2,
        // certification: this.$store.state.header.certificate,
      };
      this.getEvidenceList(inputdata);
    },
    storePresetlistData() {
      let inputdata = {
        page: this.page,
        limit: this.limit,
      };
      this.getPresetList(inputdata);
    },
    searchCertification() {
      let inputdata = {
        page: this.page2,
        limit: this.limit2,
        // certification: this.$store.state.header.certificate,
        search_text: this.searchByCertification,
      };
      if (this.activeTab) {
        this.getEvidenceList(inputdata);
      } else {
        this.getPresetList(inputdata);
      }
    },
    myCallback(event) {
      this.page = event;
      let inputdata = {
        page: event,
        limit: this.limit,
        searchByCertification: this.searchByCertification,
      };
      this.getPresetList(inputdata);
    },
    myCallback2(event) {
      this.page2 = event;
      let inputdata = {
        page: event,
        limit: this.limit2,
        search_text: this.searchByCertification,
      };
      this.getEvidenceList(inputdata);
    },
    ShowDetails(event) {
      console.log(event);
      this.$router.push(`/PresetDetails/${event.id}`);
    },
    showEvidenceDetails(event) {
      console.log(event);
      this.$router.push(`/DetailsOfEvidenceOne/${event}`);
    },
    EvidenceGrouplist() {
      this.evidenceManagement
        .evidenceGroupList()
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data);
            this.groupList = res.data.group_list;
          }
        })
        .catch((err) => {
          return;
        });
    },

    filterByGroup(event) {
      console.log(event);
      let inputdata = {
        page: this.page2,
        limit: this.limit2,
        // certification: this.$store.state.header.certificate,
        // search_text: this.searchByCertification,
        group_id: event,
      };
      this.getEvidenceList(inputdata);
    },

    // full trace download
    downloadFullTrace() {
      let certificate = this.$store.state.header.certificate;
      this.evidenceManagement.fullTraceDownload(certificate).then((res) => {
        console.log("full-trace-download", res);

        if (res.status == 200) {
          let path = res.data.path;
          path = path + "type=unlink";
          let data = { url: path, fileName: "full-trace" };
          this.$store.dispatch("diagnosisManagement/createDownloadFiles", data);
        }
      });
    },
  },
};
</script>

<style lang="scss"></style>
