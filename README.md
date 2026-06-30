# 🌐 Modelo OSI - Simulador de Protocolos (Camada de Aplicação)

Este é um projeto interativo desenvolvido para a disciplina de **Redes de Computadores**. O objetivo principal é simular o comportamento e a formatação de dados no **Modelo OSI**.

O projeto foi construído seguindo a arquitetura moderna de **SPA (Single Page Application)**, onde todas as interações e trocas de telas acontecem de forma dinâmica em uma única página, otimizando o fluxo e demonstrando um alto nível de maturidade no desenvolvimento front-end.

---

## 🚀 Funcionalidades Principais

* **Roteamento Inteligente (Análise de Payload):** A tela inicial funciona como um roteador de borda inteligente. Ao digitar ou carregar um dado, o sistema analisa a estrutura da string ou o tipo de arquivo para decidir automaticamente o protocolo de destino.
* **Módulos de Protocolos Simulados:**
    * **SMTP (Simple Mail Transfer Protocol):** Identificado automaticamente pela presença do caractere `@`. Permite simular o envio de e-mails estruturados preenchendo o remetente automaticamente.
    * **HTTP/HTTPS:** Identificado por termos como `.com`, `.br` ou prefixos `http`. Simula uma requisição web estruturada do tipo `GET`.
    * **CHAT-SIMPLE:** Destinado a qualquer texto comum digitado. Permite que o usuário envie mensagens e altere o texto livremente antes da simulação do disparo.
    * **FTP (File Transfer Protocol):** Ativado ao realizar o upload de um arquivo na tela inicial. O sistema extrai cirurgicamente o nome e a extensão do arquivo para montar o pacote de transferência.
* **Criptografia Exclusiva:** Para garantir a integridade e confidencialidade, os dados sensíveis passam por um algoritmo próprio chamado **Cifra de Inversão Espelhada com Deslocamento**, que realiza o espelhamento do texto (leitura de trás para frente) combinado com um deslocamento de caracteres na tabela ASCII (Chave Secreta = 4).
* **Terminal Visual Incorporado:** Exibe o pacote final formatado exatamente como um objeto JavaScript colorido (estilo *VS Code Dark Themes*) logo abaixo dos formulários para comprovação da montagem do payload.

---

## 📂 Estrutura Arquitetural do Código

O projeto foi modularizado de forma profissional, separando as responsabilidades de forma clara e limpa:

```text
  meu-projeto/
  ├── index.html          # Estrutura única e centralizada da aplicação (SPA)
  ├── style.css           # Estilização completa e centralizada do projeto (Tema #008FAD)
  ├── app.js              # Orquestrador principal e roteador inteligente do sistema
  └── script/             # Pasta de submódulos de suporte
      ├── criptografia.js # Componente de segurança (Inversão + Deslocamento)
      ├── terminal.js     # Mecanismo de renderização estética do código em tela
      └── modulos.js      # Gerenciador de eventos e captura dos formulários das aplicações
```

---

## 🛠️ Tecnologias Utilizadas

* **HTML5**: Estruturação semântica de formulários e seções dinâmicas.

* **CSS3 Moderno**: Utilização de Flexbox, CSS Grid, gradientes lineares avançados e controle de visibilidade via classes utilitárias (.oculto).

* **JavaScript Moderno (ES6+)**: Manipulação avançada do DOM, escutadores de eventos (EventListeners), funções de mapeamento de arrays (.map()), manipulação avançada de strings e strings invertidas.

---

## 💻 Como Executar o Projeto
Como o sistema foi projetado para rodar nativamente no cliente (Front-End puro), você não precisa instalar dependências complexas ou configurar servidores locais.

### 1. Faça o download.

### 2. Navegue até a pasta raiz do projeto.

### 3. Abra o arquivo index.html diretamente em qualquer navegador moderno (Google Chrome, Edge, Firefox, Brave, Safari, etc.).

### 4. Interaja digitando no painel ou carregando um arquivo para ver a Camada de Aplicação em funcionamento!
