# 🧪 TAI-EvalGenTCS - Test AI Evaluator and Generator of Test Case Suites

**Ferramenta de Avaliação e Geração de Casos de Teste baseada em Inteligência Artificial**

Desenvolvida como parte da pesquisa de doutorado na **Universidade Federal de São Carlos (UFSCar)** sobre estratégias e ferramentas de suporte para geração de testes baseados em boas práticas de engenharia de software.

---

## 👥 Autores e Colaboradores

- **Camilo Hernán Villota Ibarra** - Autor Principal e Pesquisador
- **Auri Marcelo Rizzo Vincenzi** - Orientador
- **José Carlos Maldonado** - Co-orientador
- **Pedro Henrique Kuroishi** - Colaboração Conceitual

---

## 📋 Sobre o Projeto

### Contexto Acadêmico

Este projeto é uma implementação prática da tese de doutorado *"Towards a strategy and tool support for test generation based on good software testing practices: classification and prioritization"*, que aborda a lacuna existente entre a **quantidade de testes automatizados** e a **qualidade real dos casos de teste**.

### Fundamentação Teórica

A ferramenta está fundamentada em uma **Revisão Sistemática da Literatura (SLR)** que:
- Identificou **131 práticas** de testes de software em 103 estudos primários
- Refinou e sintetizou essas práticas em **40 boas práticas essenciais**
- Validou empiricamente através de pesquisa com testers profissionais
- Classificou as práticas em categorias orientadas e não-orientadas a código

### Implementação Atual

Esta versão da ferramenta **TAI-EvalGenTCS** implementa **25 boas práticas fundamentais** divididas em:

- **Common Sense (CS)**: 14 práticas de senso comum validadas pela indústria
- **Literature Supported (LS)**: 11 práticas respaldadas por pesquisas acadêmicas

---

## 🎯 Objetivos da Ferramenta

A TAI-EvalGenTCS foi desenvolvida para:

1. **Avaliar a qualidade do design** de casos de teste existentes
2. **Detectar más práticas** ou testes pouco efetivos
3. **Gerar versões otimizadas** de casos de teste automaticamente
4. **Fornecer feedback detalhado** sobre conformidade com boas práticas
5. **Apoiar desenvolvedores e testers** na criação de testes mais manteníveis e modulares

---

## 🏗️ Arquitetura do Sistema

Este projeto é composto por duas aplicações que trabalham em conjunto:

### Backend (API)
- **Tecnologia**: Node.js/Express
- **Função**: Servidor que atua como intermediário com a OpenAI Assistants API
- **Modelo IA**: GPT-4 Turbo configurado especificamente para análise de testes

### Frontend (Interface Web)
- **Tecnologia**: Vue.js 3 + Vite + Tailwind CSS
- **Função**: Interface intuitiva para submissão e visualização de resultados

---

## ✨ Funcionalidades Principais

- ✅ **Avaliação automática** de código de teste em múltiplas linguagens (Python, Java, JavaScript, C++, etc.)
- ✅ **Análise baseada em 25 boas práticas** validadas academicamente
- ✅ **Compliance Score** - Pontuação de conformidade geral e por categoria
- ✅ **Breakdown detalhado** - Análise prática por prática (✔️ Cumprida / ❌ Não cumprida / ⚪ Não aplicável)
- ✅ **Geração inteligente** de código de teste otimizado
- ✅ **Explicações contextuais** sobre violações e melhorias
- ✅ **Interface responsiva** e intuitiva
- ✅ **Cópia rápida** do código sugerido

## 🏗️ Arquitetura do Sistema

### Visão Geral

