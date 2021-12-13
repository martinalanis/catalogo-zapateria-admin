<template>
  <v-card
    :color="`${color} lighten-1`"
    width="310"
    dark
  >
    <v-card-text class="h-100 d-flex align-center">
      <div class="stat">
        <figure class="pr-4">
          <v-icon size="5rem" >
            {{ `mdi-${icon}` }}
          </v-icon>
        </figure>
        <article class="white--text">
          <h1 class="text-h3 font-weight-bold">{{ number }}</h1>
          <h3 class="font-weight-regular">{{ title }}</h3>
        </article>
      </div>
    </v-card-text>
    <footer>
      <v-btn
        block
        :to="to"
        :color="`${color} darken-3`"
      >
        Detalles
      </v-btn>
    </footer>
  </v-card>
</template>

<script>
export default {
  name: 'StatCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: '/'
    },
    number: {
      type: Number,
      default: null
    }
  }
}
</script>

<style lang="scss">
.stat {
  display: flex;
  align-items: center;
}
</style>
