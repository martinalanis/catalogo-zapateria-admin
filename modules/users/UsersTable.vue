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
          @click="$refs.vendedorForm.add()"
        >
          <v-icon left small>mdi-account</v-icon>
          agregar vendedor
        </v-btn>
        <v-btn
          dark
          fab
          small
          color="purple"
          class="d-block d-md-none"
          @click="$refs.vendedorForm.add()"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="align-center mb-2">
      <v-col cols="auto" md="7">
        <v-text-field
          v-model="search"
          label="Buscar en vendedores"
          prepend-inner-icon="mdi-magnify"
          hide-details
          clearable
          solo
        />
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="usuarios"
      :loading="loading"
      :search="search"
      sort-by="name"
      show-expand
      single-expand
      class="elevation-2"
    >
      <!-- <template #[`item.role.name`]="{ item }">
        <v-chip label small :color="item.rolColor">{{ item.role.name }}</v-chip>
      </template> -->
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
            @click="$refs.vendedorForm.edit(item)"
          >editar</v-btn>
          <v-menu left offset-y offset-x :nudge-right="10">
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
                class="px-2 py-0 v_list_dense-h red-text"
                @click="$refs.confirmModal.openModal(`/users/${item.id}`)"
              >
                <v-list-item-title class="caption red">Eliminar</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>
      <template #expanded-item="{ item }">
        <td :colspan="headers.length">
          <user-details :user="item"/>
        </td>
      </template>
    </v-data-table>
    <user-form ref="vendedorForm" :roles="roles" @reloadTable="fetch"/>
    <!-- <confirm-modal ref="confirmModal" @reloadTable="fetch"/> -->
    <!-- <change-password-modal ref="changePasswordModal" @reloadTable="fetch"/> -->
  </div>
</template>

<script>
import UserForm from './UserFormModal'
import UserDetails from './UserDetails'
// import ConfirmModal from '@/components/ui/AdminConfirmModal'
// import ChangePasswordModal from './ChangePasswordModal'
// import { mapGetters } from 'vuex'

export default {
  name: 'VendedoresTable',
  components: {
    // ChangePasswordModal,
    // ConfirmModal,
    UserDetails,
    UserForm
  },
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      filter: 'todos',
      roles: [],
      usuariosData: [],
      headers: [
        {
          text: 'Nombre',
          value: 'name'
        },
        {
          text: 'Email',
          value: 'email'
        },
        {
          text: 'Telefono',
          value: 'phone'
        },
        // {
        //   text: 'Rol',
        //   value: 'role.name'
        // },
        {
          text: 'Estatus',
          value: 'status'
        },
        {
          text: '',
          value: 'id',
          sortable: false
        }
      ],
      search: '',
      loading: false
    }
  },
  computed: {
    usuarios () {
      return this.usuariosData.map(us => {
        return {
          ...us,
          statusText: us.status ? 'activo' : 'inactivo',
          statusColor: us.status ? 'success' : 'disabled',
          // rol: us.role.name || '',
          // rolColor: this.getRolColor(us.role.id),
          createdAt: this.$dayjs.tz(us.created_at).format('DD/MM/YYYY HH:mm:ss') || '',
          lastModified: this.$dayjs.tz(us.updated_at).format('DD/MM/YYYY HH:mm:ss') || ''
        }
      })
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      this.loading = true
      try {
        this.usuariosData = await this.$axios.get(`/users?type=${this.type}`).then(res => res.data)
        this.roles = await this.$axios.get('/roles').then(res => res.data)
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
        // this.$store.dispatch('notify', { success: false, message: error.response.data })
      }
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
