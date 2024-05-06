<template>
  <div class="info_protection">
    <!-- <div class="breadcrumb">
           <p><a href="#">Home </a><span>></span> diagnosis management</p>
       </div> -->
    <Breadcrumb link="/dashboard" text1="Home" :text2="$route.params.ul"
      :text2link="`/establishmentOperationManagementSystem/${$route.params.ul}`" />
    <div class="heading flex justify-between align-end">
      <h4>{{$route.params.ul}}</h4>
      <div class="history_wrap">
        <!-- <select @change="setMenu($event)">
          <option value="" selected disabled>메뉴명</option>
          <option v-for="(item, index) of menuList" :key="index" :value="item.menu">{{ item.menu }}</option>
        </select> -->
        <button type="button" @click="$router.push({
          name: 'DetailsEstablishmentOperationOfManagementSystem', params: { ul: $route.params.ul }
        })">
          상세결과
        </button>
      </div>
    </div>
    <div class="chart_wrap">
      <div class="all_level_wrap flex justify-start">
        <div class="singlelevel">
          <h4>개인정보 처리 수준도 (%)</h4>
          <div class="chart">
            <apexchart type="radialBar" height="350" :options="chartOptions" :series="series">
            </apexchart>
          </div>
        </div>
        <div class="singlelevel">
          <h4>영역별 보안수준 (%)</h4>
          <!-- <p>{{radarSeries}}</p>
           <p>{{radarSeries.length}}</p> -->
          <div class="chart">
            <apexchart type="radar" height="350" :options="radarChartOptions" :series="radarSeries"></apexchart>
          </div>
        </div>
      </div>
      <div class="singlefulllevel">
        <h4>영역별 이행 현황</h4>
        <div class="chart flex justify-center">
          <apexchart type="bar" height="350" width="769" :options="stackChartOptions" :series="stackSeries"
            v-if="stackChartOptions.xaxis.categories.length > 0"></apexchart>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import DiagnosisManagementService from "@/services/DiagnosisManagementService";

