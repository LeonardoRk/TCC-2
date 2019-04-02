import {Component} from 'react';
import Service from '../../Service';

export default class Resolucao extends Component { 

    constructor(equacoes){
        super();
        this.props = {equacoes:equacoes}
    }

    figuraAleatoria = () => {
        let equacaoAleatoria = Service.itemAleatorio(this.props.equacoes);
        return equacaoAleatoria;
    }

}