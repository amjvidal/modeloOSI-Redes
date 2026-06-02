/**
 * Aplica uma inversão textual combinada com deslocamento de caracteres.
 */

const DESLOCAMENTO_SEGURO = 4; // Chave para a criptografia

function protegerDados(texto) {
    if (!texto) return "";

    // Inverte o texto de trás para frente 
    let textoInvertido = texto.split('').reverse().join('');

    // Desloca os caracteres para torná-los ilegíveis
    let resultadoFinal = textoInvertido.split('').map(caractere => {
        const codigoAscii = caractere.charCodeAt(0);

        // Não criptografa espaços para manter a estrutura da mensagem legível
        if (caractere === ' ') {
            return caractere;
        }

        // Aplica o deslocamento na tabela de caracteres
        return String.fromCharCode(codigoAscii + DESLOCAMENTO_SEGURO);
    }).join('');

    return resultadoFinal;
}