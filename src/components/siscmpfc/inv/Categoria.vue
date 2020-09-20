<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col>
                    <v-data-table
                    dense
                    :headers="headers"
                    :items="items"
                    :search="search"
                    class="elevation-1"
                    :loading="loading"
                    loading-text="Cargando..."
                    >
                    <template v-slot:top>
                        <v-toolbar flat color="white">
                        <v-toolbar-title>Categorías</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-text-field  v-model="search" append-icon="mdi-magnify" label="Buscar"></v-text-field> 
                        <v-spacer></v-spacer>
                        <v-btn color="warning" dark class="mb-2" @click="iniciar" ><v-icon>cached</v-icon></v-btn>
                        </v-toolbar>
                    </template>
                    <template v-slot:no-data>
                        <v-btn color="primary" @click="iniciar">Reiniciar</v-btn>
                    </template>
                    </v-data-table>
                </v-col>
            </v-row> 
        </v-container>     
    </v-app>
</template>

<script>
import {ApiInv} from "./ApiInv"

export default {
    name:"Categoria",
    data(){
        return {
            items: [],
            api : new ApiInv,
            loading:false,
            search : "",
            headers: [
                {text:"ID",value:"id"},
                {
                    text:"Descripción",
                    align: 'start',
                    sortable: true,
                    value: 'descripcion'
                }
            ]
        }
    },
    methods:{
        async iniciar(){
            try {
                this.loading = true
                let r = await this.api.getCategorias()
                this.items = r   
            } catch (error) {
                alert(error)
            }finally{
                this.loading = false
            }
        }
    },
    created(){
        this.iniciar()
    }
}
</script>

<style scoped>

</style>