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
                <v-toolbar-title>Productos</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar"></v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="warning" dark class="mb-2" @click="iniciar">
                  <v-icon>cached</v-icon>
                </v-btn>

                <v-dialog v-model="dialog" max-width="100%" dense persistent>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"><v-icon>add_box</v-icon></v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="2" >
                          <v-text-field v-model="editedItem.id" label="ID" disabled="" ></v-text-field>
                        </v-col>
                        <v-col cols="5">
                          <v-text-field v-model="editedItem.codigo" label="Código"></v-text-field>
                        </v-col>
                        <v-col cols="5">
                          <v-text-field v-model="editedItem.descripcion" label="Descripción"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-autocomplete
                            v-model="editedItem.subcategoria"
                            :items="subcategorias"
                            label="Sub Categorías"
                            item-text="descripcion"
                            item-value="id"
                            return-object
                          ></v-autocomplete>
                        </v-col>
                        <v-col>
                          <v-text-field v-model="editedItem.existencia" label="Existencia" disabled></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field v-model="editedItem.precio" label="Precio"></v-text-field>
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
          { text: 'ID', value: 'id' },
          {
          text: 'Código',
          align: 'start',
          sortable: true,
          value: 'codigo',
        },
          {
          text: 'Descripción',
          align: 'start',
          sortable: true,
          value: 'descripcion',
        },
        { text: 'Existencia', value: 'existencia', sortable: false },
        { text: 'Precio', value: 'precio', sortable: false },
        { text: 'Sub Categoría', value: 'scat_descripcion', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
        ],
      dialog:false,
      editedIdex:-1,
      editedItem: {
        id:-1,
        codigo:"",
        descripcion: "",
        existencia:0,
        precio:0,
        subcategoria:{"id":-1,"descripcion":""}
      },
      defaultItem: {
        id:-1,
        codigo:"",
        descripcion: "",
        existencia:0,
        precio:0,
        subcategoria:{"id":-1,"descripcion":""}
      },
      subcategorias:[]

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
        let r = await this.api.getProductos();
        this.items = r;

        this.subcategorias = await this.api.getSubCategorias()
      } catch (error) {
        this.$swal("Error",error.toString())
        // alert(error)
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
       const cp = this.editedItem;
      
      const cat = cp["subcategoria"];
      
      let idCat = null;
      if(cat["id"]!==undefined){
        idCat = cat["id"]
      }
      else{
        idCat = cat;
      }
      // console.log(cat);
      const obj = {
        "id":cp["id"],
        "codigo":cp["codigo"],
        "descripcion":cp["descripcion"],
        "existencia":cp["existencia"],
        precio:cp["precio"],
        "subcategoria": idCat,
        "subcategoria_id": idCat,
      }

        try {
            this.loading = true
            await this.api.saveProducto(obj)
            this.close()
            this.iniciar()
        } catch (error) {
            alert(error)
        } finally{
            this.loading = false
        }
    },
    async deleteItem(item){
        // if(confirm('¿Borrar Sub Categoría?'))
        // {
        //     await this.api.delProducto(item.id)
        //     this.iniciar()
        // }
        this.$swal({
          title: '¿Está Seguro?',
          html: `Borrar Producto <br> <b>${item.descripcion} </b>`,
          type: 'warning',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Si, Borrarlo!',
          cancelButtonText: 'No, Mantenerlo!',
          showCloseButton: true,
          showLoaderOnConfirm: true
        }).then( async (result) => {
          if(result.value){
            await this.api.delProducto(item.id)
            this.iniciar()
            this.$swal("Borrado","Se borró satisfactoriamente el producto", "success")
          } else {
            this.$swal("Cancelado","Producto no fue borrado", "info")
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