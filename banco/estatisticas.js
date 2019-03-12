var exec = require('child_process').exec;
var fs = require('fs');

console.log("Iniciando estatísticas\n");
mostraArquivosInfo();

function mostraArquivosInfo(){ 
	exec("cd ./info && ls" , async function (error, stdout, stderr) {
		var arquivos = null;
        // console.log(stdout);
        // console.log('stderr ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
        arquivos = stdout.toString().split('\n'); // vem com uma linha a mais
        // console.log(arquivos);

        var fileName = "";
       	var metadados_equacao = {
       		"eds_com_resposta":[],
       		"eds_sem_resposta": [],
   			"eds": [],
   			"eds_ordinarias":[],
   			"eds_parciais":[],
   			"eds_ordem_1":[],
   			"eds_ordem_2":[],
   			"eds_ordem_3":[],
   			"eds_ordem_superior":[],
   			"eds_lineares":[],
   			"eds_nao_lineares":[],
   			"eds_separaveis":[],
   			"eds_exatas":[],
   			"eds_homogêneas":[]
       	};


		var infoFile = "";
		var qtd_total_arquivos = arquivos.length -1;
		var arquivos_validos = 0;
		var numero_info = null;

		for (var i = 0 ; i < qtd_total_arquivos; i++){
			if(arquivos[i] != '' && arquivos[i] != undefined){
				arquivos_validos++;
				fileName = arquivos[i];
				console.log("arquivo lido: " + fileName);
				numero_info = fileName.replace("info", "");
				numero_info = numero_info.replace(".txt", "");
				console.log("numero da info: " + numero_info);
				
				infoFile = fs.readFileSync("./info/" +fileName); 

				metadados_equacao = await preparaMetadados(infoFile, metadados_equacao, numero_info);
			}else{
				console.log("passando pelo último elemento");
			}
		}
		if(qtd_metadados_validados(arquivos_validos, qtd_total_arquivos, metadados_equacao)){
			mostrarEstatisticas(qtd_total_arquivos, metadados_equacao);
			salvarDadosGerais(qtd_total_arquivos, metadados_equacao);
			criarIndexImagensPergunta(qtd_total_arquivos);
		}else{
			console.log("Incompatibilidade de quantidade de arquivos lidos");
		}

    });
};

async function criarIndexImagensPergunta(qtd_total_arquivos){
	const FILE_NAME = "./pergunta/index.js";
	var stringPreparada = preparaDadosIndex(qtd_total_arquivos);
	var retorno = await fs.writeFileSync(FILE_NAME, stringPreparada);
	console.log('\nIndex de perguntas criados com sucesso\n\n');
}

function preparaDadosIndex(qtd_total_arquivos){
	var stringPreparada = "const images = {\n";
	for(var i = 0 ; i < qtd_total_arquivos; i++){
		stringPreparada = stringPreparada + "    " + (i+1) + ": " +"require('./pergunta" + (i+1) + ".gif'),\n";
	}
	stringPreparada = stringPreparada + "};\n\nexport default images;";
	return stringPreparada;
}

async function salvarDadosGerais(qtd_total_arquivos, metadados_equacao){
	const FILE_NAME = "./DADOS_GERAIS.json";
	var stringPreparada = preparaDadosGerais(qtd_total_arquivos, metadados_equacao);
	var retorno = await fs.writeFileSync(FILE_NAME, stringPreparada);
	console.log('\nDADOS GERAIS REGISTRADOS!\n\n');
}

function preparaDadosGerais(qtd_total_arquivos, metadados_equacao){
	var stringPreparada = "";
	stringPreparada = "{QTD_TOTAL:" + qtd_total_arquivos + "," +
					  "QTD_ED:" + "[" +metadados_equacao["eds"]+ "]" + "," +
					  "ED_COM_RESPOSTA:" + "[" +metadados_equacao["eds_com_resposta"]+ "]"  + "," +
					  "ED_SEM_RESPOSTA:" + "[" +metadados_equacao["eds_sem_resposta"]+ "]" + "," +
					  "ED_ORDINARIA:" + "[" +metadados_equacao["eds_ordinarias"]+ "]" + "," +
					  "ED_PARCIAL:" + "[" +metadados_equacao["eds_parciais"]+ "]" + "," +
					  "ED_ORDEM_1:" + "[" +metadados_equacao["eds_ordem_1"]+ "]" + "," +
					  "ED_ORDEM_2:" + "[" +metadados_equacao["eds_ordem_2"]+ "]" + "," +
					  "ED_ORDEM_3:" + "[" +metadados_equacao["eds_ordem_3"]+ "]" + "," +
					  "ED_ORDEM_SUP:" + "[" +metadados_equacao["eds_ordem_superior"]+ "]" + "," +
					  "ED_LINEAR:" + "[" +metadados_equacao["eds_lineares"]+ "]" + "," +
					  "ED_NAO_LINEAR:" + "[" +metadados_equacao["eds_nao_lineares"]+ "]" + "," +
					  "ED_SEPARAVEL:" + "[" +metadados_equacao["eds_separaveis"]+ "]" + "," +
					  "ED_EXATA:" + "[" +metadados_equacao["eds_exatas"]+ "]" + "," +
					  "ED_HOMOGENEA:" + "[" +metadados_equacao["eds_homogêneas"]+ "]}";

	return stringPreparada;
}

