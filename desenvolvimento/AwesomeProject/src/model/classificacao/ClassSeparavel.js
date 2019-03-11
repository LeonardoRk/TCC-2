import ClasGeral from "./ClasGeral";

const SEPARAVEL = "separável";
const NAO_SEPARAVEL = "NÃO separável";

export default class ClassSeparavel extends ClasGeral{
    
    constructor(parameter) {
        super(parameter);
        this.perguntas = [SEPARAVEL, NAO_SEPARAVEL];
    }
}