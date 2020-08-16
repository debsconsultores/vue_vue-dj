<template>
  <div>
    <v-toolbar color="teal" dark>
      <v-toolbar-title>Expiración de Documentos</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-list two-line>
      <template v-for="item in allItems">
        <Item :key="item.id"
            :item="item" :items="allItems" />
      </template>
    </v-list>
  </div>
</template>

<script>
import Item from "./Item"
export default {
    name:"Docs",
    components:{
        Item
    },
    computed:{
        allItems(){
            return this.$store.state.items;
        }
    }
}
</script>

<style scoped>

</style>