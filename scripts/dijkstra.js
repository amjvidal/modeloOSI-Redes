export function dijkstra(origem, destino) {

    const distancias = {};
    const anterior = {};

    const fila = [];

    for (const ponto of network.nodes) {

        distancias[ponto.id] = Infinity;

        anterior[ponto.id] = null;
    }

    distancias[origem.id] = 0;

    fila.push(origem);

    while (fila.length) {

        fila.sort(
            (a,b) =>
                distancias[a.id] -
                distancias[b.id]
        );

        const atual = fila.shift();

        if (atual.id === destino.id)
            break;

        for (const link of atual.links) {

            if (!link.destino.ativo)
                continue;

            const novaDistancia =
                distancias[atual.id] +
                link.custo;

            if (
                novaDistancia <
                distancias[link.destino.id]
            ) {

                distancias[link.destino.id] =
                    novaDistancia;

                anterior[link.destino.id] =
                    atual;

                fila.push(
                    link.destino
                );
            }
        }
    }

    const caminho = [];

    let atual = destino;

    while (atual) {

        caminho.unshift(atual);

        atual =
            anterior[atual.id];
    }

    return caminho;
}