class Service {
    itemAleatorio(array) {
        console.log("O array: " + array);
        if(array.length >= 1){
            let numeroAleatorioQuebrado = Math.random() * array.length;
            let numeroAleatorioArredondado = Math.floor(numeroAleatorioQuebrado);
            console.log("Numero aleatorio: " + numeroAleatorioArredondado);
            return array[numeroAleatorioArredondado];
        }else{
            return null;            
        }
    }
}

const service = new Service();
export default service;