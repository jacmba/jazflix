<template>
  <MovieGrid :data="data" />
</template>

<script>
export default {
  data() {
    return {
      data: [],
    }
  },

  async mounted() {
    if (!this.$store.state.auth.token) {
      this.$router.push('/login')
    }

    await this.$store.dispatch('fetchData')
    const extra = this.$route.params.name
    const data = this.$store.state.data
    const flatData = data.filter((d) => d.extra && d.extra.includes(extra))

    this.data = flatData
  },
}
</script>
