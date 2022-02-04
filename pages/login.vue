<template>
  <div style="display: block; margin-left: auto; margin-right: auto">
    <h1>Iniciar sesión con Google</h1>
    <a class="button" @click="loginWithGoogle">
      <v-img
        src="https://sevenarrows.org/wp-content/uploads/2020/09/sign-in-with-google-icon-3.png"
        style="width: 300px"
      />
    </a>
  </div>
</template>

<script>
export default {
  mounted() {
    if (this.$store.state.auth.token) {
      this.$router.push({ name: '/' })
    }
  },

  methods: {
    async loginWithGoogle() {
      const authUri = await this.$axios.$get(this.$store.state.api + 'auth')
      window.location.href = authUri
    },
  },
}
</script>
