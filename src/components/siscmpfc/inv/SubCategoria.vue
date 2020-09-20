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
                <v-toolbar-title>Sub Categorías</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar"></v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="warning" dark class="mb-2" @click="iniciar">
                  <v-icon>cached</v-icon>
                </v-btn>

                <v-dialog v-model="dialog" max-width="100%">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                      <v-icon>add_box</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="2">
                            <v-text-field v-model="editedItem.id" label="ID" disabled></v-text-field>
                          </v-col>
                          <v-col cols="5">
                            <v-autocomplete
                            v-model = "editedItem.categoria"
                            :items="categorias"
                            label="Categorías"
                            item-text="descripcion"
                            item-value="id"
                            return-object
                            >
                            </v-autocomplete>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field v-model="editedItem.descripcion" label="Descripción"></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                      <v-btn color="pink accent-3" text @click="save">Guardar</v-btn>
                    </v-card-actions>
                  </v-card>
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
import { ApiInv } from "./ApiInv";

export default {
  name: "Categoria",
  data() {
    return {
      items: [],
      api: new ApiInv(),
      loading: false,
      search: "",
      headers: [
        { text: "ID", value: "id" },
        {
          text: "Categoría",
          align: "start",
          sortable: true,
          value: "cat_descripcion",
        },
        {
          text: "Descripción",
          align: "start",
          sortable: true,
          value: "descripcion",
        },
        {text:'Acciones',value:'actions',sortable:false}
      ],
      dialog:false,
      editedIdex:-1,
      editedItem:{
          id:-1,
          categoria:{id:-1,descripcion:""},
          descripcion:""
      },
      defaultItem:{
          id:-1,
          categoria:{id:-1,descripcion:""},
          descripcion:""
      },
      categorias:[]

    };
  },
  computed:{
      formTitle(){
          return (this.editedIdex === -1 ? "Nueva": "Editar") + " Sub Categoría"
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
        let r = await this.api.getSubCategorias();
        this.items = r;

        this.categorias = await this.api.getCategorias()
      } catch (error) {
        alert(error);
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
       const cp = this.editedItem
       const cat = cp["categoria"]
       let idCat = null

       if(cat["id"]!==undefined){
         idCat = cat["id"]
       }else{
         idCat = cat
       }

        // const obj = this.editedItem
        const obj = {
          id: cp["id"],
          categoria: idCat,
          descripcion: cp["descripcion"]
        }

        try {
            this.loading = true
            await this.api.saveSubCategoria(obj)
            this.close()
            this.iniciar()
        } catch (error) {
            alert(error)
        } finally{
            this.loading = false
        }
    },
    async deleteItem(item){
        if(confirm('¿Borrar Sub Categoría?'))
        {
            await this.api.delSubCategoria(item.id)
            this.iniciar()
        }
    }
  },
  created() {
    this.iniciar();
  },
};
</script>

<style scoped>
</style>