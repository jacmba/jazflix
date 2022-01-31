<template>
  <div>
    <v-text-field
      v-model="search"
      label="Búsqueda"
      placeholder="Búsqueda"
      outlined
      style="width: 50%; align: right"
    ></v-text-field>
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
        <nuxt-link :to="'/video/' + movie.id"
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
  data() {
    return {
      search: '',
      data: [],
      movies: [],
    }
  },

  watch: {
    search(val) {
      const search = val.toLowerCase()
      this.movies = this.data.filter(
        (m) =>
          search.length === 0 ||
          m.title.toLowerCase().includes(search) ||
          m.description.toLowerCase().includes(search)
      )
    },
  },

  async mounted() {
    await this.$store.dispatch('fetchData')
    const extra = this.$route.params.name
    const data = this.$store.state.data
    const flatData = data.filter((d) => d.extra && d.extra.includes(extra))

    this.data = flatData
    this.movies = flatData
  },
}
</script>
