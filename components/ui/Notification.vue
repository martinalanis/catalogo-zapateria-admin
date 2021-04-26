<template>
  <v-snackbar
    v-model="show"
    :color="$store.state.notificationType"
    :timeout="4000"
    transition="scroll-x-reverse-transition"
    right
  >
    {{ $store.state.notificationMessage }}
    <template #action="{ attrs }">
      <v-btn
        color="white"
        text
        icon
        v-bind="attrs"
        @click="$store.commit('CLOSE_NOTIFICATION')"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Notification',
  computed: {
    show: {
      set () {
        this.$store.commit('CLOSE_NOTIFICATION')
      },
      get () {
        return this.$store.state.notification
      }
    }
  }
}
</script>
