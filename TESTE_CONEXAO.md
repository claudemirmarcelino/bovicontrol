# 🧪 Teste de Conexão com Banco de Dados

## ✅ O que foi implementado

1. **Entidade Usuario** (`Entity/Usuario.java`)
   - Campos: id, username, email, password, nome, telefone, dataCriacao
   - Tabela: `usuario`

2. **Repository** (`repository/UsuarioRepository.java`)
   - Métodos para buscar por username e email
   - Verificação de existência

3. **Service** (`service/UsuarioService.java`)
   - Criação de usuário com validação de duplicatas
   - Busca por username e email

4. **Controller atualizado** (`controller/AuthController.java`)
   - `/auth/register` agora salva no banco
   - `/auth/login` agora busca no banco

## 🔍 Como testar a conexão

### 1. Verificar se o .env está configurado

```powershell
cd C:\mobile\controlbovi\demo
Get-Content .env
```

Deve mostrar:
```
DB_URL=jdbc:postgresql://db.wqdyunfchkonzpqngryh.supabase.co:5432/postgres?sslmode=require
DB_USERNAME=postgres
DB_PASSWORD=sua_senha
```

### 2. Rodar o backend

```powershell
cd C:\mobile\controlbovi\demo
.\mvnw.cmd spring-boot:run -DskipTests
```

### 3. Verificar nos logs

Você deve ver:
```
✅ Carregadas 3 variáveis do arquivo .env
🔍 Testando conexão com o banco de dados...
✅ Conexão com o banco de dados estabelecida com sucesso!
📊 Database: PostgreSQL
```

E depois:
```
Hibernate: create table usuario (...)
```

### 4. Verificar no Supabase

1. Acesse: https://app.supabase.com
2. Vá em **Table Editor**
3. Deve aparecer a tabela `usuario` com as colunas:
   - id (bigint, primary key)
   - username (varchar, unique)
   - email (varchar, unique)
   - password (varchar)
   - nome (varchar)
   - telefone (varchar)
   - data_criacao (timestamp)

### 5. Testar o endpoint de cadastro

```powershell
curl -X POST http://localhost:8080/auth/register `
  -H "Content-Type: application/json" `
  -d '{\"username\":\"teste\",\"email\":\"teste@teste.com\",\"password\":\"1234\",\"nome\":\"Teste User\"}'
```

Deve retornar:
```json
{
  "message": "Conta criada com sucesso!",
  "username": "teste",
  "email": "teste@teste.com",
  "id": 1,
  "token": "..."
}
```

## ❌ Problemas comuns

### Erro: "Table 'usuario' doesn't exist"
- O Hibernate não criou a tabela
- Verifique se a conexão com o banco está funcionando
- Verifique os logs do Spring Boot para erros de SQL

### Erro: "Connection refused"
- O Supabase pode estar inativo
- Verifique se o host e porta estão corretos no .env

### Erro: "Authentication failed"
- Senha do banco está incorreta
- Verifique o .env

### Tabela não aparece no Supabase
- Aguarde alguns segundos após iniciar o backend
- Recarregue a página do Supabase
- Verifique se está no projeto correto

