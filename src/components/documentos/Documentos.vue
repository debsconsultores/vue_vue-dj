<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col>
                    <Modal ref="modal" :item="nuevo" /> 
                    <Mensaje />
                    <Docs />
                    <v-btn big color="pink" dark absolute bottom right fab @click="abrirModal">
                        <v-icon>add</v-icon>
                    </v-btn>
                    <v-progress-linear 
                    :active="loading.estado"
                    color="deep-purple accent-4"
                    indeterminate
                    rounded
                    height="6"
                    >
                    </v-progress-linear>
                </v-col>
            </v-row>
        </v-container>
    </v-app>   
</template>

<script>
import Mensaje from "./Mensaje"
import Docs from "./Docs"
import Modal from "./Modal"

export default {
    name:"Documentos",
    components:{
        Mensaje,
        Docs,
        Modal
    },
    data: () => {
        return {
            nuevo: {
                id:-1,
                nombre:"Nuevo Documento",
                expira:"",
                alerta1y:true,
                alerta6m: true,
				alerta3m: true,
				alerta1m: true
            },
            item:[]
        }
    },
    mounted(){
        try{
            // this.$store.commit("mostrarLoading","Cargando Datos...")
            this.$store.commit("setItems");
        }
        catch (error){
            console.log(error);
        }
        // finally{
        //     this.$store.commit("ocultarLoading")
        // }
    },
    computed:{
        allItems(){
            return this.$store.state.items;
        },
        loading(){
            return this.$store.state.loading;
        }
    },
    methods:{
        abrirModal(){
            this.$refs.modal.show();
            this.nuevo = {
                id:-1,
                nombre:"Nuevo Documento",
                expira:"",
                alerta1y:true,
                alerta6m: true,
				alerta3m: true,
				alerta1m: true
            }
        }
    }
}
</script>

<style scoped>

</style>