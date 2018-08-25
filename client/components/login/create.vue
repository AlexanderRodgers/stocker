<template>
<v-form ref="form">
  <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <v-card >    
        <v-card-title class="headline">Login</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="first"
            :rules="[rules.required]"
            label="First Name"
            placeholder="John"
            required
          ></v-text-field>
          <v-text-field
            v-model="last"
            label="Last Name"
            :rules="[rules.required]"
            placeholder="Doe"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="Email"
            placeholder="johndoe@gmail.com"
            required
          ></v-text-field>
          <v-text-field
            ref="username"
            v-model="username"
            :rules="[rules.required]"
            label="Username"
            placeholder="somebody"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'visibility_off' : 'visibility'"
            :type="show1 ? 'text' : 'password'"
            label="Password"
            hint="At least 8 characters"
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-text-field
            v-model="passwordConf"
            :append-icon="show2 ? 'visibility_off' : 'visibility'"
            :type="show2 ? 'text' : 'password'"
            :rules="[rules.required, rules.match]"
            label="Confirm Password"
            @click:append="show2 = !show2"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="error" @click="clear()" flat>Reset</v-btn>
          <v-btn color="primary" flat @click="submit()">Submit</v-btn>
        </v-card-actions>
        <p>Already have an account? <a @click="login(true)">Login here</a></p>
      </v-card>
    </v-flex>
  </v-layout>
</v-form>
</template>

<script>
  export default {
    data() {
      return {
        first: null,
        last: null,
        email: '',
        username: null,
        password: '',
        passwordConf: '',
        show1: false,
        show2: false,
        rules: {
          required: value => !!value || 'Required.',
          email: value => {
              const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              return pattern.test(value) || 'Invalid e-mail.'
            },
          match: value => value == this.password || 'Passwords do not match',
        },
      }
    },

    computed: {

    },

    methods: {
      
      login(val){
        this.$emit('login', val)
      },
      
      submit () {
        if (this.$refs.form.validate()) {
          this.$F.service('users')
            .create({
              firstName: this.first,
              lastName: this.last,
              email: this.email,
              username: this.username,
              password: this.password,
            })
        }
      },

      clear () {
        this.$refs.form.reset()
      },

    }
  }
</script>

<style>

</style>
