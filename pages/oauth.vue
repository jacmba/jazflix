<template>
  <div>
    <v-card v-if="name && name.length > 0">
      <h1>Bienvenid@, {{ name }}!!</h1>
      <nuxt-link :to="'/'">Continuar</nuxt-link>
    </v-card>
    <v-card v-if="error !== null">
      Ha habido un error iniciando sesión con Google. Contacte con el
      administrador.
    </v-card>
  </div>
</template>

<script>
import * as jwt from 'jsonwebtoken'

export default {
  data() {
    return {
      name: '',
      error: null,
    }
  },

  async mounted() {
    if (this.$store.state.auth.token) {
      this.$router.push('/')
    }

    try {
      const code = this.$route.query.code
      const auth = await this.$axios.$get(
        this.$store.state.api + 'auth/token?code=' + code
      )
      const decoded = jwt.decode(auth.token)
      auth.name = decoded.name
      auth.picture = decoded.picture
      this.$store.commit('login', auth)
      this.name = decoded.given_name
    } catch (e) {
      console.error(e)
      this.error = e
    }
  },
}
</script>
