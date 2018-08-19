<template>
  <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <v-card ref="form">    
        <v-card-title class="headline">Login</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="first"
            :error-messages="errorMessages"
            label="First Name"
            placeholder="John"
            required
          ></v-text-field>
          <v-text-field
            v-model="last"
            label="Last Name"
            placeholder="Doe"
            required
          ></v-text-field>
          <v-text-field
            ref="username"
            v-model="username"
            label="Username"
            placeholder="somebody"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'visibility_off' : 'visibility'"
            :type="show1 ? 'text' : 'password'"
            label="Password"
            placeholder="Password"
            hint="At least 8 characters"
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn flat>Cancel</v-btn>
          <v-spacer/>
            <v-tooltip
              v-if="formHasErrors"
              left
            >
              <v-btn
                slot="activator"
                icon
                class="my-0"
                @click="resetForm"
              >
                <v-icon>refresh</v-icon>
              </v-btn>
              <span>Refresh form</span>
            </v-tooltip>
          <v-btn color="primary" flat @click="submit()">Submit</v-btn>
        </v-card-actions>
        <p>Already have an account? <a>Login here</a></p>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      errorMessages: '',
      first: null,
      last: null,
      username: null,
      password: '',
      formHasErrors: false,
      login: false;
      show1: false,
    }),

    computed: {
      login: function(){
        this.$emit('logout')
      },

      form () {
        return {
          first: this.first,
          last: this.last,
          username: this.username,
        }
      }
    },

    methods: {
      resetForm () {
        this.errorMessages = []
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
        })
      },
      submit () {
        this.$F.service('authentication')
          .create({
            first_name: this.first,
            last_name: this.last,
            username: this.username,
            password: this.password
          })
      }
    },

    mounted() {
      console.log(this.$F.service('users'))
    }
  }
</script>

<style>

</style>
