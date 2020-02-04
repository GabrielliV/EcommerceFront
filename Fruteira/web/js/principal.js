function init() {
    requisicaoHTTP('FruteiraBean', 'ProdutoBean', 'retornaKits', listarKits, console.log, '');
    //requisicaoHTTP('FruteiraBean', 'ProdutoBean', 'retornaProdutos', listarProdutos, console.log, '&CGRUPO=55');

    /* Categorias */
    document.querySelector(".menu #btnInicio").addEventListener("click", exibeCategoria);
    document.querySelector(".menu #btnFrutas").addEventListener("click", exibeCategoria);
    document.querySelector(".menu #btnVerduras").addEventListener("click", exibeCategoria);
    document.querySelector(".menu #btnLegumes").addEventListener("click", exibeCategoria);

    /* Muda conteúdo da página */
    document.querySelector(".cima #btnLogin").addEventListener("click", exibeConteudo);
    document.querySelector(".login2 #btnCadastro").addEventListener("click", exibeConteudo);
    document.querySelector(".cima #btnCarrinho").addEventListener("click", exibeConteudo);
    document.querySelector(".cima #btnPrincipal").addEventListener("click", exibeConteudo);
    document.querySelector(".cima #btnDadosCli").addEventListener("click", exibeConteudo);

    document.querySelector('#lupa-pesquisa').addEventListener("click", pesquisarProdutos);
    document.querySelector('.pesquisa').addEventListener('keydown', pesquisaCampo);
    document.querySelector('.cadastrarC').addEventListener("click", cadastrarCliente);
    document.querySelector('.entrar').addEventListener("click", logarCliente);

    document.querySelector('.dadosCli').addEventListener("click", consultarCompras);


    document.querySelector('#loginEmail').value = "";
    document.querySelector('#loginSenha').value = "";

    var logarCli = {};


    logarCli = window.localStorage.getItem("logarCli");
    logarCli = JSON.parse(logarCli);

    if (logarCli) {
        document.querySelector('.textlogin').innerText = "Pedidos";
        document.querySelector('#btnSair').addEventListener("click", sairCli);
        document.querySelector('#btnSair').style.display = "block";
        document.querySelector('#btnLogin').style.display = "none";
        document.querySelector('.dadosCli').style.display = "block";
        //document.querySelector('.cima #btnLogin').addEventListener("click", sairLogin);
    } else {
        document.querySelector('.dadosCli').style.display = "none";
    }

}

function exibeCategoria(e) {
    var btn = e.target;
    if (btn.nodeName === "A") {
        btn = btn.parentNode;
    }

    var kits = document.querySelector(".menu #btnInicio").value;

    if (kits) {
        requisicaoHTTP('FruteiraBean', 'ProdutoBean', 'retornaKits', listarKits, console.log, '');
    } else {
        requisicaoHTTP('FruteiraBean', 'ProdutoBean', 'retornaProdutos', listarProdutos, console.log, '&CGRUPO=' + btn.getAttribute('cgrupo'));
    }


}

function exibeConteudo(e) {

    var btn = e.target;
    if (btn.nodeName === "I") {
        btn = btn.parentNode;
    }
    if (btn.nodeName === "A") {
        btn = btn.parentNode;
    }
    var href = btn.getAttribute("href");

    var visivelAtual = document.querySelector(".conteudotela.visivel");
    visivelAtual.classList.remove("visivel");

    var novoVisivel = document.querySelector("#" + href);
    novoVisivel.classList.add("visivel");

    prodCarrinho();


}
function sairLogin(e) {
    window.localStorage.removeItem("dadosLogin");
    document.querySelector('.cima #btnLogin').addEventListener("click", exibeConteudo);
}

