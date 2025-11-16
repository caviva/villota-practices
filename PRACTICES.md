# 📋 Detalhamento das 25 Boas Práticas de Testes

Este documento detalha as **25 boas práticas** implementadas na ferramenta **TAI-EvalGenTCS**, baseadas na pesquisa de doutorado conduzida na UFSCar.

---

## 🔵 Common Sense Practices (CS)

Práticas fundamentais validadas pela experiência da indústria de software.

### CS-01: Especificação Atômica de Casos de Teste
**Princípio**: Cada teste deve focar em um único requisito ou comportamento.

**Por quê?**
- Facilita identificação de falhas
- Evita falsos positivos/negativos
- Melhora manutenibilidade

**Exemplo de violação**:
```java
@Test
public void testUserOperations() {
    // Testa criação, atualização E exclusão no mesmo teste
    createUser();
    updateUser();
    deleteUser();
}
```

**Exemplo correto**:
```java
@Test
public void testCreateUser() { /* ... */ }

@Test
public void testUpdateUser() { /* ... */ }

@Test
public void testDeleteUser() { /* ... */ }
```

---

### CS-02: Independência Completa de Casos de Teste
**Princípio**: Testes não devem depender da execução de outros testes.

**Por quê?**
- Permite execução em qualquer ordem
- Facilita paralelização
- Reduz efeitos colaterais

**Exemplo de violação**:
```java
@Test
public void test1_createUser() {
    user = new User("John");
}

@Test
public void test2_updateUser() {
    user.setName("Jane"); // Depende de test1
}
```

**Exemplo correto**:
```java
@Test
public void testUpdateUser() {
    User user = new User("John"); // Setup próprio
    user.setName("Jane");
    assertEquals("Jane", user.getName());
}
```

---

### CS-03: Cobertura de Fluxos Normais e Excepcionais
**Princípio**: Testar tanto cenários normais quanto casos extremos e exceções.

**Por quê?**
- Garante robustez
- Detecta edge cases
- Valida tratamento de erros

**Exemplo**:
```java
@Test
public void testDivision_normalCase() {
    assertEquals(2.0, calculator.divide(10, 5));
}

@Test(expected = ArithmeticException.class)
public void testDivision_divideByZero() {
    calculator.divide(10, 0);
}
```

---

### CS-04: Análise de Valores Limite
**Princípio**: Validar entradas nos limites mínimo, máximo e logo fora deles.

**Por quê?**
- Erros frequentemente ocorrem nos limites
- Detecta off-by-one errors
- Valida condições de contorno

**Exemplo**:
```java
@Test
public void testAgeValidation() {
    assertTrue(isValidAge(0));    // Mínimo
    assertTrue(isValidAge(120));  // Máximo
    assertFalse(isValidAge(-1));  // Abaixo do mínimo
    assertFalse(isValidAge(121)); // Acima do máximo
}
```

---

### CS-05: Modularidade Completa de Casos de Teste
**Princípio**: Testes devem ser auto-contidos e reutilizáveis.

**Por quê?**
- Facilita manutenção
- Permite reutilização
- Melhora legibilidade

---

### CS-06: Análise Detalhada de Tamanho e Complexidade
**Princípio**: Manter testes pequenos e focados.

**Por quê?**
- Testes grandes são difíceis de entender
- Complexidade dificulta debugging
- Testes simples são mais confiáveis

---

### CS-07: Design Complexo para Detecção de Falhas
**Princípio**: Alguns testes complexos são necessários para detectar problemas profundos.

**Por quê?**
- Bugs complexos requerem testes complexos
- Integração de múltiplos componentes
- Balancear com CS-06

---

### CS-08: Manutenção Completa do Código de Teste
**Princípio**: Código de teste deve ser mantido com a mesma qualidade do código de produção.

**Por quê?**
- Testes desatualizados são inúteis
- Refatoração deve incluir testes
- Qualidade do teste = qualidade do produto

---

### CS-09: Rastreabilidade Completa de Casos de Teste
**Princípio**: Cada teste deve estar vinculado a um requisito específico.

**Por quê?**
- Facilita análise de impacto
- Melhora gerenciamento de mudanças
- Garante cobertura de requisitos

**Exemplo**:
```java
/**
 * Testa o requisito REQ-001: Sistema deve validar email
 * @requirement REQ-001
 */
@Test
public void testEmailValidation_REQ001() { /* ... */ }
```

---

### CS-10: Uso Rigoroso de Testes de Performance e Segurança
**Princípio**: Testes não-funcionais devem ser separados dos funcionais.

**Por quê?**
- Requisitos diferentes
- Ferramentas específicas
- Execução em ambientes distintos

