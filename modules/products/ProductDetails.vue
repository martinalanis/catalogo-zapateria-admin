<template>
  <div class="py-3">
    <v-row>
      <v-col cols="12" sm="6">
        <h3 class="px-3 mb-2">{{ product.codigo }}</h3>
        <div class="rounded-lg overflow-hidden">
          <img :src="product.imagenUrl" alt="" class="img-block">
        </div>
        <v-simple-table>
          <template #default>
            <tbody>
              <tr>
                <th class="r_key">Precio regular:</th>
                <td>$ {{ product.precio_publico.toFixed(2) }}</td>
              </tr>
              <tr>
                <th class="r_key">Precio proveedor:</th>
                <td>$ {{ product.precio_proveedor.toFixed(2) }}</td>
              </tr>
              <tr v-if="product.precio_descuento">
                <th class="r_key">Precio descuento:</th>
                <td>$ {{ product.precio_descuento.toFixed(2) }}</td>
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
                <th class="r_key">Numeración:</th>
                <td>{{ product.numeracion.toLowerCase() }}</td>
              </tr>
              <tr>
                <th class="r_key">Color:</th>
                <td>{{ product.color.toLowerCase() }}</td>
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
        <v-divider></v-divider>
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
export default {
  name: 'ProductDetails',
  props: {
    product: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
tr th:first-child {
  width: 150px;
}
</style>
