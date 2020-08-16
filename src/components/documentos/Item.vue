<template>
    <div>
        <v-list-item ripple>
            <v-btn @click="borrarDocumento" text icon color="red lighten-2">
                <v-icon>delete_forever</v-icon>
            </v-btn>
            <v-btn text icon color="green lighten-2">
                <v-icon>edit</v-icon>
            </v-btn>
            <v-list-item-content>
                <v-list-item-title class="text--primary">{{ item.nombre }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.expira }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{faltan(item.expira)}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
                <v-list-item-action-text>{{ item.id }}</v-list-item-action-text>
                <v-icon v-if="!expirado(item.expira)" color="green lighten-1">done_outline</v-icon>
                <v-icon v-else color="red lighten-1">warning</v-icon>
            </v-list-item-action>
        </v-list-item>
        <v-divider :key="`divider-${item.id}`"></v-divider>
    </div>
</template>
<script>
import moment from "moment";

export default {
    name:"Item",
    components:{

    },
    props:["item","items"],
    methods:{
        borrarDocumento(){
            let id = this.item.id;
            try{
                this.$store.commit("mostrarLoading","Cargando Item");
                this.$store.commit("borrarDoc",{"id":id});
            }catch(error){
                console.error(error);
            }finally{
                this.$store.commit("ocultarLoading");
            }
        },
        expirado(f){
            return Date.parse(f)<= Date.now() ? true: false;
        },
        faltan(f){
            let vence = moment(f);
            const hoy = moment(Date.now());
            const annios = vence.diff(hoy,"year");
            hoy.add(annios,"years");
            const meses = vence.diff(hoy, "months");
            hoy.add(meses,"months");
            const dias = vence.diff(hoy, "days");
            hoy.add(dias,"days");
            const rs = annios + " años " + meses + " meses " + dias + " días";
            return this.expirado(f)
                ? "Expiró hace " + rs.replace(/-/g, "") 
                : "Faltan : " + rs;
            
        }
    }
}
</script>

<style lang="stylus">

</style>