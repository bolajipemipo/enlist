<template>
  <div id="index" class="row">
    <div class="col-md-12">
        <div class="row pt-3">
          <div class="col-md-2"></div>
          <div class="col-md-8 text-muted col-md-12 pt-4 pb-4 text-center" v-if="loading">
            Loading Website...
          </div>
          <div class="col-md-8" v-if="!loading && website">
            <div class="font-w600 mt-2 text-uppercase text-muted">{{website.name}}</div>
            <div class="font-w300 text-muted"><router-link :to="{name: 'Websites'}">Go Back</router-link></div>

            <div class="block block-rounded block-link-pop mt-4">
            <div class="block-content block-content-full card-shadow  d-flex ">
              <div>
                <div class="font-w300 text-black">{{website.description}}</div>
                <p class="text-muted">{{website.url}}</p>
                <a :href="website.url" class="btn btn-primary btn-sm" target="_blank">Visit it now</a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'website',
  data () {
    return {
      loading: true,
      website: {}
    }
  },
  mounted () {
    this.$store.dispatch('getWebsite', this.$route.params.id)
      .then(response => {
        this.loading = false
        this.website = response
      })
      .catch(error => {
        this.loading = false
        console.log(error);
      })
  }
}
</script>
