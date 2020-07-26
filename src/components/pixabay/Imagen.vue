<template>
    <div>
        <b-img :id="img.id" :src="img.previewURL" thumbnail fluid></b-img>
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