function listarProdutos(dados) {
    var produtos = dados.produtos;
    document.querySelector('section').innerHTML = '';

    var divv, dv, img, dvH2, dvH3, dvH4, dvBtn;

    divv = document.createElement('div');
    divv.setAttribute('class', 'todoconteudo visivel');
    document.querySelector('section').appendChild(divv);

    for (var i = 0; i < produtos.length; i++) {

        dv = document.createElement('div');
        dv.setAttribute('class', 'conteudo');
        divv.appendChild(dv);

        img = document.createElement('img');
        img.src = 'data:image/jpg;base64,' + produtos[i].imagem;
        img.setAttribute('class', 'imgProd');
        dv.appendChild(img);


        dvH2 = document.createElement('h2');
        dvH2.setAttribute('class', 'tituloProd');
        dvH2.innerText = produtos[i].TITULO;
        dv.appendChild(dvH2);

        dvH3 = document.createElement('h3');
        dvH3.innerText = 'R$ ' + produtos[i].PRECO.toFixed(2).replace('.', ',');
        dvH3.setAttribute('class', 'precoProd');
        dv.appendChild(dvH3);

        dvH4 = document.createElement('h4');
        dvH4.setAttribute('class', 'un');
        dvH4.innerText = produtos[i].UNIDADE;
        dv.appendChild(dvH4);

        dvBtn = document.createElement('button');
        dvBtn.setAttribute('class', 'mandaCarr');
        dv.appendChild(dvBtn);
        dvBtn.setAttribute('id', produtos[i].CPRODUTO);
        dvBtn.setAttribute('class', 'mandaCarr');
        dvBtn.innerText = 'COMPRAR';
    }
    var prodCar = document.querySelectorAll('.mandaCarr');
    for (var j = 0; j < prodCar.length; j++) {
        prodCar[j].addEventListener('click', adcCarrinho);
    }
}

function listarKits(dados) {
    var kits = dados.kits;
    document.querySelector('section').innerHTML = '';

    var divv, dv, img, dvH2, dvH3;

    divv = document.createElement('div');
    divv.setAttribute('class', 'todoconteudo visivel');
    document.querySelector('section').appendChild(divv);

    for (var i = 0; i < kits.length; i++) {
        dv = document.createElement('div');
        dv.setAttribute('class', 'conteudo');
        divv.appendChild(dv);

        img = document.createElement('img');
        img.src = 'img/frut1.png';
        img.setAttribute('class', 'imgKit');
        dv.appendChild(img);

        dvH2 = document.createElement('h2');
        dvH2.setAttribute('class', 'tituloKit');
        dvH2.innerText = kits[i].NPRODUTO;
        dv.appendChild(dvH2);

        dvH3 = document.createElement('h3');
        dvH3.innerText = 'R$ ' + kits[i].PRECO;
        dvH3.setAttribute('class', 'precoKit');
        dv.appendChild(dvH3);

        dvBtn = document.createElement('button');
        dvBtn.setAttribute('class', 'verKit');
        dv.appendChild(dvBtn);
        dvBtn.setAttribute('id', kits[i].SKITVENDA);
        dvBtn.setAttribute('class', 'verKit');
        dvBtn.innerText = 'VER PRODUTOS';
    }

    var itensKit = document.querySelectorAll('.verKit');
    for (var j = 0; j < itensKit.length; j++) {
        itensKit[j].addEventListener('click', verItensKit);
    }
}

function adcCarrinho(e) {
    alert("Produto adicionado ao carrinho de compras.");
    var produto = e.target.parentNode;
    var carrinho;
    var img = produto.querySelector('.imgProd').src;
    var titulo = produto.querySelector('.tituloProd').innerText;
    var preco = produto.querySelector('.precoProd').innerText;
    var un = produto.querySelector('.un').innerText;
    var qtde = 1.0;
    var cproduto = this.id;
    var confereProd = false;


    if (localStorage.carrinho) {
        carrinho = JSON.parse(localStorage.carrinho);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));


        for (var i = 0; i < carrinho.produtos.length; i++) {
            if (cproduto === carrinho.produtos[i].cproduto) {
                carrinho.produtos.find(function (obj, idx, arr) {
                    if (obj.cproduto === cproduto) {
                        arr[idx].qtde = parseFloat(arr[idx].qtde) + parseFloat(qtde);
                        confereProd = true;
                        return true;
                    } else {
                        return false;
                    }
                });
            }
        }

    } else {
        carrinho = {'produtos': []};
    }
    if (!confereProd) {
        carrinho.produtos.push({'cproduto': cproduto, 'foto': img, 'tituloProd': titulo,
            'preco': preco, 'qtde': qtde, 'un': un});
    }
    window.localStorage.setItem('carrinho', JSON.stringify(carrinho));
    prodCarrinho();

}

