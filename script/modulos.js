/**
 * Escuta os formulários, gera os pacotes simulados e aciona o terminal.
 */

// Função auxiliar para gerar data e hora padrão Brasil
function obterTimestamp() {
    const agora = new Date();
    return agora.toLocaleTimeString('pt-BR') + ' - ' + agora.toLocaleDateString('pt-BR');
}

// Inicializa os ouvintes assim que a página carregar
document.addEventListener('DOMContentLoaded', () => {

    // --- FORMULÁRIO DE CHAT ---
    const formChat = document.querySelector('#form-chat');
    if (formChat) {
        formChat.addEventListener('submit', (e) => {
            e.preventDefault();
            const usuario = document.querySelector('#chat-user').value;
            const mensagemOriginal = document.querySelector('#chat-msg').value;

            const pacoteChat = {
                protocolo: "CHAT-SIMPLE",
                usuario: protegerDados(usuario), 
                mensagem: protegerDados(mensagemOriginal),
                timestamp: obterTimestamp()
            };

            enviarParaTerminal('pacoteChat', pacoteChat);
            formChat.reset();
        });
    }

    // --- FORMULÁRIO DE E-MAIL (SMTP) ---
    const formEmail = document.querySelector('#form-email');
    if (formEmail) {
        formEmail.addEventListener('submit', (e) => {
            e.preventDefault();
            const de = document.querySelector('#email-from').value;
            const para = document.querySelector('#email-to').value;
            const corpo = document.querySelector('#email-body').value;

            const pacoteSMTP = {
                protocolo: "SMTP (E-mail)",
                remetente: protegerDados(de),
                destinatario: protegerDados(para),
                conteudo: protegerDados(corpo),
                timestamp: obterTimestamp()
            };

            enviarParaTerminal('pacoteSMTP', pacoteSMTP);
            formEmail.reset();
        });
    }

    // --- FORMULÁRIO DE SITES (HTTP) ---
    const formSites = document.querySelector('#form-sites');
    if (formSites) {
        formSites.addEventListener('submit', (e) => {
            e.preventDefault();
            const usuarioWeb = document.querySelector('#web-user').value;
            const urlAlvo = document.querySelector('#web-url').value;

            const pacoteHTTP = {
                protocolo: "HTTP/HTTPS",
                metodo: "GET",
                cliente: protegerDados(usuarioWeb),
                host: protegerDados(urlAlvo),
                timestamp: obterTimestamp()
            };

            enviarParaTerminal('requisicaoHTTP', pacoteHTTP);
            formSites.reset();
        });
    }

    // --- FORMULÁRIO DE ARQUIVOS (FTP) ---
    const formArquivos = document.querySelector('#form-arquivos');
    if (formArquivos) {
        formArquivos.addEventListener('submit', (e) => {
            e.preventDefault();
            const usuarioFtp = document.querySelector('#ftp-user').value;
            const nomeArq = document.querySelector('#ftp-nome').value;
            const formatoArq = document.querySelector('#ftp-extensao').value;

            const pacoteFTP = {
                protocolo: "FTP (File Transfer)",
                operacao: "UPLOAD",
                usuario: protegerDados(usuarioFtp),
                arquivoNome: protegerDados(nomeArq),
                extensao: protegerDados(formatoArq),
                timestamp: obterTimestamp()
            };

            enviarParaTerminal('transferenciaFTP', pacoteFTP);
            formArquivos.reset();
        });
    }
});