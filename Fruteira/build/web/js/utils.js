function requisicaoHTTP(projeto, classe, metodo, funcaoOK, funcaoErro, parametros) {
    var http = new XMLHttpRequest();
    //abre conexão com sistema tecnicon
    
    http.open('POST', 'http://portal.tecnicon.com.br:7078/TecniconPCHttp/ConexaoHttp?p=evento=ERPMetodos|sessao=|empresa=|filial=|local=|parametro=' +
            'projeto=' + projeto + '|classe=' + classe + '|metodo=' + metodo + '|recurso=metadados' + parametros, true);
    
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    http.addEventListener('load', function() {
        //200 - terminou a requisição
        if (http.status === 200) {
            var dados = xmlToJSON(http.responseXML);
            if (dados.erro) {
                funcaoErro(dados.erro);
            } else if (dados.result) {
                funcaoOK(dados.result);
            }
        }
    });
    http.send(null);
}

function xmlToJSON(XMLDocument) {
    var retorno = {result: XMLDocument ? XMLDocument.getElementsByTagName('result')[0].textContent : ' ',
        erro: XMLDocument ? XMLDocument.getElementsByTagName('erro')[0].textContent : ''};
    try {
        retorno.result = JSON.parse(retorno.result);
    } catch (e) {        
    }
    try {
        retorno.erro = JSON.parse(retorno.erro);
    } catch (e) {        
    }
    return retorno;
}

function serializeForm(form) {
    var arrCampos = form.querySelectorAll('input[type="text"]'), 
        i, qtde, arrParams = [];
    for (i = 0, qtde = arrCampos.length; i < qtde; i++) {
        arrParams.push(encodeURIComponent(arrCampos[i].id) + '=' + 
                       encodeURIComponent(arrCampos[i].value));
    }
    //estrutura query string
    return arrParams.join('&');
}

function retornaDados(campo, callback) {
    var classe = campo.dataset.classe;
    var params = '&' + campo.id + '=' + encodeURIComponent(campo.value);
    requisicaoHTTP('FruteiraBean', classe, 'retorna'+classe, callback, alert, params);
}