function prodCarrinho() {
    var itensCarrinho = {};

    itensCarrinho = window.localStorage.getItem('carrinho');
    itensCarrinho = JSON.parse(itensCarrinho);

    var total = 0.0;
    var totalProd = 0.0;
    var qtdeCar = 0.0;
    var divC, img, dvH2, dvH3, dvH4, btn, dv, removP, xRemov, frete, xTotal, qtdeF, totalF, btnFinal, textNada;
    var foraCar = document.querySelector('.foraCar');
    foraCar.innerHTML = '';
    var carTudo = document.querySelector('.carTudo');
    carTudo.innerHTML = '';

    divC = document.createElement('div');
    divC.setAttribute('class', 'carConteudo');
    document.querySelector('.carrinho2').appendChild(divC);

    if (itensCarrinho !== null && itensCarrinho.produtos.length !== 0) {
        document.querySelector('.carTudo').style.display = "block";

        for (var i = 0; i < itensCarrinho.produtos.length; i++) {

            dv = document.createElement('div');
            dv.setAttribute('class', 'conteudoCar');
            foraCar.appendChild(dv);

            img = document.createElement('img');
            img.src = itensCarrinho.produtos[i].foto;
            img.setAttribute('class', 'carImgProd');
            dv.appendChild(img);

            dvH2 = document.createElement('h2');
            dvH2.setAttribute('class', 'carTituloProd');
            dvH2.innerText = itensCarrinho.produtos[i].tituloProd;
            dv.appendChild(dvH2);

            dvH3 = document.createElement('h3');
            dvH3.innerText = itensCarrinho.produtos[i].preco;
            dvH3.setAttribute('class', 'carPrecoProd');
            dv.appendChild(dvH3);

            dvH4 = document.createElement('h4');
            dvH4.innerText = itensCarrinho.produtos[i].un;
            dvH4.setAttribute('class', 'carUn');
            dv.appendChild(dvH4);


            btn = document.createElement('input');
            dv.appendChild(btn);
            btn.setAttribute('class', 'carQtdeCompra');
            btn.setAttribute('type', 'number');
            btn.setAttribute('value', itensCarrinho.produtos[i].qtde);
            btn.addEventListener('change', atualizarCar);
            btn.cproduto = itensCarrinho.produtos[i].cproduto;

            xRemov = document.createElement('button');
            dv.appendChild(xRemov);
            xRemov.cproduto = itensCarrinho.produtos[i].cproduto;
            xRemov.setAttribute('class', 'removProd');
            xRemov.innerText = 'X';

            total = itensCarrinho.produtos[i].preco.replace("R$ ", "").replace(".", "").replace(",", ".") * itensCarrinho.produtos[i].qtde;
            totalProd += total;
            qtdeCar += parseInt(itensCarrinho.produtos[i].qtde);
            xTotal = document.createElement('div');
            dv.appendChild(xTotal);
            xTotal.setAttribute('class', 'carProdTotal');
            xTotal.innerText = 'R$ ' + total.toFixed(2).replace(".", ",");

        }
        var carTudo = document.querySelector('.carTudo');

        qtdeF = document.createElement('div');
        carTudo.appendChild(qtdeF);
        qtdeF.setAttribute('class', 'qtdeTudo');
        qtdeF.innerText = 'Preço Produtos: R$ ' + totalProd.toFixed(2).replace(".", ",");

        totalF = document.createElement('div');
        carTudo.appendChild(totalF);
        totalF.setAttribute('class', 'precoTudo');
        totalF.innerText = 'Quantidade Produtos: ' + qtdeCar;

        frete = document.createElement('div');
        carTudo.appendChild(frete);
        frete.setAttribute('class', 'freteCar');
        frete.innerText = 'Frete: R$ 5,00';

        btnFinal = document.createElement('button');
        carTudo.appendChild(btnFinal);
        btnFinal.setAttribute('class', 'btnFinal');
        btnFinal.setAttribute('id', 'btnFinal');
        btnFinal.addEventListener("click", finalizarCompra);
        btnFinal.innerText = 'Finalizar Compra';

        //console.log(totalCar, qtdeCar);

    } else {
        document.querySelector('.carTudo').style.display = "none";

        textNada = document.createElement('p');
        foraCar.appendChild(textNada);
        textNada.innerText = 'Você ainda não possui itens no carrinho.';
        textNada.setAttribute('class', 'nadaC');
    }
    removP = document.querySelectorAll('.removProd');
    for (var j = 0; j < removP.length; j++) {
        removP[j].addEventListener('click', removerItem);
    }

}

