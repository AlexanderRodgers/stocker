<template>
  <v-btn @click="createProfile()">Create Profile</v-btn>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    }
  },

  methods: {
    createProfile() {
      console.log(this.$store.state)
      if(!this.$store.state.auth.user) {
        console.log('you must be logged in to create a profile.')
        return
      }
      console.log(this.$F)
      this.$F.service('profiles')
        .create({
          money: 10000,
          stocks: {},
          user: this.$store.state.auth.user.id
        })

      console.log('New Profile Created')
    },
  }
}
</script>

<style>

</style>
