<template>
    <b-container fluid class="p-4 bg-dark text-white">
        <b-row>
            <b-col md="6">
                <b-form-input v-model="buscar" placeholder="Ingrese Patrón a Buscar"
                @keypress.enter="buscarImagenes"
                ></b-form-input>
            </b-col>
            <b-col md="1">
                <b-button variant="danger" @click="buscarImagenes">
                    Buscar
                </b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col 
            v-for="img in pixaImagenes" :key="img.id" md="2"
            class="py-2 text-center">
                <!-- <b-img :id="img.id" :src="img.previewURL" thumbnail fluid></b-img> -->
                <Imagen :img="img"/>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import ServicioAPI from "./ServicioAPI";
import Imagen from "./Imagen";

export default {
    name:"Pixabay",
    components:{
        Imagen,
    },
    data(){
        return{
            pixaImagenes:[],
            buscar:""
        }
    },
    methods:{
        async buscarImagenes(){
            const consulta = await ServicioAPI.getImagenes(this.buscar);
            this.pixaImagenes = consulta.hits;
            console.log(consulta);
        }
    },
    mounted(){
        this.buscarImagenes();
    }
    
}
</script>

<style lang="stylus" scoped>

</style>