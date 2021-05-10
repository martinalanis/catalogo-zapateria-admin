<template>
  <v-dialog
    v-model="dialog"
    persistent
    scrollable
    max-width="600px"
    content-class="d_content_overflow_visible"
  >
    <v-form ref="form" lazy-validation @submit.prevent="save">
      <v-card>
        <div class="modal_header_icon blue elevation-6">
          <v-icon x-large color="#FFF">mdi-account</v-icon>
        </div>
        <v-card-title>
          <p class="title form_title text-uppercase">
            <span v-if="editMode">editar</span>
            <span v-else>nuevo</span>
            {{ type }}
          </p>
        </v-card-title>
        <v-card-text class="relative">
          <v-row>
            <v-col cols="12" class="py-1">
              <v-text-field
                v-model.trim="user.name"
                label="Nombre"
                :rules="validations.req"
                :loading="loading"
              />
            </v-col>
            <v-col cols="6" class="py-1">
              <v-text-field
                v-model.trim="user.phone"
                label="Teléfono"
                :error="phoneError"
                :rules="validations.ruleTelephone"
                :error-count="2"
                :loading="loading"
                type="tel"
              />
            </v-col>
            <v-col cols="6" class="py-1">
              <v-text-field
                v-model.trim="user.email"
                label="Email"
                :error="emailError"
                :rules="validations.ruleEmail"
                :loading="loading"
                type="email"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="py-1">
              <v-select
                v-model="user.role_id"
                :items="roles"
                label="Roles"
                item-text="name"
                item-value="id"
                :rules="validations.req"
                disabled
              />
            </v-col>
            <v-col cols="6" class="py-1">
              <v-radio-group
                v-model="user.status"
                row
              >
                <v-radio
                  label="Activo"
                  :value="1"
                ></v-radio>
                <v-radio
                  label="Inactivo"
                  :value="0"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row v-if="!editMode">
            <v-col cols="6">
              <v-text-field
                v-model.trim="user.password"
                label="Contraseña"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :rules="validations.passwordRules"
                :type="showPassword ? 'text' : 'password'"
                hint="Longitud minima 6 caracteres"
                @click:append="showPassword = !showPassword"
              />
            </v-col>
            <v-col cols="6" class="d-flex align-center justify-end">
              <p class="mb-0 text-right subtitle-2">
                <small><i>*Todos los campos son requeridos</i></small>
              </p>
            </v-col>
          </v-row>
          <v-row v-if="errorMessage">
            <v-col>
              <v-alert
                color="red"
                border="left"
                class="grey lighten-5"
                colored-border
                dense
                elevation="1"
                icon="mdi-exclamation"
              >
                <span v-html="errorMessage"></span>
              </v-alert>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="px-3 pb-3">
          <v-spacer></v-spacer>
          <v-btn
            color="#656565"
            text
            small
            type="reset"
            @click="closeModal"
          >
            cancelar
          </v-btn>
          <v-btn
            color="primary"
            :dark="disableButton ? false : true"
            type="submit"
            :loading="loadingButton"
            :disabled="disableButton"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import User from '@/interfaces'

export default {
  name: 'UserFormModal',
  props: {
    roles: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'administrador'
    }
  },
  data () {
    return {
      dialog: false,
      editMode: false,
      loading: false,
      disableButton: false,
      loadingButton: false,
      showPassword: false,
      emailError: false,
      phoneError: false,
      user: { ...User[this.type] },
      errorMessage: '',
      validations: {
        req: [
          value => !!value || 'Campo requerido.'
        ],
        ruleAlpha: [
          value => !!value || 'Campo requerido.',
          value => {
            const pattern = /^[A-Za-z0-9]*[A-Za-z0-9][A-Za-z0-9\s]*$/
            return pattern.test(value) || 'Formato no válido.'
          }
        ],
        ruleTelephone: [
          value => !!value || 'Campo requerido.',
          value => (value || '').length <= 10 || 'Max 10 caracteres',
          value => {
            const pattern = /^[0-9]+$/
            return pattern.test(value) || 'Ingresa solo números.'
          }
        ],
        ruleEmail: [
          value => !!value || 'Campo requerido.',
          value => {
            const pattern = /^[a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,15})$/
            return pattern.test(value) || 'Email no válido.'
          }
        ],
        passwordRules: [
          value => !!value || 'Campo requerido.',
          value => value.length >= 6 || 'Minimo 6 caracteres'
        ]
      }
    }
  },
  methods: {
    edit (item) {
      this.openModal(true)
      this.user = {
        ...item,
        role_id: parseInt(item.role_id),
        status: parseInt(item.status)
      }
      console.log(this.user)
    },
    add () {
      this.loading = false
      this.disableButton = false
      this.user = { ...User[this.type] }
      this.openModal()
      this.$refs.form.resetValidation()
    },
    openModal (edit = false) {
      this.dialog = true
      this.editMode = edit
      this.emailError = false
      this.phoneError = false
    },
    closeModal () {
      this.user = { ...User[this.type] }
      this.editMode = false
      this.disableButton = false
      this.loading = false
      this.emailError = false
      this.phoneError = false
      setTimeout(() => {
        this.$refs.form.resetValidation()
      }, 100)
      this.dialog = false
    },
    async save () {
      if (this.$refs.form.validate()) {
        this.loadingButton = true
        try {
          const res = this.editMode
            ? await this.$axios.put(`/users/${this.user.id}`, this.user)
            : await this.$axios.post('/users', this.user)
          this.$store.dispatch('notify', { success: true, message: res.data })
          this.loadingButton = false
          this.$emit('reloadTable')
          this.closeModal()
        } catch ({ response: { data } }) {
          if (data.errors) {
            this.errorHandler(data.errors)
          } else {
            console.log(data)
          }
          this.loadingButton = false
          this.$store.dispatch('notify', { success: false, message: data })
        }
      } else {
        // this.$store.dispatch('notify', { success: false, message: { message: 'Completa los campos requeridos' } })
      }
    },
    errorHandler ({ email, phone }) {
      const msg = []
      if (email) {
        this.emailError = true
        msg.push(`- ${email.join('')}`)
      } else {
        this.emailError = false
      }

      if (phone) {
        this.phoneError = true
        msg.push(`- ${phone.join('')}`)
      } else {
        this.phoneError = false
      }

      this.errorMessage = msg.join('<br>')
    }
  }
}
</script>
