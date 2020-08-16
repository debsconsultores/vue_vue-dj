<template>
    <div>
        <v-dialog
            v-model="mostrarModal"
            persistent
            transition="dialog-bottom-transition"
            scrollable
            max-width="600px"
        >
            <v-card tile>
                <v-card-title>
                    <v-container>
                        <v-row>
                            <v-col>
                                Documento
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                ref="nombre"
                                v-model="item.nombre"
                                :rules="[() => !!item.nombre || 'Requerido']"
                                required
                                lable="Nombre Documento"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-menu
                                ref="seleccionarFecha"
                                v-model="seleccionarFecha"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :return-value.sync="fecha"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                                >
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="fecha" prepend-icon="event" readonly v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="fecha" max="2099-12-31" :min="fecha" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="seleccionarFecha = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.seleccionarFecha.save(fecha)">OK</v-btn>
                                </v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-switch v-model="item.alerta1y" label="Alertar > 1 Año "></v-switch>
                            </v-col>
                            <v-col>
                                <v-switch v-model="item.alerta6m" label="Alertar > 6 meses "></v-switch>
                            </v-col>
                            <v-col>
                                <v-switch v-model="item.alerta3m" label="Alertar > 3 meses "></v-switch>
                            </v-col>
                            <v-col>
                                <v-switch v-model="item.alerta1m" label="Alertar > 1 mes "></v-switch>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="hide">
                        <v-icon>backspace</v-icon>
                    </v-btn>
                    <v-btn icon @click="save">
                        <v-icon>{{tipo}}</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name:"Modal",
    props:["item"],
    data: ()=>{
        return {
            seleccionarFecha:false,
            mostrarModal:false,
            fecha: new Date().toISOString().substr(0,10)
        }
    },
    computed:{
        tipo(){
            return this.item.id>0 ? "edit" : "add"
        }
    },
    methods:{
        show(){
            this.mostrarModal = true;
        },
        hide(){
            this.mostrarModal = false;
        },
        insert(doc){
            try{
                this.$store.commit("mostrarLoading","Insertando");
                this.$store.commit("insetarDoc",doc);
            }catch(error){
                console.error(error);
            }finally{
                this.$store.commit("ocultarLoading");
            }
        },
        update(doc){
            try{
                this.$store.commit("mostrarLoading","Insertando");
                this.$store.commit("actualizarDoc",doc);
            }catch(error){
                console.error(error);
            }finally{
                this.$store.commit("ocultarLoading");
            }
        },
        save(){
            const doc = {
                id: this.item.id,
                nombre: this.item.nombre,
                expira: this.fecha,
                alerta1y: this.item.alerta1y,
                alerta6m: this.item.alerta6m,
                alerta3m: this.item.alerta3m,
                alerta1m: this.item.alerta1m
            }
            if(this.item.nombre.length<=3){
                this.$store.commit("mensaje","Nombre es Requerido");
                return false;
            }
            if(this.item.id===-1){
                this.insert(doc)
            }else{
                this.update(doc)
            }
            this.hide();
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>