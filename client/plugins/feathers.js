import Vue from 'vue'

import feathers from '@feathersjs/feathers'
import reactive from 'feathers-reactive'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'
import { CookieStorage } from 'cookie-storage'

const dev = 'http://localhost:3030'

const socket = io(dev)
const token = 'c83eb398aa8cd59e7c33147a0068d542c0a4a62b889437f452b8995a844ddf3d9c068a417e72ebd5672e0b7d2b662e8f74b11a25c6f7d083b23b7870b4283852a9e1eaa102b6a7be0a5b8cbdb12677135cc002416c68dd1093af2a031dd7b41bcab183e3baa23fda84ae4d3370b4267bfd63f9883699ce552182690ad2e86c9d9c26b1d024cbcb6e7dcc9e71d06e074eb346f886b41df517b4cf2675a250a59439d0c226a517c03a83655dd05b6f5f398ad9ed9ea402025700b7b6af23c118b88236a38c54f805833e544d4ec5686d45e329220ceb87883e34b625f191bf7884d058283bd6c12345101a81069f181dc5d7ab65675097b1765ef6db355432b526'

const feathersClient = feathers()
.configure(reactive({idField: '_id'}))
.configure(socketio(socket))
.configure(auth({ storage: new CookieStorage() }))

Vue.prototype.$F = feathersClient

Vue.prototype.$F.authenticate().then(() => {
  console.log('succeeded')
}).catch(() => {
  console.log('failed')
}) 

import {VueFeathers} from '@vue-feathers/vue-feathers'
Vue.use(VueFeathers, {feathersClient})