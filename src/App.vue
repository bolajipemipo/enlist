<template>
  <div id="app">
    <div id="page-container">
      <header id="page-header">
        <div class="content-header">
          <router-link :to="{ name: 'Index' }" class="link-fx font-size-lg text-dual">
            <img src="./assets/enlist.png" alt="Logo">
            En<span class="font-w700">list</span>
          </router-link>
          <div class="float-right" v-if="isLoggedIn">
            <a href="javascript:void(0)" @click="logout">Logout</a>
          </div>
        </div>
      </header>
      <main id="main-container">
        <div class="bg-image" style="background-image: url('/static/images/amazed-beautiful-beauty-599577.jpg');">
          <div class="bg-primary-op">
            <div class="content content-full content-top text-center">
              <div class=" pb-5">
                <h1 class="font-w300 text-white mb-1">Welcome to Enlist.</h1>
                <h2 class="h3 font-w300 text-white-75">Find Newest Websites Around You!</h2>
                <div v-if="!isLoggedIn">
                  <router-link :to="{ name: 'Login' }" class="btn btn-danger">Login</router-link>
                  <router-link :to="{ name: 'Register' }" class="btn btn-primary">Create an Account</router-link>
                </div>
                <div v-else>
                  <router-link :to="{ name: 'Websites' }" class="btn btn-danger">See Websites</router-link>
                  <router-link :to="{ name: 'AddWebsite' }" class="btn btn-success">Add a Website</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <router-view/>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
  import {Auth} from "./Auth";

  export default {
    name: 'index',
    computed: {
      isLoggedIn () {
        return Auth.check.isAuthenticated()
      }
    },
    methods: {
      logout() {
        Auth.clear.accessToken()
        window.location.href = '/';
      }
    }
  }
</script>
