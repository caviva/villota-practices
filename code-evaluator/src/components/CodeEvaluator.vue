<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center p-6">
    <!-- Title and Description -->
    <div class="text-center mb-6">
      <!-- Title & Description -->
      <h1 class="text-3xl font-bold text-gray-800">Test Case Evaluator</h1>
      <p class="text-gray-600 mt-2 max-w-2xl mx-auto">
        This tool analyzes your test case code and evaluates it against
        <strong>25 best practices</strong>. Paste your code below and click
        <strong>Evaluate</strong> to get feedback.
      </p>
      <p class="text-gray-500 text-sm mt-2 italic">
        Supports: Python, Java, JavaScript, C++, etc.
      </p>
    </div>

    <!-- Code Input -->
    <div class="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-2">Enter your test case code</h2>
      <textarea
        v-model="codeInput"
        placeholder="Paste your code here..."
        class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
        rows="6"
      ></textarea>
    </div>

    <!-- Evaluate Button -->
    <button
      @click="evaluateCode"
      class="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
    >
      Evaluate
    </button>

    <!-- Loading Modal -->
    <div
      v-if="loading"
      class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
        <p class="mt-4 text-lg font-semibold">Evaluating test cases...</p>
      </div>
    </div>

    <!-- Toast Notification -->
    <div
      v-if="showToast"
      class="fixed bottom-5 right-5 bg-green-500 text-white py-2 px-4 rounded-md shadow-md transition-opacity duration-500"
    >
      Code copied to clipboard!
    </div>

    <!-- Results Section -->
    <div
      v-if="analysisResult"
      class="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mt-6 transition-opacity duration-500 ease-in-out opacity-100"
    >
      <h2 class="text-xl font-semibold mb-4">Analysis Results</h2>

      <!-- Compliance Score -->
      <p class="text-lg font-bold mt-4">Overall Compliance Score:</p>
      <div class="w-full bg-gray-200 rounded-full h-5 dark:bg-gray-700 mt-2 relative">
        <div
          :style="{ width: analysisResult.compliance_score }"
          class="bg-blue-600 h-5 rounded-full transition-all"
        ></div>
        <p class="absolute right-4 top-0 text-sm font-bold text-gray-800">
          {{ analysisResult.compliance_score }}
        </p>
      </div>

      <!-- Organized Best Practices -->
      <div class="mt-6">
        <h3 class="text-lg font-bold text-gray-700 border-b pb-2">
          📌 Common Sense (CS) - {{ commonSenseScore }}%
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="(practice, index) in commonSensePractices"
            :key="'cs-' + index"
            class="p-4 border rounded-lg"
            :class="{
              'bg-green-100': practice.status === '✔️',
              'bg-red-100': practice.status === '❌',
              'bg-gray-100': practice.status === '⚪',
            }"
          >
            <p class="font-semibold">{{ practice.title }}</p>
            <p class="text-sm">{{ practice.description }}</p>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <h3 class="text-lg font-bold text-gray-700 border-b pb-2 mt-6">
          📌 Literature Supported (LS) - {{ literatureSupportedScore }}%
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="(practice, index) in literatureSupportedPractices"
            :key="'ls-' + index"
            class="p-4 border rounded-lg"
            :class="{
              'bg-green-100': practice.status === '✔️',
              'bg-red-100': practice.status === '❌',
              'bg-gray-100': practice.status === '⚪',
            }"
          >
            <p class="font-semibold">{{ practice.title }}</p>
            <p class="text-sm">{{ practice.description }}</p>
          </div>
        </div>
      </div>

      <!-- Suggested Code -->
      <h2 class="text-xl font-semibold mt-6">Suggested Code</h2>
      <div class="relative mt-4">
        <pre
          class="w-full p-5 bg-gray-800 text-white font-mono text-sm rounded-lg overflow-x-auto"
        >
          {{ analysisResult.suggested_code }}
        </pre>
        <button
          @click="copyToClipboard"
          class="absolute top-2 right-2 bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
        >
          Copy
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Componente CodeEvaluator
 *
 * Componente principal que permite aos usuários avaliar código de teste
 * contra 25 melhores práticas de testes de software usando OpenAI Assistant.
 */
import axios from "axios";
import { ref, computed } from "vue";

// URL base da API - usar variável de ambiente ou localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default {
  setup() {
    // Estados reativos
    const codeInput = ref("");
    const analysisResult = ref(null);
    const loading = ref(false);
    const showToast = ref(false);

    /**
     * Avalia o código de teste enviado pelo usuário
     * Cria uma thread, envia o código e processa a resposta do assistente
     */
    const evaluateCode = async () => {
      try {
        if (!codeInput.value.trim()) {
          alert("Por favor, insira o código do caso de teste antes de avaliar.");
          return;
        }

        loading.value = true;

        // Cria uma nova thread de conversação
        const threadResponse = await axios.get(`${API_BASE_URL}/thread`);
        const threadId = threadResponse.data.threadId;

        // Envia o código para avaliação
        const response = await axios.post(`${API_BASE_URL}/message`, {
          message: codeInput.value,
          threadId,
        });

        // Extrai o JSON da resposta do assistente
        const rawJson = response.data.messages[0].content[0].text.value;
        analysisResult.value = JSON.parse(rawJson);
      } catch (error) {
        console.error("Erro ao avaliar o código:", error);
        alert("Ocorreu um erro ao avaliar o código. Tente novamente.");
      } finally {
        loading.value = false;
      }
    };

    /**
     * Copia o código sugerido para a área de transferência
     * Exibe uma notificação toast de confirmação
     */
    const copyToClipboard = () => {
      if (analysisResult.value?.suggested_code) {
        navigator.clipboard.writeText(analysisResult.value.suggested_code).then(() => {
          showToast.value = true;
          setTimeout(() => {
            showToast.value = false;
          }, 2000);
        });
      }
    };

    /**
     * Calcula a pontuação percentual de uma categoria de práticas
     * @param {Array} practices - Lista de práticas a serem avaliadas
     * @returns {number} Porcentagem de práticas atendidas (0-100)
     */
    const calculateCategoryScore = (practices) => {
      if (!practices || practices.length === 0) return 0;
      const passed = practices.filter((p) => p.status === "✔️").length;
      return Math.round((passed / practices.length) * 100);
    };

    // Computed properties para filtrar práticas por categoria
    const commonSensePractices = computed(
      () =>
        analysisResult.value?.practices_evaluation.filter((p) =>
          p.title.startsWith("CS-")
        ) || []
    );

    const literatureSupportedPractices = computed(
      () =>
        analysisResult.value?.practices_evaluation.filter((p) =>
          p.title.startsWith("LS-")
        ) || []
    );

    // Computed properties para calcular pontuações por categoria
    const commonSenseScore = computed(() =>
      calculateCategoryScore(commonSensePractices.value)
    );
    const literatureSupportedScore = computed(() =>
      calculateCategoryScore(literatureSupportedPractices.value)
    );

    return {
      codeInput,
      evaluateCode,
      analysisResult,
      loading,
      showToast,
      copyToClipboard,
      commonSensePractices,
      literatureSupportedPractices,
      commonSenseScore,
      literatureSupportedScore,
    };
  },
};
</script>
<style scoped>
/**
 * Estilos do componente CodeEvaluator
 * Utiliza Tailwind CSS para a maioria dos estilos
 * Este bloco contém apenas animações personalizadas
 */

/* Animação de rotação para o loader */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
