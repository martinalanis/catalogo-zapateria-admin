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
          <v-col>
            <header class="header-logo elevation-2 mt-6">
              <img src="~/assets/logo.png" alt="Zapaterias de León">
            </header>
          </v-col>
          <v-col cols="12" class="py-0">
            <p class="grey--text text--lighten-2 text-capitalize text-center mb-0">
              {{ $auth.user.name.split(' ')[0] }}
            </p>
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
              color="amber darken-3"
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
      dark
      absolute
      app
      flat
      color="#212121"
      elevation="1"
    >
      <nuxt-link to="/" class="app-bar-logo">
        <img src="~/assets/logo.webp" alt="Zapaterias de León" class="img-block">
      </nuxt-link>
      <v-spacer></v-spacer>
      <nav class="menu d-none d-md-block">
        <nuxt-link
          v-for="(item, i) in categories"
          :key="i"
          :to="item.to"
        >{{ item.title }}</nuxt-link>
        <div class="d-inline-block mr-3 grey--text text--lighten-2">
          <span class="mr-2">|</span>
          <small class="text-capitalize">
            {{ $auth.user.name.split(' ')[0] }}
          </small>
        </div>
        <v-btn
          dark
          small
          color="amber darken-3"
          @click="$auth.logout()"
        >
          Salir
          <v-icon right>mdi-logout</v-icon>
        </v-btn>
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
          title: 'Inicio',
          to: '/'
        },
        {
          title: 'Productos',
          to: '/productos'
        },
        {
          title: 'Vendedores',
          to: '/vendedores'
        },
        {
          title: 'Administradores',
          to: '/administradores'
        }
      ],
      miniVariant: false
    }
  }
}
</script>
