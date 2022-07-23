<template>
  <v-card
    class="mx-0"
    max-width="300"
    height="100%"
    tile
    style="border-right: 1px solid #DDDDDD"
  >
    <v-list shaped>
      <v-subheader>TO-DO's</v-subheader>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="changeRoute(item.routeName)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

  export default Vue.extend({
    data: () => ({
        selectedItem: 0,
        items: [
        { text: 'TO-DO', icon: 'mdi-format-list-bulleted', routeName: 'todos' },
        { text: 'DONE', icon: 'mdi-playlist-check', routeName: 'done' },
        { text: 'PENDING', icon: 'mdi-playlist-remove', routeName: 'pending' },
      ],
    }),
    methods: {
        changeRoute(routeName: string) {
          this.$router.push({ name: routeName }).catch(error => {
            if (
              error.name !== 'NavigationDuplicated' &&
              !error.message.includes('Avoided redundant navigation to current location')
            ) {
              console.log(error)
            }
          })
        }
    },
  })
</script>
