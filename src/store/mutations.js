export default {
  newNotification (state, msg) {
    state.general_notification = msg
  },
  updateToken (state, token) {
    state.token = token
  },
  updateWebsites (state, websites) {
    state.websites = websites
  },
  updateWebsite (state, website) {
    state.websites.unshift(website)
  }
}
