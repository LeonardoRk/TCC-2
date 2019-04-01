import ClasGeral from "./ClasGeral";
import service from '../../Service';

const EXATA = "exata";
const NAO_EXATA = "NÃO exata";

export default class ClassExata extends ClasGeral{
    
    constructor(parameter) {
        super(parameter);
        this.props = {'exatas':this.props.dadosGerais["ED_EXATA"], 
                        'eds':this.props.dadosGerais["QTD_ED"],
                        'classificacao': this.props.classificacao};
        this.perguntas = [EXATA, NAO_EXATA];
        console.log("EDS : " + this.props.eds);
        console.log("EDS EXATAS: " + this.props.exatas);
        this.naoExatas = this.encontraEdsNaoExatas(this.props.eds, this.props.exatas);
        console.log("EDS NÃO EXATAS: " + this.naoExatas);
    }

    encontraEdsNaoExatas =  (eds, exatas) => {
        let eds_nao_exatas = [];
        let index = null;
        for(let i = 0 ; i < eds.length; i++){
            index = exatas.indexOf(eds[i]);
            if (index ==  -1) {
                eds_nao_exatas.push(this.props.eds[i]);
            }
        }
        return eds_nao_exatas;
    }

    conjuntoDeExatas = (arrayCorretoOriginal, arrayErradoOriginal) => {
        let arrayCorreto = service.copiarArrayValor(arrayCorretoOriginal);
        let arrayErrado = service.copiarArrayValor(arrayErradoOriginal);
        let conjuntoDeExatas = {
            correto:this.escolheEquacao(arrayCorreto), 
            errado:[
                this.escolheEquacao(arrayErrado),
                this.escolheEquacao(arrayErrado),
                this.escolheEquacao(arrayErrado)
            ]
        };

        return conjuntoDeExatas;
    }
}