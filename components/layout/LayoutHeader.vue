<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      dark
      color="#212121"
      width="230px"
      mobile-breakpoint="960"
    >
      <template #prepend>
        <v-row justify="center">
          <v-col class="my-5">
            <header class="header-logo elevation-2 mt-4">
              <img src="~/assets/logo.webp" alt="Zapaterias de León">
            </header>
          </v-col>
        </v-row>
      </template>
      <v-list flat>
        <v-list-item
          color="#ffca1d"
          to="/home"
          router
          exact
        >
          <v-list-item-content>
            <v-list-item-title>
              Inicio
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-subheader class="font-weight-light">Categorías</v-subheader>
        <v-divider></v-divider>
        <v-list-item-group
          color="#ffca1d"
        >
          <v-list-item
            v-for="(item, i) in categories"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <!-- <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action> -->
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template #append>
        <v-row justify="center">
          <v-col>
            <v-btn
              dark
              depressed
              color="purple darken-4"
              block
              tile
              large
              @click="$auth.logout()"
            >
              Salir
              <v-icon right>mdi-logout</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      absolute
      app
      flat
      color="#fff"
      elevation="1"
    >
      <nuxt-link to="/home" class="app-bar-logo">
        <img src="~/assets/logo.webp" alt="Zapaterias de León" class="img-block">
      </nuxt-link>
      <v-spacer></v-spacer>
      <nav class="menu">
        <nuxt-link
          v-for="(item, i) in categories"
          :key="i"
          :to="item.to"
        >{{ item.title }}</nuxt-link>
      </nav>
      <v-app-bar-nav-icon class="d-block d-md-none" @click.stop="drawer = !drawer" />
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      drawer: null,
      categories: [
        {
          // icon: 'mdi-chart-bubble',
          title: 'Vendedores',
          to: '/vendedores'
        }
      ],
      miniVariant: false
    }
  }
}
</script>
