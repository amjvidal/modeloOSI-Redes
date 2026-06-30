import {
    camadaApresentacao
} from "./presentation.js";

// --- Identificação do Usuário & Logout ---
let USER_NAME = localStorage.getItem("nome-usuario");

if (!USER_NAME) {
    const inputName = prompt("Digite o nome do usuário:");
    USER_NAME = inputName ? inputName : "Visitante";
    localStorage.setItem("nome-usuario", USER_NAME);
}

const userDisplay = document.querySelector(".user");
if (userDisplay) {
    userDisplay.textContent = `Usuário: ${USER_NAME}`;
}

const btnLogout = document.querySelector("#btn-logout");
if (btnLogout) {
    btnLogout.addEventListener("click", () => {
        localStorage.removeItem("nome-usuario");
        window.location.reload();
    });
}

// --- Seleção de Elementos do DOM ---
const reqInput = document.querySelector(".text-input");
const btnEnviar = document.querySelector(".request-btn");
const responseH1 = document.querySelector(".protocol-response");

const emailForm = document.querySelector(".email-form");
const chatForm = document.querySelector(".chat-form");
const siteForm = document.querySelector(".site-form");
const siteHostInput = document.querySelector("#site-host");
const inputFile = document.querySelector("#arquivo");

// --- Funções Auxiliares & Interface ---
function limparFormularios() {
    if (emailForm) emailForm.classList.add("hidden");
    if (chatForm) chatForm.classList.add("hidden");
    if (siteForm) siteForm.classList.add("hidden");
}

reqInput.addEventListener("input", () => {
    if (reqInput.value.length > 0) {
        btnEnviar.classList.add("active");
    } else {
        btnEnviar.classList.remove("active");
    }
});

// --- Identificação do Protocolo ---
btnEnviar.addEventListener("click", (event) => {
    event.preventDefault();

    const rawValue = reqInput.value.trim();
    const value = rawValue.toLowerCase();

    if (value === "") return;

    let protocolo = "";
    limparFormularios();

    if (value.includes("@")) {
        protocolo = "SMTP/POP";
        if (emailForm) emailForm.classList.remove("hidden");
    } 
    else if (value.startsWith("ws://") || value.startsWith("wss://")) {
        protocolo = "WEBSOCKET";
        if (chatForm) chatForm.classList.remove("hidden");
    } 
    else if (value.startsWith("http") || value.includes("www") || value.includes(".com") || value.includes(".br")) {
        protocolo = "HTTP/HTTPS";
        if (siteForm) {
            siteForm.classList.remove("hidden");
            if (siteHostInput) siteHostInput.value = rawValue;
        }
    } 
    else {
        protocolo = "Protocolo não identificado";
    }

    responseH1.textContent = protocolo;
    reqInput.value = "";
    btnEnviar.classList.remove("active");
});

// --- Envio: E-mail (SMTP) ---
if (emailForm) {
    emailForm.addEventListener(
    "submit",
    async (event) => {
        event.preventDefault();

        const dadosEmail = {
            tipo: "E-mail (SMTP)",
            remetente: document.querySelector("#remetente").value,
            destinatario: document.querySelector("#destinatario").value,
            assunto: document.querySelector("#assunto").value,
            corpo: document.querySelector("#corpo").value,
            protocolo: document.querySelector("#protocolo").value,
            timestamp: new Date().toLocaleTimeString() 
        };

        console.log("Camada de Aplicação → E-mail:", dadosEmail);
        await camadaApresentacao(dadosEmail);
        emailForm.reset();
        limparFormularios();
    });
}

// --- Envio: Chat (WebSocket) ---
if (chatForm) {
    chatForm.addEventListener(
    "submit",
    async (event) => {
        event.preventDefault();

        const dadosChat = {
            tipo: "Mensagem de Chat",
            usuario: USER_NAME,
            destinatario: document.querySelector("#chat-destinatario").value,
            mensagem: document.querySelector("#chat-mensagem").value,
            protocolo: "WEBSOCKET",
            timestamp: new Date().toLocaleTimeString()
        };

        console.log("Camada de Aplicação → Chat:", dadosChat);
        await camadaApresentacao(dadosChat);
        chatForm.reset();
        limparFormularios();
    });
}

// --- Envio: Arquivos (FTP/HTTP) ---
if (inputFile) {
    inputFile.addEventListener(
    "change",
    async () => {
        if (inputFile.files.length > 0) {
            const file = inputFile.files[0];
            const partesNome = file.name.split(".");
            const formatoArquivo = partesNome.length > 1 ? partesNome.pop() : "desconhecido";

            const dadosArquivo = {
                tipo: "Upload de Arquivo",
                nomeArquivo: file.name,
                formato: formatoArquivo,
                remetente: USER_NAME,
                protocolo: "FTP/HTTP",
                timestamp: new Date().toLocaleTimeString()
            };

            console.log("Camada de Aplicação → Arquivo:", dadosArquivo);
            alert(`Arquivo "${file.name}" carregado na camada de aplicação! Transmitindo...`);
            await camadaApresentacao(dadosArquivo);
        }
    });
}

// --- Envio: Requisição Web (HTTP/HTTPS) ---
if (siteForm) {
    siteForm.addEventListener(
    "submit",
    async (event) => {
        event.preventDefault();

        const dadosSite = {
            tipo: "Requisição Web (HTTP)",
            metodo: document.querySelector("#site-metodo").value,
            host: document.querySelector("#site-host").value,
            usuario: USER_NAME,
            protocolo: "HTTP/HTTPS",
            timestamp: new Date().toLocaleTimeString()
        };

        console.log("Camada de Aplicação → Site:", dadosSite);
        await camadaApresentacao(dadosSite);
        siteForm.reset();
        limparFormularios();
    });
}