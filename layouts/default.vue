<template>
  <v-app dark>
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
      integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
      crossorigin="anonymous"
    />
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item>
          <v-img
            src="https://fontmeme.com/permalink/210824/53a131e0396614b0fd10a53a4c44ce42.png"
          ></v-img>
        </v-list-item>
        <v-list-item
          v-for="(item, i) in sections"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <div v-if="isLogged()" class="lower">
        <v-img :src="getPicture()" class="avatar"></v-img>
        <span class="centered">{{ getName() }}</span
        ><br />
        <span class="centered"><a @click="logout()">Cerrar sesión</a></span>
      </div>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }} Jacinto Mba</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },

  computed: {
    ...mapGetters(['sections']),
  },

  mounted() {
    this.$store.dispatch('fetchData')
  },

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

<style>
.lower {
  position: absolute;
  bottom: 0;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.avatar {
  width: 64px;
  height: 64px;
  margin-left: auto;
  margin-right: auto;
}

.centered {
  margin-left: auto;
  margin-right: auto;
}
</style>
