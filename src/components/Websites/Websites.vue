<template>
  <div id="index" class="row">
    <div class="col-md-12">
        <div class="row pt-3">
          <div class="col-md-2"></div>
          <div class="col-md-8">
            <div class="font-w600 mt-2 text-uppercase text-muted">Hello World</div>
            <div class="font-w300 text-muted">Go wherever you want!</div>

            <p v-if="loading" class="text-muted col-md-12 pt-4 pb-4 text-center">Loading Websites...</p>

            <div class="block block-rounded block-link-pop mt-4" v-if="!loading && websites"
                 v-for="(website, index) in websites" :key="index">
            <div class="block-content block-content-full card-shadow  d-flex ">
              <div>
                <div class="font-w600 mt-2 text-muted">{{website.name}}</div>
                <p></p>
                <div class="font-w300 text-black">{{website.description}}</div>
                <p class="text-muted">{{website.url}}</p>
                <a :href="website.url" class="btn btn-primary btn-sm" target="_blank">Visit it now</a>
               <router-link :to="{ name: 'Website', params: {id: website.id }}" class="btn btn-dark btn-sm">Read More</router-link>
              </div>
            </div>
          </div>
        </div>
          <div class="col-md-2"></div>

          <div v-if="!loading && websites" class="text-muted col-md-12 pt-4 pb-5 text-center">
            Don't fret. More wIll be added soon!
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true
    }
  },
  computed: {
    websites () {
      return this.$store.getters.websites
    }
  },
  mounted () {
    this.$store.dispatch('getWebsites')
      .then(response => this.loading = false)
      .catch(error => {
        this.loading = false
        console.log(error);
      })
  }
}
</script>
