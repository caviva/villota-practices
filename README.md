# 🧪 Test Case Evaluator - UFSCar

Sistema de avaliação de casos de teste baseado em 25 melhores práticas de engenharia de software, utilizando OpenAI Assistants API.

## 📋 Descrição do Projeto

Este projeto é composto por duas aplicações que trabalham em conjunto:

- **Backend (API)**: Servidor Node.js/Express que atua como intermediário com a OpenAI Assistants API
- **Frontend**: Interface web desenvolvida em Vue.js 3 + Vite + Tailwind CSS

O sistema permite que desenvolvedores e estudantes avaliem a qualidade de seus casos de teste contra 25 melhores práticas divididas em duas categorias:
- **Common Sense (CS)**: 14 práticas de senso comum
- **Literature Supported (LS)**: 11 práticas respaldadas por literatura acadêmica

## 🎯 Funcionalidades

- ✅ Avaliação automática de código de teste em múltiplas linguagens (Python, Java, JavaScript, C++, etc.)
- ✅ Análise baseada em 25 melhores práticas de testes de software
- ✅ Pontuação de conformidade por categoria e geral
- ✅ Sugestão de código melhorado
- ✅ Interface intuitiva e responsiva
- ✅ Cópia rápida do código sugerido

## 🏗️ Arquitetura

```
villota-practices/
├── api-practices/          # Backend (Node.js + Express)
│   ├── server.js          # Servidor principal
│   ├── package.json       # Dependências do backend
│   ├── Dockerfile         # Configuração Docker do backend
│   └── .env.example       # Template de variáveis de ambiente
│
├── code-evaluator/        # Frontend (Vue.js 3)
│   ├── src/              # Código fonte
│   ├── public/           # Arquivos públicos
│   ├── package.json      # Dependências do frontend
│   ├── Dockerfile        # Configuração Docker do frontend
│   ├── nginx.conf        # Configuração do Nginx
│   └── .env.example      # Template de variáveis de ambiente
│
├── docker-compose.yml    # Orquestração dos containers
├── .env.example          # Template de variáveis de ambiente global
└── README.md            # Este arquivo
```

## 🚀 Requisitos Previos

