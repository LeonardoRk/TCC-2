import ClasGeral from "./ClasGeral";
import service from '../../Service';


const HOMOGENEA = "homogênea";
const NAO_HOMOGENEA = "NÃO homogênea";

export default class ClassHomog extends ClasGeral{
    
    constructor(parameter) {
        super(parameter);
        this.props = {'homogenea':this.props.dadosGerais["ED_HOMOGENEA"], 
                        'eds':this.props.dadosGerais["QTD_ED"],
                        'classificacao': this.props.classificacao};
        this.perguntas = [HOMOGENEA, NAO_HOMOGENEA];
        console.log("EDS : " + this.props.eds);
        console.log("EDS HOMOGENEAS: " + this.props.homogenea);
        this.edsNaoHomogena = this.encontraEdsNaoHomogeneas(this.props.eds, this.props.homogenea);
        console.log("EDS NÃO HOMOGENEAS: " + this.edsNaoHomogena);
    } 

    encontraEdsNaoHomogeneas =  (eds, homogeneas) => {

        let eds_nao_homogenea = [];
        let index = null;
        for(let i = 0 ; i < eds.length; i++){
            index = homogeneas.indexOf(eds[i]);
            if (index ==  -1) {
                eds_nao_homogenea.push(this.props.eds[i]);
            }
        }
        return eds_nao_homogenea;
    }

    conjuntoDeHomogeneidade = (arrayCorretoOriginal, arrayErradoOriginal) => {
        let arrayCorreto = service.copiarArrayValor(arrayCorretoOriginal);
        let arrayErrado = service.copiarArrayValor(arrayErradoOriginal);
        let conjuntoDeHomogeneidade = {
            correto:this.escolheEquacao(arrayCorreto), 
            errado:[
                this.escolheEquacao(arrayErrado),
                this.escolheEquacao(arrayErrado),
                this.escolheEquacao(arrayErrado)
            ]
        };

        return conjuntoDeHomogeneidade;
    }
    
}