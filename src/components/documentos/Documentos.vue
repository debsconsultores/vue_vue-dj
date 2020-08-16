<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col>
                    <Mensaje />
                    <div v-for="item in allItems" :key="item.id">
                        <Item :item="item" :items="allItems" />
                    </div>
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
import Item from "./Item"

export default {
    name:"Documentos",
    components:{
        Mensaje,
        Item,
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
    }
}
</script>

<style scoped>

</style>