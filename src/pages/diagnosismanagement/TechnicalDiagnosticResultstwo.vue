<template>
  <div class="info_protection technical_result2">
    <!-- <div class="breadcrumb">
           <p><a href="#">Home </a><span>></span> diagnosis management</p>
       </div> -->
    <Breadcrumb link="dashboard" text1="Home" text2="진단관리" />
    <div class="heading flex justify-between item-center">
      <h4>기술적 진단 결과</h4>
    </div>
    <!-- dropdown   -->
    <!-- <div class="policy_setting_wrap no-padding">
      <div class="datatable_head flex justify-between">
        <div class="oneside flex justify-start">
          <span>Server Name</span>
          <select class="small_select" @change="getChartData($event)">
            <option selected value="">Please select</option>
            <option
              v-for="(item, index) in serverList"
              :key="index"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
        </div>
      </div>
    </div> -->
    <!-- dropdown end -->
    <div class="chart_wrap">
      <div class="singlefulllevel">
        <h4>영역별 이행 현황</h4>
        <div class="chart">
          <div id="chart">
            <apexchart type="bar" height="350" :options="singleBarChartOptions" :series="singleBarSeries"
              @click="chartEventHandler"></apexchart>
          </div>
        </div>
      </div>
      <div class="all_level_wrap">
        <div class="heading server-heading" v-if="serverName">
          <p>{{serverName}}</p>
        </div>
        <div class="flex justify-start padding-15 flex-wrap chart-wrap">
          <template v-for="(item, i) in chartData" :key="i">
            <DynamicChart :seriesData="item.y_axis" :categories="item.x_axis" :osName="item.name" />
          </template>

        </div>
      </div>
    </div>
  </div>
</template>


<script>
import DynamicChart from "@/components/DynamicChart.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import TechnicalDiagnosticResultsService from "@/services/TechnicalDiagnosticResultsService.js";
import Toast from "@/alert/alert.js";

export default {
  name: "TechnicalDiagnosticResultstwo",
  components: {
    Breadcrumb,
    DynamicChart,
    //   DonutChart,
    //   radarchart,
    //stackchart,
  },
  data() {
    return {
      serverName: '',
      chartData: [],
      serverList: ["Server", "DBMS"],
      systemData: [

      ],
      //  {
      //           server_name: "Server",
      //           data: [
      //             {
      //               name: "Linux",
      //               xaxis: ["1 year", "6 month", "3 month", "1 month", "always"],
      //               yaxis: [5, 12, 25, 34, 56],
      //             },
      //             {
      //               name: "Windows",
      //               xaxis: ["1 year", "6 month", "3 month", "1 month", "always"],
      //               yaxis: [7, 15, 27, 38, 65],
      //             },
      //           ],
      //         },


      // single bar chart parent
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
            return val ;
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
            enabled: false,
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
  },

  beforeMount() {
    this.getBarChartData();
    this.getBarGraphCode();
  },
  mounted() {
    Toast.fire("자산 분류를 선택해주세요.");
  },
  watch: {
    "$store.state.header.certificate": function (newVal, oldVal) {
      if (newVal != oldVal) {
        this.getBarChartData();
        this.getBarGraphCode();
      }
    },
  },
  methods: {
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

    getBarGraphCode() {
      this.technicalDiagnosticResultsService
        .barGraphCode(this.$store.state.header.certificate)
        .then((res) => {
          console.log("barCodeGraph", res);
          if (res.status == 200) {
            this.systemData = res.data.result;
            console.log(this.systemData)
          }
        });
    },

    chartEventHandler(event, chartContext, config) {
      let data = this.systemData.find(
        (item) => item.name == config.config.xaxis.categories[config.dataPointIndex]
      );
      this.chartData = data?.data;
      this.serverName = data.name;
    },

    // getChartData(e) {
    //  let data = this.systemData.find(item => item.server_name == e.target.value)
    //   this.chartData = data.data;
    //   console.log(this.chartData);
    // },
  },
};
</script>


<style lang="scss">
.chart-wrap {
  gap: 20px;
}

.singlelevel {
  margin: 0 !important;
}

.server-heading {
  background: #DDDDDD;
  border-radius: 5px 5px 0px 0px;
  padding: 20px;
}
</style>