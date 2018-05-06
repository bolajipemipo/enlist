import API from '../network/API'
import {Auth} from '../Auth'
import axios from 'axios'

export default {
  login ({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(API.login, payload)
        .then(response => {
          console.log(response.data);
          Auth.set.accessToken(response.data.token);

          if (response.data.success) {
            commit('updateToken', response.data.token);
            resolve(response)
          }
        }).catch(error => {
          reject(error)
      })
    })
  },
  register ({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(API.register, payload)
        .then(response => {
          if (response.data.success) {
            commit('newNotification', response.data.message);
            resolve(response)
          }
        }).catch(error => {
          reject(error)
      })
    })
  },
  postWebsite ({commit}, payload) {
    return new Promise((resolve, reject) => {
      Auth.get.bearer();
      axios.post(API.websites, payload)
        .then(response => {
          console.log(response);
          if (response.data.success) {
            commit('updateWebsite', response.data.data);
            resolve(response)
          }
        }).catch(error => {
        if (error.response&&error.response.data.success)
          reject(error.response.data.error)
        reject(error)
      })
    })
  },
  getWebsites ({commit}) {
    return new Promise((resolve, reject) => {
      Auth.get.bearer();
      window.axios.get(API.websites)
        .then(response => {
          if (response.data.success) {
            commit('updateWebsites', response.data.data);
            resolve(response)
          }
        })
        .catch(error => {
          if (error.response&&error.response.data.success)
            reject(error.response.data.error)
          reject(error)
        })
    })
  }
}
