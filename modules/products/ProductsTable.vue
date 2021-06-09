<template>
  <div>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="auto">
        <v-btn
          dark
          outlined
          color="blue darken-4"
          class="d-none d-md-block caption"
          @click="$refs.productFormModal.add()"
        >
          <v-icon left small>mdi-account</v-icon>
          agregar producto
        </v-btn>
        <v-btn
          dark
          fab
          small
          color="purple"
          class="d-block d-md-none"
          @click="$refs.productFormModal.add()"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
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
          <img :src="item.imagenUrl" alt="" class="img-block">
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
            @click.stop="$refs.productFormModal.edit(item)"
          >editar</v-btn>
          <v-btn
            x-small
            color="red"
            text
            @click.stop="$refs.confirmModal.openModal(item.id)"
          >
            eliminar
          </v-btn>
          <!-- <v-menu left offset-y offset-x :nudge-right="10">
            <template #activator="{ on }">
              <v-icon v-on="on">mdi-dots-vertical</v-icon>
            </template>
            <v-list dense class="py-0 text-right">
              <v-list-item
                link
                class="px-2 py-0 v_list_dense-h"
                @click="$refs.changePasswordModal.openModal(item.id)"
              >
                <v-list-item-title class="caption">Cambiar contraseña</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item
                link
                class="px-2 py-0 v_list_dense-h"
                @click="$refs.confirmModal.openModal(item.id)"
              >
                <v-list-item-title class="caption red--text">Eliminar</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu> -->
        </div>
      </template>
      <template #expanded-item="{ item }">
        <td :colspan="headers.length + 1">
          <product-details :product="item" />
        </td>
      </template>
    </v-data-table>
    <product-form-modal ref="productFormModal" @reloadTable="fetch"/>
    <admin-confirm-modal
      ref="confirmModal"
      @confirmed="remove"
    />
    <!-- <admin-confirm-modal ref="confirmModal" @confirmed="remove"/>
    <change-password-modal ref="changePasswordModal" @reloadTable="fetch"/> -->
  </div>
</template>

<script>
import AdminConfirmModal from '@/components/ui/AdminConfirmModal'
import ProductFormModal from './ProductFormModal'
import ProductDetails from './ProductDetails'
// import ChangePasswordModal from './ChangePasswordModal'

export default {
  name: 'ProductosTable',
  components: {
    // ChangePasswordModal,
    AdminConfirmModal,
    ProductDetails,
    ProductFormModal
  },
  data () {
    return {
      productsData: [],
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
          text: 'Color',
          value: 'color'
        },
        {
          text: 'Numeración',
          value: 'numeracion'
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
  computed: {
    products () {
      return this.productsData.map(us => {
        return {
          ...us,
          imagenUrl: `${process.env.imgPath}/${us.imagen}`,
          categoria: us.categoria,
          createdAt: this.$dayjs(us.created_at).format('DD/MM/YYYY HH:mm:ss') || '',
          lastModified: this.$dayjs(us.updated_at).format('DD/MM/YYYY HH:mm:ss') || ''
        }
      })
    }
  },
  watch: {
    options: {
      async handler () {
        await this.fetch()
      },
      deep: true
    }
  },
  mounted () {
    this.fetch()
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
        this.productsData = res.data
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
    }
    // getRolColor (id) {
    //   switch (id) {
    //     case 1: return 'light-blue lighten-3'
    //     default: return 'grey lighten-2'
    //   }
    // }
  }
}
</script>
