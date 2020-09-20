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

            <v-toolbar-title>Módulo Inventario</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn icon @click="chooseOpt(1)" >
              <v-icon>featured_video</v-icon>
            </v-btn>
            <v-btn icon @click="chooseOpt(2)">
              <v-icon>featured_play_list</v-icon>
            </v-btn>
            <v-btn icon @click="chooseOpt(3)">
              <v-icon>view_comfy</v-icon>
            </v-btn>
          </v-app-bar>
          <v-sheet id="scrolling-techniques-6" class="overflow-y-auto" max-height="600">
            <v-container style="height: 60px;"></v-container>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p v-if="opt==1">Categorí­a</p>
          <p v-if="opt==2">Sub Categorí­a</p>
          <p v-if="opt==3">Productos</p>
        </v-col>
      </v-row>
  </div>
</template>

<script>

export default {
  name: "Inventario",
  components: {
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