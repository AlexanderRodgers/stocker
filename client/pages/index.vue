<template>
  <v-layout column justify-center align-center>
    <!-- <p>Webpage</p> -->
    <v-btn href="/login">Login</v-btn> 
    <dashboard/>
  </v-layout>
</template>

<script>
import Dashboard from '~/components/main/dashboard.vue'
export default {

  components: {
    Dashboard,
  },

  data() {
    return {

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
