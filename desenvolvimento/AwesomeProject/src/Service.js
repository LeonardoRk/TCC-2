class Service {
    itemAleatorio(array) {
        if(array.length >= 1){
            let numeroAleatorioQuebrado = Math.random() * array.length;
            let numeroAleatorioArredondado = Math.floor(numeroAleatorioQuebrado);
            return array[numeroAleatorioArredondado];
        }else{
            return null;            
        }
    }

    copiarArrayValor(array){
        if(array.length >= 1){
            let novoArray = [];
            for(let i = 0 ; i < array.length; i++){
                novoArray[i] = array[i];
            }
            return novoArray;
        }else{
            return [];            
        }
    }
}

const service = new Service();
export default service;