export default {
  name: "EstablishmentOperationManagementSystem",
  components: {
    // DonutChart,
    // radarchart,
    // stackchart,
    Breadcrumb,
  },
  data() {
    return {
      menu: this.$route.params.ul,
      // radial chart
      series: [""],
      chartOptions: {
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
              size: "70%",
            },
          },
        },
        labels: [""],
      },

      //radar chart
      radarSeries: [
        {
          name: "Series 1",
          data: [],
        },
      ],
      radarChartOptions: {
        chart: {
          height: 350,
          type: "radar",
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "12px",
            fontWeight: "regular",
          },
          background: {
            enabled: false,
          },
        },
        plotOptions: {
          radar: {
            size: 140,
            polygons: {
              strokeColors: "#727B88",
              fill: {
                colors: ["#fff", "#fff"],
              },
            },
          },
        },
        colors: ["#007AFF"],
        markers: {
          size: 0,
          colors: ["#fff"],
          strokeColor: "#FF4560",
          strokeWidth: 3,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val;
            },
          },
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          show: false,
        },
      },

      // stack chart
      stackSeries: [
        {
          name: 'Good',
          color: '#007AFF',
          data: []
        },
        {
          name: 'Weak',
          color: '#264775',
          data: []
        },
        {
          name: 'Undiagnosis',
          color: '#F2F2F2',
          data: []
        },
        // shape: ['circle', 'circle', 'circle'],
      ],

      stackChartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          width: "100%",
          stacked: true,
          toolbar: {
            show: false
          },
          zoom: {
            enabled: true
          }
        },
        // responsive: [{
        //   breakpoint: 480,
        //   options: {
        //     legend: {
        //       position: 'bottom',
        //       offsetX: 0,
        //       offsetY: 0
        //     }
        //   }
        // }],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 0,
            columnWidth: "50%"
          },
        },
        xaxis: {
          categories: [],
          labels: {
            offsetY: -4
          },
        },
        yaxis: {
          show: false,
        },
        legend: {
          position: 'bottom',
          offsetx: 40,
          customLegendItems: ['양호', '취약', '미진단'],
          markers: {
            width: 12,
            height: 12,
            radius: 12,
            offsetX: 0,
            offsetY: 0
          },
        },
        fill: {
          colors: ['#264775', '#007AFF', '#F2F2F2']
        },
        dataLabels: {
          formatter: this.countFormat,
          style: {
            colors: ['#fff', '#fff', '#333']
          }
        },
        markers: {
          colors: ['#264775', '#007AFF', '#F2F2F2']
        },
        title: {
          // text: '% (Evidence)',
          // text: '%',
          align: 'left',
          style: {
            fontSize: '10px',
            lineHeight: '12px',
            fontWeight: 'medium',
            fontFamily: undefined,
            color: '#A4A4A4'
          },
        },
      },
      mgmntCount: [],
    };
  },
  created() {
    this.diagnosisManagementService = new DiagnosisManagementService();
    this.getDiagnosisGraphResult();
    this.getDiagnosisNetworkGraph();
    this.getDiagnosisBarGraph();
    // this.series[0] = this.evalutionPercentage;
    // this.chartOptions.labels[0] = this.evaluationResult;
    // console.log(this.chartOptions.labels);
  },

  watch: {
    "$store.state.header.certificate": function (newVal, oldVal) {
      if (newVal != oldVal) {
        this.getDiagnosisGraphResult();
        this.getDiagnosisNetworkGraph();
        this.getDiagnosisBarGraph();
      }
    },
  },

  mounted() {
    // console.log(this.menu_name);
    this.getDiagnosisMenu();
  },

  methods: {
    // select menu from dropdown
    setMenu(event) {
      // console.log(event.target.value)
      this.menu = event.target.value;
      this.getDiagnosisGraphResult();
      this.getDiagnosisNetworkGraph();
      this.getDiagnosisBarGraph();
    },
    getDiagnosisGraphResult() {
      if (this.menu) {
        this.chartOptions.labels[0] = []
        this.series[0] = []
        this.diagnosisManagementService
          .diagnosisGraphResult(this.$store.state.header.certificate, this.menu)
          .then((res) => {
            if (res.status == 200) {
              this.chartOptions.labels[0] = res.data.evaluation_result;
              this.series[0] = res.data.evalution_percentage;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    getDiagnosisNetworkGraph() {
      if (this.menu) {
        this.radarSeries[0].data = []
        this.diagnosisManagementService
          .diagnosisNetworkGraph(this.$store.state.header.certificate, this.menu)
          .then((res) => {
            if (res.status == 200) {
              // console.log("network-graph", res);
              // console.log(this.radarSeries[0].data, this.radarChartOptions);
              Array.from(res.data.evaluation_result).forEach((item) => {
                this.radarSeries[0].data.push(item.percentage);
                this.radarChartOptions.xaxis.categories.push(item.class);
                //console.log(this.radarSeries, this.radarChartOptions)
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    getDiagnosisBarGraph() {
      if (this.menu) {
        this.diagnosisManagementService
          .diagnosisBarGraph(this.$store.state.header.certificate, this.menu)
          .then((res) => {
            if (res.status == 200) {
              // console.log("bar-graph", res);
              let goodArr = [];
              let weakArr = [];
              let unDiagnosArr = [];
              let classArr = [];
              Array.from(res.data.evaluation_result).forEach((item) => {
                let newCount = [];
                // classArr.push(item.class_name.split(" ").splice(0,3).join(" "));
                classArr.push(item.class_name);
                Array.from(item.data).forEach((ele) => {
                  if (ele.type == "good") {
                    goodArr.push(ele.percentage)
                    newCount.push(ele.count)
                  };
                  if (ele.type == "weak") {
                    weakArr.push(ele.percentage)
                    newCount.push(ele.count)
                  };
                  if (ele.type == "undiagnosis") {
                    unDiagnosArr.push(ele.percentage)
                    newCount.push(ele.count)
                  };
                });
                // this.mgmntCount.push({name: item.class_name, totalCount: newCount.reduce((a, b) => a + b)})

                this.mgmntCount.push({name: item.class_name, totalCount: newCount})
                // console.log('newCount------------------>',item.class_name, newCount)
              });
              this.stackChartOptions.xaxis.categories = classArr;
              this.stackSeries.forEach((item) => {
                if (item.name == "Good") {
                  item.data = goodArr;
                }
                if (item.name == "Weak") {
                  item.data = weakArr;
                }
                if (item.name == "Undiagnosis") {
                  item.data = unDiagnosArr;
                }
              });

              // console.log("this.stackSeries--------------->", this.stackSeries);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // get menulist from dropdown api

    getDiagnosisMenu() {
      this.diagnosisManagementService
        .diagnosisMenu(this.$store.state.header.certificate)
        .then((res) => {
          this.menuList = res.data.menu_list
          // console.log(this.menuList)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    // count format

    countFormat(val, { w, dataPointIndex, seriesIndex }) {
      // console.log('val-------------->', val)
      // console.log('wwwwwwwwww-------------->', w)
      // console.log('dataPointIndex-------------->', dataPointIndex)
      // console.log('seriesIndex-------------->', seriesIndex)
      let dataCount;
      let i = 0;
      // console.log('item?.totalCount', this.mgmntCount);
      if (this.mgmntCount.length > 1) {
        Array.from(this.mgmntCount).forEach((item) => {
          // console.log('item---===', item);
          item.totalCount.forEach((vl) => {
            // console.log('vl', vl)
            if (item?.name == w.config.xaxis.categories[dataPointIndex]) {
              // dataCount = (val * item?.totalCount) / 100;
              if(i == seriesIndex ) {

                dataCount = vl;
              }
              i++;
            }
          })
          // console.log('datacount----------------->',dataCount)
        });
      } else {
        dataCount = this.mgmntCount[0];
      }
      return Math.round(dataCount);
    },


  },
};
</script>


<style lang="scss">
.history_wrap {
  select {
    min-width: 155px !important;
    width: auto !important;
    border-radius: 5px;
    border: 1px solid #A4A4A4 !important;
    color: #CFCFCF !important;
  }
}

button {
  &:disabled {
    background-color: #ececec !important;
    cursor: no-drop;
    border:0 !important;
  }
}

</style>