import ClasGeral from "./ClasGeral";
import service from '../../Service';

const PARCIAL = "parcial";
const ORDINARIA = "ordinaria";

export default class ClassTipo extends ClasGeral{
    
    constructor(parameter) {
        super(parameter);
        this.props = {'ordinarias':this.props.dadosGerais["ED_ORDINARIA"], 
                        'parciais':this.props.dadosGerais["ED_PARCIAL"],
                        'classificacao': this.props.classificacao};
        this.perguntas = [PARCIAL, ORDINARIA];
        console.log("imagens ordinarias: " + this.props.ordinarias);
        console.log("imagens parciais: " + this.props.parciais);
    }

    escolheOrdinaria(ordinariasRestantes){
        let value = service.itemAleatorio(ordinariasRestantes);
        let index = ordinariasRestantes.indexOf(value);
 
        if (index > -1) {
            ordinariasRestantes.splice(index, 1);
        }
        return value;
    }

    escolheParcial(parciaisRestantes){
        console.log(parciaisRestantes);
        let value = service.itemAleatorio(parciaisRestantes);
        let index = parciaisRestantes.indexOf(value);

        if (index > -1) {
            parciaisRestantes.splice(index, 1);
        }
        return value;
    }

    conjuntoOrdinaria(){
        let parciaisRestantes = service.copiarArrayValor(this.props.parciais);
        
        let conjuntoOrdinaria = {
            correto:this.escolheOrdinaria(this.props.ordinarias), 
            errado:[
                this.escolheParcial(parciaisRestantes),
                this.escolheParcial(parciaisRestantes),
                this.escolheParcial(parciaisRestantes)
            ]
        };

        return conjuntoOrdinaria;
    }

    conjuntoParcial(){
        let ordinariasRestantes = service.copiarArrayValor(this.props.ordinarias);
       
        let conjuntoParcial = {
            correto:this.escolheParcial(this.props.parciais), 
            errado:[
                this.escolheOrdinaria(ordinariasRestantes),
                this.escolheOrdinaria(ordinariasRestantes),
                this.escolheOrdinaria(ordinariasRestantes)
            ]
        };
       
        return conjuntoParcial;
    }

}