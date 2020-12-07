<template>
    <v-app>
        <v-form ref="form" v-model="formValido" lazy-validation>
            <v-container>
                <v-row>
                    <v-col>
                        <v-app-bar color="green" dense>
                            <v-btn icon @click="iniciar">
                                <v-icon>add_box</v-icon>
                            </v-btn>
                            <v-btn color="red" icon @click="buscar">
                                <v-icon>search</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <div v-for="(value,key) in totales" :key="key">
                                <span class="text-capitalize red--text"> {{key}}</span>
                                <span class="font-weight-bold"> {{value}}</span>
                            </div>
                        </v-app-bar>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <!-- <v-text-field v-model="editedEnc.id" append-icon="mdi-magnify" label="No. Cmp" disabled=""></v-text-field> -->
                        <v-row>
                            <v-col cols="12" md="8">
                                <v-text-field v-model="editedEnc.id" append-icon="mdi-magnify" label="No. Cmp" disabled=""></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-btn color="red" icon @click="buscar" dense>
                                    <v-icon>search</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col>
                        <v-dialog
                            ref="dialog"
                            v-model="dialogFecha"
                            :return-value.sync="editedEnc.fecha"
                            persistent
                            width="290px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="editedEnc.fecha"
                                label="Fecha Compra"
                                prepend-icon="event"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker v-model="editedEnc.fecha" scrollable color="success" locale="es"
                            :disabled="editedEnc.id!=-1">
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="dialogFecha = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.dialog.save(editedEnc.fecha)">OK</v-btn>
                            </v-date-picker>
                        </v-dialog>
                    </v-col>
                    <v-col>
                        <v-autocomplete
                        v-model="editedEnc.proveedor"
                        :items="proveedores"
                        label="Proveedor"
                        item-text="nombre"
                        item-value="id"
                        return-object
                        prepend-icon="mdi-city"
                        :rules="textRules"
                        :disabled="editedEnc.id!=-1"
                        ></v-autocomplete>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-autocomplete
                            v-model="editedDetalle.producto"
                            :items="productos"
                            label="Producto"
                            item-text="descripcion"
                            item-value="id"
                            return-object
                            prepend-icon="mdi-city"
                            :rules="textRules"
                        ></v-autocomplete>
                    </v-col>
                    <v-col>
                        <v-text-field v-model="editedDetalle.cantidad" append-icon="mdi-magnify" label="Cantidad"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field v-model="editedDetalle.precio" append-icon="mdi-magnify" label="Precio"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-btn color="warning" fab icon
                        :disabled="!formValido" @click="save">
                            <v-icon>save</v-icon>
                        </v-btn>
                        <v-btn color="error" icon @click="editedDetalle = detalle_inicial">
                            <v-icon>cleaning_services</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-data-table
                            :headers="headers"
                            item-key="name"
                            class="elevation-1"
                            dense
                            :loading="loading"
                            loading-text="Cargando..."
                            :items="detalle"
                        >
                            <template slot="headers" slot-scope="props">
                            <tr>
                                <th
                                v-for="header in props.headers"
                                :key="header.text"
                                :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                                @click="changeSort(header.value)"
                                >
                                <v-icon small>arrow_upward</v-icon>
                                {{ header.text }}
                                </th>
                            </tr>
                            </template>
                            <template v-slot:no-data>
                                <v-alert dense type="info">No Hay Registros</v-alert>
                            </template>
                            <template v-slot:item.actions="{item}">
                                <v-icon color="danger" small @click="borrarDetalle(item)">mdi-delete</v-icon>
                            </template>
                            <template slot="body.append">
                                <tr class="red--text text--darken-4 blue lighten-4 font-weight-bold">
                                    <td></td>
                                    <td></td>
                                    <td>{{ totales.cantidad }}</td>
                                    <td></td>
                                    <td>{{ totales.subtotal }}</td>
                                    <td>{{ totales.decuento }}</td>
                                    <td>{{ totales.total }}</td>
                                    <td></td>
                                </tr>
                            </template>
                        </v-data-table>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-app>
</template>

<script>
import {ApiCmp} from "./ApiCmp"
import {ApiInv} from "../inv/ApiInv"

