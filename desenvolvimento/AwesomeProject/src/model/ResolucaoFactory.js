import resolucaoModel from "./resolucao/Resolucao";
import DadosGerais from "../../resource/DADOS_GERAIS.json";

const HOMOGENEO = "homogêneo";
const NAO_HOMOGENEO = "não homogêneo";
const EXATA = "exato";
const NA0_EXATA = "não exato";

recuperaValorDadosGerais = (chave) =>{
    if(chave != null && chave != undefined){
        let conteudo = DadosGerais[chave];
        return conteudo;
    }else{
        return null;
    }
}

pegaTodasEd = () =>{
    const CHAVE_TODAS_ED = "QTD_ED";
    let todasEd = DadosGerais[CHAVE_TODAS_ED];
    return todasEd;
}

pegaEdsComResposta = () => {
    const CHAVE_TODAS_RESPOSTAS = "ED_COM_RESPOSTA";
    let edsComResposta = DadosGerais[CHAVE_TODAS_RESPOSTAS];
    return edsComResposta;
}

pegaEdsHomogeneasDeControle = () => {
    const CHAVE_TODAS_HOMOGENEAS = "ED_HOMOGENEA";
    let edsHomogeneas = DadosGerais[CHAVE_TODAS_HOMOGENEAS];
    return edsHomogeneas;
}

pegaEdsExatasDeControle = () => {
    const CHAVE_TODAS_EXATAS = "ED_EXATA";
    let edsExatas = DadosGerais[CHAVE_TODAS_EXATAS];
    return edsExatas;
}

presenteNosDois = (array1, array2) =>{
    const arrayFinal = [];
    array1.forEach(element1 => {
        array2.forEach(element2 => {
            if(element1 == element2){
                arrayFinal.push(element1);
            }
        })
    });
    return arrayFinal;
}

homogeneaPreparada = () =>{
    console.log("click na homogenea");
    let edsComResposta = pegaEdsComResposta();
    let edsHomogeneas = pegaEdsHomogeneasDeControle();
    let equacoes = [];
    equacoes = presenteNosDois(edsComResposta, edsHomogeneas);
    console.log("equacoes homogeneas com respostas: " + equacoes);
    return new resolucaoModel(equacoes);
}

encontraEdsNaoHomogeneas =  (eds, homogeneas) => {

    let eds_nao_homogenea = [];
    let index = null;
    for(let i = 0 ; i < eds.length; i++){
        index = homogeneas.indexOf(eds[i]);
        if (index ==  -1) {
            eds_nao_homogenea.push(eds[i]);
        }
    }
    return eds_nao_homogenea;
}

naoHomogeneaPreparada = () => {
    console.log("click na NAO homogenea");
    let todasEds = pegaTodasEd();
    let homogeneas = pegaEdsHomogeneasDeControle();
    let equacoes = [];
    equacoes = encontraEdsNaoHomogeneas(todasEds, homogeneas);
    console.log("equacoes NÃO homogeneas com respostas: " + equacoes);
    return new resolucaoModel(equacoes);
}

exataPreparada = () => {
    console.log("click na EXAATA");
    let edsComResposta = pegaEdsComResposta();
    let edsExatas = pegaEdsExatasDeControle();
    let equacoes = []
    equacoes = presenteNosDois(edsComResposta, edsExatas);
    console.log("equacoes exatas com respostas: " + equacoes);
    return new resolucaoModel(equacoes);
}

encontraEdsNaoExatas =  (eds, exatas) => {
    let eds_nao_exatas = [];
    let index = null;
    for(let i = 0 ; i < eds.length; i++){
        index = exatas.indexOf(eds[i]);
        if (index ==  -1) {
            eds_nao_exatas.push(eds[i]);
        }
    }
    return eds_nao_exatas;
}

naoExataPreparada = () => {
    console.log("click na NAO EXAATA");
    let todasEds = pegaTodasEd();
    let exatas = pegaEdsExatasDeControle();
    let equacoes = [];
    equacoes = encontraEdsNaoExatas(todasEds, exatas);
    console.log("equacoes NÃO exatas com respostas: " + equacoes);
    return new resolucaoModel(equacoes);
}

class resolucaoFactory{
      
    constroiResolucao(nomeFase){
        switch (nomeFase){
            case HOMOGENEO: return homogeneaPreparada(); break;
            case NAO_HOMOGENEO: return naoHomogeneaPreparada(); break;
            case EXATA: return exataPreparada(); break;
            case NA0_EXATA: return naoExataPreparada(); break;
            default: return null;
        }
    }
}

const fabricaResolucao = new resolucaoFactory();
export default fabricaResolucao;