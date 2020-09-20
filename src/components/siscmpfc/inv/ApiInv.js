import Api from "../Api"

export class ApiInv extends Api{
    constructor(){
        super()
    }

    async getCategorias(id=-1){
        return await super.get("categoria",id)
    }

    async saveCategoria(obj){
        return await super.save("categoria",obj)
    }

    async delCategoria(id){
        return await super.delete("categoria",id)
    }
}