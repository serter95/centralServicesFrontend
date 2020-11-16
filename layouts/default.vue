<template>
  <v-app
    color="red"
  >
    <v-app-bar
      color="blue"
      dense
      app
    >
      <span class="white--text">
        Central Services
      </span>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
      color="blue"
    >
      <span class="white--text">&copy; {{ new Date().getFullYear() }} Ing. Sergei Terán</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    this.$vuetify.theme.dark = false
    return { }
  }
}
</script>
