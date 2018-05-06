<template>
  <div id="index" class="row">
    <div class="col-md-12">
      <div class="row pt-5 pb-7">
        <div class="col-md-6 text-center">
          <img src="/static/images/airport-backpack-bag-842991.jpg" width="55%" alt="Image">
        </div>
        <div class="col-md-6  text-center mt-4 text-main" style="padding-top: 5%;">
          <h2>#1. See what's trending.</h2>
          <p>See them uploaded daily.</p>
        </div>
      </div>
      <div class="row pb-5">

        <div class="col-md-6 text-center">
          <img src="/static/images/app-background-blur-545331.jpg" width="55%" alt="Image">
        </div>
        <div class="col-md-6 text-center mt-4 text-main" style="padding-top: 5%;">
          <h2>#2. Visit Amazing Websites</h2>
          <p>As recent as today!</p>
        </div>
      </div>
      <div class="row pb-5">
        <div class="col-md-6 text-center">
          <img src="/static/images/computer-electronics-internet-163097.jpg" width="55%" alt="Image">
        </div>
        <div class="col-md-6 mt-4 text-center text-main" style="padding-top: 5%;">
          <h2>#3. Discover more daily</h2>
          <p>Many more websites are uploaded daily.</p>
        </div>
      </div>
      <div class="bg-image" style="background-image: url('/static/images/beard-eyewear-guitar-977971.jpg');">
        <div class="bg-primary-dark-op">
          <div class="content content-full content-top text-center">
            <div class=" pb-5">
              <h1 class="font-w300 text-white mb-1">Find your art.</h1>
              <h2 class="h3 font-w300 text-white-75">The #1 Websites Listing App.</h2>
              <br>
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
      <div class="col-md-12 p-3 text-center">
        &copy; BolajiPemipo 2018.
      </div>
    </div>
  </div>
</template>

<script>
import {Auth} from "../Auth";

export default {
  computed: {
    isLoggedIn () {
      return Auth.check.isAuthenticated()
    },
  },}
</script>

<style scoped>
</style>
