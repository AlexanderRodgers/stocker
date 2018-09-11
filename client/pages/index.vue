<template>
<div>
    <v-layout column justify-center align-center>
      <!-- <p>Webpage</p> -->
      <dashboard/>
    </v-layout>
</div>
</template>

<script>
import CreateProfile from '~/components/main/createProfile.vue'
import Dashboard from '~/pages/dashboard.vue'
export default {
  components: {
    CreateProfile,
    Dashboard
  },
  data() {
    return {
      keys: '',
      codeEntered: false,
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