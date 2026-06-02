/**
 * Controla o fluxo de navegação entre as camadas simuladas do projeto.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Captura de Elementos de Navegação
    const btnAnalisar = document.querySelector('#btn-analisar');
    const inputPrincipal = document.querySelector('#input-principal');
    const inputArquivo = document.querySelector('#input-arquivo');
    const feedbackRota = document.querySelector('#feedback-rota');
    const subtituloHeader = document.querySelector('#subtitulo-header');

    // Elementos das Telas
    const telaRoteador = document.querySelector('#tela-roteador');
    const telaChat = document.querySelector('#tela-chat');
    const telaEmail = document.querySelector('#tela-email');
    const telaSites = document.querySelector('#tela-sites');
    const telaArquivos = document.querySelector('#tela-arquivos');
    const terminalSaida = document.querySelector('#terminal-saida');

    // Função interna para esconder todas as telas de formulários
    function resetarTelas() {
        telaRoteador.classList.add('oculto');
        telaChat.classList.add('oculto');
        telaEmail.classList.add('oculto');
        telaSites.classList.add('oculto');
        telaArquivos.classList.add('oculto');
        terminalSaida.classList.add('oculto');
    }

    // Função para exibir a tela inicial
    function exibirHome() {
        resetarTelas();
        telaRoteador.classList.remove('oculto');
        subtituloHeader.textContent = "Aguardando entrada de dados...";
        feedbackRota.textContent = "";
        inputPrincipal.value = "";
        if(inputArquivo) inputArquivo.value = "";
    }

    // Configuração de todos os botões voltar
    document.querySelectorAll('.btn-voltar').forEach(botao => {
        botao.addEventListener('click', exibirHome);
    });

    // Lógica para o roteamento das telas
    btnAnalisar.addEventListener('click', () => {
        const conteudo = inputPrincipal.value.trim();
        if (!conteudo) return;

        const termosMinusculos = conteudo.toLowerCase();

        // Se contém '@', identifica como e-mail (SMTP)
        if (termosMinusculos.includes('@')) {
            feedbackRota.textContent = "Detectado padrão de e-mail. Roteando para SMTP...";
            subtituloHeader.textContent = "Sessão Ativa: Protocolo SMTP";
            
            setTimeout(() => {
                resetarTelas();
                telaEmail.classList.remove('oculto');
                document.querySelector('#email-from').value = conteudo; 
            }, 1200);
        } 
        // Se contém extensões web ou http, vai para Web (HTTP)
        else if (termosMinusculos.includes('.com') || termosMinusculos.includes('.br') || termosMinusculos.startsWith('http')) {
            feedbackRota.textContent = "Detectado padrão de URL. Roteando para HTTP/HTTPS...";
            subtituloHeader.textContent = "Sessão Ativa: Protocolo HTTP";

            setTimeout(() => {
                resetarTelas();
                telaSites.classList.remove('oculto');
                document.querySelector('#web-url').value = conteudo;
            }, 1200);
        } 
        // Qualquer outro texto comum vira uma mensagem de Chat
        else {
            feedbackRota.textContent = "Texto comum detectado. Roteando para Módulo Chat...";
            subtituloHeader.textContent = "Sessão Ativa: Serviço de Chat";

            setTimeout(() => {
                resetarTelas();
                telaChat.classList.remove('oculto');
                document.querySelector('#chat-msg').value = conteudo;
            }, 1200);
        }
    });

    // Lógica para detecção do arquivo
    inputArquivo.addEventListener('change', () => {
        if (inputArquivo.files.length > 0) {
            const arquivo = inputArquivo.files[0];
            const nomeCompleto = arquivo.name;

            // Extração de nome e extensão de arquivo
            const posicaoPonto = nomeCompleto.lastIndexOf('.');
            const nomeSemExtensao = posicaoPonto !== -1 ? nomeCompleto.substring(0, posicaoPonto) : nomeCompleto;
            const extensao = posicaoPonto !== -1 ? nomeCompleto.substring(posicaoPonto + 1) : "Desconhecido";

            feedbackRota.textContent = "Arquivo detectado. Roteando para Upload FTP...";
            subtituloHeader.textContent = "Sessão Ativa: Protocolo FTP";

            setTimeout(() => {
                resetarTelas();
                telaArquivos.classList.remove('oculto');
                document.querySelector('#ftp-nome').value = nomeSemExtensao;
                document.querySelector('#ftp-extensao').value = extensao;
            }, 1200);
        }
    });
});