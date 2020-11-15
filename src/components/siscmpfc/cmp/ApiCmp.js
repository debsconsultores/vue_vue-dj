
import Api from "../Api"

const nombreEnc = "compras";
const nombreDet = "compras-detalle";

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

    async get(id){
        return await super.get(nombreEnc,id)
    }

    async guardarEncabezado(obj){
        return await super.save(nombreEnc,obj);
    }

    async guardarDetalle(obj){
        return await super.save(nombreDet,obj);
    }

    async borrarDetalle(id){
        return await super.delete(nombreDet,id);
    }
}