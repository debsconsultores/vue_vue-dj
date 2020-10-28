<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <v-data-table
            dense
            :headers="headers"
            :items="items"
            :search="search"
            class="elevation-1"
            :loading="loading"
            loading-text="Cargando..."
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Proveedor</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar"></v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="warning" dark class="mb-2" @click="iniciar">
                  <v-icon>cached</v-icon>
                </v-btn>

                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                      <v-icon>add_box</v-icon>
                    </v-btn>
                  </template>
                  <v-form ref="form" v-model="formValido" lazy-validation>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="2" sm="2" md="2">
                            <v-text-field v-model="editedItem.id" label="ID" disabled></v-text-field>
                          </v-col>
                          <v-col cols="10" sm="10" md="10">
                            <v-text-field v-model="editedItem.nombre" :rules="textRules" label="Nombre"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                              <v-text-field v-model="editedItem.telefono" label="Teléfono"></v-text-field>
                            </v-col>
                            <v-col>
                              <v-text-field
                                v-model="editedItem.email"
                                :rules="emailRules"
                                label="E-Mail"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                      <v-btn color="pink accent-3" :disabled="!formValido" text @click="save">Guardar</v-btn>
                    </v-card-actions>
                  </v-card>
                  </v-form>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon color="danger" small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="iniciar">Reiniciar</v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { ApiCmp } from "./ApiCmp";

export default {
  name: "Proveedores",
  data() {
    return {
      items: [],
      api: new ApiCmp(),
      loading: false,
      search: "",
      headers: [
        { text: "ID", value: "id" },
        {
          text: "Nombre",
          align: "start",
          sortable: true,
          value: "nombre",
        },
        {
          text: "Teléfono",
          align: "start",
          sortable: true,
          value: "telefono"
        },
        { text: "E-Mail", value: "email", sortable: false },
        {text:'Acciones',value:'actions',sortable:false}
      ],
      dialog:false,
      editedIdex:-1,
      editedItem:{
          id:-1,
          nombre:"",
          telefono:"",
          email:""
      },
      defaultItem:{
          id:-1,
          nombre:"",
          telefono:"",
          email:""
      },
      emailRules: [
            v => !!v || "E-mail is requerido",
            v => /.+@.+/.test(v) || "E-mail debe ser válido"
        ],
        textRules:[
            v => !!v || "Requerido"
        ],
        formValido:true
    };
  },
  computed:{
      formTitle(){
          return (this.editedIdex === -1 ? "Nuevo": "Editar") + " Proveedor"
      }
  },
  watch:{
      dialog(val){
          val || this.close()
      }
  },
  methods: {
    async iniciar() {
      try {
        this.loading = true;
        let r = await this.api.getProveedores();
        this.items = r;
      } catch (error) {
        this.$swal({
          title: 'Error!',
          text: error.toString(),
          icon: 'error'
        })
      } finally {
        this.loading = false;
      }
    },
    close(){
        this.dialog = false
        this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem);
            this.editedIndex = -1;
        });
    },
    editItem(item){
        this.editedIdex = this.items.indexOf(item)
        this.editedItem = Object.assign({},item)
        this.dialog = true
    },
    async save(){
        const obj = this.editedItem

        if(obj.nombre.length<=3){
            this.$swal({
              title: 'Error!',
              text: 'Nombre Proveedor debe tener al menos 4 caracteres',
              icon: 'error'
            })
            return false;
        }

        try {
            this.loading = true
            await this.api.saveProveedor(obj)
            this.close()
            this.iniciar()
            this.$swal({
              // title: 'Error!',
              text: 'Guardado Satisfactoriamente',
              icon: 'success'
            })
        } catch (error) {
            this.$swal({
              title: 'Error!',
              text: error.toString(),
              icon: 'error'
            })
        } finally{
            this.loading = false
        }
    },
    async deleteItem(item){
         this.$swal({
          title: '¿Está Seguro?',
          html: `Borrar Proveedor <br> <b>${item.name} </b>`,
          type: 'warning',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Si, Borrarlo!',
          cancelButtonText: 'No, Mantenerlo!',
          showCloseButton: true,
          showLoaderOnConfirm: true
        }).then( async (result) =>  {
          if(result.value) {
            await this.api.delProveedor(item.id)
            this.iniciar()
            this.$swal('Borrado', 'Se borró satisfactoriamente el proveedor', 'success')
          } else {
            this.$swal('Cancelado', 'Proveedor no fue borrado', 'info')
          }
        })
    }
  },
  created() {
    this.iniciar();
  },
};
</script>

<style scoped>
</style>