# 🌐 Simulador do Modelo OSI - Projeto de Redes

Este é um projeto interativo desenvolvido para a disciplina de **Redes de Computadores**. O objetivo principal é simular o comportamento, a estruturação e a formatação de dados em todas as camadas do **Modelo OSI**, desde a interação do usuário na Camada de Aplicação até o envio dos bits no meio físico.

O projeto foi construído utilizando **JavaScript Modular (ES6)** e possui um design moderno estilo *Dashboard*, com renderizações de algoritmos complexos de roteamento usando **HTML5 Canvas**.

---

## 🚀 Funcionalidades Principais e Camadas OSI

O simulador intercepta a entrada de dados do usuário e passa pelas seguintes camadas em tempo real:

1. **Camada de Aplicação (`application.js`)**:
   - Identificação automática do protocolo através da análise da string (Ex: `@` -> SMTP, `www.` -> HTTP/HTTPS, `ws://` -> WebSocket).
   - Formulários modulares e captura de arquivos (FTP).

2. **Camada de Apresentação (`presentation.js`)**:
   - Geração de um **Token JWT** (JSON Web Token) criptografado utilizando a biblioteca `jose`.
   - Adição de carimbos de data/hora (Timestamp) e identificação de sessão (UUID).

3. **Camada de Sessão (`session.js`)**:
   - Abertura de sessões com IDs, portas lógicas e empacotamento com confirmação de status (`status: "ACTIVE"`).

4. **Camada de Transporte (`transport.js`)**:
   - Fragmentação dos dados pesados em **Segmentos** (Payload Segmentado).
   - Definição de portas de origem e destino e números de sequência para remontagem futura.

5. **Camada de Enlace (`datalink.js`)**:
   - Geração dinâmica de MAC Address fictícios e captação do MAC de Origem.
   - Cálculo e validação de integridade através de **Hash MD5** de todo o payload (salvo no atributo `crc`), usando a biblioteca `blueimp-md5`.
   - O objeto resultante é alertado na tela para fins educativos antes de seguir.

6. **Camada Física (`physical.js`)**:
   - Validação final do hash MD5 para comprovar que não houve corrupção dos dados.
   - Conversão de toda a estrutura JSON do pacote para **Sistema Binário** puro.

7. **Roteamento e Camada de Rede (Extra)**:
   - Simulação visual de topologia de rede através de roteadores desenhados num `canvas`.
   - Implementação real do algoritmo de **Dijkstra** para cálculo da rota mais rápida/curta entre dois nós, desviando automaticamente de roteadores falhos (vermelhos).

---

## 📂 Estrutura Arquitetural do Código (Inglês)

Todo o código foi padronizado em inglês para seguir as boas práticas globais de mercado.

```text
modeloOSI-Redes/
├── index.html          # Dashboard inicial (Entrada de Dados/Aplicação)
├── result.html         # Painel de Resultados, Gráficos e Binários
├── style.css           # Estilização completa do layout (Dashboard Pattern)
├── images/             # Imagens e assets do Canvas
└── scripts/            # Módulos ES6 responsáveis pela inteligência do sistema
    ├── application.js  # Regras da Camada 7
    ├── presentation.js # Regras da Camada 6 (Integração JWT)
    ├── session.js      # Regras da Camada 5
    ├── transport.js    # Regras da Camada 4
    ├── datalink.js     # Regras da Camada 2 (Hashing MD5)
    ├── physical.js     # Regras da Camada 1
    ├── result.js       # Orquestrador da Tela de Resultados
    ├── pathfinder.js   # Algoritmo Dijkstra
    ├── network.js      # Geração de Matriz de Roteadores
    ├── animation.js    # Motor Gráfico 2D para animação dos pacotes
    └── failures.js     # Simulador de quedas de conexão
```

---

## 🛠️ Tecnologias Utilizadas

* **HTML5 Canvas**: Para desenho dinâmico da infraestrutura de redes (Roteadores, Caminhos, Animações).
* **CSS3 Flexbox e Grid**: Interface responsiva estilo painel gerencial.
* **JavaScript ES6 (Modules)**: `import/export` para organização das responsabilidades.
* **jose (JWT)**: Assinatura e verificação de tokens via CDN.
* **blueimp-md5**: Algoritmo de Hashing usado na validação de redundância cíclica (CRC) via CDN.
* **Algoritmo de Dijkstra**: Implementação computacional de grafos não direcionados.

---

## 💻 Como Executar o Projeto

Como o sistema foi projetado de forma altamente acoplada usando **Módulos JavaScript (`type="module"`)**, por medidas de segurança de todos os navegadores web (políticas CORS), você **NÃO PODE** simplesmente abrir o arquivo com um duplo-clique (`file:///`).

Siga os passos abaixo:

1. Faça o download ou clone o repositório.
2. Abra a pasta do projeto em uma IDE como o **Visual Studio Code (VS Code)**.
3. Instale e inicie a extensão **Live Server** (ou utilize ferramentas como `npx http-server`, `python -m http.server`).
4. Execute o arquivo `index.html` pelo servidor local (normalmente `http://127.0.0.1:5500`).
5. Digite dados no simulador e acompanhe as janelas de alerta, o JWT, o Hash MD5 e o roteamento animado!
