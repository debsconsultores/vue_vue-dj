import Api from "../Api"

const contexto = "cliente";

export class ApiFac extends Api{
    constructor(){
        super()
    }

    async getCliente(id=-1){
        return await super.get(contexto,id)
    }

    async saveCliente(obj){
        return await super.save(contexto,obj)
    }
}