function removerItem(e) {
    var itensCarrinho = {};
    itensCarrinho = window.localStorage.getItem('carrinho');
    itensCarrinho = JSON.parse(itensCarrinho);

    var produto = e.target.parentNode;
    produto.classList.remove('produto');

    var cRemove;

    var cproduto = e.target.cproduto;

    for (var i = 0; i < itensCarrinho.produtos.length; i++) {
        if (cproduto === itensCarrinho.produtos[i].cproduto) {
            cRemove = cproduto;
            var prodRemovido = itensCarrinho.produtos.find(function (obj, idx, removP) {
                if (obj.cproduto === cRemove) {
                    removP.splice(idx, 1);
                    return true;
                } else {
                    return false;
                }
            });
        }
    }
    window.localStorage.setItem('carrinho', JSON.stringify(itensCarrinho));

    produto.innerHTML = "";
    produto.remove();
    prodCarrinho();
}

function atualizarCar(e) {
    var qtde = e.target.value;

    var itensCarrinho = {};
    itensCarrinho = window.localStorage.getItem('carrinho');
    itensCarrinho = JSON.parse(itensCarrinho);

    var atualizaCar;

    var cproduto = e.target.cproduto;

    for (var i = 0; i < itensCarrinho.produtos.length; i++) {
        if (cproduto === itensCarrinho.produtos[i].cproduto) {
            atualizaCar = cproduto;
            itensCarrinho.produtos.find(function (obj, idx, arr) {
                if (obj.cproduto === atualizaCar) {
                    arr[idx].qtde = qtde;
                    return true;
                } else {
                    return false;
                }
            });
        }
    }
    window.localStorage.setItem('carrinho', JSON.stringify(itensCarrinho));
    prodCarrinho();

    console.log(itensCarrinho);
}

// pesquisar o produto
function pesquisarProdutos(e) {
    document.querySelector("#btnPrincipal").click();
    var conteudo = document.querySelector(".pesquisa").value;
    if (conteudo.trim() !== "") {
        requisicaoHTTP('FruteiraBean', 'ProdutoBean', 'pesquisarProduto', listarProdutos, null,
                "&CSUBGRUPO=48&MERCADORIA=" + encodeURIComponent(conteudo));
    }
}

function pesquisaCampo(e) {
    if (e.keyCode === 13) {
        var conteudo = e.target.value;
        document.querySelector("#btnPrincipal").click();
        if (conteudo.trim() !== "") {
            requisicaoHTTP('FruteiraBean', 'ProdutoBean', 'pesquisarProduto', listarProdutos, null,
                    "&CSUBGRUPO=48&MERCADORIA=" + encodeURIComponent(conteudo));
        }
    }
}

function cadastrarCliente(e) {
    var tela = document.querySelector('.contcentro2');

    requisicaoHTTP('FruteiraBean', 'ClienteBean', 'inserirCadastro', function (dados) {
        var logarCli = {'cliente': dados.split("|")[1]};
        window.localStorage.setItem('logarCli', JSON.stringify(logarCli));
        alert(dados);
    }, document.querySelector(".login2 #btnCadastro").click(),
            '&NOME=' + tela.querySelector('#nome').value
            + '&EMAIL=' + tela.querySelector('#email').value
            + '&SENHAFR=' + tela.querySelector('#senha').value
            + '&ENDERECO=' + tela.querySelector('#endereco').value
            + '&CEP=' + tela.querySelector('#cep').value
            + '&NUMERO=' + tela.querySelector('#numero').value
            + '&BAIRRO=' + tela.querySelector('#bairro').value
            + '&CIDADE=' + tela.querySelector('#cidade').value
            + '&CPF=' + tela.querySelector('#cpf').value
            + '&CELULAR=' + tela.querySelector('#celular').value
            );

    tela.querySelector('#nome').value = '';
    tela.querySelector('#email').value = '';
    tela.querySelector('#senha').value = '';
    tela.querySelector('#endereco').value = '';
    tela.querySelector('#cep').value = '';
    tela.querySelector('#numero').value = '';
    tela.querySelector('#bairro').value = '';
    tela.querySelector('#cidade').value = '';
    tela.querySelector('#cpf').value = '';
    tela.querySelector('#celular').value = '';

    document.querySelector('.textlogin').innerText = "Pedidos";
    document.querySelector('#btnSair').addEventListener("click", sairCli);
    document.querySelector('#btnSair').style.display = "block";
    document.querySelector('#btnLogin').style.display = "none";
    document.querySelector('.dadosCli').style.display = "block";

    document.querySelector("#btnCarrinho").click();

}

