# 🔧 Configuração do Banco de Dados (Supabase)

## ✅ Correções Aplicadas

- ✅ Adicionada dependência `spring-boot-starter-data-jpa` no `pom.xml`
- ✅ Adicionada dependência `postgresql` (driver JDBC) no `pom.xml`
- ✅ Criado `DotenvConfig.java` para carregar automaticamente o arquivo `.env`
- ✅ Criado `DatabaseConfig.java` para testar a conexão na inicialização
- ✅ Configurações de pool de conexão adicionadas
- ✅ Logs de debug habilitados para facilitar diagnóstico

## 📋 Pré-requisitos

1. Ter um projeto criado no Supabase
2. Obter as credenciais de conexão do banco
3. **Arquivo `.env` criado na raiz do projeto `demo/`**

## 🔑 Como Obter as Credenciais do Supabase

1. Acesse o painel do Supabase: https://app.supabase.com
2. Selecione seu projeto
3. Vá em **Settings** → **Database**
4. Na seção **Connection string**, copie a **URI** ou use as informações:
   - **Host**: encontrado na Connection string
   - **Port**: geralmente `5432`
   - **Database**: geralmente `postgres`
   - **User**: geralmente `postgres`
   - **Password**: sua senha do banco (definida na criação do projeto)

## 📝 Configuração do Arquivo .env

Crie um arquivo `.env` na raiz do projeto `demo/` com o seguinte conteúdo:

```env
# URL de conexão do Supabase
# Formato: jdbc:postgresql://[HOST]:[PORT]/postgres?sslmode=require
DB_URL=jdbc:postgresql://db.xxxxxxxxxxxxx.supabase.co:5432/postgres?sslmode=require

# Usuário do banco
DB_USERNAME=postgres

# Senha do banco
DB_PASSWORD=sua_senha_aqui
```

### Exemplo Real:

```env
DB_URL=jdbc:postgresql://db.abcdefghijklmnop.supabase.co:5432/postgres?sslmode=require
DB_USERNAME=postgres
DB_PASSWORD=MinhaSenhaSegura123!
```

## ⚠️ Importante

- O arquivo `.env` **NÃO** deve ser commitado no Git (já está no .gitignore)
- **NUNCA** compartilhe suas credenciais publicamente
- Use `sslmode=require` para garantir conexão segura com SSL

## 🧪 Testando a Conexão

Após configurar o `.env`, execute:

```bash
cd demo
.\mvnw.cmd spring-boot:run
```

Se a conexão estiver correta, você verá nos logs:
- Mensagens do Hibernate criando/atualizando tabelas
- "Started DemoApplication" sem erros de conexão

## ❌ Problemas Comuns

### Erro: "Connection refused"
- Verifique se o host e porta estão corretos
- Verifique se o Supabase está ativo

### Erro: "Authentication failed"
- Verifique se o username e password estão corretos
- Certifique-se de que não há espaços extras nas variáveis

### Erro: "SSL required"
- Certifique-se de que a URL inclui `?sslmode=require`
- Verifique se o formato da URL está correto

### Variáveis não carregadas
- Certifique-se de que o arquivo `.env` está na raiz do projeto `demo/`
- Verifique se não há espaços ao redor do `=` nas variáveis
- Reinicie o servidor após criar/editar o `.env`

