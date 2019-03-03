const fs = require('fs');
var fileName = "./seed.txt";
var lines = [];
fs.readFile(fileName, (err, data) => { 
	if (err) throw err; 
    lines = data.toString().split('\n');
	start(lines);
});

const start = async function pegaOutput(lines){
	console.log("Qtd de equações:" + lines.length + "\n");

	var equacao = [];
	var nmr_equacao = 1;
	var dados_salvos_com_sucesso = 0;
	for(i = 0; i < lines.length; i++){
		try{
			console.log("a linha: " + lines[i]);
			output = await waApi.getFull(lines[i]);
		}catch(error){
			throw console.error(error);
		}

		equacao = pegaDados(output);
		if(Object.keys(equacao).length >= 1){
			console.log(equacao);
			console.log("\n");
			var infos_prontas = trataEquacao(equacao);
			dados_salvos_com_sucesso = await salvaDados(equacao, infos_prontas, nmr_equacao);
			nmr_equacao++;
			equacao = [];
		}else{
			throw console.log("equações não retornou nada");
		}
	}

}

podRestante = function(idPodAtual, traducaoPod, podsRestantes){
	var existe = false;
	var posicaoARemover = -1;
	
	if(idPodAtual != undefined){
		for(var i = 0 ; i < Object.keys(podsRestantes).length; i++){
			if(traducaoPod == podsRestantes[idPodAtual]){
				existe = true;
				delete podsRestantes[idPodAtual];
			}else{
				// nothing to do in here
			}
		}
	}else{
		// nothing to do in here
	}
	return existe;
}

const PODS_DESEJADOS = {"Input":"Pergunta", "ODENames":"Nome da ED", "ExactEquation":"Equação exata" , 
"ODEClassification":"infos", "DifferentialEquationSolution":"Soluções", "SeparableEquation":"ED separável",
				"PartialDerivatives":"Derivadas parciais", "Differential":"Diferencial"};


selecionaSubPodCorreto = function(procurado, subpods, qtdSubpods){
	var temp = {};
	var nomeDaEd = [];
	var solucoes = [];
	var derivadasParciais = [];
	var nomeDesejado = PODS_DESEJADOS[procurado];
	
	for(var j = 0 ; j < qtdSubpods; j++){
		if(procurado == "Input"){
			var src = subpods[j]["img"]["src"];
			var width = subpods[j]["img"]["width"];
			var height = subpods[j]["img"]["height"];
			temp = { [nomeDesejado]: {"source": src, "width": width, "height": height}};
		}else if(procurado == "ODENames"){
			var title = subpods[j]["title"];
			nomeDaEd.push(title);
		}else if(procurado == "ExactEquation"){
			var title = subpods[j]["title"];
			temp = {[nomeDesejado] : "sim"};
		}else if(procurado == "ODEClassification" ){
			var alt = subpods[j]["img"]["alt"];
			temp = {[nomeDesejado] : alt};
		}else if(procurado == "DifferentialEquationSolution"){
			var src = subpods[j]["img"]["src"];
			var width = subpods[j]["img"]["width"];
			var height = subpods[j]["img"]["height"];
			solucoes.push({"source": src, "width":width, "height":height});
		}else if(procurado == "SeparableEquation"){
			var title = subpods[j]["title"];
			temp = { [nomeDesejado]: "sim"};
		}else if(procurado == "PartialDerivatives"){
			var src = subpods[j]["img"]["src"];
			var width = subpods[j]["img"]["width"];
			var height = subpods[j]["img"]["height"];
			derivadasParciais.push({"source": src, "width":width, "height":height});
		}else if(procurado == "Differential"){
			var src = subpods[j]["img"]["src"];
			var width = subpods[j]["img"]["width"];
			var height = subpods[j]["img"]["height"];
			temp = { [nomeDesejado]: {"source": src, "width": width, "height": height}};
		}else{
			// nothing to do in here
		}
	}

	if(nomeDaEd.length >= 1){
		temp = {[nomeDesejado] : nomeDaEd};
	}

	if(solucoes.length >= 1){
		temp = {[nomeDesejado] : solucoes};
	}

	if(derivadasParciais.length >= 1){
		temp = {[nomeDesejado] : derivadasParciais};
	}

	if(Object.keys(temp).length >= 1){
		return temp;
	}else{
		return undefined;
	}
}

const WolframAlphaAPI = require('./wolfran_api/lib/WolframAlphaAPI.js');
const waApi = WolframAlphaAPI('3GGQAT-98EG4KV6VL');


