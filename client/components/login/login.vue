<template>
<v-form ref="form">
    <v-layout row wrap justify-center>
        <v-flex xs12 sm10 md8 lg6>
            <v-card>
                <v-card-title class="headline">Login</v-card-title>
                <v-container fluid>
                        <v-text-field
                            class="user-login"
                            v-model="user"
                            label="Username"
                            required
                            ></v-text-field>
                        <v-text-field
                            v-model="password"
                            :append-icon="show ? 'visibility_off' : 'visibility'"
                            :type="show ? 'text' : 'password'"
                            name="input-10-1"
                            label="Normal with hint text"
                            hint="At least 8 characters"
                            counter     
                            required
                            @click:append="show = !show"
                        ></v-text-field>
                </v-container>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn @click="logout()">Logout</v-btn>
                    <v-btn @click="authenticate()">Login</v-btn>
                </v-card-actions>
                <p>No account? <a @click="createUser(false)">Create one now.</a></p>
            </v-card>
        </v-flex>
    </v-layout>
</v-form>
</template>

<script>
import patchProfile from '~/utils/profilePatch.js'
export default {

    components: {
        patchProfile,
    },

    data() {
        return {
            createAccount: false,
            user: '',
            show: false,
            password: 'Password',
            rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 8 || 'Min 8 characters',
            emailMatch: () => ('The email and password you entered don\'t match')
            }
        }
    },

    computed: {
    },

    methods: {
        authenticate() {
            if(!this.$refs.form.validate()) {
                // console.log(this.$store.dispatch('auth/authenticate'))
                return
            }
            if(this.user.includes('@')) {
                this.$store.dispatch('auth/authenticate', {
                    strategy: 'local',
                    email: this.email,
                    password: this.password,
                })
                .then(() => {
                    console.log('Authenticated!')
                })
                .catch(e => {
                    console.error('Authentication error', e);
                })
            } else {
                this.$store.dispatch('auth/authenticate', {
                    strategy: 'local-username',
                    username: this.user,
                    password: this.password,
                })
                .then(() => {
                    console.log('Authenticated!')
                })
                .catch(e => {
                    console.error('Authentication error', e);
                })
            }
        },

        logout() {
            this.$store.dispatch('auth/logout')
            .then(() => {
                console.log('Logged out')
            })
            .catch(e => {
                console.log('Unable to logout', e)
            })
        },

        createUser(val) {
            this.$emit('user', val)
        }
    },

}
</script>

<style scoped>
.user-login {
    width: 100%;
}

</style>
