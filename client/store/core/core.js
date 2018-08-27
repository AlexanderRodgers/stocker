import newStore from '~/store/store.js'

let s = newStore()
  .addModule('auth', newStore())
  .addKey('authed', false)
  .addKey('user', false)

export default s