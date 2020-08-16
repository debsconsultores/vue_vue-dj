import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex)

import api from "./components/documentos/api";

export default new Vuex.Store({
    state:{
        items: [],
        mensaje:{
            mostrar:false,
            texto:""
        },
        loading:{
            titulo:"Cargando...",
            estado:true
        }
    },

    getters:{
        getAllItems: state => {
            return state.items;
        }
    },

    mutations: {
        async setItems (state) {
            this.commit("mostrarLoading","Cargando Datos...")
            let items = await api.getAll();
            state.items = items;
            this.commit("ocultarLoading","Cargando Datos...")
        },
        async insetarDoc(state,payload){
            let r  = await api.insert(payload);
            state = r;
            this.commit("mensaje","Registro Insertado Satisfactoriamente");
            let items = await api.getAll();
            this.state.items = items;
        },
        async actualizarDoc(state,payload){
            let r = await api.update(payload);
            this.commit("mensaje","Registro Actualizado Satisfactoriamente");
            state = r;
            this.state.items = await api.getAll();
        },
        async borrarDoc(state,payload){
            state = api.deleteForId(payload.id);
            this.state.items = await api.getAll();
        },
        mostrarLoading(state,payload){
            state.loading.estado = true;
            if(payload!==undefined){
                this.state.loading.titulo=payload;
            }
        },
        ocultarLoading(state){
            state.loading.estado = false;
        },
        mensaje(state,payload){
            this.state.mensaje.mostrar= true;
            this.state.mensaje.texto = payload;
        }
    }

})