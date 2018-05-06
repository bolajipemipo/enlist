<template>
  <div id="login" class="row">
    <div class="col-md-12">
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <div class="text-center">
            <div class="font-w600 mt-2 text-uppercase text-muted">Create an Account</div>
            <div class="font-w300 text-muted">Join our members.</div>
          </div>
          <br>
          <div class="card card-shadow">
            <form class="card-block" @submit.prevent="submitted">
              <p class="text-warning" v-if="errors.server_error">{{errors.server_error}}</p>
              <div class="form-group" :class="{ 'has-error': errors.email }">
                <label for="Email">Email</label>
                <input type="email" id="Email" v-model="user.email" class="form-control" placeholder="you@email.com" autofocus>
                <span v-if="emailFormatError || errors.email"><small>{{ errors.email }}</small></span>
              </div>
              <br>
              <div class="form-group" :class="{ 'has-error': errors.password }">
                <label for="Password">Password</label>
                <input type="password" id="Password" v-model="user.password" class="form-control">
                <span v-if="passwordHelp || errors.password" class="text-warning"><small>{{ errors.password }}</small></span>
              </div>
              <br>
              <div class="form-group" :class="{ 'has-error': errors.password_confirmation }">
                <label for="ConfirmPassword">Confirm Password</label>
                <input type="password" id="ConfirmPassword" v-model="user.password_confirmation" class="form-control">
                <span v-if="passwordsNotSame || errors.password_confirmation" class="text-warning"><small>{{ errors.password_confirmation }}</small></span>
              </div>
              <button type="submit" class="btn btn-primary" :disabled="notAllSet||connecting">
                Create Account <span v-if="connecting">...</span>
              </button>
              <router-link to="/login" class="btn btn-default">Login</router-link>
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
        user: {email: '', password: '', password_confirmation: ''},
        errors: {email: null, password: null, password_confirmation: null},
        connecting: false
      }
    },
    computed: {
      notAllSet () {
        return !Auth.check.isEmailValid(this.user.email) || !Auth.check.isPasswordValid(this.user.password)
          || !Auth.check.doPasswordsMatch(this.user.password, this.user.password_confirmation);
      },
      passwordHelp () {
        if ((this.user.password !== '') && !Auth.check.isPasswordValid(this.user.password)) {
          this.errors.password = Auth.generate.InvalidPasswordError();
          return true;
        }
        this.errors.password = null;
        return false;
      },
      passwordsNotSame () {
        if (Auth.check.doPasswordsMatch(this.user.password, this.user.password_confirmation)){
          this.errors.password_confirmation = null;
          return false
        }
        this.errors.password_confirmation = Auth.generate.InvalidPasswordMatchError();
        return true
      },
      emailFormatError () {
        if ((this.user.email !== '') && !Auth.check.isEmailValid(this.user.email)) { this.errors.email = Auth.generate.InvalidEmailError(); return true }
        this.errors.email = null;
        return false;
      },
    },
    methods: {
      submitted () {
        this.connecting = true;
        this.$store.dispatch('register', this.user)
          .then(response => this.$router.push('/login'))
          .catch(error => {
            this.connecting = false;
            if (error.response&&error.response.data.success)
              this.errors.server_error = error.response.data.error
            else
              this.errors.server_error = 'Something went wrong.';
        })
      }
    },
  }
</script>