```
┌─────────────────────────────────────────────────────────────┐
│                    USUÁRIO (Tester/Dev)                     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              FRONTEND (Vue.js 3 + Tailwind)                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  • Interface de entrada de código                   │   │
│  │  • Visualização de resultados                       │   │
│  │  • Breakdown de práticas (CS + LS)                  │   │
│  │  • Exibição de código otimizado                     │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              BACKEND (Node.js + Express)                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  • Gerenciamento de threads OpenAI                  │   │
│  │  • Envio de mensagens ao assistente                 │   │
│  │  • Processamento de respostas                       │   │
│  │  • Validação de JSON                                │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │ OpenAI API
                         ▼
┌─────────────────────────────────────────────────────────────┐
│           OPENAI ASSISTANTS API (GPT-4 Turbo)               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  • Análise de código de teste                       │   │
│  │  • Comparação com 25 boas práticas                  │   │
│  │  • Cálculo de Compliance Score                      │   │
│  │  • Geração de código otimizado                      │   │
│  │  • Explicações contextuais                          │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Estrutura de Diretórios

```
villota-practices/
├── 📄 README.md                    # Documentação principal
├── 📄 QUICK_START.md               # Guia rápido de início
├── 📄 CHANGELOG.md                 # Registro de mudanças
├── 📄 docker-compose.yml           # Orquestração Docker
├── 📄 .env.example                 # Template de variáveis de ambiente
│
├── 📁 api-practices/               # Backend (Node.js + Express)
│   ├── 📄 server.js               # Servidor principal com rotas da API
│   ├── 📄 package.json            # Dependências do backend
│   ├── 📄 Dockerfile              # Configuração Docker do backend
│   ├── 📄 .env.example            # Template de variáveis de ambiente
│   └── 📄 .gitignore              # Arquivos ignorados pelo Git
│
└── 📁 code-evaluator/             # Frontend (Vue.js 3)
    ├── 📁 src/
    │   ├── 📄 App.vue             # Componente raiz
    │   ├── 📄 main.js             # Ponto de entrada da aplicação
    │   ├── 📁 components/
    │   │   └── 📄 CodeEvaluator.vue  # Componente principal de avaliação
    │   ├── 📁 router/
    │   │   └── 📄 index.js        # Configuração de rotas
    │   └── 📁 assets/             # Recursos estáticos (CSS, imagens)
    ├── 📁 public/                 # Arquivos públicos
    ├── 📄 package.json            # Dependências do frontend
    ├── 📄 Dockerfile              # Build multi-stage com Nginx
    ├── 📄 nginx.conf              # Configuração do servidor web
    ├── 📄 .env.example            # Template de variáveis de ambiente
    └── 📄 vite.config.js          # Configuração do Vite
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
- **Node.js 18** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **OpenAI SDK** - Integração com GPT-4 Turbo
- **CORS** - Controle de acesso entre origens
- **dotenv** - Gerenciamento de variáveis de ambiente

### Frontend
- **Vue.js 3** - Framework progressivo JavaScript
- **Vite** - Build tool de nova geração
- **Tailwind CSS** - Framework CSS utility-first
- **Axios** - Cliente HTTP
- **Vue Router** - Roteamento oficial do Vue
- **Prism.js** - Syntax highlighting para código

### DevOps
- **Docker** - Containerização
- **Docker Compose** - Orquestração multi-container
- **Nginx** - Servidor web de alta performance

---

## 📝 As 25 Boas Práticas Implementadas

### Fundamentação

As práticas implementadas nesta ferramenta são resultado de:
1. **Revisão Sistemática da Literatura** - 103 estudos primários analisados
2. **Validação empírica** - Pesquisa com testers profissionais
3. **Classificação e priorização** - Baseada em relevância e aplicabilidade

### Categorias

#### 🔵 Common Sense Practices (CS) - 14 práticas

Práticas fundamentais validadas pela experiência da indústria:

| ID | Prática | Foco |
|---|---|---|
| **CS-01** | Especificação Atômica de Casos de Teste | Cada teste deve focar em um único requisito |
| **CS-02** | Independência Completa de Casos de Teste | Testes não devem depender uns dos outros |
| **CS-03** | Cobertura de Fluxos Normais e Excepcionais | Testar cenários normais e casos extremos |
| **CS-04** | Análise de Valores Limite | Validar entradas nos limites mínimo/máximo |
| **CS-05** | Modularidade Completa de Casos de Teste | Testes auto-contidos e reutilizáveis |
| **CS-06** | Análise Detalhada de Tamanho e Complexidade | Manter testes pequenos e focados |
| **CS-07** | Design Complexo para Detecção de Falhas | Alguns testes complexos são necessários |
| **CS-08** | Manutenção Completa do Código de Teste | Código de teste deve ser mantido regularmente |
| **CS-09** | Rastreabilidade Completa de Casos de Teste | Cada teste vinculado a um requisito |
| **CS-10** | Uso Rigoroso de Testes de Performance e Segurança | Testes não-funcionais separados |
| **CS-11** | Revisão Regular de Casos de Teste | Revisão periódica para acompanhar mudanças |
| **CS-12** | Compreensão Clara de Casos de Teste | Propósito claro e inequívoco |
| **CS-13** | Cobertura Estruturada do Processo de Teste | Abordagens estruturadas de integração |
| **CS-14** | Garantia Completa da Qualidade do Código de Teste | Uso de métricas de cobertura |

