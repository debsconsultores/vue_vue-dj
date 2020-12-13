export default{
    methods:{
        mensaje(texto,titulo="",tipo="success"){
            this.$swal({
                title:titulo,
                text:texto,
                icon:tipo,
                allowOutsideClick: false,
                confirmButtonText:"Ok"
            })
        },
        async mensajeSiNo(mensaje,titulo,tipo="question"){
            try{
                let result = await this.$swal({
                    title: titulo,
                    text: mensaje,
                    icon: tipo,
                    showCancelButton: true,
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No',
                    reverseButtons: true
                });
                return result.isConfirmed;
            }catch(e){
                console.error(e);
            }            
        }
    }
}