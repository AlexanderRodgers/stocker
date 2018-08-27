import Vue from 'vue'

import feathers from '@feathersjs/feathers'
import reactive from 'feathers-reactive'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'
import { CookieStorage } from 'cookie-storage'

const dev = 'http://localhost:3030'

const socket = io(dev)

const feathersClient = feathers()
.configure(reactive({idField: '_id'}))
.configure(socketio(socket))
.configure(auth({ storage: new CookieStorage() }))

Vue.prototype.$F = feathersClient

import {VueFeathers} from '@vue-feathers/vue-feathers'
Vue.use(VueFeathers, {feathersClient})