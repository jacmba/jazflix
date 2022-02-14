<template>
  <MovieGrid :data="data" />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      data: {},
    }
  },

  async mounted() {
    if (!this.$store.state.auth.token) {
      this.$router.push('/login')
    }

    await this.$store.dispatch('fetchData')
    this.data = this.$store.state.data
  },
}
</script>
