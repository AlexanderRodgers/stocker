<template>
  <div>
    <login v-if="login" @user="login = $event"/>
    <create v-if="!login" @login="login = $event"/>
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

  data() {
    return {
      login: true,
      create: false,
    }
  },

}
</script>

<style>

</style>
