export default function patchProfile(userID) {
  this.$F.service('users')
    .find({
      query: {
        id: userID
      }
    })
    .then(info => this.$store.commit('auth/setUser', info[0]))
}