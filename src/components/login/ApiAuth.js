export class ApiAuth{
    constructor(){
        this.SERVER_URL = process.env.VUE_APP_SERVER_URL
        this.TOKEN_URL = this.SERVER_URL + 'token/'
        this.credenciales = ""
    }

    async login(user,pass){
        this.credenciales = {username:user,password:pass}

        let token = null
        try {
            const r = await fetch(this.TOKEN_URL,
                {
                  method:"POST",
                  body:JSON.stringify(this.credenciales),
                  mode:"cors",
                  headers:{
                    'Content-Type': 'application/json'
                  }
                }
              )
              token = await r.json()    
        } catch (error) {
            token = {error:error.toString()}
        }
        return token;
    }
    getToken(){
        const ACCESS = localStorage.getItem("access")
        const REFRESH = localStorage.getItem("refresh")
        if(ACCESS==null || REFRESH==null){
            window.location.href="login"
        }
        const token = {access:ACCESS,refresh:REFRESH}
        return token
    }
}
