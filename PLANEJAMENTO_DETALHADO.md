# 📋 Planejamento Detalhado - BoviControl

**Data:** 27/11/2025  
**Foco:** Backend e Botões Não Funcionais

---

## 🎯 DIVISÃO POR FOCOS DE AÇÃO

### **FOCO 1: BACKEND - Estrutura Base e Entidades** 🔴
### **FOCO 2: BACKEND - CRUD Completo** 🔴
### **FOCO 3: BACKEND - Funcionalidades Avançadas** 🟡
### **FOCO 4: FRONTEND - Botões e Ações Não Funcionais** 🔴
### **FOCO 5: FRONTEND - Integração com Backend** 🔴
### **FOCO 6: FRONTEND - Melhorias e Recursos Nativos** 🟡

---

## ✅ O QUE JÁ FOI IMPLEMENTADO

### 🔵 **FOCO 1: BACKEND - Estrutura Base** ✅

#### ✅ Configuração e Infraestrutura
- [x] **Spring Boot 3.5.8** configurado
- [x] **Conexão com Supabase** (PostgreSQL) via `.env`
- [x] **JPA/Hibernate** configurado (`ddl-auto=update`)
- [x] **CORS** habilitado para desenvolvimento
- [x] **Carregamento de `.env`** antes do Spring Boot iniciar
- [x] **Teste de conexão** automático na inicialização
- [x] **Logs SQL** habilitados para debug

#### ✅ Autenticação (Funcional)
- [x] **Entidade `Usuario`** (`Entity/Usuario.java`)
  - Campos: id, username, email, password, nome, telefone, data_criacao
  - Constraints: username e email únicos
  - Tabela `usuario` criada automaticamente
  
- [x] **Repository `UsuarioRepository`**
  - `findByUsername()`, `findByEmail()`
  - `existsByUsername()`, `existsByEmail()`
  
- [x] **Service `UsuarioService`**
  - `criarUsuario()` - valida duplicatas
  - `buscarPorUsername()`, `buscarPorEmail()`
  
- [x] **Controller `AuthController`**
  - ✅ `POST /auth/login` - Funciona (busca no banco, valida senha)
  - ✅ `POST /auth/register` - Funciona (cria usuário no banco)
  
- [x] **DTOs**
  - `LoginRequest`, `LoginResponse`
  - `RegisterRequest`

#### ✅ Animal (Parcialmente Implementado)
- [x] **Entidade `Animal`** (`Entity/Animal.java`)
  - Campos: id, brinco, dataNascimento, especie, raca, peso, loteId, fotoBase64, dataCriacao
  - Tabela `animal` será criada automaticamente
  
- [x] **Repository `AnimalRepository`**
  - `findByBrinco()`, `existsByBrinco()`
  
- [x] **Service `AnimalService`**
  - `criarAnimal()` - valida brinco duplicado, converte data
  - `buscarPorBrinco()`
  
- [x] **Controller `AnimalController`**
  - ✅ `POST /animais` - Funciona (cria animal no banco)
  
- [x] **DTO `AnimalRequest`**

#### ✅ Endpoints de Sistema
- [x] **`GET /health`** - Health check do backend

---

### 🟢 **FOCO 4: FRONTEND - Estrutura Base** ✅

#### ✅ Design System
- [x] **Tema** (`constants/theme.ts`) - Cores, tipografia, espaçamentos
- [x] **Componentes Base:**
  - `Screen`, `AppText`, `AppButton`, `AppInput`
  - `Header`, `TileCard`, `InfoCard`, `Fab`
  - `CameraView` (expo-camera integrado)

#### ✅ Navegação
- [x] **Stack Navigator** (`app/_layout.tsx`)
- [x] **Tab Navigator** (`app/(tabs)/_layout.tsx`) - 5 abas

