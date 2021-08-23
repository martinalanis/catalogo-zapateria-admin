<template>
  <div>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="auto">
        <v-btn
          dark
          color="green darken-1"
          class="d-none d-md-block caption"
          @click="$refs.productFormModal.add()"
        >
          <v-icon left size="1.7rem">mdi-shoe-formal</v-icon>
          agregar
        </v-btn>
        <v-btn
          dark
          fab
          small
          color="green darken-1"
          class="d-block d-md-none"
          @click="$refs.productFormModal.add()"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <upload-file @reloadTable="fetch"/>
      </v-col>
    </v-row>
    <v-row class="align-center mb-2">
      <v-col cols="auto" md="7">
        <v-form lazy @submit.prevent="fetch">
          <v-text-field
            v-model="search"
            label="Buscar en productos"
            hide-details
            clearable
            solo
            @click:clear="resetSearch"
          >
            <v-btn
              slot="append"
              icon
              type="submit"
            >
              <v-icon>
                mdi-magnify
              </v-icon>
            </v-btn>
          </v-text-field>
        </v-form>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="products"
      :loading="loading"
      :search="search"
      :options.sync="options"
      :server-items-length="totalProducts"
      :footer-props="footerProps"
      sort-by="marca"
      show-expand
      single-expand
      class="elevation-2"
      @click:row="(item, slot) => slot.expand(!slot.isExpanded)"
    >
      <template #[`item.imagen`]="{ item }">
        <v-avatar rounded class="elevation-2 my-2">
          <img :src="item.imagen_url" alt="" class="img-block">
        </v-avatar>
      </template>
      <template #[`item.status`]="{ item }">
        <v-chip label small :color="item.statusColor">
          {{ item.statusText }}
        </v-chip>
      </template>
      <template #[`item.id`]="{ item }">
        <div class="d-flex align-center justify-end h-100">
          <v-btn
            text
            x-small
            color="primary"
            @click.stop="edit(item.id)"
          >editar</v-btn>
          <v-btn
            x-small
            color="red"
            text
            @click.stop="$refs.confirmModal.openModal(item.id)"
          >
            eliminar
          </v-btn>
        </div>
      </template>
      <template #expanded-item="{ item }">
        <td :colspan="headers.length + 1">
          <product-details :product="item" />
        </td>
      </template>
    </v-data-table>
    <product-form-modal ref="productFormModal" :colores="colores" @reloadTable="fetch"/>
    <admin-confirm-modal
      ref="confirmModal"
      @confirmed="remove"
    />
  </div>
</template>

<script>
import AdminConfirmModal from '@/components/ui/AdminConfirmModal'
import UploadFile from '@/components/UploadFile'
import ProductFormModal from './ProductFormModal'
import ProductDetails from './ProductDetails'

export default {
  name: 'ProductosTable',
  components: {
    AdminConfirmModal,
    ProductDetails,
    ProductFormModal,
    UploadFile
  },
  data () {
    return {
      products: [],
      colores: [],
      headers: [
        {
          text: 'Imagen',
          value: 'imagen',
          sortable: false,
          filterable: false
        },
        {
          text: 'Codigo',
          value: 'codigo'
        },
        {
          text: 'Modelo',
          value: 'modelo'
        },
        {
          text: 'Tipo',
          value: 'tipo'
        },
        {
          text: 'Categoría',
          value: 'categoria'
        },
        {
          text: '',
          value: 'id',
          sortable: false
        }
      ],
      options: {
        page: 1,
        itemsPerPage: 10,
        sortBy: ['codigo']
      },
      footerProps: {
        itemsPerPageOptions: [5, 10, 25, 50]
      },
      totalProducts: 0,
      search: '',
      loading: false
    }
  },
  // computed: {
  //   products () {
  //     return this.products.map(p => {
  //       return {
  //         ...p,
  //         createdAt: this.$dayjs(p.created_at).format('DD/MM/YYYY HH:mm:ss') || '',
  //         lastModified: this.$dayjs(p.updated_at).format('DD/MM/YYYY HH:mm:ss') || ''
  //       }
  //     })
  //   }
  // },
  watch: {
    options: {
      async handler () {
        await this.fetch()
      },
      deep: true
    }
  },
  async mounted () {
    this.fetch()
    this.colores = await this.$axios.get('/products/colores').then(res => res.data)
  },
  methods: {
    async fetch () {
      this.loading = true
      try {
        this.search && (this.options.page = 1)
        const query = [
          `page=${this.options.page}`,
          `limit=${this.options.itemsPerPage}`
        ]

        this.options.sortBy[0] && query.push(`orderBy=${this.options.sortBy[0]}`)
        this.options.sortDesc[0] && query.push(`orderDesc=${this.options.sortDesc[0]}`)
        this.search && query.push(`search=${this.search}`)

        const res = await this.$axios.get(`/products?${query.join('&')}`).then(res => res.data)
        this.totalProducts = res.total
        this.products = res.data
        this.loading = false
      } catch ({ response: { data: { message } } }) {
        this.loading = false
        this.$store.dispatch('notify', { success: false, message })
      }
    },
    async remove (id) {
      try {
        const message = await this.$axios.delete(`/products/${id}`).then(r => r.data)
        this.$store.dispatch('notify', { success: true, message })
        this.fetch()
      } catch ({ response: { data: { message } } }) {
        this.$store.dispatch('notify', { success: false, message })
      }
    },
    async resetSearch () {
      this.search = ''
      await this.fetch()
    },
    edit (id) {
      // const product = await this.$axios.get(`/products/${id}`).then(r => r.data)
      this.$refs.productFormModal.edit(id)
    }
  }
}
</script>
