# 🔧 Solução: Erro de Conexão no Cadastro

## ❌ Problema

O app mostra o erro:
```
Erro de Conexão
Não foi possível conectar ao servidor.
URL: http://192.168.1.100:8080
```

## ✅ Solução

### 1. **Iniciar o Backend**

O backend precisa estar rodando na porta 8080. Execute:

```powershell
cd C:\mobile\controlbovi\demo
.\mvnw.cmd spring-boot:run -DskipTests
```

**Aguarde até ver:**
```
✅ Conexão com o banco de dados estabelecida com sucesso!
Started DemoApplication in X.XXX seconds
```

### 2. **Verificar se o Backend Está Acessível**

Após iniciar, teste no navegador ou PowerShell:

```powershell
# Teste local
Invoke-WebRequest -Uri http://localhost:8080/health

# Teste na rede (substitua pelo seu IP)
Invoke-WebRequest -Uri http://192.168.1.100:8080/health
```

**Deve retornar:**
```json
{"status":"UP","message":"Backend está funcionando!"}
```

### 3. **Verificar Configuração do IP**

O app está configurado para usar `http://192.168.1.100:8080`. 

**Para verificar seu IP atual:**
```powershell
Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -ne '127.0.0.1' -and $_.IPAddress -notlike '169.254.*' } | Select-Object IPAddress
```

**Se o IP mudou, atualize no app:**
- No terminal do Expo, pressione `s` para abrir as configurações
- Ou configure a variável de ambiente `EXPO_PUBLIC_API_URL`

### 4. **Verificar Firewall**

O Windows Firewall pode estar bloqueando a porta 8080:

1. Abra "Firewall do Windows Defender"
2. Clique em "Configurações avançadas"
3. Verifique se há regra bloqueando a porta 8080
4. Se necessário, crie uma regra de entrada para a porta 8080

### 5. **Verificar Rede Wi-Fi**

- ✅ Celular e computador devem estar na **mesma rede Wi-Fi**
- ✅ Verifique se o IP do computador está correto
- ✅ Tente pingar o IP do computador pelo celular (se possível)

## 🔍 Debug

### Verificar se o backend está rodando:

```powershell
# Ver processos Java
Get-Process java -ErrorAction SilentlyContinue

# Ver se a porta 8080 está em uso
netstat -ano | findstr :8080
```

### Verificar logs do backend:

No terminal onde o backend está rodando, você deve ver:
```
✅ Carregadas 3 variáveis do arquivo .env
🔍 Testando conexão com o banco de dados...
✅ Conexão com o banco de dados estabelecida com sucesso!
```

### Testar endpoint manualmente:

```powershell
# Health check
curl http://localhost:8080/health

# Ou com PowerShell
Invoke-WebRequest -Uri http://localhost:8080/health -Method GET
```

## 🆘 Se Ainda Não Funcionar

### Opção 1: Usar Modo Desenvolvimento (sem backend)

O app tem um modo de desenvolvimento que funciona sem backend:
- Se a URL for `localhost` ou não estiver configurada, o app usa modo mock
- Funciona para testar a interface, mas não salva no banco

### Opção 2: Usar Tunnel do Expo

No terminal do Expo:
1. Pressione `s` para abrir configurações
2. Selecione `tunnel`
3. Isso cria um túnel que funciona mesmo em redes diferentes

### Opção 3: Verificar Logs

**No backend (terminal do Spring Boot):**
- Veja se há erros em vermelho
- Veja se a conexão com o banco está OK
- Veja se a porta 8080 está sendo usada

**No app (console do Expo):**
- Veja os logs de conexão
- Veja se há erros de rede

## 📝 Checklist

Antes de tentar cadastrar, verifique:

- [ ] Backend está rodando (`Started DemoApplication`)
- [ ] Backend responde em `http://localhost:8080/health`
- [ ] IP do computador está correto (não mudou)
- [ ] Celular e computador na mesma rede Wi-Fi
- [ ] Firewall não está bloqueando a porta 8080
- [ ] Expo está rodando e conectado

## 🎯 Solução Rápida

1. **Pare todos os processos Java:**
   ```powershell
   Get-Process java -ErrorAction SilentlyContinue | Stop-Process -Force
   ```

2. **Inicie o backend:**
   ```powershell
   cd C:\mobile\controlbovi\demo
   .\mvnw.cmd spring-boot:run -DskipTests
   ```

3. **Aguarde iniciar completamente** (veja a mensagem de sucesso)

4. **Teste no app novamente**

