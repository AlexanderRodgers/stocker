<template>
  <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            ref="name"
            v-model="first"
            :rules="[() => !!name || 'This field is required']"
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
            :rules="[() => !!username || 'This field is required', addressCheck]"
            v-model="username"
            label="Username"
            placeholder="El Paso"
            required
          ></v-text-field>
        </v-card-text>
        <v-divider class="mt-5"></v-divider>
        <v-card-actions>
          <v-btn flat>Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
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
          </v-slide-x-reverse-transition>
          <v-btn color="primary" flat @click="submit">Submit</v-btn>
        </v-card-actions>
        <p>Already have an account? <a @click="switchToLogin()">Login here</a></p>
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
      formHasErrors: false
    }),

    computed: {
      switchToLogin() {
        console.log('emitting event')
        return this.$emit('login', true);
      },
      form () {
        return {
          first: this.first,
          last: this.last,
          username: this.username,
        }
      }
    },

    watch: {
      name () {
        this.errorMessages = ''
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
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) this.formHasErrors = true

          this.$refs[f].validate(true)
        })
      }
    }
  }
</script>

<style>

</style>
