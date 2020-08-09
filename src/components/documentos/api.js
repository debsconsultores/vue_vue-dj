const SERVER_URL = 'http://127.0.0.1:8000/rest/v1/'
const DOCS_URL = SERVER_URL + "docs/" 
const TOKEN_URL = SERVER_URL + 'token/'
const USUARIO = "debs"
const PASSWORD = "1234567."
const credenciales = {"username":USUARIO,"password":PASSWORD}


const getToken = async () => {
    const r = await fetch(
        TOKEN_URL, {
            method="POST",
            body=JSON.stringify(credenciales),
            mode:"cors",
            headers:{
                'Content-Type':'application/json'
            }
        }
    )
    const token = await r.json();
    return token;
}