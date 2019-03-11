import ClasGeral from "./ClasGeral";

const LINEAR = "linear";
const NAO_LINEAR = "NÃO linear";

export default class ClassLinearidade extends ClasGeral{
    
    constructor(parameter) {
        super(parameter);
        this.perguntas = [LINEAR, NAO_LINEAR];
    }
}