<template>
  <div class="info_protection">
    <!-- <div class="breadcrumb">
      <p><a href="#">Home </a><span>></span> diagnosis management</p>
    </div>
    <div class="heading flex justify-between align-end">
      <h4>Establishment and operation of management system</h4>
      <div class="history_wrap">
        <button type="button">Detailed result</button>
      </div>
    </div> -->
    <div class="chart_wrap">
      <div class="all_level_wrap flex justify-start">
        <div class="singlelevel noticeboardchart" v-if="showNotice == 'y'">
          <h4>공지사항</h4>
          <div class="chart">
            <table class="min-w-full text-center border">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                    No
                  </th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                    제목
                  </th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                    작성자
                  </th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                    작성일
                  </th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                    조회수
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b" v-for="(item, index) in noticeList" :key="index" @click="ShowDetails($event,item)">
                  <td class="text-sm text-gray-900 font-light px-6 py-4">
                    {{ (current - 1) * limit + index + 1 }}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4">
                    {{ item.notice_title }}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4">
                    {{ item.writer_name }}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4">
                    {{
                    item.created_date ? item.created_date.slice(0, 10) : ""
                    }}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4">
                    {{ item.no_views }}
                  </td>
                </tr>
                <!-- <tr class="bg-white border-b">
                  <td class="text-sm text-gray-900 font-light px-6 py-4">9</td>
                  <td class="blue text-sm text-gray-900 font-light px-6 py-4">
                    consectetur
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4">
                    Cody
                  </td>
                  <td class="blue text-sm text-gray-900 font-light px-6 py-4">
                    2020-08-04
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4">
                    9631
                  </td>
                </tr>
                <tr class="bg-white border-b">
                  <td class="text-sm text-gray-900 font-light px-6 py-4">8</td>
                  <td class="blue text-sm text-gray-900 font-light px-6 py-4">
                    fringilla
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4">
                    Darlene
                  </td>
                  <td class="blue text-sm text-gray-900 font-light px-6 py-4">
                    2020-08-04
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4">
                    13671
                  </td>
                </tr>
                <tr class="bg-white border-b">
                  <td class="text-sm text-gray-900 font-light px-6 py-4">7</td>
                  <td class="blue text-sm text-gray-900 font-light px-6 py-4">
                    viverra
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4">
                    Shane
                  </td>
                  <td class="blue text-sm text-gray-900 font-light px-6 py-4">
                    2020-08-04
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4">
                    20079
                  </td>
                </tr>
                <tr class="bg-white border-b">
                  <td class="text-sm text-gray-900 font-light px-6 py-4">6</td>
                  <td class="blue text-sm text-gray-900 font-light px-6 py-4">
                    augue
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4">
                    Mitchell
                  </td>
                  <td class="blue text-sm text-gray-900 font-light px-6 py-4">
                    2020-08-04
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4">
                    95554
                  </td>
                </tr> -->
              </tbody>
            </table>
          </div>
        </div>
        <div class="singlelevel" v-if="showSchedule == 'y'">
          <!-- <h4>Security level by area (%)</h4> -->
          <!-- <h4 class="text-center">Year 2022</h4> -->
          <!-- <div class="chart">
            <apexchart
              type="rangeBar"
              height="350"
              :options="scheduleChartOptions"
              :series="scheduleSeries"
            ></apexchart>
          </div> -->
          <div class="calender">
            <FullCalendar :options="calendarOptions" />
          </div>
        </div>
        <div class="singlelevel" v-if="showAsset == 'y'">
          <h4>자산관리</h4>
          <div class="chart chart-style assetchart-style">
            <apexchart type="donut" :options="assetChartOptions" :series="assetSeries" height="350"></apexchart>
          </div>
        </div>
        <div class="singlelevel" v-if="showDiagnos == 'y'">
          <h4>진단관리</h4>
          <DynamicColumnChartOne :chartCategories="diagnosisCategories" :chartSeries="diagnosisSeries"
            :colors="diagnosisColors" :count="diagnosisCount" />
        </div>
        <div class="singlelevel" v-if="showRisk == 'y'">
          <h4>위험관리</h4>
          <div>
            <input type="radio" name="risk" id="" value="management" v-model="areaType" />
            <label class="inputLabel">관리영역(ISMS)</label>
          </div>
          <div>
            <input type="radio" name="risk" id="" value="technical" v-model="areaType" />
            <label class="inputLabel">기술영역</label>
          </div>
          <template v-if="showDonut">
            <div class="technicalchart-style">
              <DynamicDonutChart :seriesData="managementSeries" :categories="managementOptions" :height="315" />
            </div>
          </template>
          <template v-else>
            <div class="technicalchart-style1">
              <DynamicDonutChart :seriesData="technicalSeries" :categories="technicalOptions" :height="315" />
            </div>
          </template>
        </div>
        <div class="singlelevel" v-if="showEvidence == 'y'">
          <h4>증적관리</h4>
          <div class="chart">
            <DynamicColumnChart v-if="evidenceCategories.length > 0" :chartCategories="evidenceCategories"
              :chartSeries="evidenceSeries" :colors="evidenceColors" :count="evidenceCount" />
          </div>
        </div>
      </div>
    </div>
    <div class="button_wrap fixed-button-wrap">
      <div class="flex justify-end">
        <button type="button" class="gray" @click="isBoardSetup = true">
          설정하기
        </button>
      </div>
    </div>
    <DashboardSetUp v-if="isBoardSetup" @close="isBoardSetup = false" :setupVal="setupValues"
      @setupData="getSetupData" />
  </div>
