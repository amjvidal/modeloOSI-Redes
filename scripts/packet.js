export class Packet {

    constructor(dados) {

        this.id = crypto.randomUUID();

        this.payload = dados;

        this.ttl = 64;

        this.origem = null;

        this.destino = null;

        this.rota = [];
    }
}