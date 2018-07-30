<template>
<v-card>
    <v-card-title class="headline">Login</v-card-title>
   <v-form>
    <v-container fluid>
      <v-layout row wrap>
            <v-text-field
                class="user-login"
                v-model="user"
                label="First name"
                required
                ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show ? 'visibility_off' : 'visibility'"
            :rules="[rules.required, rules.min]"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            label="Normal with hint text"
            hint="At least 8 characters"
            counter
            required
            @click:append="show = !show"
          ></v-text-field>
      </v-layout>
    <v-spacer></v-spacer>
    <v-btn>Submit</v-btn>
    </v-container>
  </v-form>

</v-card>
</template>

<script>
export default {

    data() {
        return {
            user: '',
            show: false,
            password: 'Password',
            rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 8 || 'Min 8 characters',
            emailMatch: () => ('The email and password you entered don\'t match')
            }
        }
    }

}
</script>

<style scoped>
.user-login {
    width: 100%;
}

</style>
