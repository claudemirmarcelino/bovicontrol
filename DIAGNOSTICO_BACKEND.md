# 🔍 Diagnóstico do Backend

## Problemas Identificados

### 1. Backend não está respondendo
- ❌ Processos Java estão rodando mas não respondem na porta 8080
- ❌ Health check falha: "Impossível conectar-se ao servidor remoto"

### 2. Possíveis Causas

#### A. Backend travado na inicialização
- Pode estar travado tentando conectar ao banco
- Pode estar com erro silencioso
- Pode não ter iniciado completamente

#### B. Problema de conexão com banco
- Supabase pode estar inacessível
- Credenciais podem estar incorretas
- Timeout na conexão

#### C. Problema de porta
- Porta 8080 pode estar bloqueada
- Firewall pode estar bloqueando
- Outro processo pode estar usando a porta

## ✅ Soluções

### Solução 1: Reiniciar Backend Corretamente

```powershell
cd C:\mobile\controlbovi\demo

# 1. Parar todos os processos
Get-Process java -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 3

# 2. Verificar .env
Get-Content .env

# 3. Limpar e compilar
.\mvnw.cmd clean compile -DskipTests

# 4. Iniciar backend
.\mvnw.cmd spring-boot:run -DskipTests
```

### Solução 2: Verificar Logs

Quando iniciar o backend, procure por:

**✅ Logs de sucesso:**
```
✅ Carregadas 3 variáveis do arquivo .env
🔍 Testando conexão com o banco de dados...
✅ Conexão com o banco de dados estabelecida com sucesso!
Started DemoApplication in X.XXX seconds
```

**❌ Logs de erro:**
```
❌ Erro ao conectar com o banco de dados
❌ Connection refused
❌ Timeout
❌ Authentication failed
```

### Solução 3: Testar Conexão com Banco Separadamente

Se o backend não iniciar, pode ser problema de conexão com o Supabase.

**Verificar no Supabase:**
1. Acesse https://app.supabase.com
2. Verifique se o projeto está ativo
3. Verifique as credenciais de conexão
4. Teste a conexão pelo painel do Supabase

### Solução 4: Verificar Firewall

```powershell
# Verificar se a porta 8080 está bloqueada
netsh advfirewall firewall show rule name=all | findstr 8080
```

Se necessário, criar regra:
```powershell
netsh advfirewall firewall add rule name="Spring Boot 8080" dir=in action=allow protocol=TCP localport=8080
```

## 🔧 Comandos de Diagnóstico

### Verificar processos Java
```powershell
Get-Process java | Format-Table Id, ProcessName, StartTime, CPU, @{Name="Memory(MB)";Expression={[math]::Round($_.WorkingSet64/1MB,2)}}
```

### Verificar porta 8080
```powershell
netstat -ano | findstr :8080
```

### Testar health endpoint
```powershell
Invoke-WebRequest -Uri http://localhost:8080/health -Method GET
```

### Verificar logs do backend
Procure no terminal onde o backend está rodando por:
- Erros em vermelho
- Exceções
- Stack traces
- Mensagens de timeout

## 📝 Checklist de Verificação

- [ ] Processos Java foram parados completamente
- [ ] Arquivo .env existe e está correto
- [ ] Compilação sem erros
- [ ] Backend inicia sem erros
- [ ] Conexão com banco estabelecida
- [ ] Porta 8080 está livre
- [ ] Health endpoint responde
- [ ] Firewall não está bloqueando

## 🆘 Se Nada Funcionar

1. **Reiniciar computador** (às vezes resolve problemas de porta/firewall)
2. **Verificar logs completos** do Spring Boot
3. **Testar conexão com Supabase** diretamente
4. **Usar modo desenvolvimento** no app (sem backend)

