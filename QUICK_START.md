# 🚀 Guia Rápido de Início

## Passos Rápidos para Executar o Projeto

### 1️⃣ Configure as Credenciais
```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione:
```env
OPENAI_API_KEY=sua-chave-aqui
ASSISTANT_ID=seu-assistant-id-aqui
```

### 2️⃣ Execute com Docker
```bash
docker-compose up -d
```

### 3️⃣ Acesse a Aplicação
Abra no navegador: **http://localhost**

---

## ⚡ Comandos Essenciais

| Comando | Descrição |
|---------|-----------|
| `docker-compose up -d` | Inicia os containers em background |
| `docker-compose down` | Para e remove os containers |
| `docker-compose logs -f` | Visualiza os logs em tempo real |
| `docker-compose ps` | Verifica o status dos containers |
| `docker-compose restart` | Reinicia os containers |

---

## 🔑 Onde Obter as Credenciais?

### OPENAI_API_KEY
1. Acesse: https://platform.openai.com/api-keys
2. Clique em "Create new secret key"
3. Copie a chave gerada

### ASSISTANT_ID
1. Acesse: https://platform.openai.com/playground
2. Vá em "Assistants" → "Create"
3. Configure conforme o README.md (seção "Configuração do OpenAI Assistant")
4. Copie o Assistant ID gerado

---

## ✅ Verificação Rápida

Após executar `docker-compose up -d`, verifique:

```bash
# Containers rodando?
docker-compose ps

# Logs sem erros?
docker-compose logs api
docker-compose logs frontend

# API respondendo?
curl http://localhost:3000/assistant

# Frontend acessível?
curl http://localhost
```

---

## 🆘 Problemas Comuns

**Porta 80 já em uso?**
```bash
# Pare o serviço que está usando a porta 80
# Ou edite docker-compose.yml para usar outra porta:
# ports:
#   - "8080:80"  # Acesse em http://localhost:8080
```

**Porta 3000 já em uso?**
```bash
# Edite docker-compose.yml:
# ports:
#   - "3001:3000"  # Backend na porta 3001
```

**Erro de credenciais?**
```bash
# Verifique se o .env está na raiz do projeto
ls -la .env

# Verifique o conteúdo
cat .env

# Reconstrua os containers
docker-compose down
docker-compose up -d --build
```

---

Para mais detalhes, consulte o **README.md** completo.

