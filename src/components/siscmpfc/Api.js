import {ApiAuth} from "../login/ApiAuth"
const apiAuth=new ApiAuth()

export default class Api{
    constructor(){
        this.SERVER_URL = 'http://127.0.0.1:8000/rest/v1/'
        this.TOKEN_URL = this.SERVER_URL + 'token/'
        this.USUARIO = 'debs'
        this.PASSWROD = '1234567.'
        this.credenciales = {username:this.USUARIO,password:this.PASSWROD}
    }

    async getToken(){
        // const r = await fetch(this.TOKEN_URL,
        //   {
        //     method:"POST",
        //     body:JSON.stringify(this.credenciales),
        //     mode:"cors",
        //     headers:{
        //       'Content-Type': 'application/json'
        //     }
        //   }
        // )
        // const token = await r.json()
        const token = apiAuth.getToken()
        console.log(token,"guardado")
        return token;
      }

      async get(nombre,id=-1) {

        const token = await this.getToken();

        let url = this.SERVER_URL + nombre +"/";
        if (id !== -1) {
            url += id + "/"
        }

        const res = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token.access,
            }
        });
        const items = await res.json();
        
        if(items.results===undefined){
          return items
        }
        return items.results;
    }

    async save(nombre,obj){
        const token = await this.getToken();
    
        let url = this.SERVER_URL + nombre +"/";
        let method =  "POST"
  
        if(obj.id!==-1){
          method = "PUT";
          url += obj.id + "/";
        }
  
        // console.log(obj,"Esto se pasa en save()")
        let r = await fetch(url, {
          method: method, 
          body: JSON.stringify(obj), 
          headers:{
            'Content-Type': 'application/json',
            "Authorization": "Bearer "+ token.access,
          }
        })
        if (!r.ok){
          return r.statusText;
        }
        const data = await r.json();
        return data;
      }

      async delete(nombre,id){
        const token = await this.getToken();
    
        let url = this.SERVER_URL + nombre +"/" + id + "/";
        // console.log(url,"url de borrar");
    
        fetch(url, {
          method: 'DELETE', 
          headers:{
            'Content-Type': 'application/json',
            "Authorization": "Bearer "+token.access,
          }
        })
        .catch(error => console.error('Error:', error))
      }
}