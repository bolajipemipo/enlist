<template>
  <div id="index" class="row">
    <div class="col-md-12">
        <div class="row pt-3">
          <div class="col-md-2"></div>
          <div class="col-md-8">
            <div class="font-w600 mt-2 text-uppercase text-muted">Hello World</div>
            <div class="font-w300 text-muted">Go wherever you want!</div>

            <div class="block block-rounded block-link-pop mt-4" v-for="website in websites">
            <div class="block-content block-content-full card-shadow  d-flex ">
              <div>
                <div class="font-w600 mt-2 text-muted">{{website.name}}</div>
                <p></p>
                <div class="font-w300 text-black">{{website.description}}</div>
                <p class="text-muted">{{website.url}}</p>
                <a :href="website.url" class="btn btn-primary btn-sm" target="_blank">Visit it now</a>
              </div>
            </div>
          </div>
        </div>
          <div class="col-md-2"></div>

          <div class="text-muted col-md-12 pt-4 pb-4 text-center">
            Don't fret. More wIll be added soon!
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'websites',
  data () {
    return {
      searchInput: '',
      results: '',
      now_searching: false
    }
  },
  computed: {
    websites () {
      return this.$store.getters.websites
    }
  },
  mounted() {
    this.$store.dispatch('getWebsites')
      .then(response => {
        console.log(response)
        this.now_searching = false
        this.results = 'These are the results'
      })
      .catch(error => {
        console.log(error)
        this.now_searching = false
        this.results = 'An error occurred'
      })
  },
}
</script>
