import ClasGeral from "./ClasGeral";
import service from "../../Service";

const ORDEM_1 = "de ordem 1";
const ORDEM_2 = "de ordem 2";
const ORDEM_3 = "de ordem 3";
const ORDEM_SUP = "de ordem superior";

export default class ClassOrdem extends ClasGeral{
    
    constructor(parameter) {
        super(parameter);
        this.props = {'ordem1':this.props.dadosGerais["ED_ORDEM_1"], 
                        'ordem2':this.props.dadosGerais["ED_ORDEM_2"],
                        'ordem3':this.props.dadosGerais["ED_ORDEM_3"],
                        'ordemSuperior':this.props.dadosGerais["ED_ORDEM_SUP"],
                        'classificacao': this.props.classificacao};
        this.perguntas = [ORDEM_1, ORDEM_2, ORDEM_3, ORDEM_SUP];
        console.log("imagens ordem 1: " + this.props.ordem1);
        console.log("imagens ordem 2: " + this.props.ordem2);
        console.log("imagens ordem 3: " + this.props.ordem3);
        console.log("imagens ordem superior: " + this.props.ordemSuperior);
    }

    conjuntoDeOrdens(arrayCorretoOriginal, arrayErrado1, arrayErrado2, arrayErrado3){
        let temporario = arrayErrado1.concat(arrayErrado2);
        let equacoesRestantesOriginal = temporario.concat(arrayErrado3);
        let equacoesRestantes = service.copiarArrayValor(equacoesRestantesOriginal);
        let arrayCorreto = service.copiarArrayValor(arrayCorretoOriginal);
        
        let conjuntoOrdens = {
            correto:this.escolheEquacao(arrayCorreto), 
            errado:[
                this.escolheEquacao(equacoesRestantes),
                this.escolheEquacao(equacoesRestantes),
                this.escolheEquacao(equacoesRestantes)
            ]
        };

        return conjuntoOrdens;
    }

}