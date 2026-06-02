/**
 * Transforma objetos JavaScript em blocos de código formatados com realce de cores.
 */

function enviarParaTerminal(nomeVariavel, objetoDados) {
    const terminal = document.querySelector('#terminal-saida');
    if (!terminal) return;

    let linhasObjeto = [];

    for (const [chave, valor] of Object.entries(objetoDados)) {
        linhasObjeto.push(`    <span class="json-chave">"${chave}"</span>: <span class="json-valor">"${valor}"</span>`);
    }

    const codigoFormatado = `const <span class="json-chave">${nomeVariavel}</span> = {\n${linhasObjeto.join(',\n')}\n};`;

    // Atualiza a tela
    terminal.innerHTML = codigoFormatado;
    terminal.classList.remove('oculto');
}