#### ✅ Telas Implementadas
- [x] **`app/index.tsx`** - Redirecionamento inicial (verifica token)
- [x] **`app/login.tsx`** - Login funcional (conectado ao backend)
- [x] **`app/cadastro.tsx`** - Cadastro de usuário funcional
- [x] **`app/(tabs)/index.tsx`** - Home com grid 2x2
- [x] **`app/(tabs)/lotes.tsx`** - Lista de lotes (dados mockados)
- [x] **`app/(tabs)/eventos.tsx`** - Lista de eventos (dados mockados)
- [x] **`app/(tabs)/relatorios.tsx`** - Tela de relatórios (estrutura)
- [x] **`app/(tabs)/perfil.tsx`** - Perfil com logout funcional
- [x] **`app/animais/index.tsx`** - Lista de animais (dados mockados)
- [x] **`app/animais/cadastro.tsx`** - Cadastro de animal funcional (conectado ao backend)

---

## ❌ O QUE AINDA PRECISA SER FEITO

### 🔴 **FOCO 1: BACKEND - Entidades Faltantes** (PRIORIDADE ALTA)

#### ❌ Entidades Não Criadas
- [ ] **`Lote.java`**
  - Campos: id, nome, localizacao (latitude, longitude), produtorId, dataCriacao
  - Relacionamento: ManyToOne com Usuario (produtor)
  
- [ ] **`Evento.java`**
  - Campos: id, tipo (enum: Amamentacao, TrocaPasto, Vacina, etc.), data, descricao, animalId, loteId, dataCriacao
  - Relacionamento: ManyToOne com Animal, ManyToOne com Lote
  
- [ ] **`ConsumoSal.java`**
  - Campos: id, data, quantidade (kg), loteId, dataCriacao
  - Relacionamento: ManyToOne com Lote

#### ❌ Repositories Faltantes
- [ ] **`LoteRepository.java`**
  - `findByProdutorId()`, `findByNome()`, `existsByNome()`
  
- [ ] **`EventoRepository.java`**
  - `findByAnimalId()`, `findByLoteId()`, `findByTipo()`, `findByDataBetween()`
  
- [ ] **`ConsumoSalRepository.java`**
  - `findByLoteId()`, `findByDataBetween()`, `findUltimoConsumo()`

---

### 🔴 **FOCO 2: BACKEND - CRUD Completo** (PRIORIDADE ALTA)

#### ❌ Animal - Endpoints Faltantes
- [ ] **`GET /animais`** - Listar todos os animais
  - Parâmetros: `?loteId=`, `?especie=`, `?page=`, `?size=`
  - Retorno: Lista paginada
  
- [ ] **`GET /animais/{id}`** - Buscar animal por ID
  - Retorno: Animal completo com foto
  
- [ ] **`PUT /animais/{id}`** - Atualizar animal
  - Validação: brinco único (exceto o próprio)
  
- [ ] **`DELETE /animais/{id}`** - Deletar animal
  - Validação: verificar se tem eventos associados

#### ❌ Lote - CRUD Completo
- [ ] **`LoteService.java`**
  - `criarLote()`, `buscarPorId()`, `listarTodos()`, `atualizarLote()`, `deletarLote()`
  - `buscarPorProdutorId()`, `calcularQuantidadeAnimais()`, `calcularIdadeMedia()`
  
- [ ] **`LoteController.java`**
  - `GET /lotes` - Listar todos (com filtros)
  - `GET /lotes/{id}` - Buscar por ID
  - `POST /lotes` - Criar novo
  - `PUT /lotes/{id}` - Atualizar
  - `DELETE /lotes/{id}` - Deletar
  - `GET /lotes/{id}/animais` - Listar animais do lote
  - `GET /lotes/{id}/estatisticas` - Estatísticas do lote

#### ❌ Evento - CRUD Completo
- [ ] **`EventoService.java`**
  - `criarEvento()`, `buscarPorId()`, `listarTodos()`, `atualizarEvento()`, `deletarEvento()`
  - `buscarPorAnimal()`, `buscarPorLote()`, `buscarPorTipo()`, `buscarPorPeriodo()`
  
