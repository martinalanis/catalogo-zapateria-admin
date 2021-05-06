<template>
  <div>
    <products-table />
  </div>
</template>

<script>
import ProductsTable from '@/modules/products/ProductsTable'
export default {
  name: 'Productos',
  components: {
    ProductsTable
  }
}
</script>
