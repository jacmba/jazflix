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
          <JazflixLogo />
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

      <LogoutCard class="lower" />
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

  async mounted() {
    await this.$store.dispatch('fetchData')
    if (!this.$store.state.bypass && !this.$store.state.auth.token) {
      this.router.push('/login')
    }
  },
}
</script>

<style>
.lower {
  position: absolute;
  bottom: 0;
  text-align: center;
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
  text-align: center;
}
</style>