- [ ] **`EventoController.java`**
  - `GET /eventos` - Listar todos (com filtros)
  - `GET /eventos/{id}` - Buscar por ID
  - `POST /eventos` - Criar novo
  - `PUT /eventos/{id}` - Atualizar
  - `DELETE /eventos/{id}` - Deletar
  - `GET /eventos/animal/{animalId}` - Eventos de um animal
  - `GET /eventos/lote/{loteId}` - Eventos de um lote

---

### 🟡 **FOCO 3: BACKEND - Funcionalidades Avançadas** (PRIORIDADE MÉDIA)

#### ❌ Relatórios com @Async
- [ ] **`RelatorioService.java`**
  - Método `@Async` para gerar relatório
  - Geração de PDF (biblioteca: Apache PDFBox ou iText)
  - Geração de CSV
  - Armazenar status da task (em memória ou banco)
  
- [ ] **`RelatorioController.java`**
  - `POST /relatorios/gerar` - Inicia geração assíncrona
    - Body: `{ tipo: "gasto_por_animal", periodo: "30_dias", loteId: 1 }`
    - Retorno: `{ taskId: "uuid", status: "PROCESSANDO" }`
  - `GET /relatorios/status/{taskId}` - Consulta status
    - Retorno: `{ status: "CONCLUIDO|PROCESSANDO|ERRO", urlDownload: "..." }`
  - `GET /relatorios/download/{taskId}` - Download do arquivo

#### ❌ Consumo de Sal com @Scheduled
- [ ] **`ConsumoSalService.java`**
  - Método `@Scheduled(cron = "0 0 8 * * ?")` - Executa diariamente às 8h
  - Verifica consumo de sal por lote
  - Calcula média de consumo
  - Cria alertas quando necessário
  
- [ ] **`ConsumoSalController.java`**
  - `POST /consumo-sal` - Registrar consumo manual
  - `GET /consumo-sal/lote/{loteId}` - Histórico de consumo
  - `GET /consumo-sal/alertas` - Listar alertas ativos

#### ❌ Upload de Fotos
- [ ] **Configurar Supabase Storage**
  - Bucket para fotos de animais
  - Políticas de acesso
  
- [ ] **`FileUploadController.java`**
  - `POST /upload/foto` - Upload de foto
  - Retorno: URL da foto no Supabase Storage
  - Integração com entidade `Animal` (atualizar campo `fotoUrl`)

---

### 🔴 **FOCO 4: FRONTEND - Botões Não Funcionais** (PRIORIDADE ALTA)

#### ❌ Tela de Lotes (`app/(tabs)/lotes.tsx`)
- [ ] **Botão FAB (linha 88)** - `onPress={() => {}}`
  - **Ação esperada:** Navegar para `/lotes/cadastro`
  - **Implementar:** `router.push('/lotes/cadastro')`
  
- [ ] **Cards de Lote (linhas 74-86)** - Apenas exibição
  - **Ação esperada:** Ao clicar, mostrar detalhes do lote
  - **Implementar:** Navegação para `/lotes/{id}` ou modal de detalhes

#### ❌ Tela de Eventos (`app/(tabs)/eventos.tsx`)
- [ ] **Botão FAB (linha 49)** - `onPress={() => {}}`
  - **Ação esperada:** Navegar para `/eventos/cadastro`
  - **Implementar:** `router.push('/eventos/cadastro')`
  
- [ ] **Cards de Evento (linhas 43-47)** - Apenas exibição
  - **Ação esperada:** Ao clicar, mostrar detalhes do evento
  - **Implementar:** Navegação para `/eventos/{id}` ou modal

#### ❌ Tela de Relatórios (`app/(tabs)/relatorios.tsx`)
- [ ] **Botão "Exportar CSV" (linha 41)** - `onPress={() => {}}`
  - **Ação esperada:** Gerar e baixar relatório CSV
  - **Implementar:**
    1. Chamar `POST /relatorios/gerar` com parâmetros
    2. Polling em `GET /relatorios/status/{taskId}`
    3. Quando concluído, baixar arquivo
    4. Salvar no dispositivo (expo-file-system)
  
