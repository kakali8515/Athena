<template>
  <div class="chart">
    <apexchart type="bar" height="350" width="100%" :options="colChartOptions" :series="colSeries">
    </apexchart>
  </div>
</template>

<script>
export default {
  name: "DynamicColumnChart",
  props: {
    chartCategories: Array,
    chartSeries: Array,
    colors: Array,
    count: Array,
    name: String,
  },
  // mounted(){
  //   console.log('from chat ---- this.chartCategories', this.chartCategories)
  //   console.log('from chat ---- this.count', this.count)
  // },
  data() {
    return {
      // diagnosis
      colSeries: this.chartSeries,

      colChartOptions: {
        colors: this.colors,
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: true,
          formatter: this.countFormat,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: this.chartCategories,
          labels: {
            offsetY: -5
          }
        },
        yaxis: {
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + '%';
            },
          },
        },

      },
    };
  },

  methods: {
    countFormat(val, { w, dataPointIndex }) {
      let dataCount;
      if (this.count.length > 1) {
        Array.from(this.count).forEach((item) => {
          if (item?.name == w.config.xaxis.categories[dataPointIndex]) {
            dataCount = (val * item?.count) / 100;
            // dataCount = item?.count;
          }
        });
      } else {
        // dataCount = (val * this.count[0]) / 100;
        dataCount = this.count[0];
      }

      //console.log("testFormat", w.config.xaxis.categories[dataPointIndex], dataCount)
      return Math.round(dataCount);
      // return Math.round(dataCount);
    },
  },
};
</script>

<style scoped>
</style>