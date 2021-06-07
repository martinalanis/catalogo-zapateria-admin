<template>
  <v-dialog
    v-model="dialog"
    persistent
    scrollable
    max-width="500px"
    content-class="d_content_overflow_visible"
  >
    <v-form v-if="dialog" ref="form" lazy-validation @submit.prevent="save">
      <v-card>
        <div class="modal_header_icon blue elevation-6">
          <v-icon x-large color="#FFF">mdi-shoe-formal</v-icon>
        </div>
        <v-card-title>
          <p class="title form_title text-uppercase">
            <span v-if="editMode">editar</span>
            <span v-else>nuevo</span>
            Producto
          </p>
        </v-card-title>
        <v-card-text class="relative">
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model.trim="product.codigo"
                label="Codigo*"
                hide-details="auto"
                :rules="validations.req"
                :loading="loading"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model.trim="product.modelo"
                label="Modelo*"
                hide-details="auto"
                :rules="validations.req"
                :loading="loading"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model.trim="product.color"
                label="Color*"
                hide-details="auto"
                :rules="validations.req"
                :loading="loading"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model.trim="product.material"
                label="Material"
                hide-details="auto"
                :loading="loading"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model.trim="product.tipo"
                label="Tipo*"
                hide-details="auto"
                :rules="validations.req"
                :loading="loading"
              />
            </v-col>
            <v-col cols="6">
              <v-select
                v-model.trim="product.categoria"
                label="Categoria*"
                hide-details="auto"
                :items="categories"
                :rules="validations.req"
                :loading="loading"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model.trim="product.numeracion"
                label="Numeración*"
                hide-details="auto"
                :rules="validations.req"
                :loading="loading"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model.trim="product.precio_publico"
                label="Precio público*"
                hide-details="auto"
                :loading="loading"
                type="number"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model.trim="product.precio_proveedor"
                label="Precio proveedor*"
                hide-details="auto"
                :loading="loading"
                type="number"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model.trim="product.precio_descuento"
                label="Precio descuento*"
                hide-details="auto"
                :loading="loading"
                type="number"
              />
            </v-col>
          </v-row>
          <v-row v-if="!editMode">
            <v-col>
              <p class="mb-0 subtitle-2">
                <small><i>*Campos requeridos</i></small>
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
import Product from '@/interfaces/product'
import Validations from '@/helpers/validations'

export default {
  name: 'ProductFormModal',
  data () {
    return {
      dialog: false,
      editMode: false,
      loading: false,
      disableButton: false,
      loadingButton: false,
      product: { ...Product },
      errorMessage: '',
      categories: [
        {
          text: 'Dama',
          value: 'dama'
        },
        {
          text: 'Caballero',
          value: 'caballero'
        },
        {
          text: 'Niño',
          value: 'niño'
        },
        {
          text: 'Niña',
          value: 'niña'
        },
        {
          text: 'Joven',
          value: 'joven'
        }
      ],
      validations: Validations(['req'])
    }
  },
  methods: {
    edit (item) {
      this.openModal(true)
      this.product = { ...item }
      console.log(this.product)
    },
    add () {
      this.loading = false
      this.disableButton = false
      this.product = { ...Product }
      this.openModal()
      // this.$refs.form.resetValidation()
    },
    openModal (edit = false) {
      this.dialog = true
      this.editMode = edit
      this.emailError = false
      this.phoneError = false
    },
    closeModal () {
      this.product = { ...Product }
      this.editMode = false
      this.disableButton = false
      this.loading = false
      this.dialog = false
    },
    async save () {
      if (this.$refs.form.validate()) {
        this.loadingButton = true
        try {
          const res = this.editMode
            ? await this.$axios.put(`/products/${this.product.id}`, this.product)
            : await this.$axios.post('/products', this.product)
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
