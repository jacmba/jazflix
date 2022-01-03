<template>
  <div>
    <v-text-field
      v-model="search"
      label="Búsqueda"
      placeholder="Búsqueda"
      outlined
      style="width: 50%; align: right"
    ></v-text-field>
    <div v-for="cat in categories" :key="cat">
      <h1>{{ cat }}</h1>
      <v-row justify="center" align="center">
        <v-col
          v-for="movie in filtered[cat]"
          :key="movie.title"
          cols="12"
          sm="8"
          md="6"
          align="center"
          justify="center"
        >
          <nuxt-link :to="'/video/' + movie.video"
            ><v-card>
              <v-img
                :src="movie.image"
                max-height="250"
                max-width="150"
              ></v-img>
              <h1>{{ movie.title }}</h1>
              <h4>{{ movie.description }}</h4>
            </v-card></nuxt-link
          >
        </v-col>
      </v-row>
      <br />
      <hr />
      <br />
    </div>
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
      const data = this.data
      const search = val.toLowerCase()
      this.filtered = this.categories.reduce((p, c) => {
        const result = { ...p }
        result[c] = data[c].filter(
          (d) =>
            search.length === 0 ||
            d.title.toLowerCase().includes(search) ||
            d.description.toLowerCase().includes(search)
        )
        return result
      }, data)
    },
  },

  async mounted() {
    await this.$store.dispatch('fetchData')
    this.data = this.$store.state.data
    this.filtered = this.data
    this.categories = this.$store.state.categories
  },
}
</script>
