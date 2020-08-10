<template>
    <div>
        <v-alert
            v-model="mensaje.mostrar"
            dismissible
            close-icon="mdi-delete"
            color="pink"
            dark
            border="top"
            icon="mdi-shield-lock-outline"
            transition="scale-transition"
            >{{mensaje.texto}}
        </v-alert>
        <v-snackbar
        v-model="mensaje.mostrar"
        shaped
        color="red"
        >
            {{mensaje.texto}}

            <template v-slot:action="{ attrs }">
                <v-btn
                color="white"
                text
                v-bind="attrs"
                @click="mensaje.mostrar = false"
                >
                <v-icon>auto_delete</v-icon>
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
export default {
  name: "Mensaje",
  computed: {
    mensaje() {
      return this.$store.state.mensaje;
    }
  }
};
</script>

<style>
</style>