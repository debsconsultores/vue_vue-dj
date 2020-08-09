import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex)

import api from "./components/documentos/api";

export default new Vuex.Store({
    state:{
        items: []
    },

    getters:{
        getAllItems: state => {
            return state.items;
        }
    },

    mutations: {
        async setItems (state) {
            let item = await api.getAll();
            state.items = items;
        },
        async insetarDoc(state,payload){
            let r  = await api.insert(payload);
            state = r;
            let items = await api.getAll();
            this.state.items = items;
        },
        async actualizarDoc(state,payload){
            let r = await api.update(payload);
            state = r;
            this.state.items = await api.getAll();
        },
        async borrarDoc(state,payload){
            state = api.deleteForId(payload.id);
            this.state.items = await api.getAll();
        }
    }

})