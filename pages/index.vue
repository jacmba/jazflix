<template>
  <div>
    <div v-for="cat in categories" :key="cat">
      <h1>{{ cat }}</h1>
      <v-row justify="center" align="center">
        <v-col
          cols="12"
          sm="8"
          md="6"
          align="center"
          justify="center"
          v-for="movie in data[cat]"
          :key="movie.title"
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['data', 'categories']),
  },

  mounted() {
    this.$store.dispatch('fetchData')
  },
}
</script>
