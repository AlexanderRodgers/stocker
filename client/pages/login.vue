<template>
  <div>
    <login v-if="login"/>
    <create v-on:login="login = $event"/>
  </div>  
</template>

<script>
import Login from '~/components/login/login'
import Create from '~/components/login/create'

export default {
  components: {
    Login,
    Create
  },

  computed: {
    formChange: {
      get() {
        console.log('received event')
        return this.login
      },
      set(val) {
        this.login = val
      }
    }
  },

  data() {
    return {
      login: false,
    }
  }
}
</script>

<style>

</style>
