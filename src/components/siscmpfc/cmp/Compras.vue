<template>
  <div>
      <v-row>
        <v-col>
          <v-app-bar
            :collapse="!collapseOnScroll"
            :collapse-on-scroll="collapseOnScroll"
            absolute
            dark
            scroll-target="#scrolling-techniques-6"
            elevate-on-scroll
          >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>Módulo Compra</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn icon @click="chooseOpt(1)" >
              <v-icon>featured_video</v-icon>
            </v-btn>
            <v-btn icon @click="chooseOpt(2)">
              <v-icon>featured_play_list</v-icon>
            </v-btn>
          </v-app-bar>
          <v-sheet id="scrolling-techniques-6" class="overflow-y-auto" max-height="600">
            <v-container style="height: 60px;"></v-container>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <Proveedores v-if="opt==1" />
          <div v-if="opt==2">Comprar</div>
        </v-col>
      </v-row>
  </div>
</template>

<script>
import Proveedores from "./Proveedores"

export default {
  name: "Compras",
  components: {
    Proveedores
  },
  data() {
    return {
        opt: null,
        collapseOnScroll: true
    };
  },
  methods: {
    chooseOpt(opt){
      this.opt = opt
    }
  }
};
</script>

<style scoped>
</style>