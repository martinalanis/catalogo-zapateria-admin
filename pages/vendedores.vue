<template>
  <div>
    <users-table type="vendedor"/>
  </div>
</template>

<script>
import UsersTable from '@/modules/users/UsersTable'
export default {
  name: 'Vendedores',
  components: {
    UsersTable
  }
}
</script>
