<template>
  <v-app>
    <div class="d-flex flex-row h-100">
      <NavBarComponent class="nav_bar"/>
      <div class="content">
        <v-main>
          <router-view/>
        </v-main>
      </div>
    </div>
  </v-app>
</template>

<script lang="ts">
  import Vue from 'vue'
  import NavBarComponent from './components/NavBarComponent.vue'

  export default Vue.extend({
    name: 'HomeComponent',

    components: {
      NavBarComponent
    },
  })
</script>

<style scoped lang="scss">
.nav_bar {
  width: 25vw;
}
.content {
  width: 100%;
  height: 100%;
}
</style>
