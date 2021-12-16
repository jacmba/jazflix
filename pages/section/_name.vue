<template>
  <div>
    <v-row justify="center" align="center">
      <v-col
        v-for="movie in movies"
        :key="movie.title"
        cols="12"
        sm="8"
        md="6"
        align="center"
        justify="center"
      >
        <nuxt-link :to="'/video/' + movie.video"
          ><v-card>
            <v-img :src="movie.image" max-height="250" max-width="150"></v-img>
            <h1>{{ movie.title }}</h1>
            <h4>{{ movie.description }}</h4>
          </v-card></nuxt-link
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  computed: {
    movies() {
      const extra = this.$route.params.name
      const data = this.$store.state.data
      const flatData = this.$store.state.categories
        .map((c) => {
          return data[c].filter((d) => d.extra && d.extra.includes(extra))
        })
        .filter((d) => d.length > 0)
        .reduce((p, c) => [...p, ...c], [])

      return flatData
    },
  },

  mounted() {
    this.$store.dispatch('fetchData')
  },
}
</script>
