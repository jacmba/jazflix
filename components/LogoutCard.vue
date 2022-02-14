<template>
  <div v-if="isLogged()" class="centered">
    <v-img :src="getPicture()" class="avatar"></v-img>
    <span class="centered">{{ getName() }}</span
    ><br />
    <span class="centered"><a @click="logout()">Cerrar sesión</a></span>
  </div>
</template>

<script>
export default {
  methods: {
    isLogged() {
      return this.$store.state.auth && this.$store.state.auth.token
    },

    getName() {
      return this.$store.state.auth.name
    },

    getPicture() {
      return this.$store.state.auth.picture
    },

    logout() {
      this.$store.commit('logout')
      this.$router.push('/login')
    },
  },
}
</script>
