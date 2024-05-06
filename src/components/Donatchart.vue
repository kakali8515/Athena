<template>
  <div>
    <apexcharts
      type="donut"
      width="100%"
      height="300px"
      :options="chartOptions"
      :series="series"
    ></apexcharts>
  </div>
</template>
<script>
import VueApexCharts from "vue3-apexcharts";
export default {
  name: "DonutChart",
  components: {
    apexcharts: VueApexCharts,
  },
  data() {
    return {
      series: [100, 26, 4, 14, 45, 35],
      chartOptions: {
        chart: {
          width: "100%",
          type: "donut",
        },
        plotOptions: {
          pie: {
            startAngle: 0,
            endAngle:360,
            expandOnClick: false,
             toolbar:{
              show:false
          }
          },
        },
        dataLabels: {
          enabled: true,
           formatter: function (val) {
                return parseInt(val);
            },
        },
        fill: {
          colors: ['#264775', '#007AFF', '#FB8832', '#F6C739', '#828282', '#CFCFCF']
        },
        markers: {
              colors: ['#264775', '#007AFF', '#FB8832', '#F6C739', '#828282', '#CFCFCF']
        },
        legend: {
            show: false,
        },
       
        // title: {
        //   text: "Gradient Donut with custom Start-angle",
        // },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: "50%",
              },
              
            },
          },
        ],
      },
    };
  },
};
</script>
