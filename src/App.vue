<template>
  <div id="app">
    <!-- <Home v-if="false"></Home>
    <Pixabay /> -->
    <router-link to="/">Home</router-link> | 
    <router-link to="/pixa">Imágenes</router-link>

    <router-view></router-view>
  </div>
</template>

<script>
// import Home from "./components/Home";
// import Pixabay from "./components/pixabay/Pixabay";

export default {
  name: 'App',
  components: {
    // Home,
    // Pixabay,
  }
}
</script>

<style>
</style>
