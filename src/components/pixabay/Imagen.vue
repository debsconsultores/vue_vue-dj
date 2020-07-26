<template>
    <div>
        <b-img :id="img.id" :src="img.previewURL" thumbnail fluid rounded
        v-b-popover.hover.top="img.tags" title="Curso Vue + Django: Etiqueta"
        ></b-img>
    </div>
</template>

<script>
export default {
    name:"Imagen",
    props:["img"]    
}
</script>

<style lang="stylus" scoped>

</style>