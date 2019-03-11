import ClasGeral from "./ClasGeral";

const HOMOGENEA = "homogênea";
const NAO_HOMOGENEA = "NÃO homogênea";

export default class ClassHomog extends ClasGeral{
    
    constructor(parameter) {
        super(parameter);
        this.perguntas = [HOMOGENEA, NAO_HOMOGENEA];
    }
}