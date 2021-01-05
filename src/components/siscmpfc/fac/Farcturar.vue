<template>
    <div></div>
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
            const c = await this.api.getCliente();
            this.clientes = c;
        }
    }
    
}
</script>

<style scoped>

</style>