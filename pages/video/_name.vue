<template>
  <div justify="center" align="center">
    <video id="myScreen" controls autoplay>
      <source :src="name()" type="video/mp4" />
    </video>
    <br />
    <v-btn v-focus dark large @click="full">PANTALLA COMPLETA</v-btn>
  </div>
</template>

<script>
const focus = {
  inserted(el) {
    el.focus()
  },
}

export default {
  directives: { focus },
  methods: {
    full() {
      const elem = document.getElementById('myScreen')
      elem.requestFullscreen()
    },

    name() {
      return (
        this.$store.state.api +
        this.$store.state.moviesPath +
        '/' +
        this.$route.params.name
      )
    },
  },
}
</script>

<style>
video {
  height: auto;
  width: 50%;
}
</style>