---

### CS-11: Revisão Regular de Casos de Teste
**Princípio**: Testes devem ser revisados periodicamente.

**Por quê?**
- Requisitos mudam
- Código evolui
- Testes obsoletos devem ser removidos

---

### CS-12: Compreensão Clara de Casos de Teste
**Princípio**: Cada teste deve ter propósito claro e inequívoco.

**Por quê?**
- Facilita manutenção
- Melhora comunicação
- Reduz ambiguidade

**Exemplo**:
```java
@Test
public void testUserRegistration_shouldSendWelcomeEmail() {
    // Nome descritivo + comentário claro
}
```

---

### CS-13: Cobertura Estruturada do Processo de Teste
**Princípio**: Usar abordagens estruturadas (top-down, bottom-up) para testes de integração.

---

### CS-14: Garantia Completa da Qualidade do Código de Teste
**Princípio**: Usar métricas de cobertura, mas não depender apenas delas.

**Por quê?**
- 100% cobertura ≠ 100% qualidade
- Métricas são indicadores, não garantias
- Qualidade > quantidade

---

## 🟢 Literature Supported Practices (LS)

Práticas respaldadas por pesquisas acadêmicas e evidências empíricas.

### LS-01: Utilização Adequada de Cobertura de Código
**Princípio**: Alta cobertura não significa necessariamente testes efetivos.

**Por quê?**
- Cobertura mede execução, não qualidade
- Possível ter 100% cobertura com asserções fracas
- Foco deve ser em qualidade, não apenas quantidade

**Exemplo de problema**:
```java
@Test
public void testCalculator() {
    calculator.add(2, 2); // Executa o código
    // Sem asserção! Cobertura alta, qualidade baixa
}
```

**Exemplo correto**:
```java
@Test
public void testCalculator() {
    int result = calculator.add(2, 2);
    assertEquals(4, result); // Valida o comportamento
}
```

---

### LS-02: Utilização Necessária de Testes Ausentes
**Princípio**: Identificar gaps na cobertura e criar testes faltantes.

**Por quê?**
- Código não testado é código não confiável
- Bugs frequentemente aparecem em áreas não testadas
- Análise de gaps é essencial

**Estratégia**:
1. Analisar relatórios de cobertura
2. Identificar branches não testados
3. Priorizar baseado em criticidade
4. Criar testes para gaps importantes

---

### LS-03: Utilização Eficiente de Cobertura de Código
**Princípio**: Cobertura deve incluir padrões de falha e casos extremos.

**Por quê?**
- Não basta executar o código
- Necessário testar condições de erro
- Edge cases revelam bugs ocultos

**Exemplo**:
```java
@Test
public void testStringProcessing_emptyString() { /* ... */ }

@Test
public void testStringProcessing_nullString() { /* ... */ }

@Test
public void testStringProcessing_veryLongString() { /* ... */ }

@Test
public void testStringProcessing_specialCharacters() { /* ... */ }
```

---

### LS-04: Pegada Pequena de Geração de Código de Teste
**Princípio**: Testes devem executar rapidamente e evitar computações desnecessárias.

**Por quê?**
- Testes lentos desencorajam execução frequente
- Feedback rápido é essencial
- Suites grandes devem executar em minutos, não horas

**Boas práticas**:
- Usar mocks para dependências externas
- Evitar I/O desnecessário
- Paralelizar quando possível
- Separar testes unitários de integração

---

### LS-05: Priorização Completa do Design de Casos de Teste
**Princípio**: Priorizar testes baseado em requisitos funcionais e não-funcionais.

**Por quê?**
- Recursos limitados
- Alguns testes são mais críticos
- ROI de testes varia

**Critérios de priorização**:
1. Criticidade do requisito
2. Frequência de uso
3. Histórico de bugs
4. Complexidade do código
5. Impacto de falhas

---

### LS-06: Adição Responsável de Manutenção de Código de Teste
**Princípio**: Manter suite atualizada com bugs corrigidos (regression tests).

**Por quê?**
- Bugs corrigidos podem reaparecer
- Testes de regressão previnem reintrodução
- Documentam comportamento esperado

**Processo**:
1. Bug reportado
2. Criar teste que reproduz o bug
3. Corrigir o bug
4. Teste passa
5. Teste permanece na suite

---

### LS-07: Utilização Adequada de Asserções de Teste
**Princípio**: Usar asserções efetivamente para detectar falhas sutis.

**Por quê?**
- Asserções são o coração dos testes
- Asserções fracas não detectam problemas
- Múltiplas asserções podem ser necessárias

