import Vuex from 'vuex'
import feathersClient from './feathers-client'
import feathersVuex, { initAuth } from 'feathers-vuex'
const { auth } = feathersVuex(feathersClient)
const createStore = () => {
  return new Vuex.Store({
    state: {},
    mutations: {
      increment (state) {
        state.counter++
      }
    },
    actions: {
      nuxtServerInit ({ commit, dispatch }, { req }) {
        return initAuth({
          commit,
          dispatch,
          req,
          moduleName: 'auth',
          cookieName: 'feathers-jwt'
        })
      }
    },
    plugins: [
      auth({
        userService: 'users',
        state: {
          publicPages: [
            'login',
            'signup'
          ]
        }
      })
    ]
  })
}
export default createStore