<template>
  <div>
    <nuxt-link :to="'/video/' + movie.id"
      ><v-card>
        <v-img :src="movie.image" max-height="250" max-width="150"></v-img>
        <h1>{{ movie.title }}</h1>
        <h4>{{ movie.description }}</h4>
      </v-card></nuxt-link
    >
  </div>
</template>

<script>
  export default {
    props: ['movie']
  }
</script>
