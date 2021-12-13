<template>
  <main>
    <v-row justify="start" align="center">
      <v-col cols="12">
        <h4 class="title mb-0 font-weight-regular">Bienvenido {{ userName }}</h4>
        <h1 class="font-weight-medium">Panel de Administración</h1>
      </v-col>
    </v-row>
    <v-row justify="center" justify-sm="start">
      <v-col
        v-for="({ name, value, icon }, i) in stats"
        :key="i"
        cols="auto"
      >
        <StatCard
          :title="name.toUpperCase()"
          :number="value"
          :color="colors[i]"
          :to="`/${name}`"
          :icon="icon"
        />
      </v-col>
    </v-row>
  </main>
</template>

<script>
import StatCard from '@/components/ui/StatCard'
export default {
  name: 'Dashboard',
  components: {
    StatCard
  },
  async asyncData ({ $axios }) {
    const { data: stats } = await $axios.get('/dashboard/stats')
    console.log({ stats })
    return {
      stats
    }
  },
  data () {
    return {
      colors: ['blue', 'purple', 'teal']
    }
  },
  computed: {
    userName () {
      const [name] = this.$auth.user.name.split(' ')
      return name
    }
  }
}
</script>
