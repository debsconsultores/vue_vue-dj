import Api from "../Api"

const contexto = "cliente";
const contextoDet = "facturas-detalle"
const contextoEnc = "facturas"

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

    async deleteCliente(id){
        return await super.delete(contexto,id)
    }

    async getFacturas(id){
        return await super.get(contextoEnc,id);
    }

    async saveEncabezado(obj){
        return await super.save(contextoEnc,obj);
    }

    async saveDetalle(obj){
        return await super.save(contextoDet,obj);
    }

    async deleteDetalle(id){
        return await super.delete(contextoDet,id);
    }
    
    async buscarClientePorNombre(texto){
        return await super.get("cliente/by-name",texto)
    }
}