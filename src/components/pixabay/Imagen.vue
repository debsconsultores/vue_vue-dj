<template>
    <div>
        <b-img :id="img.id" :src="img.previewURL" thumbnail fluid rounded
        v-b-popover.hover.top="img.tags" title="Curso Vue + Django: Etiqueta"
        @click="showModal"
        ></b-img>

        <b-modal :ref="img.id" hide-footer size="xl" :title="img.tags">
            <div class="d-block text-center">
                <b-img-lazy top :id="img.id" :src="img.largeImageURL" :alt="img.tags" fluid rounded v-b-popover.focus="img.tags"
        ></b-img-lazy>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    name:"Imagen",
    props:["img"],
    methods:{
        showModal(){
            this.$refs[this.img.id].show();
        }
    }    
}
</script>

<style lang="stylus" scoped>

</style>