function logarCliente(e) {
    var tela = document.querySelector('.contcentro');
    if (document.querySelector("#loginEmail").value.trim() !== "" && document.querySelector("#loginSenha").value.trim() !== "")
    {
        requisicaoHTTP("FruteiraBean", "ClienteBean", "fazerLogin", function (dados) {
            var logarCli = {'cliente': dados};
            window.localStorage.setItem('logarCli', JSON.stringify(logarCli));
            document.querySelector('#loginEmail').value = "";
            document.querySelector('#loginSenha').value = "";
            document.querySelector('.textlogin').innerText = "Pedidos";
            document.querySelector('#btnSair').addEventListener("click", sairCli);
            document.querySelector('#btnSair').style.display = "block";
            document.querySelector('#btnLogin').style.display = "none";
            document.querySelector('.dadosCli').style.display = "block";
            document.querySelector("#btnPrincipal").click();
        }, alert, "&EMAIL=" + tela.querySelector("#loginEmail").value
                + "&SENHAFR=" + tela.querySelector("#loginSenha").value);


    } else {
        alert("Preencha todos os campos.");
    }
}


function finalizarCompra(e) {
    var logarCli = {};
    logarCli = window.localStorage.getItem("logarCli");
    logarCli = JSON.parse(logarCli);

    if (logarCli) {

        var itensCarrinho = [];
        itensCarrinho = window.localStorage.getItem('carrinho');
        itensCarrinho = JSON.parse(itensCarrinho);


        var tudoCar = [];
        for (var i = 0; i < itensCarrinho.produtos.length; i++) {
            tudoCar.push({cproduto: parseInt(itensCarrinho.produtos[i].cproduto),
                preco: parseFloat(itensCarrinho.produtos[i].preco.replace(',', '.').replace('R$', '').trim()),
                qtde: itensCarrinho.produtos[i].qtde});
        }
        ;

        try {
            requisicaoHTTP("FruteiraBean", "ProdutoBean", "finalizarCompra", compraFinalizada, console.log, "&CCLIFOR=" + logarCli.cliente
                    + "&ITENS=" + encodeURIComponent(JSON.stringify(tudoCar)));
        } catch (erro) {
            console.log(erro);
        }

    } else {
        alert("Faça login para finalizar a compra.");
        document.querySelector("#btnLogin").click();
    }
}

function compraFinalizada() {
    alert("Compra finalizada com sucesso! Quando seu pedido for autorizado, será enviado ao seu e-mail o boleto da sua compra.");
    localStorage.removeItem('carrinho');
    document.querySelector("#btnPrincipal").click();
}


function sairCli() {
    alert("Volte sempre!");
    localStorage.removeItem('logarCli');

    document.querySelector('.textlogin').innerText = "Login";
    document.querySelector('#btnSair').style.display = "none";
    document.querySelector('#btnLogin').style.display = "block";
    document.querySelector('.dadosCli').style.display = "none";

    document.querySelector("#btnPrincipal").click();


}

function consultarCompras() {
    var logarCli = {};


    logarCli = window.localStorage.getItem("logarCli");
    logarCli = JSON.parse(logarCli);

    if (logarCli) {
        requisicaoHTTP("FruteiraBean", "ClienteBean", "consultarCompras", comprasCli, alert, "&CCLIFOR=" + logarCli.cliente);
    }


}