**Exemplo**:
```java
@Test
public void testUserCreation() {
    User user = service.createUser("John", "john@example.com");

    // Múltiplas asserções para validação completa
    assertNotNull(user);
    assertNotNull(user.getId());
    assertEquals("John", user.getName());
    assertEquals("john@example.com", user.getEmail());
    assertTrue(user.isActive());
}
```

---

### LS-08: Adição Responsável de Comentários de Depuração
**Princípio**: Documentar padrões de falha e comportamentos esperados.

**Por quê?**
- Facilita debugging
- Explica intenção do teste
- Ajuda futuros mantenedores

**Exemplo**:
```java
@Test
public void testConcurrentAccess() {
    // Bug #1234: Sistema travava com acessos simultâneos
    // Este teste garante que o lock funciona corretamente
    // Esperado: Ambas threads completam sem deadlock

    Thread t1 = new Thread(() -> service.process());
    Thread t2 = new Thread(() -> service.process());

    t1.start();
    t2.start();
    t1.join();
    t2.join();

    // Ambas devem completar em menos de 5 segundos
}
```

---

### LS-09: Design Determinístico de Resultados de Teste
**Princípio**: Testes devem sempre retornar os mesmos resultados dados os mesmos inputs.

**Por quê?**
- Testes flaky são inúteis
- Não-determinismo dificulta debugging
- Confiança na suite de testes

**Causas comuns de não-determinismo**:
- Dependência de tempo (timestamps, delays)
- Concorrência não controlada
- Estado global compartilhado
- Ordem de execução
- Dependências externas

**Solução**:
```java
@Test
public void testTimestamp() {
    // Ruim: Depende do tempo real
    // long timestamp = System.currentTimeMillis();

    // Bom: Usa mock ou valor fixo
    Clock fixedClock = Clock.fixed(Instant.parse("2024-01-01T00:00:00Z"), ZoneId.of("UTC"));
    long timestamp = fixedClock.millis();
}
```

---

### LS-10: Evitar Completamente Efeitos Colaterais de Teste
**Princípio**: Testes não devem modificar estado compartilhado ou causar dependências.

**Por quê?**
- Efeitos colaterais causam falhas intermitentes
- Dificulta paralelização
- Viola independência (CS-02)

**Boas práticas**:
- Usar `@Before` e `@After` para setup/cleanup
- Isolar dados de teste
- Evitar modificar variáveis estáticas
- Usar bancos de dados em memória

**Exemplo**:
```java
@Before
public void setUp() {
    database = new InMemoryDatabase();
    service = new UserService(database);
}

@After
public void tearDown() {
    database.clear();
    database = null;
}
```

---

### LS-11: Utilização Adequada de Rótulos e Categorias
**Princípio**: Organizar testes com labels e categorias.

**Por quê?**
- Facilita execução seletiva
- Permite separar testes rápidos/lentos
- Melhora organização da suite

**Exemplo (JUnit)**:
```java
@Category(UnitTest.class)
@Test
public void testBusinessLogic() { /* ... */ }

@Category(IntegrationTest.class)
@Test
public void testDatabaseIntegration() { /* ... */ }

@Category({SlowTest.class, IntegrationTest.class})
@Test
public void testFullWorkflow() { /* ... */ }
```

---

## 📊 Metodologia de Avaliação

A ferramenta TAI-EvalGenTCS avalia cada prática seguindo este processo:

1. **Análise de código** - Parser semântico do código de teste
2. **Comparação** - Verificação contra cada uma das 25 práticas
3. **Classificação** - ✔️ Cumprida / ❌ Não cumprida / ⚪ Não aplicável
4. **Pontuação** - Compliance Score = (Cumpridas / 25) × 100
5. **Explicação** - Descrição detalhada de violações
6. **Geração** - Código otimizado seguindo todas as práticas aplicáveis

---

## 🎓 Fundamentação Acadêmica

Estas práticas foram:
- ✅ Extraídas de **103 estudos primários** via Revisão Sistemática da Literatura
- ✅ Refinadas de **131 práticas** para **40 essenciais**
- ✅ Validadas empiricamente com **testers profissionais**
- ✅ Priorizadas baseado em **clareza, relevância e aplicabilidade**
- ✅ Implementadas em ferramenta baseada em **GPT-4 Turbo**

---

## 📚 Referências

Para mais detalhes sobre a fundamentação teórica, consulte:

**Villota Ibarra, C. H.** (Em andamento). *Towards a strategy and tool support for test generation based on good software testing practices: classification and prioritization*. Tese de Doutorado, Universidade Federal de São Carlos (UFSCar).

---

**Desenvolvido na UFSCar | Pesquisa em Engenharia de Software**