#### 🟢 Literature Supported Practices (LS) - 11 práticas

Práticas respaldadas por pesquisas acadêmicas:

| ID | Prática | Foco |
|---|---|---|
| **LS-01** | Utilização Adequada de Cobertura de Código | Alta cobertura ≠ testes efetivos |
| **LS-02** | Utilização Necessária de Testes Ausentes | Identificar e criar testes faltantes |
| **LS-03** | Utilização Eficiente de Cobertura de Código | Incluir padrões de falha e casos extremos |
| **LS-04** | Pegada Pequena de Geração de Código de Teste | Testes devem executar rapidamente |
| **LS-05** | Priorização Completa do Design de Casos de Teste | Priorizar baseado em requisitos |
| **LS-06** | Adição Responsável de Manutenção de Código de Teste | Manter suite atualizada com bugs corrigidos |
| **LS-07** | Utilização Adequada de Asserções de Teste | Usar asserções efetivamente |
| **LS-08** | Adição Responsável de Comentários de Depuração | Documentar padrões de falha |
| **LS-09** | Design Determinístico de Resultados de Teste | Mesmos inputs = mesmos resultados |
| **LS-10** | Evitar Completamente Efeitos Colaterais de Teste | Não modificar estado compartilhado |
| **LS-11** | Utilização Adequada de Rótulos e Categorias | Organizar testes com labels |

### Metodologia de Avaliação

Para cada caso de teste submetido, o assistente de IA:

1. **Analisa o código** linha por linha
2. **Compara** com cada uma das 25 práticas
3. **Classifica** cada prática como:
   - ✔️ **Cumprida** - A prática está sendo seguida
   - ❌ **Não cumprida** - A prática está sendo violada
   - ⚪ **Não aplicável** - A prática não se aplica ao contexto
4. **Calcula** o Compliance Score: `(Práticas cumpridas / 25) × 100`
5. **Gera** uma versão otimizada do código
6. **Explica** cada violação e melhoria sugerida

> 📖 **Para detalhes completos de cada prática com exemplos**, consulte [PRACTICES.md](PRACTICES.md)

---

## 🎓 Contribuição Acadêmica

Esta ferramenta representa uma ponte entre:
- **Teoria** - Boas práticas consolidadas da literatura
- **Prática** - Aplicação real através de IA generativa

### Aportes Principais

1. **Marco teórico validado** - Catálogo de boas práticas inexistente até agora
2. **Ferramenta inovadora** - Combina avaliação + geração inteligente
3. **Evidência empírica** - Validação com projetos reais
4. **Apoio automatizado** - Reduz barreira de entrada para testes de qualidade

### Publicações Relacionadas

Esta ferramenta é parte da pesquisa de doutorado em andamento na UFSCar. Publicações e resultados serão disponibilizados conforme o progresso da pesquisa.

## 🤝 Contribuindo

Contribuições são bem-vindas! Esta é uma ferramenta de pesquisa em desenvolvimento ativo.

### Como Contribuir

- 🐛 **Reportar bugs** - Abra uma issue detalhando o problema
- 💡 **Sugerir funcionalidades** - Proponha melhorias baseadas em evidências
- 📖 **Melhorar documentação** - Ajude a tornar o projeto mais acessível
- 🔬 **Validação empírica** - Compartilhe resultados de uso em projetos reais
- 🧪 **Casos de teste** - Contribua com exemplos de boas/más práticas

### Diretrizes

- Mantenha a coerência com a fundamentação teórica
- Cite fontes acadêmicas quando aplicável
- Priorize evidências empíricas sobre opiniões
- Respeite as 25 práticas fundamentais implementadas

---

## 📚 Referências Acadêmicas

### Tese Principal

**Villota Ibarra, C. H.** (Em andamento). *Towards a strategy and tool support for test generation based on good software testing practices: classification and prioritization*. Tese de Doutorado, Universidade Federal de São Carlos (UFSCar), São Carlos, Brasil.

### Fundamentação Teórica

