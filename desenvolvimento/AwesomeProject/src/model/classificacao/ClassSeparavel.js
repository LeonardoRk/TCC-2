import ClasGeral from "./ClasGeral";
import service from '../../Service';

const SEPARAVEL = "separável";
const NAO_SEPARAVEL = "NÃO separável";

export default class ClassSeparavel extends ClasGeral{
    
    constructor(parameter) {
        super(parameter);
        this.props = {'separavel':this.props.dadosGerais["ED_SEPARAVEL"], 
                        'eds':this.props.dadosGerais["QTD_ED"],
                        'classificacao': this.props.classificacao};
        this.perguntas = [SEPARAVEL, NAO_SEPARAVEL];
        console.log("EDS : " + this.props.eds);
        console.log("EDS SEPARAVEIS: " + this.props.separavel);
        this.edsNaoSeparavel = this.encontraEdsNaoSeparaveis(this.props.eds, this.props.separavel);
        console.log("EDS NÃO SEPARAVEIS: " + this.edsNaoSeparavel);
    }

    encontraEdsNaoSeparaveis =  (eds, separaveis) => {

        let eds_nao_separaveis = [];
        let index = null;
        for(let i = 0 ; i < eds.length; i++){
            index = separaveis.indexOf(eds[i]);
            if (index ==  -1) {
                eds_nao_separaveis.push(this.props.eds[i]);
            }
        }
        return eds_nao_separaveis;
    }

    conjuntoDeSeparavel = (arrayCorretoOriginal, arrayErradoOriginal) => {
        let arrayCorreto = service.copiarArrayValor(arrayCorretoOriginal);
        let arrayErrado = service.copiarArrayValor(arrayErradoOriginal);
        let conjuntoDeSeparavel = {
            correto:this.escolheEquacao(arrayCorreto), 
            errado:[
                this.escolheEquacao(arrayErrado),
                this.escolheEquacao(arrayErrado),
                this.escolheEquacao(arrayErrado)
            ]
        };

        return conjuntoDeSeparavel;
    }
}