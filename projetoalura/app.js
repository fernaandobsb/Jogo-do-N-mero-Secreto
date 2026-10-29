
let listaDeNumeroSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Função para falar as mensagens
function falar(texto) {
    if (typeof responsiveVoice !== 'undefined') {
        responsiveVoice.speak(
            texto,
            'Brazilian Portuguese Female'
        );
    }
}

// Exibe textos na tela
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

// Exibe a mensagem inicial
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');

    let mensagem = 'Escolha um número entre 1 e 10';

    exibirTextoNaTela('p', mensagem);

    falar(mensagem);
}

// Inicializa a tela
exibirMensagemInicial();

// Verifica o número digitado
function verificarChute() {
    let campo = document.querySelector('input');
    let chute = Number(campo.value);

    // Verifica se o campo está vazio
    if (campo.value === '') {
        let mensagem = 'Digite um número antes de tentar!';

        exibirTextoNaTela('p', mensagem);
        falar(mensagem);

        return;
    }

    // Verifica se o número está dentro do limite
    if (chute < 1 || chute > numeroLimite) {
        let mensagem = 'Digite um número entre 1 e 10!';

        exibirTextoNaTela('p', mensagem);
        falar(mensagem);

        limparCampo();

        return;
    }

    limparCampo();

    // Verifica se o jogador acertou
    if (chute === numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');

        let palavraTentativa =
            tentativas > 1 ? 'tentativas' : 'tentativa';

        let mensagemTentativas =
            `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;

        exibirTextoNaTela('p', mensagemTentativas);

        falar(
            `Parabéns! Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`
        );

        // Habilita o botão de reiniciar
        document.getElementById('reiniciar')
            .removeAttribute('disabled');

    } else {
        // Se o chute for maior que o número secreto
        if (chute > numeroSecreto) {
            let mensagem =
                'O número secreto é menor do que o chute.';

            exibirTextoNaTela('p', mensagem);
            falar(mensagem);

        } else {
            // Se o chute for menor que o número secreto
            let mensagem =
                'O número secreto é maior do que o chute.';

            exibirTextoNaTela('p', mensagem);
            falar(mensagem);
        }

        tentativas++;
    }
}

// Gera um número aleatório sem repetir os já sorteados
function gerarNumeroAleatorio() {
    // Reinicia a lista se todos os números já foram sorteados
    if (listaDeNumeroSorteados.length === numeroLimite) {
        listaDeNumeroSorteados = [];
    }

    let numeroEscolhido =
        parseInt(Math.random() * numeroLimite + 1);

    if (listaDeNumeroSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();

    } else {
        listaDeNumeroSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

// Limpa o campo de entrada
function limparCampo() {
    let campo = document.querySelector('input');
    campo.value = '';
}

// Reinicia o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();

    limparCampo();

    tentativas = 1;

    exibirMensagemInicial();

    document.getElementById('reiniciar')
        .setAttribute('disabled', true);
}
