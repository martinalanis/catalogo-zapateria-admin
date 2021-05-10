<template>
  <div>
    <users-table type="administrador"/>
  </div>
</template>

<script>
import UsersTable from '@/modules/users/UsersTable'
export default {
  name: 'Administradores',
  components: {
    UsersTable
  }
}
</script>
