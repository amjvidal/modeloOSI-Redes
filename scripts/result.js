import { createNetwork, network } from "./network.js";
import { randomFailures } from "./failures.js";
import { dijkstra } from "./pathfinder.js";
import {
    drawNetwork,
    drawRoute,
    animatePacket
} from "./animation.js";

// =========================
// EXIBIÇÃO DOS DADOS JWT
// =========================

const resultado =
    JSON.parse(
        localStorage.getItem(
            "dadosCriptografados"
        )
    );

const containerDados =
    document.querySelector(
        "#dados-conteudo"
    );

if (
    !resultado ||
    !containerDados
) {

    containerDados.innerHTML =
        "<p>Nenhum dado encontrado.</p>";

}
else {

    containerDados.innerHTML = "";

    // --- ATIVIDADE FINAL: APRESENTAR OBJETO E BINÁRIO NA TELA ---
    
    // 1. Objeto da Camada de Enlace na parte superior
    const tituloObjeto = document.createElement("h3");
    tituloObjeto.textContent = "Objeto Gerado (Camada de Enlace)";
    containerDados.appendChild(tituloObjeto);

    const preObjeto = document.createElement("pre");
    preObjeto.style.background = "#e2e8f0";
    preObjeto.style.padding = "15px";
    preObjeto.style.borderRadius = "8px";
    preObjeto.style.color = "#0f172a";
    preObjeto.style.marginBottom = "20px";
    preObjeto.style.overflowX = "auto";
    preObjeto.textContent = JSON.stringify(resultado.quadros, null, 4);
    containerDados.appendChild(preObjeto);

    // 2. Binário da Camada Física logo abaixo
    const tituloBinario = document.createElement("h3");
    tituloBinario.textContent = "Dados em Binário (Camada Física)";
    containerDados.appendChild(tituloBinario);

    const pBinario = document.createElement("p");
    pBinario.style.background = "#0f172a";
    pBinario.style.color = "#22c55e";
    pBinario.style.padding = "15px";
    pBinario.style.borderRadius = "8px";
    pBinario.style.fontFamily = "monospace";
    pBinario.style.wordBreak = "break-all";
    pBinario.style.marginBottom = "30px";
    pBinario.textContent = resultado.bits;
    containerDados.appendChild(pBinario);



    // =========================
    // CAMADA DE REDE
    // =========================

    const tituloRede =
        document.createElement(
            "h3"
        );

    tituloRede.textContent =
        "Camada de Rede";

    containerDados.appendChild(
        tituloRede
    );

    // Cria a rede
    createNetwork();

    // 15 roteadores quebrados
    randomFailures(15);

    // Obtém apenas roteadores ativos
    const ativos =
        network.filter(
            router => router.active
        );

    if (ativos.length >= 2) {

        const origem =
            ativos[
                Math.floor(
                    Math.random() *
                    ativos.length
                )
            ].id;

        let destino =
            ativos[
                Math.floor(
                    Math.random() *
                    ativos.length
                )
            ].id;

        while (
            origem === destino
        ) {

            destino =
                ativos[
                    Math.floor(
                        Math.random() *
                        ativos.length
                    )
                ].id;
        }

        const resultadoRota =
            dijkstra(
                network,
                origem,
                destino
            );

        console.log(
            "Origem:",
            origem
        );

        console.log(
            "Destino:",
            destino
        );

        console.log(
            "Resultado:",
            resultadoRota
        );

        drawNetwork();

        if (
            resultadoRota.path &&
            resultadoRota.path.length > 1
        ) {

            drawRoute(
                resultadoRota.path,
                origem,
                destino
            );

            const infoRota =
                document.createElement(
                    "div"
                );

            infoRota.classList.add(
                "rota-info"
            );

            infoRota.innerHTML = `
                <h4>Roteamento</h4>

                <p>
                    <strong>Origem:</strong>
                    R${origem}
                </p>

                <p>
                    <strong>Destino:</strong>
                    R${destino}
                </p>

                <p>
                    <strong>Custo:</strong>
                    ${resultadoRota.distance}
                </p>

                <p>
                    <strong>Caminho:</strong>
                    ${resultadoRota.path.join(" ➜ ")}
                </p>
            `;

            const btnRestart = document.createElement("button");
            btnRestart.textContent = "Animando...";
            btnRestart.className = "request-btn";
            btnRestart.style.margin = "0"; // Reseta margens para o flexbox
            btnRestart.disabled = true;

            btnRestart.addEventListener("click", async () => {
                btnRestart.disabled = true;
                btnRestart.textContent = "Animando...";
                await animatePacket(resultadoRota.path, origem, destino);
                btnRestart.textContent = "Replay Animação";
                btnRestart.disabled = false;
            });

            const actionsContainer = document.querySelector(".actions-container");
            if (actionsContainer) {
                actionsContainer.appendChild(btnRestart);
            }
            
            containerDados.appendChild(infoRota);

            animatePacket(resultadoRota.path, origem, destino).then(() => {
                btnRestart.textContent = "Replay Animação";
                btnRestart.disabled = false;
            });

        } else {

            const erro =
                document.createElement(
                    "p"
                );

            erro.textContent =
                "Nenhuma rota encontrada.";

            containerDados.appendChild(
                erro
            );
        }
    }
}