function comprasCli(compras) {
    var divC, img, dvH2, dvH3, dvH4, dvH5, dvH6, textNada, btnItens;
    var foraPed = document.querySelector('.foraPed');
    foraPed.innerHTML = '';
    var pedTudo = document.querySelector('.pedTudo');
    pedTudo.innerHTML = '';

    divC = document.createElement('div');
    divC.setAttribute('class', 'pedConteudo');
    document.querySelector('.pedidos').appendChild(divC);
    compras = compras.compras;
    if (compras !== null && compras.length !== 0) {

        for (var i = 0; i < compras.length; i++) {

            dv = document.createElement('div');
            dv.setAttribute('class', 'conteudoPed');
            foraPed.appendChild(dv);

            dvH2 = document.createElement('h2');
            dvH2.setAttribute('class', 'pedTituloProd');
            dvH2.innerText = compras[i].PEDIDO;
            dv.appendChild(dvH2);

            dvH4 = document.createElement('h2');
            dvH4.innerText = compras[i].DATA;
            dvH4.setAttribute('class', 'pedData');
            dv.appendChild(dvH4);

            dvH5 = document.createElement('h2');
            dvH5.innerText = compras[i].DATAPREV;
            dvH5.setAttribute('class', 'pedDataPrev');
            dv.appendChild(dvH5);

            dvH6 = document.createElement('h2');
            dvH6.innerText = 'R$' + compras[i].TOTAL.toFixed(2).replace(".", ",");
            dvH6.setAttribute('class', 'pedTotal');
            dv.appendChild(dvH6);

            btnItens = document.createElement('button');
            btnItens.setAttribute('class', 'verPedItens');
            dv.appendChild(btnItens);
            btnItens.setAttribute('id', compras[i].PEDIDO);
            btnItens.setAttribute('class', 'verPedItens');
            btnItens.innerText = 'VER PRODUTOS';

        }
        
        var arr = document.querySelectorAll(".verPedItens");
        for (var j = 0; j < arr.length; j++)
        {
            arr[j].addEventListener("click", itensPed);
        }

    } else {
        textNada = document.createElement('p');
        pedTudo.appendChild(textNada);
        textNada.innerText = 'Você ainda não possui pedidos.';
    }


}

function itensPed(e) {
    requisicaoHTTP("FruteiraBean", "ClienteBean", "listarItensCompra", listarItensPed, console.log,
            "&PEDIDO=" + document.querySelector('.pedido'));
}

function listarItensPed(e) {
    var divC, img, dvH2, dvH3, dvH4, dvH5, dvH6;
    var foraPed = document.querySelector('.foraPed');
    foraPed.innerHTML = '';
    var pedTudo = document.querySelector('.pedTudo');
    pedTudo.innerHTML = '';

    divC = document.createElement('div');
    divC.setAttribute('class', 'pedConteudo');
    document.querySelector('.pedidoItens').appendChild(divC);
    compras = compras.compras;
    if (compras !== null && compras.length !== 0) {

        for (var i = 0; i < compras.length; i++) {

            dv = document.createElement('div');
            dv.setAttribute('class', 'conteudoPedItem');
            foraPed.appendChild(dv);
            
            img = document.createElement('img');
            img.src = compras[i].IMAGEM;
            img.setAttribute('class', 'pedImgProdItem');
            dv.appendChild(img);

            dvH2 = document.createElement('h2');
            dvH2.setAttribute('class', 'pedTituloProdItem');
            dvH2.innerText = compras[i].MERCADORIA;
            dv.appendChild(dvH2);

            dvH4 = document.createElement('h2');
            dvH4.innerText = compras[i].PRECO;
            dvH4.setAttribute('class', 'pedPrecoItem');
            dv.appendChild(dvH4);

            dvH5 = document.createElement('h2');
            dvH5.innerText = compras[i].QTDE;
            dvH5.setAttribute('class', 'pedQtdeItem');
            dv.appendChild(dvH5);

            dvH6 = document.createElement('h2');
            dvH6.innerText = 'R$' + compras[i].TOTALITEM.toFixed(2).replace(".", ",");
            dvH6.setAttribute('class', 'pedTotalItem');
            dv.appendChild(dvH6);

        }

    }
}

init();