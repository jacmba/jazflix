<template>
  <div>
    <v-row justify="center" align="center">
      <v-col>
        <v-text-field
          v-model="search"
          label="Búsqueda"
          placeholder="Búsqueda"
          outlined
          style="max-width: 50%; align: left"
        ></v-text-field>
      </v-col>
      <v-col>
        <div class="right mobile-only">
          <LogoutCard />
        </div>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col
        v-for="movie in filtered"
        :key="movie.title"
        cols="12"
        sm="8"
        md="6"
        lg="4"
        xl="3"
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
    },
  },
}
</script>

<style>
.mobile-only {
  display: none;
}

.right {
  margin-left: auto;
  margin-right: 0;
}

@media screen and (max-width: 768px) {
  .mobile-only {
    display: block;
  }
}
</style>
