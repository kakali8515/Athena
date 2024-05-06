<template>
  <div class="chart chart-style">
            <apexchart
              type="donut"
              :options="riskChartOptions"
              :series="riskSeries"
              :height= "height"
            ></apexchart>
          </div>
</template>

<script>
export default {
    name : "DynamicDonutChart",
    props : {
      seriesData : Array,
      categories : Array,
      height: String,
    },
    data(){
        return{
            
    // Risk
      riskSeries: this.seriesData,
      riskChartOptions: {
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
          formatter: function (val, opt) {
            return opt.w.config.series[opt.seriesIndex];
          },
          style: {
            fontSize: "20px",
            fontWeight: "bold",
          },
        },
          legend: {
          formatter: function (seriesName, opts) {
            return `<p>${seriesName}</p>  <p>${opts.w.globals.series[opts.seriesIndex]}</p>`
          },
          itemMargin: {
            vertical: 3
          }
        },
        plotOptions: {
          pie: {
            customScale: 0.7,
            donut: {
              size: "45%",
            },
          },
        },
        labels: this.categories,
      },
        }
    },

    // watch : {
    //   seriesData : function(newVal, oldVal){
    //       if(newVal != oldVal){
    //         this.singleBarSeries[0].data = newVal;
    //       }
    //   },

    //   categories : function(newVal, oldVal){
    //       if(newVal != oldVal){
    //         this.singleBarChartOptions.xaxis.categories = newVal;
    //       }
    //   }
   // },

    methods : {

    }
};
</script>

<style>
</style>