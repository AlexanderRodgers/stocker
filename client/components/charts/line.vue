<template>
  <div>
    <apex-charts width="500" type="area" :options="chartOptions" :series="series"></apex-charts>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      meta: {},
      data: {},
      apiKey: 'I67BO05UHWQOTS4E',
      testURL: 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT&apikey=',
      chartOptions: {
      title: {
        text: 'MSFT'
      },
        chart: {
          stacked: false,
          height: 500,
          zoom: {
            enabled: true
          },
          toolbar: {
            autoSelected: 'zoom'
          },
          id: 'example chart'
        },
        plotOptions: {
        line: {
          curve: 'smooth',
        },
      },
      dataLabels: {
        enabled: false
      },
        xaxis: {
          type: 'datetime',
        }
      },
      series: [{
        name: '',
        data: [],
      }],
    }
  },

  methods: {

    grabData() {
      this.$axios.get(this.testURL + this.apiKey)
      .then(res => {
        this.meta = res.data['Meta Data']
        this.data = res.data['Time Series (Daily)']
        })
      .then(() => this.parseData())
      .catch(e => console.error(e))
    },

    parseData() {
      // console.log(this.data)
      // let keys = Object.keys(this.data)
      // for(let key of keys) {
      //   this.series[0]['data'].push(parseFloat(this.data[key]['4. close']))
      // }
      let keys = Object.keys(this.data)
      let seriesData = keys.map(key => {
        let newObj = {}
        let dates = `${key}`.split('-')
        let temp = dates[0]
        dates.splice(0,1)
        dates.push(temp)
        let newDate = dates.join('/')

        newObj['x'] = newDate
        newObj['y'] = parseFloat(this.data[key]['4. close'])
        return newObj
      })
      this.chartOptions.title.text = this.meta['2. Symbol']
      console.log(this.chartOptions.title.text)
      this.series[0].name = `${this.meta['2. Symbol']} closing price`
      this.series[0].data = seriesData
    },

  },

  mounted() {
    this.grabData()
  }
};
</script>

<style>

</style>
