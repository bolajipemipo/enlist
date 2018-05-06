<template>
  <div id="index" class="row">
    <div class="col-md-12">
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-8" data-toggle="appear" data-timeout="250">
            <div class="font-w600 mt-2 text-uppercase text-muted">Share A Website</div>
            <div class="font-w300 text-muted">Share an amazing website for everyone to visit!</div>
            <br>
            <div class="card card-shadow">
              <form class="card-block" @submit.prevent="submitted">
                <p class="text-danger" v-if="errors.server_error">{{errors.server_error}}</p>
                <div class="form-group">
                  <label for="Name">Name</label>
                  <input type="text" id="Name" v-model="website.name" class=" form-control" autofocus placeholder="Website Name...">
                </div>
                <br>
                <div class="form-group">
                  <label for="Name">URL</label>
                  <input type="text" id="URL" v-model="website.url" class=" form-control" placeholder="e.g. http://site.com">
                </div>
                <br>
                <div class="form-group">
                  <label for="Question">Description</label>
                  <textarea id="Question" cols="20" v-model="website.description" class=" form-control" rows="5" :placeholder="'About ' + website.name"></textarea>
                </div>
                <button type="submit" class="btn btn-primary" :disabled="notAllSet||connecting">
                  Share Website  <span v-if="connecting">...</span>
                </button>
                <router-link to="/websites" class="btn btn-default">Cancel</router-link>
              </form>
            </div>

            <br /><br /><br /><br />
        </div>
          <div class="col-md-2"></div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      website: {name: '', url: '', description: ''},
      errors: {server_error: null},
      connecting: false
    }
  },
  computed: {
    notAllSet() {
      return (this.website.name === '') || (this.website.url === '') || (this.website.description === '');
    },
  },
  methods: {
    submitted () {
      this.connecting = true;
      this.errors.server_error = null;
      this.$store.dispatch('postWebsite', this.website)
        .then(response => this.$router.push('/websites'))
        .catch(error => {
          this.connecting = false;
          if (error.response&&error.response.data.success)
            this.errors.server_error = error.response.data.error
          else
            this.errors.server_error = 'Something went wrong.';
      });
    }
  }
}
</script>
