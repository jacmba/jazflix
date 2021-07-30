<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-btn dark large v-on:click="full">FULL SCREEN</v-btn>
      <video controls id="myScreen">
        <source src="Donut.m4v" type="video/mp4" />
      </video>
    </v-col>
  </v-row>
</template>

<script>
export default {
  methods: {
    full() {
      const elem = document.getElementById('myScreen')
      elem.requestFullscreen('hide')
    },
  },
}
</script>


<style>
video {
  height: auto;
  width: 100%;
}
</style>
