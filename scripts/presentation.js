import {
    SignJWT,
    decodeJwt
} from "https://cdn.jsdelivr.net/npm/jose@6/+esm";

import {
    camadaSessao
} from "./session.js";

import {
    camadaTransporte
} from "./transport.js";

import {
    camadaEnlace
} from "./datalink.js";

import {
    camadaFisica
} from "./physical.js";

const SECRET =
    new TextEncoder().encode(
        "chave-teste"
    );

async function gerarTokenJWT(dados) {

    const payload = {

        sessionId:
            crypto.randomUUID(),

        timestamp:
            new Date().toISOString(),

        dados
    };

    const token =
        await new SignJWT(payload)
            .setProtectedHeader({
                alg: "HS256"
            })
            .sign(SECRET);

    return token;
}

export async function camadaApresentacao(dadosLimpos) {

    // =====================
    // CAMADA DE APRESENTAÇÃO
    // =====================

    const token =
        await gerarTokenJWT(
            dadosLimpos
        );

    console.log(
        "CAMADA DE APRESENTAÇÃO"
    );

    console.log(
        "JWT Gerado:",
        token
    );

    const payload =
        decodeJwt(token);

    console.log(
        "Payload:",
        payload
    );

    // =====================
    // CAMADA DE SESSÃO
    // =====================

    const sessao =
        camadaSessao(
            payload
        );

    // =====================
    // CAMADA DE TRANSPORTE
    // =====================

    const segmentos =
        camadaTransporte(
            sessao
        );

    // =====================
    // CAMADA DE ENLACE
    // =====================

    const quadros =
        camadaEnlace(
            segmentos
        );

    // =====================
    // CAMADA FÍSICA
    // =====================

    const bits =
        camadaFisica(
            quadros
        );

    // =====================
    // ARMAZENAR RESULTADO
    // =====================

    localStorage.setItem(
        "dadosCriptografados",
        JSON.stringify({

            token,

            payload,

            sessao,

            segmentos,

            quadros,

            bits

        })
    );

    // =====================
    // PRÓXIMA TELA
    // =====================

    window.location.href =
        "result.html";
}