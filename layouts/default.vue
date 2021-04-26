<template>
  <v-app>
    <LayoutHeader />
    <v-main>
      <v-container class="pt-6">
        <nuxt />
      </v-container>
    </v-main>
    <Notification />
  </v-app>
</template>

<script>
import Notification from '@/components/ui/Notification'
export default {
  name: 'LayoutDefault',
  components: {
    Notification
  }
}
</script>
