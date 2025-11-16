/**
 * API de Avaliação de Casos de Teste
 *
 * Este servidor Express atua como intermediário entre o frontend e a API OpenAI Assistants.
 * Permite criar threads de conversação, enviar código de teste para análise e receber
 * avaliações baseadas em 25 melhores práticas de testes de software.
 */

require("dotenv").config();
const OpenAI = require("openai");
const express = require("express");
const cors = require("cors");

// Carrega as variáveis de ambiente necessárias
const { OPENAI_API_KEY, ASSISTANT_ID } = process.env;

// Inicializa a aplicação Express
const app = express();
app.use(express.json());

// Configuração CORS - permite requisições de qualquer origem
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization"
};
app.use(cors(corsOptions));

// Inicializa o cliente OpenAI com a chave da API
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const assistantId = ASSISTANT_ID;
let pollingInterval; // Intervalo para verificar o status da execução do assistente

/**
 * Cria uma nova thread de conversação com o OpenAI Assistant
 * @returns {Promise<Object>} Objeto da thread criada contendo o ID
 */
async function createThread() {
  console.log("Criando uma nova thread...");
  const thread = await openai.beta.threads.create();
  return thread;
}

/**
 * Adiciona uma mensagem do usuário a uma thread existente
 * @param {string} threadId - ID da thread onde a mensagem será adicionada
 * @param {string} message - Conteúdo da mensagem (código de teste a ser avaliado)
 * @returns {Promise<Object>} Resposta da API com os detalhes da mensagem criada
 */
async function addMessage(threadId, message) {
  console.log("Adicionando nova mensagem à thread: " + threadId);
  const response = await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: message,
  });
  return response;
}

/**
 * Executa o assistente OpenAI em uma thread específica
 * @param {string} threadId - ID da thread onde o assistente será executado
 * @returns {Promise<Object>} Objeto da execução contendo o runId
 */
async function runAssistant(threadId) {
  console.log("Executando assistente para a thread: " + threadId);
  const response = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
  });

  console.log(response);

  return response;
}

/**
 * Verifica o status da execução do assistente e retorna as mensagens quando completo
 * @param {Object} res - Objeto de resposta Express
 * @param {string} threadId - ID da thread sendo monitorada
 * @param {string} runId - ID da execução do assistente
 */
async function checkingStatus(res, threadId, runId) {
  const runObject = await openai.beta.threads.runs.retrieve(threadId, runId);

  const status = runObject.status;
  console.log(runObject);
  console.log("Status atual: " + status);

  // Quando a execução estiver completa, retorna as mensagens formatadas
  if (status === "completed") {
    clearInterval(pollingInterval);

    const messagesList = await openai.beta.threads.messages.list(threadId);
    let formattedMessages = [];

    // Formata as mensagens separando por remetente (User ou Bot)
    messagesList.body.data.forEach((message) => {
      if (message.role === "user") {
        formattedMessages.push({ sender: "User", content: message.content });
      } else if (message.role === "assistant") {
        formattedMessages.push({ sender: "Bot", content: message.content });
      }
    });

    res.json({ messages: formattedMessages });
  }
}

/**
 * Recupera os detalhes de configuração do assistente OpenAI
 * @param {string} assistantId - ID do assistente a ser consultado
 * @returns {Promise<Object>} Detalhes do assistente incluindo nome, modelo e instruções
 */
async function getAssistantDetails(assistantId) {
  try {
    const assistant = await openai.beta.assistants.retrieve(assistantId);
    return assistant;
  } catch (error) {
    console.error("Erro ao recuperar detalhes do assistente:", error.message);
    throw error;
  }
}

// ========================================
// ROTAS DA API
// ========================================

/**
 * GET /thread
 * Cria uma nova thread de conversação
 * @returns {Object} JSON contendo o threadId
 */
app.get("/thread", (req, res) => {
  createThread().then((thread) => {
    res.json({ threadId: thread.id });
  });
});

/**
 * POST /message
 * Envia uma mensagem (código de teste) para avaliação
 * @body {string} message - Código de teste a ser avaliado
 * @body {string} threadId - ID da thread onde a mensagem será enviada
 * @returns {Object} JSON contendo as mensagens formatadas com a avaliação
 */
app.post("/message", (req, res) => {
  const { message, threadId } = req.body;
  addMessage(threadId, message).then(() => {
    runAssistant(threadId).then((run) => {
      const runId = run.id;

      // Verifica o status da execução a cada 5 segundos
      pollingInterval = setInterval(() => {
        checkingStatus(res, threadId, runId);
      }, 5000);
    });
  });
});

/**
 * GET /assistant
 * Retorna os detalhes de configuração do assistente OpenAI
 * @returns {Object} JSON com informações do assistente (nome, modelo, instruções, etc.)
 */
app.get("/assistant", async (req, res) => {
  try {
    const assistantDetails = await getAssistantDetails(assistantId);
    res.json(assistantDetails);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Falha ao recuperar detalhes do assistente.",
        details: error.message
      });
  }
});

// ========================================
// INICIALIZAÇÃO DO SERVIDOR
// ========================================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