- [ ] **Botão "Exportar PDF" (linha 42)** - `onPress={() => {}}`
  - **Ação esperada:** Gerar e baixar relatório PDF
  - **Implementar:** Mesmo fluxo do CSV
  
- [ ] **Seletor de Período (linhas 19-26)** - Apenas visual
  - **Ação esperada:** Selecionar período (30 dias, anual, customizado)
  - **Implementar:** Estado para período selecionado
  
- [ ] **Seletor de Lote (linhas 28-34)** - Apenas visual
  - **Ação esperada:** Abrir dropdown/picker com lotes
  - **Implementar:**
    1. Buscar lotes do backend (`GET /lotes`)
    2. Exibir picker/dropdown
    3. Atualizar estado com lote selecionado

#### ❌ Tela de Login (`app/login.tsx`)
- [ ] **Link "Esqueci minha senha" (linha 198)** - `alert('Funcionalidade em desenvolvimento')`
  - **Ação esperada:** Navegar para tela de recuperação de senha
  - **Implementar:** Criar `/recuperar-senha` ou modal

#### ❌ Tela de Animais (`app/animais/index.tsx`)
- [ ] **Lista de Animais** - Dados mockados
  - **Ação esperada:** Buscar animais do backend
  - **Implementar:**
    1. Chamar `GET /animais` ao carregar tela
    2. Substituir `animaisMock` por dados reais
    3. Adicionar loading state
    4. Adicionar pull-to-refresh
  
- [ ] **Cards de Animal** - Apenas exibição
  - **Ação esperada:** Ao clicar, mostrar detalhes do animal
  - **Implementar:** Navegação para `/animais/{id}` ou modal

---

### 🔴 **FOCO 5: FRONTEND - Integração com Backend** (PRIORIDADE ALTA)

#### ❌ Serviço de API Centralizado
- [ ] **`services/api.ts`**
  - Configuração base do fetch/axios
  - URL base da API (`process.env.EXPO_PUBLIC_API_URL`)
  - Interceptor para adicionar token (`Authorization: Bearer {token}`)
  - Tratamento de erros global
  - Timeout configurável

#### ❌ Conectar Telas ao Backend
- [ ] **`app/(tabs)/lotes.tsx`**
  - Substituir dados mockados por `GET /lotes`
  - Adicionar loading state
  - Adicionar tratamento de erro
  - Adicionar pull-to-refresh
  
- [ ] **`app/(tabs)/eventos.tsx`**
  - Substituir dados mockados por `GET /eventos`
  - Adicionar loading state
  - Adicionar tratamento de erro
  - Adicionar pull-to-refresh
  
- [ ] **`app/animais/index.tsx`**
  - Substituir `animaisMock` por `GET /animais`
  - Adicionar loading state
  - Adicionar tratamento de erro
  - Adicionar pull-to-refresh

#### ❌ Telas de Cadastro Faltantes
- [ ] **`app/lotes/cadastro.tsx`**
  - Formulário: nome, localizacao (GPS), produtor
  - Integração com `expo-location` para capturar coordenadas
  - Chamar `POST /lotes`
  - Validação de campos
  
- [ ] **`app/eventos/cadastro.tsx`**
  - Formulário: tipo, data, descricao, animal (picker), lote (picker)
  - Chamar `POST /eventos`
  - Validação de campos

---

### 🟡 **FOCO 6: FRONTEND - Melhorias e Recursos Nativos** (PRIORIDADE MÉDIA)

#### ❌ Recursos Nativos
- [ ] **GPS/Localização** (`expo-location`)
  - Instalar: `npx expo install expo-location`
  - Solicitar permissões
  - Implementar no cadastro de lote
  
- [ ] **Download de Arquivos** (`expo-file-system`)
  - Já instalado, mas precisa implementar download de relatórios
  - Salvar CSV/PDF no dispositivo
  - Compartilhar arquivo

