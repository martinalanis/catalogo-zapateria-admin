<template>
  <v-dialog
    v-model="dialog"
    persistent
    scrollable
    max-width="800px"
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
          <v-row align="center">
            <v-col cols="12" md="4">
              <v-row>
                <v-col cols="12">
                  <div class="img-container">
                    <template v-if="!editMode">
                      <div
                        v-if="!image.url"
                        class="placeholder"
                        @click="$refs.imageFile.$refs.input.click()"
                      >
                        <v-icon class="mb-3" large color="#ababab">mdi-image-outline</v-icon>
                        <p>Agregar imagen</p>
                      </div>
                      <img v-else :src="image.url" alt="" class="img-block">
                    </template>
                    <template v-else>
                      <img
                        v-if="!image.url"
                        :src="product.imagenUrl"
                        alt=""
                        class="img-block cursor-pointer"
                        @click="$refs.imageFile.$refs.input.click()"
                      >
                      <img
                        v-else
                        :src="image.url"
                        alt=""
                        class="img-block cursor-pointer"
                        @click="$refs.imageFile.$refs.input.click()"
                      >
                    </template>
                  </div>
                </v-col>
                <v-col cols="12">
                  <v-file-input
                    ref="imageFile"
                    v-model="image.file"
                    label="Imagen"
                    show-size
                    counter
                    dense
                    clearable
                    accept="image/png, image/jpeg"
                    prepend-icon="mdi-image-outline"
                    @change="imageChange"
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="8">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model.trim="product.codigo"
                    label="Codigo*"
                    hide-details="auto"
                    :rules="validations.req"
                    :loading="loading"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model.trim="product.modelo"
                    label="Modelo*"
                    hide-details="auto"
                    :rules="validations.req"
                    :loading="loading"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model.trim="product.color"
                    label="Color*"
                    hide-details="auto"
                    :rules="validations.req"
                    :loading="loading"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model.trim="product.material"
                    label="Material"
                    hide-details="auto"
                    :loading="loading"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model.trim="product.tipo"
                    label="Tipo*"
                    hide-details="auto"
                    :rules="validations.req"
                    :loading="loading"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model.trim="product.categoria"
                    label="Categoria*"
                    hide-details="auto"
                    :items="categories"
                    :rules="validations.req"
                    :loading="loading"
                  />
                </v-col>
                <v-col cols="12" sm="6">
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
                <v-col cols="6" sm="4">
                  <v-text-field
                    v-model.trim="product.precio_publico"
                    label="Precio público*"
                    hide-details="auto"
                    :loading="loading"
                    type="number"
                  />
                </v-col>
                <v-col cols="6" sm="4">
                  <v-text-field
                    v-model.trim="product.precio_proveedor"
                    label="Precio proveedor*"
                    hide-details="auto"
                    :loading="loading"
                    type="number"
                  />
                </v-col>
                <v-col cols="6" sm="4">
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
        <v-card-actions class="px-3 pb-3 border-top hidden-border-tablet">
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
      image: {
        file: null,
        url: null
      },
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
      // console.log(this.product)
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
      this.image = {
        file: null,
        url: null
      }
      this.editMode = false
      this.disableButton = false
      this.loading = false
      this.dialog = false
    },
    async save () {
      if (this.$refs.form.validate()) {
        this.loadingButton = true
        try {
          const headers = {
            'Content-Type': 'multipart/form-data'
          }
          const formData = this.createFormData(this.product, this.image.file, this.editMode)
          console.log('formData', formData)
          const res = this.editMode
            ? await this.$axios.post(`/products/${this.product.id}`, formData, headers)
            : await this.$axios.post('/products', formData, headers)
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
    imageChange () {
      const file = this.image.file
      if (file) {
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.addEventListener('load', () => {
          this.image.url = fr.result
        })
        return
      }
      this.image.url = null
    },
    createFormData (form, file = null, edit = false) {
      const formData = new FormData()
      Object.keys(form).forEach(key => {
        // Si es null el valor lo mandamos como string vacio
        form[key] ? formData.append(key, form[key]) : formData.append(key, '')
      })
      if (file) {
        formData.append('imageFile', file, Date.now() + file.name)
      }
      // Agregar method put como parametro ya que laravel no detecta formData en method PUT
      // https://stackoverflow.com/questions/54686218/laravel-vuejs-axios-put-request-formdata-is-empty
      if (edit) {
        formData.append('_method', 'PUT')
      }
      // return file ? formData.append('imageFile', file, Date.now() + file.name) : formData
      return formData
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
