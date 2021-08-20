<template>
  <v-container class="h-100 d-flex align-center">
    <v-row justify="center" align="center">
      <v-col cols="12">
        <header class="header-logo mb-0 elevation-2">
          <img src="~/assets/logo.png" alt="Zapaterias de León">
        </header>
      </v-col>
      <v-col
        cols="11"
        sm="6"
        md="10"
      >
        <v-form
          ref="form"
          lazy-validation
          class="h-100"
          @submit.prevent="login"
        >
          <v-row class="h-100 justify-center align-center">
            <v-col cols="12" md="6" class="text-center">
              <h3 class="text-center white--text mb-6">
                PLATAFORMA DE ADMINISTRACIÓN
              </h3>
              <!-- <h4 class="text--secondary caption text-center mb-6">CATÁLOGO DIGITAL</h4> -->
              <v-text-field
                v-model.trim="form.user"
                label="Teléfono o email"
                autocomplete="new-email"
                :rules="validations.req"
                :error="error"
                color="amber"
                prepend-inner-icon="mdi-phone"
                filled
                dark
              />
              <v-text-field
                v-model.trim="form.password"
                label="Contraseña"
                autocomplete="new-password"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :rules="validations.passwordRules"
                :type="showPassword ? 'text' : 'password'"
                :error="error"
                hint="Longitud minima 6 caracteres"
                prepend-inner-icon="mdi-lock-outline"
                color="amber"
                class="mb-4"
                filled
                dark
                @click:append="showPassword = !showPassword"
              />
              <v-btn
                dark
                depressed
                :loading="loading"
                color="primary"
                class="mb-3"
                block
                large
                elevation="2"
                type="submit"
              >
                Ingresar
              </v-btn>
            </v-col>
            <v-col v-if="error" cols="12">
              <v-alert
                color="red"
                border="left"
                class="grey lighten-5"
                colored-border
                dense
                elevation="1"
                icon="mdi-exclamation"
              >
                Datos incorrectos
              </v-alert>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Validations from '@/helpers/validations'
export default {
  name: 'IndexPage',
  components: {
  },
  layout: 'login',
  data () {
    return {
      showPassword: false,
      loading: false,
      form: {
        user: '',
        password: ''
      },
      validations: Validations(['req', 'passwordRules']),
      error: false
    }
  },
  methods: {
    async login () {
      // console.log(this.form)
      if (this.$refs.form.validate()) {
        try {
          this.loading = true
          await this.$auth.loginWith('laravelSanctum', {
            data: this.form
          })
        } catch (err) {
          this.error = true
          console.log(err)
        } finally {
          this.loading = false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
