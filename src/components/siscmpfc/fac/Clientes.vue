<template>
    
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
        }
    }
}
</script>

<style>

</style>