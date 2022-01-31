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
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      search: '',
      data: {},
      filtered: {},
    }
  },

  computed: {
    ...mapGetters(['categories']),
  },

  watch: {
    search(val) {
      const search = val.toLowerCase()
      this.filtered = this.categories.filter(
        (d) =>
          search.length === 0 ||
          d.title.toLowerCase().includes(search) ||
          d.description.toLowerCase().includes(search)
      )
    },
  },

  async mounted() {
    await this.$store.dispatch('fetchData')
    this.data = this.$store.state.data
    this.filtered = this.data
  },
}
</script>
