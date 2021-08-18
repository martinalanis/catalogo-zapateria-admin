<template>
  <div class="py-3">
    <v-row>
      <v-col cols="12" sm="6">
        <h3 class="px-3 mb-2 grey--text text--darken-3 text-uppercase">{{ product.codigo }}</h3>
        <div class="rounded-lg overflow-hidden">
          <img :src="product.imagen" alt="" class="img-block">
        </div>
        <v-simple-table>
          <template #default>
            <tbody>
              <tr>
                <th class="r_key">Fecha creación:</th>
                <td>{{ product.createdAt }}</td>
              </tr>
              <tr>
                <th class="r_key">Ultima modificación:</th>
                <td>{{ product.lastModified }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-col cols="12" sm="6">
        <h3 class="px-3 mb-2 d-block d-sm-none">{{ product.codigo }}</h3>
        <v-simple-table>
          <template #default>
            <tbody>
              <tr>
                <th class="r_key">Modelo:</th>
                <td>{{ product.modelo.toLowerCase() }}</td>
              </tr>
              <tr>
                <th class="r_key">Colores:</th>
                <td>
                  <v-chip
                    v-for="color in colores" :key="color"
                    label
                    outlined
                    small
                    class="mr-2 mb-1"
                  >{{ color.toLowerCase() }}</v-chip>
                </td>
              </tr>
              <tr>
                <th class="r_key">Material:</th>
                <td>{{ product.material.toLowerCase() }}</td>
              </tr>
              <tr>
                <th class="r_key">Tipo:</th>
                <td>{{ product.tipo.toLowerCase() }}</td>
              </tr>
              <tr>
                <th class="r_key">Categoría:</th>
                <td>{{ product.categoria.toLowerCase() }}</td>
              </tr>
              <tr>
                <th class="r_key">Numeraciones:</th>
                <td>
                  <v-chip
                    v-for="({name}, i) in numeraciones" :key="i"
                    label
                    small
                    color="primary"
                    class="mr-2 mb-1"
                    :class="active === i ? 'elevation-3': ''"
                    :outlined="active !== i || false"
                    @click="active = i"
                  >{{ name.toLowerCase() }}</v-chip>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-divider></v-divider>
        <v-row class="text-center mt-4 grey lighten-4 py-4 px-2 row--prices" no-gutters>
          <v-col cols="4" class="px-3">
            <h4 class="caption text-uppercase">Regular</h4>
            <h3 class="py-2">${{ precioPublico.toFixed(2) }}</h3>
          </v-col>
          <v-col cols="4" class="px-3">
            <h4 class="caption text-uppercase">Provedor</h4>
            <h3 class="py-2">${{ precioProveedor.toFixed(2) }}</h3>
          </v-col>
          <v-col cols="4" class="px-3">
            <h4 class="caption text-uppercase">Descuento</h4>
            <h3 class="py-2">${{ precioDescuento.toFixed(2) }}</h3>
          </v-col>
        </v-row>
        <!-- <v-row no-gutters>
          <v-col class="px-3 py-1 white d-flex flex-column justify-space-between">
            <h4 class="font-weight-regular">
              <small>PRECIO REGULAR</small>
            </h4>
            <h4>
              $ {{ product.precioPublico }}
            </h4>
          </v-col>
          <v-col class="px-3 py-1 price-label d-flex flex-column justify-space-between align-end">
            <h4 class="font-weight-regular">
              <small>PRECIO MAYOREO</small>
            </h4>
            <h3>
              $ {{ product.precioProveedor }}
            </h3>
          </v-col>
        </v-row> -->
        <!-- <div class="rounded elevation-1 overflow-hidden">
        </div> -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
import product from '~/interfaces/product'
export default {
  name: 'ProductDetails',
  props: {
    product: {
      type: Object,
      default: () => product
    }
  },
  data () {
    return {
      active: 0
    }
  },
  computed: {
    numeraciones () {
      return this.product.numeraciones && this.product.numeraciones.length
        ? this.product.numeraciones
        : []
    },
    colores () {
      return this.product.colores && this.product.colores.length
        ? this.product.colores
        : []
    },
    precioDescuento () {
      return this.product.numeraciones[this.active].precio_descuento || 0
    },
    precioPublico () {
      return this.product.numeraciones[this.active].precio_publico || 0
    },
    precioProveedor () {
      return this.product.numeraciones[this.active].precio_proveedor || 0
    }
  }
}
</script>

<style lang="scss" scoped>
tr th:first-child {
  width: 150px;
}
.row--prices {
  .col:not(:last-child) {
    border-right: 1px solid rgba(0,0,0,0.15);
  }
  h4 {
    // font-weight: normal;
    border-bottom: 1px solid rgba(0,0,0,0.15);
  }
}
</style>
