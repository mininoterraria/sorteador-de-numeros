function gerarValorAleatorio(max, min){ //Função para gerar valores aleatórios em um intervalo especificado.
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function gerenciarValoresAleatorios(qtd, intervalo1, intervalo2){ //Função que coordena os valores gerados aleatoriamente e os armazena em um array.
   let numeroGerado = gerarValorAleatorio(intervalo1,intervalo2);
   let valoresGerados = [];
    do{
        if(valoresGerados.includes(numeroGerado)){
            numeroGerado = gerarValorAleatorio(intervalo1,intervalo2);
        }else{
            valoresGerados.push(numeroGerado);
        }
    }while(valoresGerados.length !== qtd);

    return valoresGerados;
}


function capturarInput(idBotao){ //Função que captura o valor inputado pelo usuário.
    return document.getElementById(idBotao).value;
}

function validarCampoInputado(qtd, de, ate){ //Função responsável por fazer a validação dos 3 inputs da aplicação.

    const regexQtd = /^[1-9][0-9]*$/; //Teste regex para quantidade de números.
    const regexDeAte = /^-?\d+$/; //Teste regex para os campos do número e até número.

    //Teste para ver se os valores inputados estão de acordo com o regex.
    if(!regexQtd.test(qtd)){
        alert("Quantidade de números inserida inválida!");
        limparCampoInputado('quantidade');
        return;
    }

    if(!regexDeAte.test(de)){
        alert("Quantidade 'do número' inválido!");
        limparCampoInputado('de');
        return;
    }

    if(!regexDeAte.test(ate)){
        alert("Quantidade 'até o número' inválido!");
        limparCampoInputado('ate');
        return;
    }

    qtd = Number(qtd);
    de = Number(de);
    ate = Number(ate);


    if(qtd === undefined || de === undefined || ate === undefined){
        return;
    }

    if(de < ate){
        if(qtd > (ate - de) + 1){
            alert("Quantidade de números a sortear não pode ser maior que o intervalo!");
            limparCampoInputado('quantidade');
            return;
        }else{
            return {qtd,de,ate};
        }

    }else if(de > ate || de === ate){
        if(qtd > (de - ate) + 1){
            alert("Quantidade de números a sortear não pode ser maior que o intervalo!");
            limparCampoInputado('quantidade');
            return;
        }else{
            return {qtd,de,ate};
        }
    }
    

}

function limparCampoInputado(idBotao){ //Função para limpar campos inputados e o de exibição.
    if(idBotao === "resultado"){
        return document.getElementById(idBotao).querySelector('label').innerHTML = 'Números sorteados: nenhum até agora';
    }

    return document.getElementById(idBotao).value = '';
}

function limparTodosCampos(){ //Função que limpa todos os campos.
    limparCampoInputado('quantidade');
    limparCampoInputado('de');
    limparCampoInputado('ate');
    limparCampoInputado('resultado');
}


function alterarEstadoBotao(idBotao1,idBotao2){ //Função para alterar o estado do botão.
    let botao1 = document.getElementById(idBotao1);
    let botao2 = document.getElementById(idBotao2);

    botao1.style.backgroundColor = '#1875E8';
    botao1.disabled = false;
    botao1.style.cursor = 'pointer';
    
    botao2.style.backgroundColor = '#6f6f70';
    botao2.disabled = true;
    botao2.style.cursor = 'not-allowed';
}


function validarExibirResultado(texto){ //Função que valida e exibe os números sorteados.
    const larguraTela = document.getElementById("resultado").querySelector('label').offsetWidth;
    const container = document.getElementById("resultado").querySelector('label');
    container.innerHTML = `Números sorteados: ${texto}`;
    const larguraModificada = container.offsetWidth;

    if(larguraModificada > larguraTela){
        alert("Não é possível exibir resultado com esses valores!");
        limparTodosCampos();
        return; 
    }

    return true;
}


function sortear(){ //Função principal que coordena todo o fluxo do jogo.
    let qtdNumeros = capturarInput('quantidade');
    let doNumero = capturarInput('de');
    let ateNumero = capturarInput('ate');
    let validarCampos = validarCampoInputado(qtdNumeros, doNumero, ateNumero);
    let validacao;
    let numerosGerados;
    
    if(validarCampos){
        qtdNumeros = validarCampos.qtd;
        doNumero = validarCampos.de;
        ateNumero = validarCampos.ate;

        if(doNumero < ateNumero){
            numerosGerados = gerenciarValoresAleatorios(qtdNumeros, ateNumero, doNumero);

        }else if(doNumero > ateNumero || doNumero === ateNumero){
            numerosGerados = gerenciarValoresAleatorios(qtdNumeros, doNumero, ateNumero);
        }
    }

    if(numerosGerados){
        validacao = validarExibirResultado(numerosGerados);
    }

    if(validacao){
        alterarEstadoBotao('btn-reiniciar','btn-sortear');
    }

    


}  

function reiniciar(){ //Função que reiniciará o sorteio.
    alterarEstadoBotao('btn-sortear','btn-reiniciar');
    limparTodosCampos();
}

