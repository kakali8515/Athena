<template>
  <div class="info_protection">
    <div class="breadcrumb">
      <Breadcrumb link="dashboard" text1="Home" text2="위험 관리" />
    </div>
    <div class="heading flex justify-between item-center">
      <h4>위험관리수준 선정</h4>
      <div class="history_wrap">
        <button type="button" @click="openCalculationModal">평가기준</button>
      </div>
    </div>

    <div class="managmenttable">
      <div class="riskmanagmentlabelwrap">
        <div class="riskmanagment">
          <span>위험관리수준 (DoA)</span>
          <h4 v-if="doa > 0">{{ doa }}</h4>
          <div class="buttons">
            <select
              @change="doaLevel($event)"
              v-if="
                permission == 'edit' ||
                this.$store.state.signin.is_user_admin == 'y'
              "
            >
              <option>선택</option>
              <option :selected="doa == 1">1</option>
              <option :selected="doa == 2">2</option>
              <option :selected="doa == 3">3</option>
              <option :selected="doa == 4">4</option>
              <option :selected="doa == 5">5</option>
              <option :selected="doa == 6">6</option>
              <option :selected="doa == 7">7</option>
              <option :selected="doa == 8">8</option>
              <option :selected="doa == 9">9</option>
            </select>
            <button
              type="button"
              v-if="
                permission == 'edit' ||
                this.$store.state.signin.is_user_admin == 'y'
              "
              @click="getChartData"
            >
              설정
            </button>
          </div>
        </div>
        <div class="list">
          <ul>
            <li>
              <img src="@/assets/icon/dropdown.svg" />If DoA 미설정 시 완료된
              자산의 최소 위험도로 자동설정 됩니다.
            </li>
            <li>
              <img src="@/assets/icon/dropdown.svg" />DoA에 따라 정보보호 계획
              자동으로 변경됩니다.
            </li>
            <li><img src="@/assets/icon/dropdown.svg" />DoA 미만: 위험수용</li>
            <li><img src="@/assets/icon/dropdown.svg" />DoA 이상: 조치예정</li>
          </ul>
        </div>
      </div>

      <div class="graph-area">
        <apexchart width="800" :options="options" :series="series"></apexchart>
      </div>

      <div class="datatable_wrap_new protection_table">
        <div class="tab-content" id="tabs-tabContent">
          <div
            class="tab-pane fade show active"
            id="tabs-one"
            role="tabpanel"
            aria-labelledby="tabs-one-tab"
          >
            <div class="flex flex-col">
              <div class="overflow-x-auto protection_table">
                <div class="inline-block min-w-full">
                  <div class="overflow-hidden">
                    <table class="min-w-full text-center">
                      <thead class="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            class="text-sm font-medium text-gray-900 px-6 py-4"
                          >
                            영역
                          </th>
                          <th
                            scope="col"
                            class="text-sm font-medium text-gray-900 px-6 py-4"
                            v-for="(item, index) in colData"
                            :key="index"
                          >
                            <div :id="index + 1">
                              {{ item.name }}
                            </div>
                          </th>
                          <th
                            scope="col"
                            class="text-sm font-medium text-gray-900 px-6 py-4"
                          >
                            총 위험개수
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-if="mgmntData.length">
                          <td
                            class="text-sm text-gray-900 font-light px-6 py-4 bg-white border-b"
                          >
                            관리보안 (ISMS)
                          </td>
                          <td
                            class="text-sm text-gray-900 font-light px-6 py-4 bg-white border-b"
                            v-for="(item, index) in mgmntData"
                            :key="index"
                          >
                            {{ item.count }}
                          </td>
                          <td
                            class="text-sm text-gray-900 font-light px-6 py-4 bg-white border-b"
                          >
                            {{ mgmntCount }}
                          </td>
                        </tr>
                        <tr v-if="techData.length">
                          <td
                            class="text-sm text-gray-900 font-light px-6 py-4 bg-white border-b"
                          >
                            기술보안
                          </td>
                          <td
                            class="text-sm text-gray-900 font-light px-6 py-4 bg-white border-b"
                            v-for="(item, index) in techData"
                            :key="index"
                          >
                            {{ item.count }}
                          </td>
                          <td
                            class="text-sm text-gray-900 font-light px-6 py-4 bg-white border-b"
                          >
                            {{ techCount }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <CalculationStandardmodal
    v-if="isCalculation"
    @close="closeCalculationStandard"
  />
   <div class="page-loader" v-if="isLoading">
    <div class="loader"></div>
  </div>
</template>

<script>
import DataTable from "@/components/DataTable.vue";
import { riskMgmntCol } from "@/config/TableColData";
import Breadcrumb from "@/components/Breadcrumb.vue";
import RiskMgmntService from "@/services/RiskMgmntService";
import CalculationStandardmodal from "@/components/modals/CalculationStandardmodaltwo.vue";

export default {
  name: "SelectionRiskManagementlevel",
  el: "#appl",
  components: {
    DataTable,
    Breadcrumb,
    CalculationStandardmodal,
  },
  data() {
    return {
      isLoading: true,
      InquiryList: [],
      page: 1,
      limit: 50,
      chunkPage: { chunk: 2 },
      totalItems: 0,
      doa: "",
      mData: "",
      colData: riskMgmntCol,
      managementAreaData: [],
      technicalAreaData: [],
      lineData: [
        [0, 1],
        [0, 1],
      ],
      options: {
        colors: ["#F6C739", "#007AFF", "#EC3007"],
        chart: {
          height: 500,
          zoom: {
            enabled: false,
            type: "xy",
          },
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          type: "category1",
          labels: {
            style: {
              fontSize: "10px",
            },
          },
          tickAmount: 5,
          // tickPlacement: 'between'
        },
        yaxis: {
          type: "category2",
          tickAmount: 6,
          min: 3,
          max: 9,
        },
        markers: {
          size: 4,
          radius: 0,
          strokeWidth: 0,
          shape: ["square", "circle", "circle"],
        },
        legend: {
          // height: 30,
          position: "right",
        },
        grid: {
          xaxis: {
            lines: {
              show: true,
              borderColor: "#90A4AE",
            },
          },
        },
      },
      series: [
        { name: "관리영역", type: "scatter", data: "" },
        { name: "기술영역", type: "scatter", data: "" },
        { name: "DoA", type: "line", data: "" },
      ],
      areaData: [],
      mgmntData: [],
      techData: [],
      mgmntCount: "",
      techCount: "",
      isCalculation: false,
    };
  },
  created() {
    this.riskMgmntService = new RiskMgmntService();
    this.series[0].data = this.managementAreaData;
    this.series[1].data = this.technicalAreaData;
    this.series[2].data = this.lineData;
    this.getDoa();
    // this.getChartData();
    // this.getGraphList();
    // console.log(this.doa);
  },
  computed: {
    permission() {
      return this.$store.state.sideBar.permission.risk_management_level;
    },
  },
  updated() {
    this.series[2].data = this.lineData;
  },
  watch: {
    "$store.state.header.certificate": function (newVal, oldVal) {
      if (newVal != oldVal && newVal) {
        this.getDoa();
        this.getChartData();
        this.getGraphList();
      }
    },
  },
  methods: {
    doaLevel(event) {
      this.doa = event.target.value;
      this.getChartData();
    },

    // doa value
    getDoa() {
      this.riskMgmntService
        .fetchDoa(this.$store.state.header.certificate)
        .then((res) => {
          if (res.status == 200) {
            this.doa = res.data.doa_value.toString();
            this.getChartData();
            // this.getGraphList();
            console.log("this.doa-------------->", this.doa);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // chart
    getChartData() {
      this.isLoading = true;
      if (this.doa > 0) {
        this.riskMgmntService
          .chartData(this.$store.state.header.certificate, this.doa)
          .then((res) => {
            this.isLoading = false;
            if (res.status == 200) {
              this.areaData = res.data;
              this.getGraphList();
              this.lineData[0][1] = this.doa;
              this.lineData[1][1] = this.doa;
              for (let i = 0; i < res.data.managementAreaList.length; i++) {
                let arr = [];
                arr.push(res.data.managementAreaList[i].count);
                arr.push(res.data.managementAreaList[i].risk);
                this.managementAreaData.push(arr);
              }
              // console.log(this.managementAreaData)
              for (let i = 0; i < res.data.technicalAreaList.length; i++) {
                let arr = [];
                arr.push(res.data.technicalAreaList[i].count);
                arr.push(res.data.technicalAreaList[i].risk);
                this.technicalAreaData.push(arr);
              }
              // console.log(this.technicalAreaData)
              let a = Math.max.apply(
                null,
                this.managementAreaData.toString().split(",").map(Number)
              );
              let b = Math.max.apply(
                null,
                this.technicalAreaData.toString().split(",").map(Number)
              );

              if (a > b) {
                this.mData = a;
                this.lineData[1][0] = this.mData;
                // console.log(this.mData)
              } else {
                this.mData = b;
                this.lineData[1][0] = this.mData;
                // console.log(this.mData)
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    // table data
    getGraphList() {
      this.riskMgmntService
        .graphList(this.$store.state.header.certificate, this.doa)
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data);
            this.mgmntCount = res.data.resManagementTotal;
            this.techCount = res.data.resTechnicalTotal;

            this.mgmntData = Object.values(res.data)[1];
            this.techData = Object.values(res.data)[3];
            this.mgmntData.map((item) => {
              if (item.count == 0) {
                item.count = "-";
              }
            });
            this.techData.map((item) => {
              if (item.count == 0) {
                item.count = "-";
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    openCalculationModal() {
      this.isCalculation = true;
    },

    closeCalculationStandard() {
      this.isCalculation = false;
    },
  },
};
</script>

<style lang="scss">
.apexcharts-legend {
  top: auto !important;
  bottom: 18px !important;
}
.page-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