A ferramenta está baseada em:
- **Revisão Sistemática da Literatura** - 103 estudos primários sobre boas práticas de teste
- **Validação empírica** - Pesquisa com testers profissionais da indústria
- **Experimentação controlada** - Avaliação com 16 projetos Java reais

### Metodologia

- **Classificação de práticas** - Taxonomia estruturada (code-oriented vs no-code-oriented)
- **Priorização** - Baseada em clareza, relevância e aplicabilidade
- **Validação** - Comparação de qualidade antes/depois da otimização por IA

---

## 📄 Licença

Este projeto foi desenvolvido para fins de **pesquisa acadêmica** na **Universidade Federal de São Carlos (UFSCar)**.

### Uso Acadêmico

- ✅ Permitido para pesquisa e educação
- ✅ Citação obrigatória em trabalhos derivados
- ✅ Modificações devem manter referência ao trabalho original

### Uso Comercial

Para uso comercial ou industrial, entre em contato com os autores.

---

## 👥 Equipe de Pesquisa

### Autor Principal
**Camilo Hernán Villota Ibarra**
Doutorando em Ciência da Computação
Universidade Federal de São Carlos (UFSCar)
📧 [Contato via GitHub Issues]

### Orientação
**Prof. Dr. Auri Marcelo Rizzo Vincenzi** - Orientador
**Prof. Dr. José Carlos Maldonado** - Co-orientador

### Colaboração
**Pedro Henrique Kuroishi** - Colaboração Conceitual

---

## 📞 Suporte e Contato

### Para Questões Técnicas
- 🐛 Abra uma **issue** no repositório
- 📖 Consulte a documentação completa (README.md, QUICK_START.md)
- 🔍 Verifique a seção de **Troubleshooting**

### Para Colaboração Acadêmica
- 📧 Entre em contato através do repositório
- 🎓 Cite este trabalho em suas pesquisas
- 🤝 Proponha colaborações de pesquisa

### Para Uso Industrial
- 💼 Entre em contato para discutir casos de uso
- 📊 Compartilhe resultados de validação
- 🔬 Participe de estudos empíricos

---

## ⚠️ Notas Importantes

### Sobre a API OpenAI

Este projeto utiliza a **OpenAI API**, que é um **serviço pago**:
- 💰 Monitore seu uso em: [platform.openai.com/usage](https://platform.openai.com/usage)
- 🔑 Mantenha sua API key segura (nunca commite no Git)
- 📊 Modelo utilizado: **GPT-4 Turbo** (custo por token)

### Sobre os Resultados

- ⚠️ A ferramenta é um **apoio à decisão**, não substitui análise humana
- 🎯 Resultados dependem da qualidade do prompt e configuração do assistente
- 🔬 Validação contínua com casos reais é recomendada
- 📈 Feedback de uso ajuda a melhorar a ferramenta

---

## 🔮 Roadmap Futuro

### Curto Prazo
- [ ] Suporte para mais linguagens de programação
- [ ] Métricas adicionais de qualidade (mutation score, etc.)
- [ ] Integração com ferramentas de CI/CD
- [ ] API pública para integração

### Médio Prazo
- [ ] Expansão para as 40 práticas completas da tese
- [ ] Modo batch para análise de múltiplos arquivos
- [ ] Relatórios exportáveis (PDF, JSON)
- [ ] Dashboard de métricas históricas

### Longo Prazo
- [ ] Fine-tuning de modelo específico para testes
- [ ] Detecção automática de anti-patterns
- [ ] Sugestões de refatoração de suites completas
- [ ] Integração com IDEs (VS Code, IntelliJ)

---

## 🙏 Agradecimentos

- **UFSCar** - Universidade Federal de São Carlos
- **Programa de Pós-Graduação em Ciência da Computação**
- **Laboratório de Engenharia de Software**
- **OpenAI** - Pela disponibilização da API GPT-4 Turbo
- **Comunidade de testers** que participou da validação empírica

---

## 📖 Como Citar Este Trabalho

```bibtex
@phdthesis{villota2024tai,
  author = {Villota Ibarra, Camilo Hernán},
  title = {Towards a strategy and tool support for test generation based on good software testing practices: classification and prioritization},
  school = {Universidade Federal de São Carlos},
  year = {2024},
  address = {São Carlos, Brasil},
  note = {Tese de Doutorado em andamento}
}
```

---

**Desenvolvido com 🧪 na UFSCar | Pesquisa em Engenharia de Software e Qualidade de Testes**


