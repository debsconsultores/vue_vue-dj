<template>
    <div >
        <b-row align-h="center">
        <b-col md="6">
            <b-form-input
            v-model="buscar"
            placeholder="Ingrese Patrón a Buscar"
            @keypress.enter="buscarHijo"
            ></b-form-input>
        </b-col>
        <b-col md="1">
            <b-button variant="danger" @click="buscarHijo">Buscar</b-button>
        </b-col>
        </b-row>
    </div>

</template>

<script>
export default {
    name:"Buscador",
    data(){
        return {
            buscar:""
        }
    },
    methods:{
        buscarHijo(){
            this.$emit("buscarDesdeHijo",this.buscar)
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>