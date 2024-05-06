<template>
  <div class="singlelevel">
    <h4>{{osName}}</h4>
    <div class="chart">
      <apexchart type="bar" height="350" :options="singleBarChartOptions" :series="singleBarSeries" ></apexchart>
    </div>
  </div>
</template>

<script>
export default {
    name : "DynamicChart",
    props : {
      seriesData : Array,
      categories : Array,
      osName : String,
    },
    data(){
        return{
            
    // single bar chart 
            singleBarSeries: [{
            name: '',
            data: this.seriesData
          }],
          singleBarChartOptions: {
            chart: {
              height: 350,
              type: 'bar',
              toolbar : {
                show : false,
              },
          
            },
            plotOptions: {
              bar: {
                borderRadius: 10,
                columnWidth : '30%',
                dataLabels: {
                  position: 'top', // top, center, bottom
                },
              }
            },
            dataLabels: {
              enabled: true,
              formatter: function (val) {
                return val + "%";
              },
              offsetY: -20,
              style: {
                fontSize: '12px',
                colors: ["#304758"]
              }
            },
            
            xaxis: {
              categories: this.categories,
              position: 'bottom',
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false
              },
              crosshairs: {
                fill: {
                  type: 'gradient',
                  gradient: {
                    colorFrom: '#D8E3F0',
                    colorTo: '#BED1E6',
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                  }
                }
              },
              tooltip: {
                enabled: false,
              }
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
              }
            
            },
            
          },
        }
    },

    watch : {
      seriesData : function(newVal, oldVal){
          if(newVal != oldVal){
            this.singleBarSeries[0].data = newVal;
          }
      },

      categories : function(newVal, oldVal){
          if(newVal != oldVal){
            this.singleBarChartOptions.xaxis.categories = newVal;
          }
      }
    },

    methods : {

    }
};
</script>

<style>
</style>