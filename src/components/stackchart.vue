<template >
  <div>
    <apexcharts type="bar" height="350" width="100%" :options="chartOptions" :series="series"></apexcharts>
  </div>
</template>
<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "StackChart",
  components: {
    apexcharts: VueApexCharts
  },
  data() {
    return {
      series: [{
        name: 'PRODUCT A',
        data: [44, 55, 41, 67, 22,]
      }, {
        name: 'PRODUCT B',
        data: [13, 23, 20, 8, 13,]
      }, {
        name: 'PRODUCT C',
        data: [11, 17, 15, 15, 21,]
      }],
      chartOptions: {
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
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10
          },
        },
        xaxis: {
          type: 'datetime',
          categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
            '01/05/2011 GMT',
          ],
        },
        legend: {
          position: 'bottom',
          offsetx: 40
        },
        fill: {
          colors: ['#264775', '#007AFF', '#F2F2F2']
        },
        dataLabels: {
          style: {
            colors: ['#fff', '#fff', '#333']
          }
        },
        markers: {
          colors: ['#264775', '#007AFF', '#F2F2F2']
        }
      },
    }
  },
}
</script>