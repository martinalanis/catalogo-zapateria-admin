<template>
  <div>
    <v-menu
      bottom
      left
    >
      <template #activator="{ on, attrs }">
        <v-btn
          dark
          color="blue darken-1"
          class="d-none d-md-block caption"
          :loading="loading"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon left>mdi-file-excel-outline</v-icon>
          EXCEL
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="dialog = true">
          <v-list-item-title>
            <v-icon left>mdi-file-upload-outline</v-icon> Subir archivo
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="downloadDB">
          <v-list-item-title>
            <v-icon left>mdi-file-download-outline</v-icon> Descargar BD
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-dialog
      v-model="dialog"
      scrollable
      max-width="500px"
      content-class="d_content_overflow_visible"
    >
      <v-form v-if="dialog" ref="form" lazy-validation @submit.prevent="uploadFile">
        <v-card>
          <div class="modal_header_icon blue elevation-6">
            <v-icon x-large color="#FFF">mdi-database-sync-outline</v-icon>
          </div>
          <v-card-title>
            <p class="title form_title text-uppercase">
              Sincronizar base de datos
            </p>
          </v-card-title>
          <v-card-text class="relative">
            <v-file-input
              v-model="file"
              label="Excel"
              show-size
              counter
              dense
              clearable
              prepend-icon="mdi-file-outline"
              class="my-3"
              :rules="validations.req"
              :loading="loading"
            />
            <h4>*IMPORTANTE</h4>
            <p>
              Para la carga de productos desde excel debes considerar lo siguiente:
            </p>
            <ul>
              <li>
                El archivo a cargar debe ser extension .xls, xlsx o .csv
              </li>
              <li>
                El archivo debe contener solo una hoja
              </li>
              <li>
                El archivo <b>no</b> debe contener encabezado con el nombre de las columnas, (solo listado de productos).
              </li>
              <li>
                El orden de los datos debe ser el siguiente <i>(columnas de izquierda a derecha)</i>:
                <ul>
                  <li>Código</li>
                  <li>Modelo</li>
                  <li>Color</li>
                  <li>Numeracion</li>
                  <li>Materia</li>
                  <li>Tipo</li>
                  <li>Imagen <i>(nombre y extensión)</i></li>
                  <li>Precio publico</li>
                  <li>Precio proveedor</li>
                  <li>Precio descuento</li>
                  <li>Tipo zapato</li>
                </ul>
              </li>
            </ul>
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
              type="submit"
              :loading="loading"
              :disabled="loading"
            >
              Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import Validations from '@/helpers/validations'
export default {
  name: 'UploadFile',
  data () {
    return {
      dialog: false,
      loading: false,
      file: null,
      validations: Validations(['req'])
    }
  },
  methods: {
    async uploadFile () {
      if (this.$refs.form.validate()) {
        // console.log('submit')
        this.loading = true
        try {
          const headers = {
            'Content-Type': 'multipart/form-data'
          }
          const formData = new FormData()
          formData.append('file', this.file, Date.now() + this.file.name)
          // console.log('formData', formData)
          const res = await this.$axios.post('/products/excel/upload', formData, headers)
          this.$store.dispatch('notify', { success: true, message: res.data })
          this.loading = false
          this.$emit('reloadTable')
          this.closeModal()
        } catch ({ response: { data } }) {
          console.log(data)
          this.loading = false
          this.$store.dispatch('notify', { success: false, message: data })
        }
      } else {
        // this.$store.dispatch('notify', { success: false, message: { message: 'Completa los campos requeridos' } })
      }
    },
    async downloadDB () {
      this.loading = true
      try {
        const res = await this.$axios.get('/products/export', { responseType: 'blob' }).then(r => r.data)
        const url = URL.createObjectURL(new Blob([res], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;'
        }))
        const link = document.createElement('a')
        link.href = url
        const n = this.$dayjs().format('YYYY_MM_DD')
        link.setAttribute('download', `Respaldo${n}`)
        document.body.appendChild(link)
        link.click()
        this.loading = false
      } catch ({ response: { data } }) {
        console.log(data)
        this.loading = false
        this.$store.dispatch('notify', { success: false, message: data })
      }
    },
    closeModal () {
      this.dialog = false
      this.loading = false
      this.file = null
    }
  }
}
</script>
