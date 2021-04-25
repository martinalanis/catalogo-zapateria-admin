<template>
  <v-app>
    <LayoutHeader/>
    <v-main>
      <v-container class="pt-6">
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'LayoutDefault'
}
</script>
