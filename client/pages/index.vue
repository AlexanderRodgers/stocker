<template>
  <v-layout column justify-center align-center>
    <!-- <p>Webpage</p>
    <v-btn href="/login">Login</v-btn> -->
      <apex-charts  width="550" type="bar" :options="chartOptions" :series="series"/>
  </v-layout>
</template>

<script>
export default {

  data() {
    return {
      keys: '',
      codeEntered: false,
      chartOptions: {
          chart: {
            id: 'vuechart-example'
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
          }
        },
        series: [{
          name: 'series-1',
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }]
    }
  },

  methods: {
    getCode(event) {
      this.keys += event.keyCode;
      // basic flush to make sure the string lookup doesn't take too long
      if(this.keys.length > 100) {
        this.keys = ''
      }
      this.codeEntered = this.keys.includes('3838404037393739986697651313')
    }
  },

  watch: {
    codeEntered: function() {
      window.location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    }
  },

  mounted() {
    window.addEventListener("keypress", e => {
     this.getCode(e)
    });

    window.addEventListener('keyup', e => {
      this.getCode(e)
    });
  }
}
</script>
