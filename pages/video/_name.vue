<template>
  <div justify="center" align="center">
    <h1>{{ name() }}</h1>
    <video controls autoplay id="myScreen">
      <source :src="'/' + name()" type="video/mp4" />
    </video>
    <br />
    <v-btn dark large v-on:click="full" v-focus>PANTALLA COMPLETA</v-btn>
  </div>
</template>

<script>
const focus = {
  inserted(el) {
    el.focus()
  }
}

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

  directives: { focus }
}
</script>


<style>
video {
  height: auto;
  width: 50%;
}
</style>
