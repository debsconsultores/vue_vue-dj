<template>
    <v-container fill-height fluid class="grey lighten-5">
        <v-row row class="text-xs-center" align="center" justify="center" >
            <v-col cols="12" sm="4">
                <v-card flat>
                    <v-card-title primary-title>
                    <h4>Login</h4>
                    </v-card-title>
                    <v-form>
                    <v-text-field
                        prepend-icon="person"
                        v-model="username"
                        label="Username"
                        ref="username"
                    ></v-text-field>
                    <v-text-field
                        prepend-icon="lock"
                        v-model="password"
                        label="Password"
                        type="password"
                    ></v-text-field>
                    <v-card-actions>
                        <v-btn primary large block @click="login" >Login</v-btn>
                    </v-card-actions>
                    </v-form>
                </v-card>
                <!-- </v-container> -->
            </v-col>
        </v-row>
    </v-container>    
</template>

<script>
import {ApiAuth} from "./ApiAuth"

export default {
    name:"Login",
    data(){
        return{
            username:"",
            password:"",
            api: new ApiAuth()
        }
    },
    mounted(){
        this.$refs.username.focus()
    },
    methods:{
        async login(){
            let username = this.username
            let pass = this.password

            if(username==""){
                this.$swal("Requerido","Usuario Requerido","warning")
                return
            }
            if(pass=="" || pass.length<=3){
                this.$swal("Requerido","Password Requerido o debe ser mayor a tres dígitos","warning")
                return
            }

            let token = await this.api.login(username,pass)
            console.log(token)
            
            if('access' in token){
                localStorage.setItem("access",token.access)
                localStorage.setItem("refresh",token.refresh)

                this.$router.push("/")
                this.$root.$emit("login",username)
            }else if('detail' in token){
                this.msgError(token.detail)
            }else if('error' in token){
                this.msgError(token.error)
            }else{
                this.msgError("Error Inesperado")
            }

            // localStorage.setItem("username",username)
            // this.$router.push("/")
            // this.$root.$emit("login",username)
        }
    }
    
}
</script>

<style scoped>

</style>
