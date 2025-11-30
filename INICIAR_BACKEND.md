# 🚀 Como Iniciar o Backend Corretamente

## ❌ Problema Atual

O erro `AbortError: Aborted` significa que o backend não está respondendo na porta 8080.

## ✅ Solução Passo a Passo

### 1. **Parar Todos os Processos Java**

Abra um terminal PowerShell e execute:

```powershell
cd C:\mobile\controlbovi\demo
Get-Process java -ErrorAction SilentlyContinue | Stop-Process -Force
```

Aguarde 2-3 segundos.

### 2. **Verificar se a Porta 8080 Está Livre**

```powershell
netstat -ano | findstr :8080
```

Se aparecer algo, anote o PID e mate o processo:
```powershell
taskkill /PID <numero_do_pid> /F
```

### 3. **Verificar o Arquivo .env**

Certifique-se de que o arquivo `.env` existe e está correto:

```powershell
cd C:\mobile\controlbovi\demo
Get-Content .env
```

Deve mostrar:
```
DB_URL=jdbc:postgresql://...
DB_USERNAME=postgres.wqdyunfchkonzpqngryh
DB_PASSWORD=Touro-122422
```

### 4. **Iniciar o Backend**

```powershell
cd C:\mobile\controlbovi\demo
.\mvnw.cmd spring-boot:run -DskipTests
```

### 5. **Aguardar o Backend Iniciar**

Você deve ver no terminal:

```
✅ Carregadas 3 variáveis do arquivo .env
🔍 Testando conexão com o banco de dados...
✅ Conexão com o banco de dados estabelecida com sucesso!
📊 Database: PostgreSQL
...
Started DemoApplication in X.XXX seconds
```

**IMPORTANTE:** Aguarde até ver `Started DemoApplication` antes de testar no app!

### 6. **Testar se Está Funcionando**

Em outro terminal PowerShell:

```powershell
Invoke-WebRequest -Uri http://localhost:8080/health
```

Deve retornar:
```json
{"status":"UP","message":"Backend está funcionando!"}
```

### 7. **Testar no App**

Agora você pode testar o cadastro no app. O erro deve desaparecer.

## 🔍 Verificar Logs do Backend

Se o backend não iniciar, verifique os logs no terminal. Procure por:

- ❌ Erros em vermelho
- ❌ "Port already in use" (porta já em uso)
- ❌ Erros de conexão com banco de dados
- ❌ Erros de compilação

## 🆘 Problemas Comuns

### Problema: "Port 8080 already in use"

**Solução:**
```powershell
# Encontrar processo usando a porta
netstat -ano | findstr :8080

# Matar o processo (substitua <PID> pelo número)
taskkill /PID <PID> /F
```

### Problema: "Connection refused" no banco

**Solução:**
1. Verifique o arquivo `.env`
2. Verifique se o Supabase está ativo
3. Verifique se a senha está correta

### Problema: Backend inicia mas não responde

**Solução:**
1. Verifique se há erros nos logs
2. Tente acessar `http://localhost:8080/health` no navegador
3. Verifique o firewall do Windows

## 📝 Checklist Rápido

Antes de testar no app, verifique:

- [ ] Backend está rodando (`Started DemoApplication`)
- [ ] Backend responde em `http://localhost:8080/health`
- [ ] Não há erros vermelhos no terminal do backend
- [ ] Conexão com banco está OK (`✅ Conexão estabelecida`)
- [ ] Porta 8080 está livre

## 🎯 Comando Rápido (Tudo em Um)

```powershell
cd C:\mobile\controlbovi\demo
Get-Process java -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2
.\mvnw.cmd spring-boot:run -DskipTests
```

Aguarde o backend iniciar completamente antes de testar no app!

