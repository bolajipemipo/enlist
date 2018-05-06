import axios from 'axios'

export const Auth = {
  get: {
    accessToken () {
      return localStorage.getItem('KEY_TOKEN')
    },
    bearer () {
      axios.interceptors.request.use(function (config) {
        config.headers.Authorization = 'Bearer ' + Auth.get.accessToken();
        return config;
      });
    },
    URLIntended () {
      return localStorage.getItem('FROM')
    },
  },
  set: {
    accessToken (token) {
      return localStorage.setItem('KEY_TOKEN', token)
    },
    URLIntended (url) {
      return localStorage.setItem('FROM', url)
    }
  },
  clear: {
    accessToken() {
      return localStorage.removeItem('KEY_TOKEN')
    },
    URLIntended () {
      return localStorage.removeItem('FROM')
    }
  },
  check: {
    isAuthenticated () {
      // TODO: Try cookies too
      // TODO: Not just retrieve, pull in a package to know whether its still a valid JWT Token
      return !!(localStorage.getItem('KEY_TOKEN'))
    },
    isEmailValid (email) {
      return this._validateEmail(email);
    },
    doPasswordsMatch (password, password_confirmation) {
      return (password === password_confirmation);
    },
    isPasswordValid (password) {
      if ((password !== '') && (password.length >= 6)) return true;
    },
    _validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  },
  generate: {
    /**
     * @return {string}
     */
    InvalidPasswordError() {
      return 'Password should be more than 5 Characters.';
    },
    /**
     * @return {string}
     */
    InvalidEmailError() {
      return 'Email not in right format yet.';
    },
    /**
     * @return {string}
     */
    InvalidPasswordMatchError() {
      return 'Passwords don\'t match yet.';
    }
  }
};
