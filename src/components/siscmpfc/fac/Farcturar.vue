<template>
    <b-container fluid>
        <b-modal id="modal" v-model="modalShow" size="lg" title="Clientes" no-close-on-backdrop no-close-on-esc
        centered hide-header-close
        header-bg-variant="success" ok-only ok-variant="info" ok-title="Salir">
        <b-container fluid>
            <b-row>
                <b-col>
                    <b-card title="Buscar">
                        <b-row>
                            <b-col sm="11">
                                <b-form-input v-model="searchModal" type="text" autofocus @keypress.enter="buscarClientePorNombre" ></b-form-input>
                            </b-col>
                            <b-col sm="1">
                                <b-button pill variant="success" size="sm" @click="buscarClientePorNombre">
                                <b-icon-search></b-icon-search>
                                </b-button>
                            </b-col>
                        </b-row> 
                    </b-card>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-card title="Resultados">
                        <b-overlay :show="loading" spinner-variant="primary" rounded="sm">
                            <b-table
                            dense
                            striped
                            hover
                            :items="buscado"
                            primary-key="id"
                            small
                            sticky-header
                            head-variant="light"
                            fixed
                            responsive="sm"
                            :busy="loading"
                            show-empty
                            emptyText	= "No hay Datos"
                            emptyFilteredText = "No se encontró ningún registro"
                            @row-clicked="(item) => clickBuscar(item)"
                            >
                            </b-table>
                        </b-overlay>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
        </b-modal>
        <b-overlay :show="loading" spinner-variant="primary" rounded="sm" >
            <template v-slot:overlay>
                <div class="text-center">
                    <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                    <p id="cancel-label">Un Momento Por favor..</p>
                </div>
            </template>
        <b-row>
            <b-col sm="1">
                <label for="id">No.:</label>
            </b-col>
            <b-col sm="2">
                <b-form-input v-model="encabezado.id" :disabled="!editar" type="text"></b-form-input>
            </b-col>
            <b-col sm="1">
                <label for="fecha">Fecha:</label>
            </b-col>
            <b-col sm="2">
                <b-form-input v-model="encabezado.fecha" type="text" disabled></b-form-input>
            </b-col>
            <b-col sm="1">
                <label for="cliente">Cliente:</label>
            </b-col>
            <b-col sm="1">
                <!-- <b-form-select v-model="encabezado.cliente" :options="clientes"
                value-field="id" text-field="nombre" ></b-form-select> -->
                <b-form-input v-model="encabezado.cliente.id" @blur="buscarCliente" :disabled="encabezado.id!=-1"></b-form-input>
            </b-col>
            <b-col>
                <b-form-input v-model="encabezado.cliente.nombre" disabled></b-form-input>
            </b-col>
            <b-col sm="1">
                <b-button @click="abrirModal" variant="success" :disabled="encabezado.id!=-1" >
                <b-icon-people></b-icon-people>
                </b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card
                title="Productos"
                class="mb-2">
                    <b-row>
                        <b-col sm="1">
                            <b-form-input v-model="detalle.producto" ></b-form-input>
                        </b-col>
                        <b-col sm="6">
                            <b-form-input v-model="detalle.descripcion" disabled=""></b-form-input>
                        </b-col>
                        <b-col sm="2">
                            <b-form-input v-model="detalle.cantidad" type="number" min="1" value="1" ></b-form-input>
                        </b-col>
                        <b-col sm="2">
                            <b-form-input v-model="detalle.precio" type="number" ></b-form-input>
                        </b-col>
                        <b-col sm="1"></b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card title="Detalle" class="mb-2">
                    <b-table
                    dense stripped hover
                    :items="items"
                    :fields="fields"
                    primary-key="id"
                    small
                    sticky-header
                    head-variant="light"
                    responsive="sm"
                    :busy="loading"
                    show-empty
                    emptyText="No hay datos"
                    emtpyFilterdText="No se encontró ningún registro"
                    >

                    </b-table>
                </b-card>
            </b-col>
        </b-row>
        </b-overlay>
    </b-container>
</template>

<script>
import { ApiFac } from "./ApiFac";
import { ApiInv } from "../inv/ApiInv";
import mensajesMixin from "../../../mixins/mensajesMixin"

export default {
  name: "Facturar",
  mixins:[mensajesMixin],
  data() {
    return {
      searchModal:"",
      modalShow:false,
      buscado:[],
      api: new ApiFac(),
      apiInv : new ApiInv(),
      editar: false,
      loading: false,
      search: "",
      clientes: [],
      encabezado: {
        id: -1,
        cliente: {
          id: -1,
          nombre: ""
        },
        fecha: new Date().toLocaleString(),
      },
      detalle: {
        id: -1,
        cabecera: -1,
        producto: -1,
        cantidad: 0,
        precio: 0,
        subtotal: 0,
        descuento: 0,
        total: 0
      },
      items: [],
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "producto_descripcion", label: "Producto", sortable: true },
        { key: "cantidad", label: "Cantidad" },
        { key: "precio", label: "Precio" },
        { key: "subtotal", label: "Sub Total" },
        { key: "descuento", label: "Descuento" },
        { key: "total", label: "Total" },
        { key: "acciones", label: "Acciones" }
      ]
    }
  },
    created(){
        this.iniciar();
    },
    methods: {
        async iniciar() {
            try {
                this.loading = true
                const c = await this.api.getCliente();
                this.clientes = c;    
            } catch (error) {
                this.msgError(error)
            } finally {
                this.loading = false
            }
        },
        async buscarCliente(){
            try {
                this.loading = true
                const c = await this.api.getCliente(this.encabezado.cliente.id)
                // console.log(c)
                if(c.detail != undefined){
                    this.msgError(c.detail)
                    this.encabezado.cliente = {}
                }else if (!c.estado){
                    this.msgError("Cliente Inactivo")
                    this.encabezado.cliente = {}
                }else{
                    this.encabezado.cliente = c
                }
            } catch (error) {
                this.msgError(error)
            }finally{
                this.loading = false
            }
            // const d = await this.api.buscarClientePorNombre("gggg")
            // console.log("--------------------")
            // console.log(d)
        },
        abrirModal(){
            this.buscado = []
            this.searchModal = ""
            this.modalShow=true
        },
        async buscarClientePorNombre(){
          this.loading=true
          this.buscados=[]
          try {
            console.log(this.searchModal)
            if (this.searchModal!=""){
              const d = await this.api.buscarClientePorNombre(this.searchModal)
              console.log(d);
              if (d.detail != undefined) {
                this.msgError(d.detail);
            } else {
              this.buscado = d
            }
            }
          } catch (error) {
            this.msgError(error)
          }
          finally{
            this.loading=false
          }
        },
        async clickBuscar(item){
          console.warn(item)
          this.encabezado.cliente.id = item.id
          await this.buscarCliente()
          this.modalShow=false
        }
    }
    
}
</script>

<style scoped>

</style>