extraiPods = function(pods){
	var metadado = {};
	if(pods){
		var podsRestantes = Object.assign({}, PODS_DESEJADOS); // PODS_DESEJADOS.slice();
		
		for(var i = 0 ; i < pods.length; i++){
			if(podRestante(pods[i]["id"], podsRestantes[pods[i]["id"]], podsRestantes) && pods[i]["numsubpods"] >= 1){
				var subpods = pods[i]["subpods"];
				var procurado = pods[i]["id"];
	
				var nomeTraduzido = PODS_DESEJADOS[pods[i]["id"]];
			  	var tripla = selecionaSubPodCorreto(procurado, subpods, pods[i]["numsubpods"]);
			  	
				if(tripla != undefined){
					metadado[nomeTraduzido] = tripla[nomeTraduzido];
				}else{
					// pode ser dados que não desejammos captuar
				}		
			}else{
				// Não possui subpods ou POD indesejado
			}
		}
	}else{
		console.log("Não possui pod algum, equação vazia");
	}
	return metadado;
}

function pegaDados(output){
	var dados = output;
	var metadado = {};

	if(dados["success"] == true && dados["error"] == false){
		var pods = dados["pods"];
		metadado = extraiPods(pods);
	}else{
		console.log("Erro para esta query: ");
		console.log(dados);
    }
    return metadado;
}

function verificaSeparavel(equacao){
	var edSeparavel = null;
	if(equacao["ED separável"] != undefined && equacao["ED separável"] == "sim"){
		edSeparavel = true;
	}else if(equacao["Nome da ED"] != undefined){
		for(var i = 0; i < equacao["Nome da ED"].length; i++){
			if(equacao["Nome da ED"][i] == "Separable equation"){
				edSeparavel = true;
			}else{
				// nothing to do in here
			}
		}
		if(edSeparavel == null){
			edSeparavel = false;
		}
	}else{
		edSeparavel = false;
	}
	console.log("ed separavel :" + edSeparavel);
	return edSeparavel;
}

function verificaExata(equacao){
	var edExata = null;
	if(equacao["Equação exata"] != undefined && equacao["Equação exata"] == "sim"){
		edExata = true;
	}else if(equacao["Nome da ED"] != undefined){
		for(var i = 0; i < equacao["Nome da ED"].length; i++){
			if(equacao["Nome da ED"][i] == "Exact equation"){
				edExata = true;
			}else{
				// nothing to do in here
			}
		}
		if(edExata == null){
			edExata = false;
		}
	}else{
		edExata = false;
	}
	console.log("ed exata :" + edExata);
	return edExata;
}

function verificaHomogeneidade(equacao){
	var edHomogenea = null;
	if(equacao["Nome da ED"] != undefined){
		for(var i = 0; i < equacao["Nome da ED"].length; i++){
			if(equacao["Nome da ED"][i] == "Homogeneous equation"){
				edHomogenea = true;
			}else{
				// nothing to do in here
			}
		}
		if(edHomogenea == null){
			edHomogenea = false;
		}
	}else{
		edHomogenea = false;
	}
	console.log("ed homogênea :" + edHomogenea + "\n");
	return edHomogenea;
}

function ehEquacaoDiferencial(equacao){
	var equacaoDiferencial = null;
	if(equacao["infos"] != undefined ){
		if(equacao["infos"].includes("differential equation")){
			equacaoDiferencial = true;
		}else{
			equacaoDiferencial = false;
		}
	}else{
		equacaoDiferencial = null;
	}
	console.log("equação diferencial :" + equacaoDiferencial);
	return equacaoDiferencial;
}

function verificaTipoEd(equacao, equacaoDiferencial){
	var tipoEd = null;
	if(equacaoDiferencial){
		if(equacao["infos"].includes("ordinary")){
			tipoEd = "ordinária";
		}else if(equacao["infos"].includes("partial")){
			tipoEd = "parcial";
		}else{
			// nothing to do in here
		}
	}else{
		// nothing to do in here
	}
	console.log("tipo da ED :" + tipoEd);
	return tipoEd;
}

function verificaLinearidade(equacao, equacaoDiferencial){
	var linearidade = null;
	if(equacaoDiferencial){
		if(equacao["infos"].includes(" linear ")){
			linearidade = "linear";
		}else if(equacao["infos"].includes(" nonlinear ")){
			linearidade = "não-linear";
		}else{
			// nothing to do in here
		}
	}else{
		// nothing to do in here
	}
	console.log("linearidade :" + linearidade );
	return linearidade;
}

function verificaOrdem(equacao, equacaoDiferencial){
	var ordem = null;
	if(equacaoDiferencial){
		if(equacao["infos"].includes("first-order") || equacao["infos"].includes("First-order")){
			ordem = "primeira ordem";
		}else if(equacao["infos"].includes("second-order") || equacao["infos"].includes("Second-order")){
			ordem = "segunda ordem";
		}else if(equacao["infos"].includes("third-order") || equacao["infos"].includes("Third-order")){
			ordem = "terceira ordem";
		}else if(equacao["infos"].includes("higher-order") || equacao["infos"].includes("Higher-order")){
			ordem = "ordem 4 ou superior";
		}else{
			// nothing to do in here
		}
	}else{
		// nothing to do in here
	}
	console.log("ordem :" + ordem);
	return ordem;
}

