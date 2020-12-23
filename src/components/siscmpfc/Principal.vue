<template>
    <v-card class="color-fondo">
        <v-card-title>
            <h1 class="font-weight-bold display-6 color-texto">Sistema de Compra y Facturación <small>Curso x Daniel Bojorge</small></h1>
        </v-card-title>
        <v-tabs>
            <v-tab>Inventario</v-tab>
            <v-tab>Compra</v-tab>
            <v-tab>Facturación</v-tab>

            <v-tab-item> <Inventario /></v-tab-item>
            <v-tab-item> <Compras /></v-tab-item>
            <v-tab-item> <Facturas /></v-tab-item>
        </v-tabs>
    </v-card>
</template>

<script>
import Inventario from "./inv/Inventario"
import Compras from "./cmp/Compras"
import Facturas from "./fac/Facturas"

export default {
    name:"Principal",
    components:{
        Inventario,
        Compras,
        Facturas
    }
    
}
</script>

<style>
.color-fondo {
    background-color: #FFFBE6 !important;
}
.color-texto {
    color: #356859 !important;
}
</style>