import {Auth} from '../Auth'

export default (to, from, next) => {
  if (!Auth.check.isAuthenticated()) {
    next()
  } else {
    // Store existing location in local_storage
    next({
      path: '/'
    })
  }
}
