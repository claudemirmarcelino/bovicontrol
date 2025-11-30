# 🔧 Solução para Cadastro Travando

## ✅ O que foi corrigido

### 1. **Timeout na requisição**
- ✅ Adicionado timeout de 10 segundos na requisição de cadastro
- ✅ Se a requisição demorar mais que 10s, cancela e mostra erro

### 2. **Health check antes de cadastrar**
- ✅ Agora verifica se o backend está acessível antes de tentar cadastrar
- ✅ Timeout de 5 segundos no health check
- ✅ Se o backend não estiver acessível, mostra erro claro

### 3. **Melhor tratamento de erros**
- ✅ Mensagens de erro mais claras
- ✅ Logs no console para debug
- ✅ Tratamento específico para timeout, conexão e outros erros

### 4. **Logs no backend**
- ✅ Adicionados logs no `AuthController` e `UsuarioService`
- ✅ Facilita identificar onde está travando

## 🚀 Como testar

### Passo 1: Iniciar o backend

```powershell
cd C:\mobile\controlbovi\demo
.\mvnw.cmd spring-boot:run -DskipTests
```

**Aguarde até ver:**
```
✅ Conexão com o banco de dados estabelecida com sucesso!
Started DemoApplication in X.XXX seconds
```

### Passo 2: Verificar se o backend está acessível

No app, ao tentar cadastrar, você verá:
- Se o backend estiver rodando: `✅ Backend está acessível`
- Se não estiver: `❌ Erro ao conectar com backend` com mensagem clara

### Passo 3: Testar o cadastro

1. Abra o app
2. Vá em "Criar conta"
3. Preencha os campos
4. Clique em "Criar Conta"

**Comportamento esperado:**
- Se backend estiver rodando: Cadastra e faz login automático
- Se não estiver: Mostra erro claro em até 5 segundos (não fica travado)

## 📋 Logs para debug

### No app (console do Expo):
```
🔍 Testando conexão com backend...
✅ Backend está acessível
📝 Tentando criar conta...
✅ Conta criada com sucesso: {...}
```

### No backend (terminal):
```
📝 [REGISTER] Recebida requisição de cadastro
📝 [REGISTER] Username: teste
📝 [REGISTER] Email: teste@teste.com
🔄 [REGISTER] Tentando criar usuário no banco...
🔄 [SERVICE] Verificando se username já existe: teste
🔄 [SERVICE] Verificando se email já existe: teste@teste.com
🔄 [SERVICE] Criando novo usuário...
🔄 [SERVICE] Salvando usuário no banco...
✅ [SERVICE] Usuário salvo com ID: 1
✅ [REGISTER] Usuário criado com sucesso! ID: 1
✅ [REGISTER] Token gerado e resposta enviada
```

## ❌ Problemas comuns

### Problema: "Não foi possível conectar ao servidor"

**Causa:** Backend não está rodando

**Solução:**
1. Inicie o backend: `.\mvnw.cmd spring-boot:run -DskipTests`
2. Aguarde até ver a mensagem de sucesso
3. Tente novamente no app

### Problema: "Timeout - A requisição demorou muito"

**Causa:** Backend está rodando mas não está respondendo

**Soluções:**
1. Verifique se há erros no terminal do backend
2. Verifique se o banco de dados está acessível
3. Verifique se a porta 8080 está livre
4. Reinicie o backend

### Problema: "Username já está em uso"

**Causa:** Normal! O username já foi cadastrado

**Solução:**
- Use outro username ou email

### Problema: Ainda fica travado

**Soluções:**
1. Verifique os logs no console do Expo
2. Verifique os logs no terminal do backend
3. Verifique se o `EXPO_PUBLIC_API_URL` está configurado corretamente
4. Tente reiniciar o app (shake device > Reload)

## 🔍 Verificar configuração

### Verificar URL da API no app:

No terminal do Expo, você deve ver algo como:
```
EXPO_PUBLIC_API_URL=http://192.168.1.100:8080
```

Se estiver como `localhost` ou `127.0.0.1`, o app não conseguirá conectar do celular.

### Verificar se o backend está rodando:

```powershell
Invoke-WebRequest -Uri http://localhost:8080/health -Method GET
```

Deve retornar:
```json
{"status":"UP","message":"Backend está funcionando!"}
```

