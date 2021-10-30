<template>
  <v-dialog
    v-model="dialog"
    persistent
    scrollable
    max-width="800px"
    content-class="d_content_overflow_visible"
  >
    <v-form v-if="dialog" ref="form" lazy-validation>
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
          <v-row align="start">
            <v-col cols="12">
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
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model.trim="product.material"
                    label="Material"
                    hide-details="auto"
                    :loading="loading"
                  />
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model.trim="product.tipo"
                    label="Tipo*"
                    hide-details="auto"
                    :rules="validations.req"
                    :loading="loading"
                  />
                </v-col>
                <v-col cols="12" sm="4">
                  <v-select
                    v-model.trim="product.categoria"
                    label="Categoria*"
                    hide-details="auto"
                    :items="categories"
                    :rules="validations.req"
                    :loading="loading"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <p class="mb-0 subtitle-2">
                    <small><i>*Campos requeridos</i></small>
                  </p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <!-- Imagenes colores -->
          <v-row>
            <v-col class="d-flex justify-space-between align-center">
              <h3 class="d-inline-block">Colores / Imagenes</h3>
              <v-btn
                outlined
                color="primary"
                small
                class="ml-3 text-lowercase d-inline-block"
                @click.prevent="addColor"
              >
                <!-- <v-icon left>mdi-plus</v-icon> -->
                Agregar color
              </v-btn>
            </v-col>
          </v-row>
          <v-divider class="mt-3 mb-5"></v-divider>
          <v-row>
            <v-col
              v-for="({}, j) in product.colores"
              :key="j"
              cols="6"
            >
              <v-card
                elevation="1"
              >
                <v-card-text class="pb-1">
                  <v-row
                    align="center"
                    class="mb-0"
                  >
                    <v-col cols="6">
                      <div class="img-container">
                        <template v-if="!editMode">
                          <div
                            v-if="!product.colores[j].url"
                            class="placeholder"
                            @click="$refs.imageFile[j].$refs.input.click()"
                          >
                            <v-icon class="mb-3" large color="#ababab">mdi-image-outline</v-icon>
                            <p>Agregar imagen</p>
                          </div>
                          <img v-else :src="product.colores[j].url" alt="" class="img-block">
                        </template>
                        <template v-else>
                          <img
                            v-if="!product.colores[j].url"
                            :src="product.colores[j].imagen_url"
                            alt=""
                            class="img-block cursor-pointer"
                            @click="$refs.imageFile[j].$refs.input.click()"
                          >
                          <img
                            v-else
                            :src="product.colores[j].url"
                            alt=""
                            class="img-block cursor-pointer"
                            @click="$refs.imageFile[j].$refs.input.click()"
                          >
                        </template>
                      </div>
                    </v-col>
                    <v-col cols="6">
                      <v-row>
                        <v-col cols="12" class="pb-0">
                          <v-file-input
                            ref="imageFile"
                            v-model="product.colores[j].file"
                            label="Imagen"
                            show-size
                            dense
                            clearable
                            accept="image/png, image/jpeg"
                            prepend-icon="mdi-image-outline"
                            :rules="validations.req"
                            @change="imageChange(j)"
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-combobox
                            v-model="product.colores[j].name"
                            :items="colores"
                            :rules="validations.req"
                            label="Color"
                            clearable
                            hide-details
                          />
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-btn
                        outlined
                        small
                        block
                        color="deep-orange darken-3"
                        @click="removeColor(j)"
                      >eliminar</v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <!-- Numeraciones -->
          <v-row>
            <v-col class="d-flex justify-space-between align-center">
              <h3 class="d-inline-block">Numeraciónes</h3>
              <v-btn
                color="primary"
                small
                outlined
                class="ml-3 text-lowercase d-inline-block"
                @click.prevent="addNumeracion"
              >
                <!-- <v-icon left>mdi-plus</v-icon> -->
                Agregar numeración
              </v-btn>
            </v-col>
          </v-row>
          <v-divider class="mt-3 mb-5"></v-divider>
          <v-card
            v-for="({}, i) in product.numeraciones"
            :key="i"
            class="mb-4"
            elevation="1"
          >
            <v-card-text class="pb-1">
              <v-row
                align="center"
                class="mb-0"
              >
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    v-model.trim="product.numeraciones[i].name"
                    label="Nombre*"
                    hide-details="auto"
                    outlined
                    dense
                    prepend-icon="mdi-close-circle-outline"
                    :rules="validations.req"
                    :loading="loading"
                    @click:prepend="removeNumeracion(i)"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    v-model.trim="product.numeraciones[i].precio_publico"
                    label="Regular*"
                    hide-details="auto"
                    dense
                    type="number"
                    :rules="validations.req"
                    :loading="loading"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    v-model.trim="product.numeraciones[i].precio_proveedor"
                    label="Proveedor*"
                    hide-details="auto"
                    dense
                    type="number"
                    :rules="validations.req"
                    :loading="loading"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    v-model.trim="product.numeraciones[i].precio_descuento"
                    label="Descuento"
                    hide-details="auto"
                    dense
                    type="number"
                    :loading="loading"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
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
            type="button"
            :loading="loadingButton"
            :disabled="disableButton"
            @click.prevent="save"
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
// import ProductFormImages from '@/modules/products/ProductFormImages.vue'

