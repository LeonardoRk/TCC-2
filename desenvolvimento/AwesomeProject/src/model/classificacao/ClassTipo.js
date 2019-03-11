import ClasGeral from "./ClasGeral";

const PARCIAL = "parcial";
const ORDINARIA = "ordinária";

export default class ClassTipo extends ClasGeral{
    
    constructor(parameter) {
        super(parameter);
        this.perguntas = [PARCIAL, ORDINARIA];
    }

}