</template>

<script>
import DashboardSetUp from "@/components/modals/DashboardSetUp.vue";
import DynamicDonutChart from "@/components/DynamicDonutChart.vue";
import DynamicColumnChart from "@/components/DynamicColumnChart.vue";
import DynamicColumnChartOne from "@/components/DynamicColumnChartOne.vue";
import radarchart from "@/components/radarchart.vue";
import stackchart from "@/components/stackchart.vue";

import DashboardService from "@/services/DashboardService";
import ScheduleManagementService from "@/services/ScheduleManagementService";

import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";
import koLocale from "@fullcalendar/core/locales/ko";
import SocketioService from "@/services/SocketIoService";
export default {
  name: "DashboardOne",
  components: {
    DynamicDonutChart,
    DynamicColumnChart,
    DynamicColumnChartOne,
    radarchart,
    stackchart,
    DashboardSetUp,
    FullCalendar,
  },
  data() {
    return {
      editorData: '',
      calendarOptions: {
        height: 425,
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          // interactionPlugin,
        ],
        headerToolbar: {
          left: "prev,next",
          right: "",
          center: "title",
        },
        initialView: "dayGridWeek",
        events: [],
        locale: koLocale,
      },
      schedule_type: "all",

      page: 1,
      limit: 50,
      current: "",
      year: "",
      noticeList: [],
      areaType: "management",
      showDonut: true,
      isBoardSetup: false,
      showNotice: "y",
      showSchedule: "y",
      showAsset: "y",
      showRisk: "y",
      showDiagnos: "y",
      showEvidence: "y",
      managementSeries: [],
      managementOptions: [],
      technicalSeries: [],
      technicalOptions: [],
      diagnosisColors: ["#007AFF", "#264775"],
      diagnosisCount: [],
      evidenceColors: ["#CFCFCF", "#264775", "#F94720"],
      evidenceCount: [],

      diagnosisData: [],

      // Asset
      assetSeries: [],
      assetChartOptions: {
        chart: {
          type: "donut",
          width: 200,
          height: 350,
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: "100px",
              },
              legend: {
                position: "top",
              },
            },
          },
        ],
        dataLabels: {
          enabled: true,
          formatter: function (value, opt) {
            //console.log(value, opt.w.config.series[opt.seriesIndex])
            return opt.w.config.series[opt.seriesIndex];
          },
          style: {
            fontSize: "20px",
            fontWeight: "bold",
          },
        },
        legend: {
          formatter: function (seriesName, opts) {
            return `<p>${seriesName}</p>  <p>${opts.w.globals.series[opts.seriesIndex]
              }</p>`;
          },
          itemMargin: {
            vertical: 3,
          },
        },
        plotOptions: {
          pie: {
            customScale: 0.7,
            donut: {
              size: "45%",
            },
          },
        },
        labels: [],
      },
      // diagnosis
      diagnosisSeries: [
        {
          name: "진단",
          data: [],
        },
        {
          name: "미진단",
          data: [],
        },
      ],
      diagnosisCategories: [],

      // evidence

      evidenceSeries: [
        {
          key: "complete",
          name: "완료",
          data: [],
        },
        {
          key: "incomplete",
          name: "미완료",
          data: [],
        },
        {
          key: "expiry",
          name: "기간만료",
          data: [],
        },
      ],

      evidenceCategories: [],
    };
  },

  watch: {
    "$store.state.signin.company_id": function (newVal, oldVal) {
      if (newVal != oldVal && newVal) {
        console.log("dashboard-copany id", newVal);
      }
    },
  },

  created() {
    this.dashboardService = new DashboardService();

    this.getNoticeBoardList();
    //this.getScheduleManangement();
    this.getAssetDonutChart();
    this.getRiskManagementChart();
    this.getDiagnosisBarGraph();
    this.getDashBoardSetupStatus();
    this.getEvidenceManagementGraph();
    this.ScheduleManagementService = new ScheduleManagementService();
  },

  computed: {
    setupValues() {
      return {
        notice: this.showNotice == "y" ? true : false,
        schedule: this.showSchedule == "y" ? true : false,
        asset: this.showAsset == "y" ? true : false,
        diagnos: this.showDiagnos == "y" ? true : false,
        risk: this.showRisk == "y" ? true : false,
        evidence: this.showEvidence == "y" ? true : false,
      };
    },
  },
  watch: {
    areaType: function (newVal, oldVal) {
      if (newVal == "management") {
        this.showDonut = true;
      } else {
        this.showDonut = false;
      }
    },

    // on certificate change
    "$store.state.header.certificate": function (newVal, oldVal) {
      if (newVal != oldVal) {
        this.getNoticeBoardList();
        this.getAssetDonutChart();
        this.getRiskManagementChart();
        this.getDiagnosisBarGraph();
        this.getEvidenceManagementGraph();
      }
    },
  },
  mounted() {
    this.scheduleList();
    // this.dateformat();
    SocketioService.setupSocketConnection();
    SocketioService.socketConnection();
  },
  methods: {

    ShowDetails(event, item) {
      this.$router.push(`/NoticeDetails/${item.id}`);
    },

    scheduleList() {
      this.ScheduleManagementService.scheduleList(this.schedule_type)
        .then((res) => {
          if (res.status == 200) {
            // console.log(res.data.eventlist);
            this.eventlist = res.data.eventlist;
            this.calendarOptions.events = [];
            for (let i = 0; i < res.data.eventlist.length; i++) {
              this.calendarOptions.events.push({
                id: res.data.eventlist[i].id,
                title: res.data.eventlist[i].schedule_title,
                start: this.dateformat(
                  res.data.eventlist[i].schedule_start_date
                ),
                end: this.dateformat(res.data.eventlist[i].schedule_end_date),
                color:
                  res.data.eventlist[i].schedule_notification_color_setting,
              });
            }
          }
        })
        .catch((err) => {
          return;
        });
    },

    getDashBoardSetupStatus() {
      this.dashboardService.dashBoardSetupView().then((res) => {
        // console.log("dash-setup", res);
        if (res.status == 200) {
          this.showNotice = res.data.user_settings.show_notice_board;
          this.showSchedule = res.data.user_settings.show_schedule_management;
          this.showAsset = res.data.user_settings.show_asset_management;
          this.showRisk = res.data.user_settings.show_risk_management;
          this.showDiagnos = res.data.user_settings.show_diagnosis_management;
          this.showEvidence = res.data.user_settings.show_evidence_management;
        }
      });
    },

    saveDashBoardSetupStatus(credentials) {
      this.dashboardService.dashBoardSetupSave(credentials).then((res) => {
        // console.log("dash-setup-save", res);
        if (res.status == 200) {
          // console.log(res);
        }
      });
    },

    getSetupData(data) {
      this.isBoardSetup = false;

      let credentials = {
        show_notice_board: data.notice ? "y" : "n",
        show_schedule_management: data.schedule ? "y" : "n",
        show_asset_management: data.asset ? "y" : "n",
        show_risk_management: data.risk ? "y" : "n",
        show_diagnosis_management: data.diagnos ? "y" : "n",
        show_evidence_management: data.evidence ? "y" : "n",
      };
      this.saveDashBoardSetupStatus(credentials);
      this.getDashBoardSetupStatus();
      // console.log("setup-data", data);
    },

    getNoticeBoardList() {
      // console.log("notice-testing", this.$store.state.header.certificate)
      if(this.$store.state.header.certificate){
        this.dashboardService
        .noticeBoardList(
          this.page,
          this.limit,
          this.$store.state.header.certificate
        )
        .then((res) => {
          // console.log("notice-list", res);
          if (res.status == 200) {
            this.noticeList = res.data.notice;
            this.current = res.data.current_page;
          }
        });
      }
    },

    getAssetDonutChart() {
      if(this.$store.state.header.certificate){

        this.dashboardService
          .scheduleManagement(this.$store.state.header.certificate)
          .then((res) => {
            // console.log("asset-graph", res);
            if (res.status == 200) {
              Array.from(res.data.values).forEach((item) => {
                this.assetSeries.push(item.value);
                this.assetChartOptions.labels.push(item.name);
              });
              // console.log('this.assetChartOptions--', this.assetChartOptions);
            }
          });
        // .then(() => {
        //   setTimeout(() => {
        //     const string = `
        //         <div class='chart-heading'>
        //           <p>자산종류</p>
        //           <p>개수</p>
        //         </div>
        //       `
        //     document.querySelector('.assetchart-style .apexcharts-legend').insertAdjacentHTML('afterbegin', string)
        //   }, 1000);
        // });
      }
    },

    getRiskManagementChart() {
      if(this.$store.state.header.certificate){
        this.dashboardService
          .riskManagement(this.$store.state.header.certificate, "management")
          .then((res) => {
            // console.log("management-data", res);
            Array.from(res.data.values).forEach((item) => {
              this.managementSeries.push(item.count);
              this.managementOptions.push(item.text);
            });
          });
        // .then(() => {
        //   setTimeout(() => {
        //     const string = `
        //         <div class='chart-heading'>
        //           <p>Priority</p>
        //           <p>개수</p>
        //         </div>
        //       `
        //     document.querySelector('.technicalchart-style .apexcharts-legend').insertAdjacentHTML('afterbegin', string)
        //   }, 1000);
        // });
  
        this.dashboardService
          .riskManagement(this.$store.state.header.certificate, "technical")
          .then((res) => {
            // console.log("technical-data", res);
            Array.from(res.data.values).forEach((item) => {
              this.technicalSeries.push(item.count);
              this.technicalOptions.push(item.text);
            });
          });
        // .then(() => {
        //   setTimeout(() => {
        //     const string = `
        //         <div class='chart-heading'>
        //           <p>Priority</p>
        //           <p>개수</p>
        //         </div>
        //       `
        //     document.querySelector('.technicalchart-style1 .apexcharts-legend').insertAdjacentHTML('afterbegin', string)
        //   }, 1000);
        // });
      }
    },

    getDiagnosisBarGraph() {
      if(this.$store.state.header.certificate){
      this.dashboardService
        .diagnosisManagement(this.$store.state.header.certificate)
        .then((res) => {
          // console.log("diagnosisGraph", res);
          if (res.status == 200) {
            this.diagnosisData = res.data.result;

            Array.from(this.diagnosisData).forEach((item) => {
              this.diagnosisCategories.push(item.name);
              this.diagnosisCount.push({
                name: item.name,
                count: item.diagnosed_count + item.undiagnosed_count,
              });
              this.diagnosisSeries.forEach((ele) => {
                if (ele.name == "진단") {
                  // console.log('item.diagnosed_percentage', item.diagnosed_percentage);
                  ele.data.push(item.diagnosed_percentage);
                }

                if (ele.name == "미진단") {
                  // console.log('item.undiagnosed_percentage', item.undiagnosed_percentage);
                  ele.data.push(item.undiagnosed_percentage);
                }
              });
            });

            // console.log("total_count", this.diagnosisCount)
          }
        });
        }
    },

    getEvidenceManagementGraph() {
      if(this.$store.state.header.certificate){
      this.dashboardService
        .evidenceManagement(this.$store.state.header.certificate)
        .then((res) => {
          // console.log("evidence-graph", res);
          if (res.status == 200) {
            let evidence = res.data.data;
            this.evidenceCategories = Object.keys(evidence);
            let count = 0;
            this.evidenceCategories.forEach((item) => {
              count +=
                evidence[item]["complete"]["count"] +
                evidence[item]["incomplete"]["count"] +
                evidence[item]["expiry"]["count"];
              this.evidenceSeries.forEach((i) => {
                if (i.key == "complete") {
                  i.data.push(evidence[item]["complete"]["percent"]);
                }

                if (i.key == "incomplete") {
                  i.data.push(evidence[item]["incomplete"]["percent"]);
                }

                if (i.key == "expiry") {
                  i.data.push(evidence[item]["expiry"]["percent"]);
                }
              });
            });
            this.evidenceCount = [count];
            // console.log("evidenceCtegories", this.evidenceCategories);
            // console.log("evidenceSeries", this.evidenceSeries);
            // console.log("evidenceCount", this.evidenceCount);
          }
        });
        }
    },

    // date format
    dateformat(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
    },
  },
};
</script>

<style lang="scss">
.inputLabel {
  margin-left: 8px;
}

.singlelevel {
  position: relative;

  .fc-toolbar-chunk {
    .fc-toolbar-title {
      font-size: 24px;
      font-weight: 700;
      line-height: 31px;
      color: #333;
    }
  }

  .fc-scrollgrid-sync-inner {

    // display: flex;
    // justify-content: center;
    // align-items: center;
    // height: 25px;
    .fc-col-header-cell-cushion {
      font-weight: 500;
      font-size: 10px;
      line-height: 12px;
      color: #a4a4a4;
    }
  }
}

.chart-style {
  .apexcharts-legend {
    padding: 20px;
    border: 1px solid #f2f2f2;

    .chart-heading {
      display: flex;
      justify-content: space-between;
      padding-bottom: 10px;
      border-bottom: 1px solid #cfcfcf;

      p {
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;
        color: #a4a4a4;
      }
    }

    .apexcharts-legend-series {
      display: flex;
      margin: 20px 0 0 0 !important;

      &:first-child {
        margin: 0 !important;
      }

      .apexcharts-legend-text {
        display: flex;
        width: 140px;
        justify-content: space-between;
      }
    }
  }
}
</style>
