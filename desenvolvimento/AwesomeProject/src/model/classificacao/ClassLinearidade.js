import ClasGeral from "./ClasGeral";
import service from '../../Service';

const LINEAR = "linear";
const NAO_LINEAR = "NÃO linear";

export default class ClassLinearidade extends ClasGeral{
    
    constructor(parameter) {
        super(parameter);
        this.props = {'linear':this.props.dadosGerais["ED_LINEAR"], 
                        'naoLinear':this.props.dadosGerais["ED_NAO_LINEAR"],
                        'classificacao': this.props.classificacao};
        console.log("imagens lineares: " + this.props.linear);
        console.log("imagens NÃO lineares: " + this.props.naoLinear);
        this.perguntas = [LINEAR, NAO_LINEAR];
    }

    conjuntoLinearidade(arrayCorretoOriginal, arrayErradoOriginal) {
        let arrayCorreto = service.copiarArrayValor(arrayCorretoOriginal);
        let arrayErrado = service.copiarArrayValor(arrayErradoOriginal);
        let conjuntoLinearidade = {
            correto:this.escolheEquacao(arrayCorreto), 
            errado:[
                this.escolheEquacao(arrayErrado),
                this.escolheEquacao(arrayErrado),
                this.escolheEquacao(arrayErrado)
            ]
        };

        return conjuntoLinearidade;
    }
}