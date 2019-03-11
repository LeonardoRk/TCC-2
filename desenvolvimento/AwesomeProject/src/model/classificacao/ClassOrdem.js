import ClasGeral from "./ClasGeral";

const ORDEM_1 = "de ordem 1";
const ORDEM_2 = "de ordem 2";
const ORDEM_3 = "de ordem 3";
const ORDEM_SUP = "de ordem superior";

export default class ClassOrdem extends ClasGeral{
    
    constructor(parameter) {
        super(parameter);
        this.perguntas = [ORDEM_1, ORDEM_2, ORDEM_3, ORDEM_SUP];
    }
}