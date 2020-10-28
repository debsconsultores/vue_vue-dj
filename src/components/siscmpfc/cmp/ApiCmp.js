
import Api from "../Api"

export class ApiCmp extends Api{
    constructor(){
        super()
    }

    async getProveedores(id=-1){
        return await super.get("proveedor",id)
    }

    async saveProveedor(obj){
        return await super.save("proveedor",obj)
    }

    async delProveedor(id){
        return await super.delete("proveedor",id)
    }
}