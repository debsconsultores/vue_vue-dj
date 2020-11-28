<template>
    <v-app>
        <v-container>
            <v-row>

            </v-row>
            <v-row>

            </v-row>
            <v-row>

            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import {ApiCmp} from "./ApiCmp"
import {ApiInv} from "../inv/ApiInv"

export default {
    name:"Comprar"    ,
    data(){
        return{
            loading:false,
            formValido:true,
            search:"",
            headers: [
                { text: "ID", value: "id" },
                {
                text: "Producto",
                align: "start",
                sortable: true,
                value: "producto_descripcion"
                },
                {
                text: "Cantidad",
                align: "start",
                sortable: true,
                value: "cantidad"
                },
                { text: "Precio", value: "precio", sortable: false },
                { text: "Sub Total", value: "subtotal", sortable: false },
                { text: "Descuento", value: "descuento", sortable: false },
                { text: "Total", value: "total", sortable: false },
                { text: "Acciones", value: "actions", sortable: false }
            ],
            textRules:[v=> !!v ||  "Requerido"],
            detalle:[],
            productos:[],
            proveedores:[],
            editedEnc: {
                id: -1,
                proveedor: {
                    id: -1,
                    nombre: ""
                },
                fecha:
                new Date().getFullYear() +
                "-" +
                new Date().getMonth() +
                "-" +
                new Date().getDate()
            },
            editedDetalle: {
                id: -1,
                cabecera: -1,
                producto: -1,
                cantidad: 0,
                precio: 0,
                subtotal: 0,
                descuento: 0,
                total: 0
            },
            api: new ApiCmp(),
            apiInv: new ApiInv()
        }
    },
    methods: {
        async iniciar() {
            this.loading = true;
            let r = await this.api.getProveedores();
            console.log(r);
            this.proveedores = r;
            this.productos = await this.apiInv.getProductos();
            console.log(this.productos);
            this.loading = false;
        }
    },
    created(){
        this.iniciar()
    }
}
</script>