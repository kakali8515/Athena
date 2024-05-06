<template>
     <div>
        <apexchart type="radar" height="350" width="100%" :options="chartOptions" :series="series"></apexchart>
      </div>
</template>
<script>
import VueApexCharts from "vue3-apexcharts"
export default {
    name:"RadarChart",
    components:{
    apexchart:VueApexCharts
    },
    data() {
        return {     
          series: [{
            name: 'Series 1',
            data: [80, 50, 30, 40, 50],
          }],
          chartOptions: {
            chart: {
              height: 350,
              type: 'radar',
              toolbar:{
              show:false
          }
            },
            
            xaxis: {
              categories: ['Lorem lipsum', 'Lorem lipsum', 'Lorem lipsum', 'Lorem lipsum', 'Lorem lipsum']
            }
          },
          
        }
    },
}
</script>