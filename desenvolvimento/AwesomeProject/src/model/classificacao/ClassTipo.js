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

    
    conjuntoOrdinaria(){
        let parciaisRestantes = service.copiarArrayValor(this.props.parciais);
        let ordinarias = service.copiarArrayValor(this.props.ordinarias);
        let conjuntoOrdinaria = {
            correto:this.escolheEquacao(ordinarias), 
            errado:[
                this.escolheEquacao(parciaisRestantes),
                this.escolheEquacao(parciaisRestantes),
                this.escolheEquacao(parciaisRestantes)
            ]
        };

        return conjuntoOrdinaria;
    }

    conjuntoParcial(){
        let ordinariasRestantes = service.copiarArrayValor(this.props.ordinarias);
        let parciais = service.copiarArrayValor(this.props.parciais);
        let conjuntoParcial = {
            correto:this.escolheEquacao(parciais), 
            errado:[
                this.escolheEquacao(ordinariasRestantes),
                this.escolheEquacao(ordinariasRestantes),
                this.escolheEquacao(ordinariasRestantes)
            ]
        };
       
        return conjuntoParcial;
    }

}