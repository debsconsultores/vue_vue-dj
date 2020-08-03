<template>
  <v-app>
    <v-navigation-drawer permanent expand-on-hover>
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="./assets/Logo-VueDJ.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">Curso Vue + Django</v-list-item-title>
            <v-list-item-subtitle>Daniel Bojorge</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <div v-for="m in menu" :key="m.nombre">
          <router-link :to='m.ruta'>
            <v-list-item link>
                <v-list-item-icon><v-icon>{{m.icono}}</v-icon></v-list-item-icon>
                <v-list-item-title>{{m.nombre}}</v-list-item-title>
            </v-list-item>
          </router-link>
        </div>
      </v-list>
    </v-navigation-drawer>
     <router-view></router-view>
  </v-app>
</template>

<script>
// import Home from "./components/Home";
// import Pixabay from "./components/pixabay/Pixabay";

export default {
  name: 'App',
  components: {
    // Home,
    // Pixabay,
  },
  data(){
    return {
      menu:[
        {ruta:"/",nombre:"Inicio",icono:"mdi-folder"},
        {ruta:"/pixa",nombre:"Imágenes",icono:"mdi-folder"}
      ]
    }
  }
}
</script>

<style>
a:link {
  text-decoration: none;
}
</style>
