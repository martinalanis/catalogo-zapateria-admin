<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <h4 class="text--secondary border-bottom pb-1">GENERALES</h4>
        <v-divider class="mb-2"></v-divider>
        <p>
          <small class="text--secondary">NOMBRE</small><br>
          {{ user.name }}
        </p>
        <div>
          <div class="d-inline-block mr-6">
            <p class="d-inline-block mr-3"><small class="text--secondary">ROL</small></p>
            <v-chip outlined label small color="#757676">
              {{ user.role.name }}
            </v-chip>
          </div>
          <div class="d-inline-block">
            <p class="d-inline-block mr-2"><small class="text--secondary">ESTATUS</small></p>
            <v-chip label small :color="user.statusColor">
              {{ user.statusText }}
            </v-chip>
          </div>
        </div>
        <div>
          <p class="d-inline-block mr-6">
            <small class="text--secondary">FECHA CREACIÓN</small><br>
            {{ user.created_at }}
          </p>
          <p class="d-inline-block">
            <small class="text--secondary">ÚLTIMA MODIFICACIÓN</small><br>
            {{ user.updated_at }}
          </p>
        </div>
      </v-col>
      <v-col cols="6">
        <h4 class="text--secondary border-bottom pb-1">CONTACTO</h4>
        <v-divider class="mb-2"></v-divider>
        <p>
          <small class="text--secondary">EMAIL</small><br>
          {{ user.email }}
        </p>
        <p>
          <small class="text--secondary">TEÉFONO</small><br>
          {{ user.phone }}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'UserDetails',
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.quote {
  position: relative;
  padding-left: 1em;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 100%;
    background: rgb(2, 122, 170);
  }
}
p {
  line-height: 1.7;
  small {
    letter-spacing: 1px;
    font-weight: 600;
    font-size: 0.8em;
  }
}
.bb {
  border-bottom: 1px solid #000;
}
</style>
