import ClasGeral from "./ClasGeral";

const EXATA = "exata";
const NAO_EXATA = "NÃO exata";

export default class ClassExata extends ClasGeral{
    
    constructor(parameter) {
        super(parameter);
        this.perguntas = [EXATA, NAO_EXATA];
    }
}