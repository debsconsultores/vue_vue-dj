import api from "./axios";

const API_KEY=process.env.VUE_APP_KEY;

class ServicioAPI
{
    async getImagenes(data,pg=1){
        const encode = encodeURIComponent(data);
        const cadena = `?key=${API_KEY}&q=${encode}&lang=es&page=${pg}`;
        const r = await api.get(cadena)
        console.log(r);
        return r.data;
    }
}

export default new ServicioAPI();