export default {
  name: 'ProductFormModal',
  props: {
    colores: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      imgs: null,
      dialog: false,
      editMode: false,
      loading: false,
      disableButton: false,
      loadingButton: false,
      product: { ...Product },
      image: [],
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
    async edit (id) {
      this.openModal(true)
      this.loading = true
      this.product = await this.$axios.get(`/products/${id}`).then(r => r.data)
      this.loading = false
    },
    add () {
      this.loading = false
      this.disableButton = false
      this.product = { ...Product }
      this.openModal()
    },
    openModal (edit = false) {
      this.dialog = true
      this.editMode = edit
      this.emailError = false
      this.phoneError = false
    },
    closeModal () {
      Product.numeraciones = []
      Product.colores = []
      this.product = { ...Product }
      this.image = []
      this.editMode = false
      this.disableButton = false
      this.loading = false
      this.dialog = false
    },
    async save () {
      if (this.$refs.form.validate() && this.validateDynamicData()) {
        // console.log('submit')
        // if (!) return
        this.loadingButton = true
        try {
          const headers = {
            'Content-Type': 'multipart/form-data'
          }
          const formData = this.createFormData(this.product, this.editMode)
          // console.log('formData', formData)
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
    imageChange (j) {
      const file = this.product.colores[j].file
      if (file) {
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.addEventListener('load', () => {
          this.product.colores[j].url = fr.result
        })
        return
      }
      this.product.colores[j].url = null
    },
    createFormData (form, edit = false) {
      const formData = new FormData()
      // console.log(files)
      Object.keys(form).forEach(key => {
        // Si es null el valor lo mandamos como string vacio
        if (!Array.isArray(form[key])) {
          form[key] ? formData.append(key, form[key]) : formData.append(key, '')
        } else {
          form[key].forEach(el => {
            if (key !== 'colores') {
              typeof el === 'object'
                ? formData.append(`${key}[]`, JSON.stringify(el))
                : formData.append(`${key}[]`, el)
            }
          })
        }
      }) // TODO
      const colores = form.colores
      if (colores && colores.length) {
        colores.forEach((color, i) => {
          formData.append(`colores[${i}][file]`, color.file, color?.file?.name)
          formData.append(`colores[${i}][imagen]`, color.imagen)
          formData.append(`colores[${i}][name]`, color.name)
          console.log('index', i)
          console.log('file', color?.file?.name)
        })
      }
      // Agregar method put como parametro ya que laravel no detecta formData en method PUT
      // https://stackoverflow.com/questions/54686218/laravel-vuejs-axios-put-request-formdata-is-empty
      if (edit) {
        formData.append('_method', 'PUT')
      }
      // return file ? formData.append('imageFile', file, Date.now() + file.name) : formData
      return formData
    },
    addNumeracion () {
      this.product.numeraciones.push({
        name: '',
        precio_descuento: null,
        precio_publico: null,
        precio_proveedor: null
      })
    },
    addColor () {
      this.product.colores.push({
        file: null,
        url: null,
        name: '',
        imagen: null
      })
      // this.image.push({
      //   file: null,
      //   url: null
      // })
    },
    removeNumeracion (i) {
      this.product.numeraciones.splice(i, 1)
    },
    removeColor (i) {
      this.product.colores.splice(i, 1)
      // this.image.splice(i, 1)
    },
    validateDynamicData () {
      // Asegurar que haya al menos una numeracion y precio agregados
      if (!this.product.numeraciones.length) {
        this.addNumeracion()
        setTimeout(() => {
          this.$refs.form.validate()
        }, 300)
        this.$store.dispatch('notify', { success: false, message: 'Debes agregar al menos una numeración' })
        return false
      }
      // Asegurar que haya al menos una color e imagen agregados
      if (!this.product.colores.length) {
        this.addColor()
        setTimeout(() => {
          this.$refs.form.validate()
        }, 300)
        this.$store.dispatch('notify', { success: false, message: 'Debes agregar al menos una imagen y color' })
        return false
      }
      return true
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
