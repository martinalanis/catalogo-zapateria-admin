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
          <!-- <img src="@/assets/user2.png" alt="" style="width:70px;"> -->
        </div>
        <v-card-title>
          <p class="title form_title">
            <span v-if="editMode">EDITAR</span>
            <span v-else>NUEVO</span>
            USUARIO
          </p>
        </v-card-title>
        <!-- <v-divider></v-divider> -->
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
import { Vendedor } from '@/interfaces'

export default {
  name: 'UserFormModal',
  props: {
    roles: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: ''
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
      user: new Vendedor(),
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
        // ruleAlphaDot: [
        //   value => !!value || 'Campo requerido.',
        //   value => {
        //     const pattern = /^[A-Za-z0-9]*[A-Za-z0-9(.)?][A-Za-z0-9(.)?(\-)?\s]*$/
        //     return pattern.test(value) || 'Formato no válido.'
        //   }
        // ],
        // ruleAddress: [
        //   value => !!value || 'Campo requerido.',
        //   value => {
        //     const pattern = /^[A-Za-z0-9]*[A-Za-z0-9(.)?][A-Za-z0-9(.)?(#)?(\-)?\s]*$/
        //     return pattern.test(value) || 'Formato no válido.'
        //   }
        // ],
        // ruleCp: [
        //   value => !!value || 'Campo requerido.',
        //   value => {
        //     if (value.length) {
        //       const pattern = /^[0-9]{5}$/
        //       return pattern.test(value) || 'CP no válido.'
        //     }
        //     return false
        //   }
        // ],
        ruleTelephone: [
          value => !!value || 'Campo requerido.',
          value => (value || '').length <= 10 || 'Max 10 caracteres',
          value => {
            const pattern = /^[0-9]+$/
            return pattern.test(value) || 'Ingresa solo números.'
          }
        ],
        // ruleNumber: [
        //   value => !!value || 'Campo requerido.',
        //   value => {
        //     const pattern = /^[0-9]+$/
        //     return pattern.test(value) || 'Ingresa solo números.'
        //   }
        // ],
        ruleEmail: [
          value => !!value || 'Campo requerido.',
          value => {
            // const pattern = /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/
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
  // computed: {
  // },
  methods: {
    // async edit (id) {
    //   this.loading = true
    //   this.disableButton = true
    //   // this.user = new User()
    //   this.openModal(true)
    //   // console.log('id', id)
    //   try {
    //     const usuario = await api.get(`/users/${id}`)
    //     this.user = usuario.data
    //     this.loading = false
    //     this.disableButton = false
    //   } catch (error) {
    //     this.loading = false
    //     this.disableButton = false
    //     this.user = new User()
    //     this.$store.dispatch('notify', { success: false, message: error.response.data })
    //   }
    // },
    edit (item) {
      this.openModal(true)
      this.user = { ...item }
    },
    add () {
      this.loading = false
      this.disableButton = false
      this.user = new Vendedor()
      this.openModal()
    },
    openModal (edit = false) {
      this.dialog = true
      this.editMode = edit
      this.emailError = false
      // setTimeout(() => {
      //   this.$refs.form.resetValidation()
      // }, 100)
    },
    closeModal () {
      this.user = new Vendedor()
      this.editMode = false
      this.disableButton = false
      this.loading = false
      this.emailError = false
      setTimeout(() => {
        this.$refs.form.resetValidation()
      }, 100)
      this.dialog = false
    },
    async save () {
      if (this.$refs.form.validate()) {
        console.log('save')
        this.loadingButton = true
        try {
          const res = this.editMode
            ? await this.$axios.put(`/users/${this.user.id}`, this.user)
            : await this.$axios.post('/users', this.user)
          if (res.status === 200) {
            // this.$store.dispatch('notify', { success: true, message: res.data })
            this.$emit('reloadTable')
            this.closeModal()
          }
          this.loadingButton = false
          this.vendedor = new Vendedor()
        } catch (error) {
          if (error.response.data.errors?.email) {
            this.emailError = true
          }
          this.loadingButton = false
          // this.$store.dispatch('notify', { success: false, message: error.response.data })
        }
      } else {
        // this.$store.dispatch('notify', { success: false, message: { message: 'Completa los campos requeridos' } })
      }
    }
  }
}
</script>