function mostrarEstatisticas(qtd_total_arquivos, metadados_equacao){
	console.log("Quantidade total de arquivos lidos: " + qtd_total_arquivos);
	console.log("Quantidade de ED COM resposta: " + metadados_equacao["eds_com_resposta"].length
		+ " => [" + metadados_equacao["eds_com_resposta"] + "]");

	console.log("Quantidade de ED SEM resposta: " + metadados_equacao["eds_sem_resposta"].length
		+ " => [" + metadados_equacao["eds_sem_resposta"] + "]");

	console.log("Quantidade de EDs: " + metadados_equacao["eds"].length
		+ " => [" + metadados_equacao["eds"] + "]");

	console.log("Quantidade de ED ordinaria: " + metadados_equacao["eds_ordinarias"].length
		+ " => [" + metadados_equacao["eds_ordinarias"] + "]");

	console.log("Quantidade de ED parcial: " + metadados_equacao["eds_parciais"].length
		+ " => [" + metadados_equacao["eds_parciais"] + "]");

	console.log("Quantidade de ED ordem 1: " + metadados_equacao["eds_ordem_1"].length
		+ " => [" + metadados_equacao["eds_ordem_1"] + "]");

	console.log("Quantidade de ED ordem 2: " + metadados_equacao["eds_ordem_2"].length
		+ " => [" + metadados_equacao["eds_ordem_2"] + "]");

	console.log("Quantidade de ED ordem 3: " + metadados_equacao["eds_ordem_3"].length
		+ " => [" + metadados_equacao["eds_ordem_3"] + "]");

	console.log("Quantidade de ED ordem sup.: " + metadados_equacao["eds_ordem_superior"].length
		+ " => [" + metadados_equacao["eds_ordem_superior"] + "]");

	console.log("Quantidade de ED linear: " + metadados_equacao["eds_lineares"].length
		+ " => [" + metadados_equacao["eds_lineares"] + "]");

	console.log("Quantidade de ED não linear: " + metadados_equacao["eds_nao_lineares"].length
		+ " => [" + metadados_equacao["eds_nao_lineares"] + "]");

	console.log("Quantidade de ED separável: " + metadados_equacao["eds_separaveis"].length
		+ " => [" + metadados_equacao["eds_separaveis"] + "]");

	console.log("Quantidade de ED exata: " + metadados_equacao["eds_exatas"].length
		+ " => [" + metadados_equacao["eds_exatas"] + "]");

	console.log("Quantidade de ED homogênea: " + metadados_equacao["eds_homogêneas"].length
		+ " => [" + metadados_equacao["eds_homogêneas"] + "]");
}

function qtd_metadados_validados(arquivos_validos, qtd_total_arquivos, metadados_equacao){
	var validado = null;
	if(arquivos_validos != qtd_total_arquivos){
		validado = false;
		console.log("qtd arquivos validados e total de arquivos diferente");
	}
	if(qtd_total_arquivos != 
		(metadados_equacao["eds_com_resposta"].length + metadados_equacao["eds_sem_resposta"].length)){
		validado = false;
		console.log("soma de eds com e sem resposta incompativel");
	}
	if(qtd_total_arquivos != metadados_equacao["eds"].length){
		validado = false;
		console.log("quantidade de EDs incompativel");
	}

	if(qtd_total_arquivos != 
			(metadados_equacao["eds_ordinarias"].length + metadados_equacao["eds_parciais"].length) ){
		validado = false;
		console.log("soma de ed ordinaria e parcial incompativel");
	}

	var qtd_ordem1 = metadados_equacao["eds_ordem_1"].length;
	var qtd_ordem2 = metadados_equacao["eds_ordem_2"].length;
	var qtd_ordem3 = metadados_equacao["eds_ordem_3"].length;
	var qtd_ordemSuperior = metadados_equacao["eds_ordem_superior"].length;

	if(qtd_total_arquivos != (qtd_ordem1 + qtd_ordem2 + qtd_ordem3 + qtd_ordemSuperior )){
		validado = false;
		console.log("quantidade de ordens incompativeis");
	}

	var qtd_lineares = metadados_equacao["eds_lineares"].length;
	var qtd_nao_lineares = metadados_equacao["eds_nao_lineares"].length;

	if(qtd_total_arquivos != (qtd_lineares + qtd_nao_lineares)){
		validado = false;
		console.log("quantidade de linearidades incompativel");
	}

	if(validado == null){
		validado = true;
	}
	
	return validado;
}

