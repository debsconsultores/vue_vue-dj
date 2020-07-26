<template>
    <b-container fluid class="p-4 bg-dark">
        <b-row>
            <b-col 
            v-for="img in pixaImagenes" :key="img.id" md="2"
            class="py-2 text-center">
                <b-img :id="img.id" :src="img.previewURL" thumbnail fluid></b-img>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import ServicioAPI from "./ServicioAPI";

export default {
    name:"Pixabay",
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