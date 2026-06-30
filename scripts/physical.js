// md5 é carregado globalmente pelo index.html

export function camadaFisica(quadros) {
    let framesIntactos = true;

    // Calcula o hash e compara com o crc
    quadros.forEach(quadro => {
        const payloadString = JSON.stringify(quadro.payload);
        const recalcularHash = md5(payloadString);

        if (recalcularHash !== quadro.crc) {
            framesIntactos = false;
            console.error(`Falha no frame ${quadro.frameId}: Hash divergente.`);
        }
    });

    if (framesIntactos) {
        alert("CAMADA FÍSICA\n\nHash validado e comparado com o CRC!\nA mensagem não perdeu nenhum frame.");
    } else {
        alert("CAMADA FÍSICA\n\nALERTA: Falha na validação do CRC! Os dados foram corrompidos.");
    }

    // Converte tudo para binário
    const bits = JSON.stringify(quadros)
        .split("")
        .map(char => char.charCodeAt(0).toString(2).padStart(8, "0"))
        .join(" ");

    console.log("CAMADA FÍSICA", bits);

    // Assim encerra a transmissão com os dados supostamente sendo enviados agora pelo meio fisico.
    return bits;
}