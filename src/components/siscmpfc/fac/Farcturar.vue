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
                                <b-button pill variant="success" size="sm" @click="buscarClientePorNombre" :disabled="encabezado.id!=-1">
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
            <b-col>
                <b-navbar toggleable="lg" variant="info" sticky>
                <b-navbar-nav >
                    <b-btn-toolbar>
                    <b-btn variant="danger" @click="buscar">
                        <b-icon icon="search"></b-icon>
                    </b-btn>
                    <b-btn variant="warning" @click="nueva">
                        <b-icon icon="basket3"></b-icon>
                    </b-btn>
                    </b-btn-toolbar>
                </b-navbar-nav>
                </b-navbar>
            </b-col>
        </b-row>
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
                            <b-form-input v-model="detalle.producto" @blur="buscarProducto" ></b-form-input>
                        </b-col>
                        <b-col sm="6">
                            <b-form-input v-model="detalle.descripcion" disabled=""></b-form-input>
                        </b-col>
                        <b-col sm="2">
                            <b-form-input v-model="detalle.cantidad" type="number" min="1" value="1" ></b-form-input>
                        </b-col>
                        <b-col sm="2">
                            <b-form-input v-model="detalle.precio" type="number" disabled ></b-form-input>
                        </b-col>
                        <b-col sm="1">
                            <b-btn block variant="info" @click="save">
                                <b-icon icon="cart-plus"></b-icon>
                            </b-btn>
                        </b-col>
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
                    foot-clone
                    >
                        <template v-slot:cell(acciones)="row">
                            <b-icon icon="trash" size="sm" @click="borrar(row.item)" class="mr-1"></b-icon>
                        </template>

                        <template v-slot:foot()>
                            <span></span>
                        </template>
                        <template v-slot:foot(producto_descripcion)>
                            <span class="text-danger">Totales</span>
                        </template>
                        <template v-slot:foot(cantidad)>
                            <span class="text-danger">{{totales.cantidad}}</span>
                        </template>
                        <template v-slot:foot(subtotal)>
                            <span class="text-danger">{{totales.subtotal}}</span>
                        </template>
                        <template v-slot:foot(descuento)>
                            <span class="text-danger">{{totales.descuento}}</span>
                        </template>
                        <template v-slot:foot(total)>
                            <span class="text-danger">{{totales.total}}</span>
                        </template>

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
import moment from "moment"

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
        fecha: moment().format("DD/MM/YYYY"),
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
    computed:{
          totales(){
            let t = {
              cantidad: 0,
              subtotal: 0,
              descuento: 0,
              total: 0
            };
            if(this.items!=undefined)
            {
              this.items.reduce((i,obj)=>{
                t.cantidad += obj.cantidad;
                t.subtotal += obj.subtotal;
                t.descuento += obj.descuento;
                t.total += obj.total;
              },0)
            }
            return t;
          }
    },
    methods: {
        async iniciar() {
            try {
                this.loading = true
                const c = await this.api.getCliente();
                this.clientes = c;    
                this.nueva()
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
        },
        async buscarProducto(){
            if(this.detalle.producto>0){
              try {
                this.loading=true;
                const p = await this.apiInv.getProductos(this.detalle.producto)
                if(p.id!== undefined){
                  if(p.existencia>0){
                    this.detalle.producto = p.id
                    this.detalle.descripcion = p.descripcion
					this.detalle.precio = p.precio
                  }else{
                    this.msgError("NO Hay Existencia para facturar")
                    this.detalle = {};
                  }
                }else{
                  this.msgError(p.detail)
                  this.detalle = {}
                }
              } catch (error) {
                this.msgError(error)
              } finally{
                this.loading=false
              }
            }
        },
        async save(){
            let fechaFact = this.encabezado.fecha
            fechaFact = moment(fechaFact, 'DD/MM/YYYY').format('YYYY-MM-DD')

            if(this.encabezado.cliente.id===undefined || this.encabezado.cliente.id===null || this.encabezado.cliente.nombre=="" || this.encabezado.cliente.id<1){
                this.msgError("Cliente es Requerido")
                return false
            }

            if(this.detalle.descripcion === undefined || this.detalle.descripcion===""){
                this.msgError("Producto Requerido")
                return false
            }

            if(this.detalle.cantidad===undefined || this.detalle.cantidad<=0){
                this.msgError("Cantidad Requerida o valor incorrecto")
                return false
            }

            try{
                this.loading=true
                const enc = {
                    id: this.encabezado.id,
                    cliente: this.encabezado.cliente.id,
                    fecha: fechaFact
                }

                const f = await this.api.saveEncabezado(enc)
                if(f.id===undefined){
                    this.msgError(`Falló en Guardar Encabezado con: ${f}`)
                }else{
                    let id = f.id
                    const det = {
                        id: -1,
                        cabecera : id,
                        producto : this.detalle.producto,
                        cantidad : this.detalle.cantidad,
                        precio : this.detalle.precio,
                        descuento: this.detalle.descuento
                    }
                    const d = await this.api.saveDetalle(det)
                    if(d.id===undefined){
                        this.msgError(`Fallo en Guardar Detalle con: ${d}`);
                        this.encabezado.id = f.id
                    }else{
                        this.detalle = {id:-1}
                        this.encabezado = f;
                        this.encabezado.cliente = await this.api.getCliente(this.encabezado.cliente);
                        this.encabezado.fecha = moment(f.fecha, 'YYYY-MM-DD').format('DD/MM/YYYY')
                    }
                }

            }catch(error){
                this.msgError(error)
            }finally{
                this.loading = false
                this.refresh()
            }
        },
        async refresh(){
          try {
            this.loading = true;
            const r = await this.api.getFacturas(this.encabezado.id)
            // this.encabezado = r;
            if (r.detail != undefined) {
              this.msgError(r.detail)
              this.nueva()
            }else{
              this.encabezado = r;
              this.encabezado.cliente = await this.api.getCliente(this.encabezado.cliente);
              this.encabezado.fecha = moment(r.fecha, 'YYYY-MM-DD').format('DD/MM/YYYY')
              this.items = r.detalle; 
            }

          } catch (error) {
            this.msgError(`Error Refrescando con: ${error}`)
          } finally {
            this.loading = false;
          }

        },
        async buscar() {
          const { value: idEnc } = await this.$swal.fire({
          title: 'Digite Número de Factura',
          input: 'text',
          allowOutsideClick: false,
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return 'Debe Digitar Id de Factura'
            }
          }
        })

        if (idEnc) {
          this.encabezado.id = idEnc
          await this.refresh()
          if(this.encabezado.id===undefined){
          this.encabezado =  {
              id: -1,
              cliente: {
                id: -1,
                nombre: ""
              },
              fecha: moment().format("DD/MM/YYYY")
            }
            this.$swal("Factura No Encontrada",idEnc,"error")
          }

        }else{
          this.$swal("Búsqueda Cancelada","","warning")
        }
      },
      async nueva() {
        this.encabezado = {
          id: -1,
          cliente: {
            id: -1,
            nombre: ""
          },
          fecha: moment().format("DD/MM/YYYY")
        }
        this.detalle = {
          id: -1,
          cabecera: -1,
          producto: -1,
          cantidad: 0,
          precio: 0,
          subtotal: 0,
          descuento: 0,
          total: 0
        };
        this.editar = false
        this.items = []
      }, 
      async borrar(item){
          if(await this.mensajeSiNo(`${item.producto_descripcion}?`,"¿Borrar")){
              await this.api.deleteDetalle(item.id)
              this.refresh()
          }
      }

    }
    
}
</script>

<style scoped>

</style>