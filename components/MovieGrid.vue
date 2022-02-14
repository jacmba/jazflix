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
        v-for="movie in filtered"
        :key="movie.title"
        cols="12"
        sm="8"
        md="6"
        align="center"
        justify="center"
      >
        <MovieCard :movie="movie" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ['data'],

  data() {
    const filtered = this.data
    return {
      search: '',
      filtered,
    }
  },

  watch: {
    search(val) {
      const search = val.toLowerCase()
      this.filtered = this.data.filter(
        (m) =>
          search.length === 0 ||
          m.title.toLowerCase().includes(search) ||
          m.description.toLowerCase().includes(search)
      )
    },

    data(val) {
      this.filtered = val
    }
  },
}
</script>