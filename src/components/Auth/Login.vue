<template>
  <div id="login" class="row">
    <div class="col-md-12">
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6">
            <div class="text-center">
              <div class="font-w600 mt-2 text-uppercase text-muted">Login</div>
              <div class="font-w300 text-muted">Login to view listing.</div>
            </div>
            <br>
            <div class="card card-shadow">
              <form class="card-block" @submit.prevent="submitted">

                <div class="alert alert-info" v-if="locationIntended">
                  Please login to continue
                </div>

                <p class="text-success" v-if="newNotification">{{newNotification}}</p>
                <p class="text-warning" v-if="errors.server_error">{{errors.server_error}}</p>

                <div class="form-group" :class="{ 'has-error': errors.email }">
                  <label for="Email">Email</label>
                  <input type="email" id="Email" v-model="user.email" class="form-control"
                         placeholder="you@email.com"  autofocus>
                  <span v-if="emailFormatError || errors.email"><small>{{ errors.email }}</small></span>
                </div>
                <br>
                <div class="form-group" :class="{ 'has-error': errors.password }">
                  <label for="Password">Password</label>
                  <input type="password" id="Password" v-model="user.password" class="form-control">
                  <span v-if="errors.password">{{ errors.password }}</span>
                </div>
                <button type="submit" class="btn btn-primary" :disabled="notAllSet||connecting">
                  Login <span v-if="connecting">...</span>
                </button>
                <router-link to="/register" class="btn btn-default">Create Account</router-link>
              </form>
            </div>

            <br /><br /><br /><br />
        </div>
          <div class="col-md-3"></div>
        </div>
    </div>
  </div>
</template>

<script>
import {Auth} from "../../Auth";

export default {
  data () {
    return {
      user: {email: '', password: ''},
      errors: {email: null, password: null, server_error: null},
      connecting: false
    }
  },
  computed: {
    notAllSet() {
      return !Auth.check.isEmailValid(this.user.email) || !Auth.check.isPasswordValid(this.user.password);
    },
    newNotification() {
      return this.$store.getters.general_notification
    },
    locationIntended() {
      return Auth.get.URLIntended()
    },
    emailFormatError () {
      if ((this.user.email !== '') && !Auth.check.isEmailValid(this.user.email)) { this.errors.email = Auth.generate.InvalidEmailError(); return true }
      this.errors.email = null;
      return false;
    },
  },
  methods: {
    submitted () {
      this.errors.server_error = null;
      this.connecting = true;
      this.$store.dispatch('login', this.user)
        .then(response => {
          const to = (this.locationIntended) ? this.locationIntended : '/websites'
          Auth.clear.URLIntended()
          window.location.href = to
        }).catch(error => {
          this.connecting = false;
          if (error.response&&error.response.data.success)
            this.errors.server_error = error.response.data.error
          else
            this.errors.server_error = 'Something went wrong.';
      });
    }
  },
}
</script>
