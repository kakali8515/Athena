<template>
  <div class="info_protection technical_result">
    <!-- <div class="breadcrumb">
      <p><a href="#">Home </a><span>></span> diagnosis management</p>
    </div> -->
    <Breadcrumb link="dashboard" text1="Home" text2="진단관리" />
    <div class="heading flex justify-between align-end">
      <h4>기술적 진단 결과</h4>
      <div class="history_wrap">
        <button type="button" class="black gray" @click="openDiagnosisProgram">
          진단 프로그램
        </button>
        <button type="button" class="black gray" @click="openActionGuidelines">
          조기 가이드라인
        </button>
        <button
          type="button"
          class=""
          @click="$router.push({ name: 'DetailedResult' })"
        >
          상세결과
        </button>
      </div>
    </div>
    <div class="chart_wrap">
      <div class="all_level_wrap flex justify-start">
        <div class="singlelevel">
          <h4>기술적 진단 진행률 (%)</h4>
          <div class="chart">
            <apexchart
              type="radialBar"
              :height="350"
              :options="radialChartOptions"
              :series="radialSeries"
            ></apexchart>
          </div>
        </div>
        <!-- <div class="singlelevel">
                   <h4>Security level by area (%)</h4>
                   <div class="chart">
                       <radarchart />
                   </div>
                   diagnosisManagement
               </div> -->
      </div>
      <div class="singlefulllevel">
        <router-link to="/technicalDiagnosticResultstwo">
          <h4>기술적 진단 결과 (%)</h4>

          <div class="chart">
            <apexchart
              type="bar"
              height="350"
              :options="singleBarChartOptions"
              :series="singleBarSeries"
            ></apexchart>
          </div>
        </router-link>
      </div>
    </div>
    <TechnicalDiagnosticResultsmodalone
      v-show="$store.state.diagnosisManagement.isActionGuidelines"
    />
    <TechnicalDiagnosticResultsmodaltwo
      v-show="$store.state.diagnosisManagement.isdiagnosisProgram"
    />
  </div>
</template>


<script>
//import DonutChart from "@/components/Donatchart.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
// import radarchart from "./radarchart.vue";
//import stackchart from "@/components/stackchart.vue";
import TechnicalDiagnosticResultsmodalone from "@/components/modals/TechnicalDiagnosticResultsmodalone.vue";
import TechnicalDiagnosticResultsmodaltwo from "@/components/modals/TechnicalDiagnosticResultsmodaltwo.vue";
import TechnicalDiagnosticResultsService from "@/services/TechnicalDiagnosticResultsService.js";
export default {
  name: "TechnicalDiagnosticResults",
  components: {
    Breadcrumb,
    //DonutChart,
    //   radarchart,
    //stackchart,
    TechnicalDiagnosticResultsmodalone,
    TechnicalDiagnosticResultsmodaltwo,
  },

  data() {
    return {
      serverData: [
        {
          name: "Server",
          data: 2.3,
        },
        {
          name: "DBMS",
          data: 3.1,
        },
        {
          name: "WBS",
          data: 4.0,
        },
        {
          name: "APP",
          data: 10.1,
        },
        {
          name: "Network",
          data: 15,
        },
        {
          name: "PC",
          data: 8.7,
        },
      ],
      // radial chart
      radialSeries: [],
      radialChartOptions: {
        // colors: ['#546E7A'],
        markers: {
          strokeColors: "#fff",
        },
        chart: {
          height: 350,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "72%",
            },
          },
          dataLabels: {
            show: true,
          },
          total: {
            show: false,
          },
        },
        labels: [""],
      },

      // single bar chart
      singleBarSeries: [
        {
          name: "",
          data: [],
        },
      ],
      singleBarChartOptions: {
        chart: {
          height: 350,
          type: "bar",
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            columnWidth: "30%",
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "%";
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"],
          },
        },

        xaxis: {
          categories: [],
          position: "bottom",
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        yaxis: {
          axisBorder: {
            show: true,
          },
          axisTicks: {
            show: true,
          },
          labels: {
            show: true,
            // formatter: function (val) {
            //   return val + "%";
            // }
          },
        },
      },
    };
  },

  created() {
    this.technicalDiagnosticResultsService =
      new TechnicalDiagnosticResultsService();
    this.getDonutCharData();
    this.getBarChartData();
    //this.$store.dispatch('diagnosisManagement/downLoadFiles', {fileName : 'IOT_book.pdf', key : "action_guideline"})
  },

  watch: {
    "$store.state.header.certificate": function (newVal, oldVal) {
      if (newVal != oldVal) {
        this.getDonutCharData();
        this.getBarChartData();
      }
    },
  },

  methods: {
    openActionGuidelines() {
      this.$store.dispatch("diagnosisManagement/getActionGuidelinesCategories");
      this.$store.dispatch(
        "diagnosisManagement/toggleActionGuidelineModal",
        true
      );
    },

    openDiagnosisProgram() {
      this.$store.dispatch("diagnosisManagement/getDiagnosisProgram");
      this.$store.dispatch(
        "diagnosisManagement/toggleDiagnosisProgramModal",
        true
      );
    },

    getDonutCharData() {
      this.technicalDiagnosticResultsService
        .donutGraph(this.$store.state.header.certificate)
        .then((res) => {
          console.log("donutgraph-res", res);
          if (res.status == 200) {
            this.radialSeries.push(res.data.percentage);
          }
        });
    },

    getBarChartData() {
      this.technicalDiagnosticResultsService
        .barGraphCategory(this.$store.state.header.certificate)
        .then((res) => {
          console.log("bargraph-category", res);
          if (res.status == 200) {
            Array.from(res.data.result).forEach((item) => {
              this.singleBarSeries[0].data.push(item.value);
              this.singleBarChartOptions.xaxis.categories.push(item.name);
            });
          }
        });
    },
  },
};
</script>


<style lang="scss">
</style>