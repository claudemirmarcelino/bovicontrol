# 🔐 Configuração Rápida do .env

## ✅ Suas Credenciais do Supabase

Com base na string de conexão fornecida, suas credenciais são:

- **Host**: `db.wqdyunfchkonzpqngryh.supabase.co`
- **Porta**: `5432`
- **Database**: `postgres`
- **Usuário**: `postgres`
- **Senha**: `[YOUR_PASSWORD]` ← **Você precisa preencher esta senha**

## 📝 Passo a Passo

1. **Crie o arquivo `.env` na raiz do projeto `demo/`**

2. **Copie o conteúdo abaixo e cole no arquivo `.env`:**

```env
DB_URL=jdbc:postgresql://db.wqdyunfchkonzpqngryh.supabase.co:5432/postgres?sslmode=require
DB_USERNAME=postgres
DB_PASSWORD=SUA_SENHA_AQUI
```

3. **Substitua `SUA_SENHA_AQUI` pela senha real do seu Supabase**

   - A senha é a que você definiu quando criou o projeto no Supabase
   - Se não lembrar, você pode resetá-la no painel do Supabase:
     - Acesse: https://app.supabase.com
     - Vá em **Settings** → **Database** → **Database password**

4. **Salve o arquivo**

5. **Teste a conexão:**

```bash
cd demo
.\mvnw.cmd spring-boot:run
```

## ✅ O que você deve ver nos logs:

```
✅ Carregadas 3 variáveis do arquivo .env
🔍 Testando conexão com o banco de dados...
📍 URL: jdbc:postgresql://db.wqdyunfchkonzpqngryh.supabase.co:5432/postgres?sslmode=require
✅ Conexão com o banco de dados estabelecida com sucesso!
📊 Database: PostgreSQL
🔢 Versão: [versão do PostgreSQL]
Started DemoApplication in X.XXX seconds
```

## ❌ Se aparecer erro:

- **"Authentication failed"**: A senha está incorreta
- **"Connection refused"**: Verifique se o Supabase está ativo
- **"SSL required"**: A URL já inclui `?sslmode=require`, então não deve acontecer

## 🔒 Segurança

- O arquivo `.env` já está no `.gitignore` e **NÃO será commitado**
- **NUNCA** compartilhe sua senha publicamente
- Mantenha o arquivo `.env` apenas na sua máquina local

