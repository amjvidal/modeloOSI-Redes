// md5 é carregado globalmente pelo index.html

function gerarMacAleatorio() {
    const caracteres = "0123456789ABCDEF";
    let mac = "";
    for (let i = 0; i < 6; i++) {
        mac += caracteres[Math.floor(Math.random() * 16)];
        mac += caracteres[Math.floor(Math.random() * 16)];
        if (i < 5) mac += ":";
    }
    return mac;
}

export function camadaEnlace(segmentos) {
    const quadros = segmentos.map((segmento, index) => {
        // Calcula o hash MD5 da string do payload para guardar no CRC
        const payloadString = JSON.stringify(segmento);
        const crcHash = md5(payloadString);

        return {
            frameId: `F${String(index + 1).padStart(3, '0')}`,
            macOrigem: "00:1B:44:11:3A:B7",
            macDestino: gerarMacAleatorio(),
            tipo: "IPv4",
            crc: crcHash,
            payload: segmento
        };
    });

    console.log("CAMADA DE ENLACE", quadros);

    // Apresenta na tela todo o objeto antes de enviar para camada física
    alert("CAMADA DE ENLACE\n\nObjeto montado e pronto para envio. Hash MD5 calculado e inserido no CRC.\n\n" + JSON.stringify(quadros, null, 2));

    return quadros;
}