#### ❌ Melhorias de UX
- [ ] **Loading States**
  - Spinner em todas as telas que fazem requisições
  - Skeleton loaders nas listagens
  
- [ ] **Tratamento de Erros**
  - Mensagens de erro amigáveis
  - Retry automático em caso de falha de rede
  - Toast/Alert para feedback
  
- [ ] **Pull-to-Refresh**
  - Implementar em todas as listagens (lotes, eventos, animais)
  
- [ ] **Navegação de Detalhes**
  - Telas de detalhes para Animal, Lote, Evento
  - Modal ou navegação stack

---

## 📊 RESUMO POR PRIORIDADE

### 🔴 **PRIORIDADE ALTA - Fazer Agora**

1. **Backend - Entidades Faltantes**
   - Criar `Lote`, `Evento`, `ConsumoSal`
   - Criar Repositories correspondentes

2. **Backend - CRUD de Lote**
   - Service, Controller, Endpoints completos

3. **Backend - CRUD de Evento**
   - Service, Controller, Endpoints completos

4. **Backend - Endpoints Faltantes de Animal**
   - `GET /animais`, `GET /animais/{id}`, `PUT /animais/{id}`, `DELETE /animais/{id}`

5. **Frontend - Botões Não Funcionais**
   - FAB em Lotes → `/lotes/cadastro`
   - FAB em Eventos → `/eventos/cadastro`
   - Botões Exportar CSV/PDF em Relatórios
   - Seletor de Período e Lote em Relatórios

6. **Frontend - Integração com Backend**
   - Serviço de API centralizado
   - Conectar telas de Lotes, Eventos, Animais ao backend
   - Criar telas de cadastro de Lote e Evento

---

### 🟡 **PRIORIDADE MÉDIA - Fazer Depois**

1. **Backend - Relatórios com @Async**
2. **Backend - Consumo de Sal com @Scheduled**
3. **Backend - Upload de Fotos (Supabase Storage)**
4. **Frontend - Recursos Nativos (GPS)**
5. **Frontend - Melhorias de UX**

---

## 🎯 PLANO DE AÇÃO IMEDIATO

### **FASE 1: Backend - Entidades e CRUD Básico** (1-2 dias)
1. ✅ Criar entidade `Lote` + Repository + Service + Controller
2. ✅ Criar entidade `Evento` + Repository + Service + Controller
3. ✅ Completar CRUD de Animal (GET, PUT, DELETE)
4. ✅ Testar endpoints com Postman/Insomnia

### **FASE 2: Frontend - Botões Funcionais** (1 dia)
1. ✅ Implementar FAB em Lotes → cadastro
2. ✅ Implementar FAB em Eventos → cadastro
3. ✅ Criar telas de cadastro de Lote e Evento
4. ✅ Implementar seletores em Relatórios (período e lote)

### **FASE 3: Frontend - Integração** (1 dia)
1. ✅ Criar serviço de API centralizado
2. ✅ Conectar telas ao backend (substituir mocks)
3. ✅ Implementar loading states e tratamento de erros

### **FASE 4: Backend - Funcionalidades Avançadas** (2-3 dias)
1. ✅ Implementar relatórios com @Async
2. ✅ Implementar consumo de sal com @Scheduled
3. ✅ Configurar upload de fotos

---

## 📝 NOTAS IMPORTANTES

### ⚠️ Sobre os Botões Não Funcionais

**Identificados:**
1. `lotes.tsx` linha 88 - FAB vazio
2. `eventos.tsx` linha 49 - FAB vazio
3. `relatorios.tsx` linhas 41-42 - Botões Exportar vazios
4. `relatorios.tsx` linhas 19-34 - Seletores apenas visuais
5. `login.tsx` linha 198 - "Esqueci minha senha" apenas alert

**Todos precisam de:**
- Backend correspondente (endpoints)
- Navegação ou ação implementada
- Integração com API

---

**Última atualização:** 27/11/2025

