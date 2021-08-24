<template>
  <div justify="center" align="center">
    <h1>{{ name() }}</h1>
    <video controls autoplay id="myScreen">
      <source :src="'/' + name()" type="video/mp4" />
    </video>
    <br />
    <v-btn dark large v-on:click="full">PANTALLA COMPLETA</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    full() {
      const elem = document.getElementById('myScreen')
      elem.requestFullscreen('hide')
    },

    name() {
      return this.$route.params.name
    }
  },
}
</script>


<style>
video {
  height: auto;
  width: 50%;
}
</style>
