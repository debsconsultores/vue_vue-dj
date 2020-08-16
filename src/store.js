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
            try{
                this.commit("mostrarLoading","Cargando Datos...")
                let items = await api.getAll();
                if(typeof(items)=="string"){
                    this.commit("mensaje",items)
                }else{
                    state.items = items;
                }
            }
            catch(error){
                this.commit("mensaje",error.message)
            }finally{
                this.commit("ocultarLoading","Cargando Datos...")
            }
        },
        async insetarDoc(state,payload){
            try{
                this.commit("mostrarLoading","Cargando Datos...")
                let r  = await api.insert(payload);
                if(typeof(r)=="string"){
                    this.commit("mensaje",r)
                }else{
                    state = r;
                    this.commit("mensaje","Registro Insertado Satisfactoriamente");
                    let items = await api.getAll();
                    this.state.items = items;
                }
            }
            catch(error){
                this.commit("mensaje",error.message)
            }finally{
                this.commit("ocultarLoading","Cargando Datos...")
            }
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