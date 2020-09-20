<template>
    <v-app>
            <v-row>
                <v-col>
                    {{items}}
                </v-col>
            </v-row>      
    </v-app>
</template>

<script>
import {ApiInv} from "./ApiInv"

export default {
    name:"Categoria",
    data(){
        return {
            items: [],
            api : new ApiInv
        }
    },
    methods:{
        async iniciar(){
            let r = await this.api.getCategorias()
            this.items = r
        }
    },
    created(){
        this.iniciar()
    }
}
</script>

<style scoped>

</style>