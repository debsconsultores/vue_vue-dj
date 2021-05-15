import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue'

import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import {BootstrapVue,BootstrapVueIcons} from "bootstrap-vue"
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import VueSessionStorage from "vue-sessionstorage";

import router from "./router"

import store from "./store";

Vue.use(Vuetify)
Vue.use(BootstrapVue);
Vue.use(VueSweetalert2);
Vue.use(BootstrapVueIcons)
Vue.use(VueSessionStorage)

Vue.config.productionTip = false

Vue.mixin({
  methods:{
    msg(texto,titulo="",tipo="success"){
      this.$swal({
          title:titulo,
          text:texto,
          icon:tipo,
          allowOutsideClick: false,
          confirmButtonText:"Ok"
      })
    },
    msgError(txt){
      this.msg(txt,"mixin global","error")
    }
  }
})

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
