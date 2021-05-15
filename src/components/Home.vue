<template>
    <b-container>
        <b-row>
            <b-col>
                <h1>Bienvenidos al Curso de Vue + Django <small>x Daniel Bojorge</small>{{prueba}}</h1>
                <img src="../assets/Logo-VueDJ.png" alt="" width="100%" height="auto" rounded="circle">
            </b-col>
        </b-row>
        <b-row>
            <b-col v-for="red in redes" :key="red.red" class="text-center">
                <b-link :href="red.url" target="_blank">
                    <b-alert :variant="red.color" show>
                        {{red.red}}
                    </b-alert>
                </b-link>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name:"Home",
    data(){
        return{
            redes:[
                {
                    red:"FB/DEBSConsultores",
                    url:"https://facebook.com/DEBSConsultores",
                    color:"info"
                },
                {
                    red:"TW/DEBSConsultores",
                    url:"https://twitter.com/DEBSConsultores",
                    color:"warning"
                },
                {
                    red:"YT/DEBSDaniel03",
                    url:"https://youtube.com/DEBSDaniel03",
                    color:"danger"
                }
            ],
            prueba: this.$session.get("username")
        }
    }
    
}
</script>

<style lang="stylus" scoped>

</style>