<template>
  <v-app>
    <v-main class="bg-login">
      <nuxt/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'LayoutDefault'
}
</script>

<style lang="scss" scoped>
.bg-login {
  background: #212121;
}
</style>
