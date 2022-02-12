<template>
  <div v-if="videoToken" justify="center" align="center">
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

  data() {
    return {
      videoToken: false,
    }
  },

  async mounted() {
    if (!this.$store.state.auth.token) {
      this.$router.push('/login')
    }

    // Get video token
    const uri = this.$store.state.api + 'auth/video'
    const headers = {
      authorization: 'Bearer ' + this.$store.state.auth.token,
    }

    const token = await this.$axios.get(uri, { headers })
    this.videoToken = token.data
  },

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
        this.$route.params.name +
        '?token=' +
        this.videoToken +
        '$$$$$' +
        this.$store.state.auth.token
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
