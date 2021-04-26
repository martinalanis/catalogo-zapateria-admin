<template>
  <v-dialog v-model="dialog" max-width="420">
    <v-card>
      <v-card-title class="mb-3">
        <h5><v-icon color="error" left>mdi-exclamation</v-icon>SE REQUIERE CONFIRMACIÓN</h5>
      </v-card-title>
      <v-card-subtitle>
        <p class="mb-0 pl-2">
          Ingrese su contraseña de administrador para continuar
        </p>
      </v-card-subtitle>
      <v-card-text>
        <v-form
          ref="form"
          lazy-validation
          @submit.prevent="remove"
        >
          <v-text-field
            v-model="password"
            placeholder="******"
            :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
          />
          <div class="text-right mt-4">
            <v-btn
              text
              small
              type="reset"
              @click="closeModal"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="error"
              depressed
              type="submit"
              :loading="loading"
            >
              Eliminar
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmModal',
  data () {
    return {
      dialog: false,
      id: '',
      password: '',
      showPassword: false,
      passwordRules: [
        value => !!value || 'Campo requerido.'
      ],
      loading: false
    }
  },
  methods: {
    async remove () {
      if (this.$refs.form.validate()) {
        this.loading = true
        try {
          await this.$axios.post('/auth/admin-confirm', { password: this.password })
          this.$emit('confirmed', this.id)
          this.closeModal()
          this.loading = false
        } catch ({ response: { data: { message } } }) {
          this.loading = false
          this.$store.dispatch('notify', { success: false, message })
        }
      }
    },
    openModal (id) {
      this.dialog = true
      this.id = id
      this.password = ''
      this.loading = false
      setTimeout(() => {
        this.$refs.form.resetValidation()
      }, 100)
    },
    closeModal () {
      this.id = ''
      this.password = ''
      this.showPassword = false
      this.$refs.form.resetValidation()
      this.dialog = false
    }
  }
}
</script>