- [Docker](https://www.docker.com/get-started) (versão 20.10 ou superior)
- [Docker Compose](https://docs.docker.com/compose/install/) (versão 1.29 ou superior)
- Conta na [OpenAI Platform](https://platform.openai.com/)
- Chave de API da OpenAI
- Assistente OpenAI configurado

## ⚙️ Configuração do OpenAI Assistant

Antes de executar o projeto, você precisa criar e configurar um assistente no OpenAI Playground:

### 1. Acesse o OpenAI Playground
Vá para: [https://platform.openai.com/playground](https://platform.openai.com/playground)

### 2. Crie um Novo Assistente
Clique em "Assistants" e depois em "Create"

### 3. Configure o Assistente com os Seguintes Parâmetros:

**Nome:**
```
UFSCar
```

**Modelo:**
```
gpt-4-turbo
```

**System Prompt:**
```
You are an expert in software testing and best practices for writing test cases. Your task is to analyze the provided test code and compare it against the **25 best practices** listed below.

📌 **Strict Output Requirements**
- Always return the response in **valid JSON format** following the provided JSON Schema.
- Do **not include any text or explanations** outside of the JSON structure.
- Every response **must contain all 25 best practices** evaluations, even if some are not applicable.
- The `"status"` field must always be one of the following:
  - `"✔️"` (Met)
  - `"❌"` (Not Met)
  - `"⚪"` (Not Applicable)
- The `"compliance_score"` must be calculated as **(✔️ practices / 25) * 100** and returned as a string with a percentage (e.g., `"85%"`).
- The "suggested_code" must be a fully formatted, improved version of the test case, implementing all applicable best practices while maintaining the original logic. The improvements should follow the 25 best practices while ensuring that neither the test coverage nor the mutation score are affected. Any modifications should preserve the effectiveness of the test suite, ensuring that all edge cases and possible mutations remain properly validated.

📌 **Definition of the 25 Best Practices**
Each test case must be evaluated against these practices:

### **Common Sense Practices**
1️⃣ **CS-01: Atomic Specification of Test Cases**  
   - Each test case must focus on a **single requirement** or behavior.
   - Independent test cases avoid false positives or negatives.

2️⃣ **CS-02: Complete Independence of Test Cases**  
   - Test cases should not depend on other tests.
   - Independent tests allow for flexibility in execution.

3️⃣ **CS-03: Coverage of Normal and Exceptional Flows**  
   - Test cases must check **both normal** and **edge case** scenarios.
   - Exception handling should be tested properly.

4️⃣ **CS-04: Boundary Values Analysis**  
   - Tests should validate inputs at the **minimum, maximum, and just outside** boundaries.

5️⃣ **CS-05: Complete Modularity of Test Cases**  
   - Tests should be **self-contained** and **reusable**.
   - Modular test cases improve maintainability.

6️⃣ **CS-06: Detailed Analysis of Size and Complexity**  
   - Keep test cases **small and focused**.
   - Avoid unnecessary complexity in a single test.

7️⃣ **CS-07: Complex Design for Fault Detection**  
   - Some complex test cases are needed to detect deep system issues.
   - Balance complexity with maintainability.

8️⃣ **CS-08: Complete Maintenance of Test Code**  
   - Test code should be **regularly updated**.
   - Prioritize **readability** and **modularization**.

9️⃣ **CS-09: Complete Traceability of Test Cases**  
   - Each test should be **linked** to a requirement.
   - Improves **debugging and change management**.

🔟 **CS-10: Strict Use of Performance and Security Testing**  
   - Performance and security **must be tested** separately from functional tests.

1️⃣1️⃣ **CS-11: Regular Review of Test Cases**  
   - Test cases should be **periodically reviewed** to match changing requirements.

1️⃣2️⃣ **CS-12: Clear Understanding of Test Cases**  
   - Each test case should have a **clear, unambiguous purpose**.

1️⃣3️⃣ **CS-13: Structured Coverage of Testing Process**  
   - Use structured **integration testing approaches** (top-down, bottom-up).

1️⃣4️⃣ **CS-14: Complete Assurance of Test Code Quality**  
   - Use **test coverage metrics** but don't rely on them alone.

---

### **Literature-Supported Practices**
 **LS-01: Proper Utilization of Test Code Coverage**  
   - High coverage does not always mean **effective** tests.
   - Focus on quality, not just coverage percentage.

 **LS-02: Required Utilization of Missing Tests**  
   - Identify **gaps** in test coverage and **create missing tests**.

 **LS-03: Efficient Utilization of Test Code Coverage**  
   - Test coverage should include **fault patterns** and **edge cases**.

 **LS-04: Small Test Code Generation Footprint**  
   - Tests should **execute quickly** and **avoid unnecessary computations**.

 **LS-05: Complete Prioritization of Test Cases Design**  
   - Prioritize tests based on **functional and non-functional requirements**.

**LS-06: Responsible Addition of Test Code Maintenance**  
   - Keep the test suite **updated with fixed bugs** to prevent regressions.

 **LS-07: Suitable Utilization of Test Assertions**  
   - Use **assertions** effectively to detect **subtle faults**.

**LS-08: Responsible Addition of Test Debugging Comments**  
   - Document common **failure patterns** and **expected behaviors**.

**LS-09: Deterministic Design of Test Results**  
   - Tests must **always return the same results** given the same inputs.

**LS-10: Complete Avoidance of Test Side Effects**  
   - Tests must **not modify shared state** or cause dependencies between tests.

**LS-11: Suitable Utilization of Test Labels and Categories**  
   - Use **labels or categories** to organize test cases.

---

📌 **Mandatory JSON Format**
Every response **must** follow this structure:

```json
{
  "practices_evaluation": [
    {
      "title": "Best practice name",
      "status": "✔️ / ❌ / ⚪",
      "description": "Brief explanation of compliance or violation"
    }
    // Repeat for all 25 practices
  ],
  "compliance_score": "XX%",
  "suggested_code": "Improved test code"
}
```
```

**Configurações Adicionais:**
- **Response Format**: `json_object`
- **Temperature**: `0.2`
- **Top P**: `0.3`
- **File Search**: Desabilitado
- **Code Interpreter**: Desabilitado
- **Functions**: Nenhuma

### 4. Salve e Copie o Assistant ID
Após criar o assistente, copie o **Assistant ID** (formato: `asst_xxxxxxxxxxxxxxxxxxxxxxxx`). Você precisará dele na configuração.

## 🔧 Instalação e Configuração

### 1. Clone o Repositório
```bash
git clone <url-do-repositorio>
cd villota-practices
```

### 2. Configure as Variáveis de Ambiente
Copie o arquivo `.env.example` para `.env` e preencha com suas credenciais:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione suas credenciais:
```env
OPENAI_API_KEY=sk-proj-sua-chave-aqui
ASSISTANT_ID=asst_seu-assistant-id-aqui
```

### 3. Execute com Docker Compose
```bash
docker-compose up -d
```

Este comando irá:
- ✅ Construir as imagens Docker do backend e frontend
- ✅ Criar uma rede isolada para comunicação entre os containers
- ✅ Iniciar o backend na porta 3000
- ✅ Iniciar o frontend na porta 80

### 4. Acesse a Aplicação
Abra seu navegador e acesse:
```
http://localhost
```

## 📖 Como Usar

1. **Cole seu código de teste** na área de texto
2. **Clique em "Evaluate"** para iniciar a análise
3. **Aguarde** enquanto o assistente processa (pode levar alguns segundos)
4. **Visualize os resultados**:
   - Pontuação geral de conformidade
   - Avaliação detalhada das 25 práticas
   - Código sugerido com melhorias
5. **Copie o código melhorado** clicando no botão "Copy"

## 🛠️ Comandos Úteis do Docker

### Visualizar logs dos containers
```bash
# Todos os containers
docker-compose logs -f

# Apenas o backend
docker-compose logs -f api

# Apenas o frontend
docker-compose logs -f frontend
```

### Parar os containers
```bash
docker-compose down
```

### Reconstruir as imagens
```bash
docker-compose up -d --build
```

### Verificar status dos containers
```bash
docker-compose ps
```

### Acessar o shell de um container
```bash
# Backend
docker-compose exec api sh

# Frontend
docker-compose exec frontend sh
```

## 🔍 Troubleshooting

### Problema: "Failed to retrieve assistant details"
**Solução**: Verifique se o `ASSISTANT_ID` está correto no arquivo `.env`

### Problema: "Error evaluating the code"
**Solução**:
- Verifique se a `OPENAI_API_KEY` está válida
- Confirme que você tem créditos disponíveis na sua conta OpenAI
- Verifique os logs do backend: `docker-compose logs api`

### Problema: Frontend não carrega
**Solução**:
- Verifique se o container está rodando: `docker-compose ps`
- Verifique os logs: `docker-compose logs frontend`
- Certifique-se de que a porta 80 não está sendo usada por outro serviço

### Problema: Backend não responde
**Solução**:
- Verifique os logs: `docker-compose logs api`
- Certifique-se de que a porta 3000 não está sendo usada
- Verifique se as variáveis de ambiente estão configuradas corretamente

## 🧪 Desenvolvimento Local (Sem Docker)

### Backend
```bash
cd api-practices
npm install
cp .env.example .env
# Edite o .env com suas credenciais
npm start
```

### Frontend
```bash
cd code-evaluator
npm install
cp .env.example .env
# Edite o .env com a URL da API (http://localhost:3000)
npm run dev
```

## 📊 Tecnologias Utilizadas

### Backend
- Node.js 18
- Express.js
- OpenAI SDK
- CORS
- dotenv

### Frontend
- Vue.js 3
- Vite
- Tailwind CSS
- Axios
- Vue Router
- Prism.js (syntax highlighting)

### DevOps
- Docker
- Docker Compose
- Nginx (servidor web para o frontend)

## 📝 Estrutura das 25 Melhores Práticas

### Common Sense (CS) - 14 práticas
- CS-01 a CS-14: Práticas fundamentais de senso comum para testes

### Literature Supported (LS) - 11 práticas
- LS-01 a LS-11: Práticas respaldadas por pesquisas acadêmicas

Para detalhes completos de cada prática, consulte o System Prompt do assistente na seção de configuração.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar a documentação
- Enviar pull requests

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais na UFSCar (Universidade Federal de São Carlos).

## 👥 Autores

Desenvolvido por estudantes e pesquisadores da UFSCar.

## 📞 Suporte

Para questões e suporte:
- Abra uma issue no repositório
- Entre em contato com a equipe de desenvolvimento

---

**Nota**: Este projeto utiliza a API da OpenAI, que é um serviço pago. Certifique-se de monitorar seu uso e custos na [plataforma OpenAI](https://platform.openai.com/usage).


