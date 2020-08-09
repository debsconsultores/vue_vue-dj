<template>
    <div id="app">
    </div>    
</template>

<script>
export default {
    name:"Documentos",
    components:{

    },
    data: () => {
        return {
            nuevo: {
                id:-1,
                nombre:"Nuevo Documento",
                expira:"",
                alerta1y:true,
                alerta6m: true,
				alerta3m: true,
				alerta1m: true
            },
            item:[]
        }
    }
}
</script>

<style scoped>

</style>