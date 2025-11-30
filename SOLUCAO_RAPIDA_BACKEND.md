# ⚡ Solução Rápida: Backend Não Funciona

## 🔴 Problema Atual
- Backend não está respondendo na porta 8080
- Processos Java rodam mas não respondem
- Health check falha

## ✅ Solução Passo a Passo

### 1. Parar Tudo e Limpar

```powershell
cd C:\mobile\controlbovi\demo

# Parar processos Java
Get-Process java -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 3

# Limpar build
.\mvnw.cmd clean
```

### 2. Verificar Configuração

```powershell
# Verificar .env
Get-Content .env

# Deve mostrar:
# DB_URL=jdbc:postgresql://aws-1-sa-east-1.pooler.supabase.com:6543/postgres
# DB_USERNAME=postgres.wqdyunfchkonzpqngryh
# DB_PASSWORD=Touro-122422
```

### 3. Iniciar Backend e Observar Logs

```powershell
.\mvnw.cmd spring-boot:run -DskipTests
```

**OBSERVE OS LOGS!** Procure por:

#### ✅ Se funcionar, você verá:
```
✅ Carregadas 3 variáveis do arquivo .env
🔍 Testando conexão com o banco de dados...
✅ Conexão com o banco de dados estabelecida com sucesso!
Started DemoApplication in X.XXX seconds
```

#### ❌ Se houver erro, você verá:
```
❌ Erro ao conectar com o banco de dados
Connection refused
Timeout
Authentication failed
```

### 4. Se o Backend Iniciar Mas Não Responder

**Verificar porta:**
```powershell
netstat -ano | findstr :8080
```

**Testar health:**
```powershell
Invoke-WebRequest -Uri http://localhost:8080/health
```

**Verificar firewall:**
```powershell
netsh advfirewall firewall show rule name=all | findstr 8080
```

## 🔍 Problemas Comuns e Soluções

### Problema 1: Backend trava na conexão com banco

**Sintoma:** Backend inicia mas trava em "Testando conexão com o banco de dados..."

**Solução:**
1. Verificar se o Supabase está ativo
2. Verificar credenciais no .env
3. Testar conexão diretamente no Supabase

### Problema 2: Porta 8080 já em uso

**Sintoma:** "Port already in use" ou porta não responde

**Solução:**
```powershell
# Encontrar processo usando porta 8080
netstat -ano | findstr :8080

# Matar processo (substitua <PID> pelo número)
taskkill /PID <PID> /F
```

### Problema 3: Erro de autenticação no banco

**Sintoma:** "Authentication failed" ou "Password authentication failed"

**Solução:**
1. Verificar senha no .env
2. Verificar se o usuário está correto
3. Verificar se o Supabase permite conexões externas

### Problema 4: Timeout na conexão

**Sintoma:** "Connection timeout" ou demora muito para conectar

**Solução:**
1. Verificar conexão com internet
2. Verificar se o Supabase está acessível
3. Aumentar timeout no application.properties

## 🎯 Solução Alternativa: Usar Modo Desenvolvimento

Se o backend continuar com problemas, você pode usar o app em modo desenvolvimento:

1. No app, ao tentar cadastrar, aparecerá o erro de conexão
2. Clique em "CONTINUAR SEM SERVIDOR"
3. O app funcionará sem backend (não salva no banco, mas permite testar)

## 📞 Próximos Passos

1. **Execute os comandos acima**
2. **Observe os logs cuidadosamente**
3. **Anote qualquer erro que aparecer**
4. **Teste o health endpoint após iniciar**

## 🔧 Script Automático

Use o script `INICIAR_BACKEND_CORRETO.ps1`:

```powershell
cd C:\mobile\controlbovi\demo
.\INICIAR_BACKEND_CORRETO.ps1
```

Este script:
- Para processos antigos
- Verifica .env
- Verifica porta 8080
- Inicia o backend