export default {
    name:"Comprar"    ,
    data(){
        return{
            // hoy:    new Date().getFullYear() +
            //         "-" +
            //         +(new Date().getMonth() +1) +
            //         "-" +
            //         new Date().getDate(),
            loading:false,
            formValido:true,
            dialogFecha: false,
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
                fecha: ""
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
            apiInv: new ApiInv(),
            encabezado_inicial:{
                id: -1,
                proveedor: {
                id: -1,
                nombre: ""
                },
                fecha: this.hoy
            },
            detalle_inicial: {
                id: -1,
                cabecera: -1,
                producto: -1,
                cantidad: 0,
                precio: 0,
                subtotal: 0,
                descuento: 0,
                total: 0
            }
        }
    },
    computed:{
        hoy(){
            return new Date().toISOString().substr(0, 10)
        },
        totales(){
            let t = {
                cantidad:0,
                subtotal:0,
                descuento:0,
                total:0
            }
            if(this.detalle != undefined){
                this.detalle.reduce((i,obj)=>{
                    t.cantidad += obj.cantidad
                    t.subtotal += obj.subtotal
                    t.descuento += obj.descuento
                    t.total += obj.total
                },0)
            }
            return t
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

            this.editedDetalle = Object.assign({},this.detalle_inicial)
            this.editedEnc = Object.assign({},this.encabezado_inicial)
            this.detalle = []

            this.editedEnc.fecha = this.hoy
            this.loading = false;
        },
        async save(){
            if (!this.$refs.form.validate()) {
                return false;
            }
            
            const enc = this.editedEnc
            const det = this.editedDetalle

            if(enc.proveedor.id==-1){
                // alert("Proveedor Requerido")
                this.$swal("Proveedor Requerido","","error")
                return false
            }

            if(det.producto==-1){
                // alert("Producto Requerido")
                this.$swal("Producto Requerido","","error")
                return false
            }

            if(det.cantidad<=0){
                // alert("Cantidad Errónea - No se aceptan CERO o NEGATIVOS")
                this.$swal("Cantidad Errónea"," No se aceptan CERO o NEGATIVOS","error")
                return false
            }

            if(det.precio<0){
                alert("Precio Erróneo - No se aceptan NEGATIVOS")
                return false
            }

            const encabezado = {
                id : enc.id,
                proveedor: enc.proveedor.id === undefined ? enc.proveedor : enc.proveedor.id,
                fecha: enc.fecha
            }

            let detalle  = {
                id: -1,
                cabecera: -1,
                producto: det.producto.id,
                cantidad: det.cantidad,
                precio: det.precio,
                descuento: det.descuento
            }

            const e = await this.api.guardarEncabezado(encabezado)
            if (e.id===undefined){
                alert(e)
                return false
            }

            detalle.cabecera = e.id
            this.editedEnc = e
            this.editedDetalle = []

            await this.api.guardarDetalle(detalle)
            // console.log(d)

            // const p = await this.api.getProveedores(e.proveedor)
            // console.log(p)
            // this.editedEnc["proveedor"] = p
            this.updateDetalle()

        },
        async updateDetalle(){
            this.loading = true
            const d = await this.api.get(this.editedEnc.id)
            console.log(d)
            
            this.editedEnc = d
            const p = await this.api.getProveedores(d.proveedor)
            console.log(p)
            this.editedEnc["proveedor"] = p

            this.detalle = d.detalle
            this.loading = false
        },
        async buscar(){
            const {value:idEnc} = await this.$swal.fire({
                title:"Digite Número de Compra",
                input: "text",
                allowOutsideClick:false,
                showCancelButton:true,
                inputValidator: (value) => {
                    if(!value) {
                        return "Debe Digitar Id de Compra"
                    }
                }
            })

            if(idEnc){
                this.editedEnc.id = idEnc
                await this.updateDetalle()

                if(this.editedEnc.id === undefined){
                    this.$swal("Compra no Encontrada",idEnc,"error")
                    this.editedEnc = {
                        id: -1,
                        proveedor: {
                            id: -1,
                            nombre: ""
                        },
                        fecha: this.hoy
                    }
                }
            }else{
              this.$swal("Bùsqueda Cancelada","","warning")
            }
        },
        async borrarDetalle(item){
            // if(confirm("¿Borrar Detalle?")){
                const result = await this.prompt(`${item.producto_descripcion} con id ${item.id}?`,"¿Borrar")
                if(result.isConfirmed){
                console.log(result)
                await this.api.borrarDetalle(item.id)
                this.updateDetalle()
            }
        },
        async prompt(mensaje,titulo){
            try{
                let result = await this.$swal({
                    title: titulo,
                    text: mensaje,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No',
                    reverseButtons: true
                });
                return result;
            }catch(e){
                console.error(e);
            }            
        }
    },
    created(){
        this.iniciar()
    }
}
</script>