function trataEquacao(equacao){
	
	var equacaoDiferencial = null;
	equacaoDiferencial = ehEquacaoDiferencial(equacao);

	var tipoEd = null;
	tipoEd = verificaTipoEd(equacao, equacaoDiferencial);
	
	var ordem = null;
	ordem = verificaOrdem(equacao, equacaoDiferencial);

	var linearidade = null;
	linearidade = verificaLinearidade(equacao, equacaoDiferencial);

	var edSeparavel = null;
	edSeparavel = verificaSeparavel(equacao);

	var edExata = null;
	edExata = verificaExata(equacao);

	var edHomogenea = null;
	edHomogenea = verificaHomogeneidade(equacao);

	var infos_pronta = {'ed': equacaoDiferencial, 'tipo_ed': tipoEd, 'ordem': ordem, 'linearidade': linearidade,
						'ed_separavel': edSeparavel, 'ed_exata':edExata, 'ed_homogenea': edHomogenea};
	return infos_pronta;
}

var exec = require('child_process').exec;
downloadImg = function(tipo, url, outputName){
	exec("cd ./" + tipo + "/ && curl -o " + outputName + ".gif '" + url + "'" ,
    	function (error, stdout, stderr) {
	        // console.log('stdout: ' + stdout);
	        // console.log('stderr ' + stderr);
	        if (error !== null) {
	             console.log('exec error: ' + error);
	        }
	    });
};

function salva_img_pergunta(eq_pergunta, nmr_equacao){
	var mapa_img_pergunta = {};
	if(eq_pergunta != undefined){
		mapa_img_pergunta[nmr_equacao] = "sim";
		if(eq_pergunta["source"] != undefined){
			var url = eq_pergunta["source"];
			console.log("Url de download pergunta :" + url);
			downloadImg("pergunta", url, "pergunta" + nmr_equacao);
		}else{
			throw "Equação pergunta não tem src";
		}
	}else{
		mapa_img_pergunta[nmr_equacao] = "não";
	}
	return mapa_img_pergunta;
}

function salva_img_resposta(eq_resposta, nmr_equacao){
	var mapa_img_resposta = {};
	if(eq_resposta != undefined){
		if(eq_resposta.length >= 1 ){
			mapa_img_resposta[nmr_equacao] = "sim";
			mapa_img_resposta["qtd_solucoes"] = eq_resposta.length;
			var letra = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o"];
			for(var i = 0 ; i < eq_resposta.length; i++){
				var url = eq_resposta[i]["source"];
				console.log("Url de download solução :" + url);
				downloadImg("resposta", url, "solução" + nmr_equacao + "_" + letra[i]);
			}
		}else{
			throw "Solução está vazio";
		}
	}else{
		mapa_img_resposta[nmr_equacao] = "não";
	}
	return mapa_img_resposta;
}

function preparaInfos(infos_semi_prontas, mapa_img_pergunta, mapa_img_resposta, nmr_equacao){
	var string = null;
	string = "pergunta:" + mapa_img_pergunta[nmr_equacao] + "\n" +
			 "resposta:" + mapa_img_resposta[nmr_equacao] + " qtd_solucoes:" + mapa_img_resposta["qtd_solucoes"] + "\n" +  
				"ed:"+infos_semi_prontas["ed"] + "\n" +
				"tipo_ed:"+infos_semi_prontas["tipo_ed"] + "\n" +
				"ordem:"+infos_semi_prontas["ordem"] + "\n" +
				"linearidade:"+infos_semi_prontas["linearidade"] + "\n" +
				"ed_separavel:"+infos_semi_prontas["ed_separavel"] + "\n" +
				"ed_exata:"+infos_semi_prontas["ed_exata"] + "\n" +
				"ed_homogenea:"+infos_semi_prontas["ed_homogenea"];
	// console.log(string);
	return string;
}

async function salvaDados(equacao, infos_semi_prontas, nmr_equacao){

	var mapa_img_pergunta = salva_img_pergunta(equacao["Pergunta"], nmr_equacao);

	var mapa_img_resposta = salva_img_resposta(equacao["Soluções"], nmr_equacao);


	const INFO_FOLDER = "./info/";
	const FILE_NAME = "info" + nmr_equacao + ".txt";
	var stringPreparada = preparaInfos(infos_semi_prontas, mapa_img_pergunta, mapa_img_resposta, nmr_equacao);
	var retorno = await fs.writeFileSync(INFO_FOLDER + FILE_NAME, stringPreparada);
	console.log('Foi registrada info ' + nmr_equacao + '!\n\n');
}