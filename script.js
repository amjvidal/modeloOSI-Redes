// --- Identificação do Usuário ---
let userName = localStorage.getItem("nome-usuario");

if (!userName) {
    const inputName = prompt("Digite o nome do usuário:");
    userName = inputName ? inputName : "Visitante";
    localStorage.setItem("nome-usuario", userName);
}

const userDisplay = document.querySelector(".user");
if (userDisplay) {
    userDisplay.textContent = `Usuário: ${userName}`;
}

// --- Seleção de Elementos do DOM ---
const reqInput = document.querySelector(".text-input");
const btnEnviar = document.querySelector(".request-btn");
const responseH1 = document.querySelector(".protocol-response");
const protocolName = document.querySelector(".protocol-name");
const inputFile = document.querySelector("#arquivo");

// --- Interface: Ativar/Desativar Botão ---
if (reqInput && btnEnviar) {
    reqInput.addEventListener("input", () => {
        if (reqInput.value.length > 0) {
            btnEnviar.classList.add("active");
        } else {
            btnEnviar.classList.remove("active");
        }
    });
}

// --- Verificação de Protocolo ---
if (btnEnviar) {
    btnEnviar.addEventListener("click", (event) => {
        event.preventDefault();

        const rawValue = reqInput.value.trim();
        const value = rawValue.toLowerCase();

        if (value === "") return;

        let protocolo = "WEBSOCKET";

        if (value.includes("@")) {
            protocolo = "SMTP/POP";
        } else if (value.includes("www") || value.startsWith("http") || value.includes(".com") || value.includes(".br")) {
            protocolo = "HTTP/HTTPS";
        }

        if (responseH1) responseH1.textContent = protocolo;
        if (protocolName) protocolName.textContent = protocolo;

        reqInput.value = "";
        btnEnviar.classList.remove("active");
    });
}

// --- Manipulação de Arquivos ---
if (inputFile) {
    inputFile.addEventListener("change", () => {
        if (inputFile.files.length > 0) {
            const file = inputFile.files[0];
            alert(file.name);
        }
    });

    inputFile.addEventListener("cancel", () => {
        alert("Cancelado");
    });
}