<template>
    <b-container>
        <b-row>
            <b-col sm="8">
                <b-form-group
                label="Filtro"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                label-for="filterInput"
                class="mb-0">
                    <b-input-group size="sm">
                        <b-form-input
                        v-model="filter"
                        type="search"
                        id="filterInput"
                        placeholder="Escribe para Buscar">
                        </b-form-input>
                        <b-input-group-append>
                            <b-button :disabled="!filter" @click="filter = ''">
                                <b-icon icon="x" aria-hidden="true"></b-icon>
                            </b-button>
                        </b-input-group-append>                        
                    </b-input-group>
                </b-form-group>
            </b-col>
            <b-col sm="4">
                <b-button pill v-b-modal.modal variant="primary" @click="modalShow=true" >
                    <b-icon icon="folder-plus" aria-hidden="true"></b-icon>
                </b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-table
                  dense
                  striped
                  hover
                  :items="items"
                  :fields="fields"
                  primary-key="id"
                  small
                  sticky-header
                  head-variant="light"
                  fixed
                  responsive="sm"
                  :busy="loading"
                  :filter="filter"
                  show-empty
                >
                  <template v-slot:cell(actions)="row">
                    <b-button
                      size="sm"
                      @click="info(row.item, row.index, $event.target)"
                      class="mr-1"
                    >
                    <b-icon>pencil</b-icon>
                    </b-button>
                    <b-button
                      size="sm"
                      @click="row.toggleDetails"
                    >{{ row.detailsShowing ? 'Hide' : 'Show' }} Details</b-button>
                  </template>
                </b-table>
                <b-modal id="modal" v-model="modalShow" size="xl" title="Clientes" no-close-on-backdrop no-close-on-esc
                hide-footer centered hide-header-close >
                    <b-container fluid>
                        <b-row class="my-1">
                            <b-col sm="1">
                            <label for="id">Id:</label>
                            </b-col>
                            <b-col sm="2">
                            <b-form-input v-model="cliente.id" disabled type="text"></b-form-input>
                            </b-col>
                            <b-col sm="1">
                            <label for="nombre">Nombre:</label>
                            </b-col>
                            <b-col>
                            <b-form-input v-model="cliente.nombre" type="text" autofocus ></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="1">
                            <label for="telefono">Teléfono:</label>
                            </b-col>
                            <b-col>
                            <b-form-input v-model="cliente.telefono" type="text"></b-form-input>
                            </b-col>
                            <b-col sm="1">
                            <label for="email">E-Mail:</label>
                            </b-col>
                            <b-col>
                            <b-form-input v-model="cliente.email" type="email"></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="1">
                            <b-form-checkbox v-model="cliente.estado" name="check-button" switch>
                                Estado
                            </b-form-checkbox>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                            <b-button class="mt-3" variant="outline-info" block @click="cerrar">Cancelar</b-button>
                            </b-col>
                            <b-col>
                            <b-button class="mt-3" variant="outline-danger" block @click="guardar">Guardar</b-button>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-modal>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { ApiFac } from "./ApiFac";
import { BIcon } from "bootstrap-vue";

export default {
    name:"Cliente",
	components: {
        BIcon
    },
    data() {
        return {
            modalShow: false,
            loading: false,
            filter: "",
            api: new ApiFac(),
            fields: [
                { key: "id", label: "ID", sortable: true},
                {
                key: "nombre",
                label: "Nombres",
                sortable: true
                },
                {
                key: "telefono",
                label: "Teléfono",
                sortable: true
                },
                {
                key: "email",
                label: "E-Mail",
                sortable: true
                },
                {
                key: "estado",
                label: "Activo?",
                sortable: true
                },
                { key: "acciones", label: "Acciones", sortable: false }
            ],
            items: [],
            cliente:{
                id:-1,
                nombre:"",
                telefono:"",
                email:"",
                estado:true
            }
        };
    },
    created(){
        this.iniciar()
    },
    computed:{},
    methods:{
        async iniciar(){
            try {
                this.loading = true
                const r = await this.api.getCliente()
                this.items = r
            } catch (error) {
                alert(error)
            } finally {
                this.loading = false
            }
        },
        cerrar(){
            this.modalShow = false
        },
        async guardar(){
            try {
                const c = await this.api.saveCliente(this.cliente)
                if (c.id!=undefined){
                    this.msg("Guardado Satisfactoriamente")
                    this.cliente = []
                }else{
                    this.msgError("Error Inesperado")
                }
            } catch (error) {
                this.msgError(error)
            }
            finally{
                this.cerrar()
                this.iniciar()
            }
        }
    }
}
</script>

<style>

</style>