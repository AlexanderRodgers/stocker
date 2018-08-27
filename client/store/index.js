import Vuex from 'vuex'
import core from '~/store/core/core.js'
import feathersClient from './feathers-client.js'
import feathersVuex, { initAuth } from 'feathers-vuex'
const { auth } = feathersVuex(feathersClient)

const createStore = () => {
  return new Vuex.Store({
    modules: {
      core,
    },
    state: {},
    actions: {
      nuxtServerInit({ commit, dispatch}, { req }) {
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
            'index',
            'login',
          ]
        }
      })
    ],
  });
}

export default createStore