function preparaMetadados(conteudo, metadados_equacao, numero_info){
	if(conteudo != ""){
		var linhas = conteudo.toString().split('\n');
		if(linhas[0].includes("pergunta:sim")){

			verificaSeTemResposta(linhas, numero_info, metadados_equacao);
			verificaSeED(linhas, numero_info, metadados_equacao);
	    	verificaTipo(linhas, numero_info, metadados_equacao);
	    	verificaOrdem(linhas, numero_info, metadados_equacao);
	    	verificaLinearidade(linhas, numero_info, metadados_equacao);
	    	verificaSeparavel(linhas, numero_info, metadados_equacao);
	    	verificaExata(linhas, numero_info, metadados_equacao);
	    	verificaHomogenea(linhas, numero_info, metadados_equacao);

	    	console.log("\n");
	    }else{
	    	// nothing to do in here
	    }
	}else{
		console.log("Sem conteudo");
	}
	return metadados_equacao;
}

function verificaHomogenea(linhas, numero_info, metadados_equacao){
	if(linhas[8].includes("ed_homogenea:true")){
		metadados_equacao["eds_homogêneas"].push(numero_info);
	}else{
		// nothing to do in here
	}
}

function verificaExata(linhas, numero_info, metadados_equacao){
	if(linhas[7].includes("ed_exata:true")){
		metadados_equacao["eds_exatas"].push(numero_info);
	}else{
		// nothing to do in here
	}
}

function verificaSeparavel(linhas, numero_info, metadados_equacao){
	if(linhas[6].includes("ed_separavel:true")){
		metadados_equacao["eds_separaveis"].push(numero_info);
	}else{
		// nothing to do in here
	}
}


function verificaLinearidade(linhas, numero_info, metadados_equacao){
	if(linhas[5].includes("linearidade:linear")){
		metadados_equacao["eds_lineares"].push(numero_info);
	}else if(linhas[5].includes("linearidade:não-linear")){
		metadados_equacao["eds_nao_lineares"].push(numero_info);
	}else{
		// nothing to do in here
	}
}

function verificaOrdem(linhas, numero_info, metadados_equacao){
	if(linhas[4].includes("primeira ordem")){
		metadados_equacao["eds_ordem_1"].push(numero_info);
	}else if(linhas[4].includes("segunda ordem")){
		metadados_equacao["eds_ordem_2"].push(numero_info);
	}else if(linhas[4].includes("terceira ordem")){
		metadados_equacao["eds_ordem_3"].push(numero_info);
	}else if(linhas[4].includes("ordem 4 ou superior")){
		metadados_equacao["eds_ordem_superior"].push(numero_info);
	}else {
		// nothing to do in here
	}
}

function verificaTipo(linhas, numero_info, metadados_equacao){
	if(linhas[3].includes("tipo_ed:ordinária")){
		metadados_equacao["eds_ordinarias"].push(numero_info);
	}else if(linhas[3].includes("tipo_ed:parcial")){
		metadados_equacao["eds_parciais"].push(numero_info);
	}else{
		// nothing to do in here
	}
}

function verificaSeED(linhas, numero_info, metadados_equacao){
	if(linhas[2].includes("ed:true")){
		metadados_equacao["eds"].push(numero_info);
	}else{
		throw console.log("equação " + numero_info + " não é diferencial");
		// nothing to do in here
	}
}

function verificaSeTemResposta(linhas, numero_info, metadados_equacao){
	if(linhas[1].includes("resposta:sim")){
		metadados_equacao["eds_com_resposta"].push(numero_info);
	}else if(linhas[1].includes("resposta:não")){
		metadados_equacao["eds_sem_resposta"].push(numero_info);
	}else{
		// nothing to do in here
	}
}