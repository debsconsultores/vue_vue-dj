export class ApiAuth{
    constructor(){
        this.SERVER_URL = process.env.VUE_APP_SERVER_URL
        this.TOKEN_URL = this.SERVER_URL + 'token/'
        this.REFRESH_URL = this.TOKEN_URL + 'refresh/'
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
    async getToken(){
        let access = localStorage.getItem("access")
        const REFRESH = localStorage.getItem("refresh")
        let token = ""
        if(this.tokenExpired(access)){
            token =   await this.refreshToken(REFRESH)  
            if(token==null){
                localStorage.removeItem("access")
                localStorage.removeItem("refresh")
                access = null
            }else{
                access = token.access
                localStorage.setItem("access",access)
            }
        }
        
        if(access==null || REFRESH==null){
            window.location.href="login"
        }
        token = {access:access,refresh:REFRESH}
        return token
    }

    decodeToken = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]))
        } catch (error) {
            return null
        }
    }

    tokenExpired(token){
        token = this.decodeToken(token)
        console.log(token,"decodificado")
        let expired = false
        if(token!=null){
            var current_time = Date.now() /1000
            if(token.exp < current_time){
                expired=true
            }
        }else{
            expired=true
        }
        console.log(expired,"expired")
        return expired
    }

    async refreshToken(refresh){
        const data = {refresh:refresh}

        let token = null
        try {
			
          const r = await fetch(this.REFRESH_URL,
          {
              method:"POST",
              body:JSON.stringify(data),
              mode:"cors",
              headers:{
              'Content-Type': 'application/json'
              }
          })
          token = await r.json()
        } catch (error) {
          console.log(error.toString())
          token = null
        }
        return token; 
    }
}
