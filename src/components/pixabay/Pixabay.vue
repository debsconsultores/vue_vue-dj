<template>
    <b-container fluid class="p-4 bg-dark text-white">
        <b-row>
            <!-- <b-col md="6">
                <b-form-input v-model="buscar" placeholder="Ingrese Patrón a Buscar"
                @keypress.enter="buscarImagenes"
                ></b-form-input>
            </b-col>
            <b-col md="1">
                <b-button variant="danger" @click="buscarImagenes">
                    Buscar
                </b-button>
            </b-col> -->
            <b-col>
                <Buscador @buscarDesdeHijo="realizaBusqueda" />
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
        <b-row align-h="center">
            <b-col md="12">
                <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="Imagen"
                @input="buscarImagenes"
                v-if="rows>0"
                ></b-pagination>
                <b-alert variant="danger" show v-else>Busqueda de {{buscar}} no devolvió nada</b-alert>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import ServicioAPI from "./ServicioAPI";
import Imagen from "./Imagen";
import Buscador from "./Buscador";

export default {
    name:"Pixabay",
    components:{
        Imagen,
        Buscador,
    },
    data(){
        return{
            pixaImagenes:[],
            buscar:"",
            currentPage:1,
            rows:1,
            perPage:20
        }
    },
    methods:{
        async buscarImagenes(){
            // this.buscar = buscar;
            const consulta = await ServicioAPI.getImagenes(this.buscar,this.currentPage);
            this.pixaImagenes = consulta.hits;
            // console.log(consulta);
            this.rows = consulta.total / this.perPage;
            console.log(this.currentPage)
        },
        realizaBusqueda(buscar=""){
            this.buscar = buscar;
            this.buscarImagenes();
            this.currentPage = 1;

        }
    },
    mounted(){
        this.buscarImagenes();
    }
    
}
</script>

<style lang="stylus" scoped>

</style>