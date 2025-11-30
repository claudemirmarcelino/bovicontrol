# 🔴 Botões e Ações Não Funcionais - Análise Detalhada

**Data:** 27/11/2025  
**Foco:** Backend e Botões que Precisam de Implementação

---

## 📍 BOTÕES IDENTIFICADOS

### 1. **Tela de Lotes** (`app/(tabs)/lotes.tsx`)

#### ❌ Botão FAB (linha 88)
```typescript
<Fab onPress={() => {}} />
```
**Status:** Vazio - não faz nada

**O que precisa:**
- ✅ **Frontend:** `router.push('/lotes/cadastro')`
- ❌ **Backend:** Endpoint `POST /lotes` (não existe)
- ❌ **Backend:** Entidade `Lote` (não existe)
- ❌ **Frontend:** Tela `/lotes/cadastro` (não existe)

**Ação necessária:**
1. Criar entidade `Lote` no backend
2. Criar `LoteService` e `LoteController`
3. Implementar `POST /lotes`
4. Criar tela `app/lotes/cadastro.tsx`
5. Conectar FAB à navegação

---

### 2. **Tela de Eventos** (`app/(tabs)/eventos.tsx`)

#### ❌ Botão FAB (linha 49)
```typescript
<Fab onPress={() => {}} />
```
**Status:** Vazio - não faz nada

**O que precisa:**
- ✅ **Frontend:** `router.push('/eventos/cadastro')`
- ❌ **Backend:** Endpoint `POST /eventos` (não existe)
- ❌ **Backend:** Entidade `Evento` (não existe)
- ❌ **Frontend:** Tela `/eventos/cadastro` (não existe)

**Ação necessária:**
1. Criar entidade `Evento` no backend
2. Criar `EventoService` e `EventoController`
3. Implementar `POST /eventos`
4. Criar tela `app/eventos/cadastro.tsx`
5. Conectar FAB à navegação

---

### 3. **Tela de Relatórios** (`app/(tabs)/relatorios.tsx`)

#### ❌ Botão "Exportar CSV" (linha 41)
```typescript
<AppButton label="Exportar CSV" onPress={() => {}} />
```
**Status:** Vazio - não faz nada

**O que precisa:**
- ❌ **Backend:** Endpoint `POST /relatorios/gerar` (não existe)
- ❌ **Backend:** Endpoint `GET /relatorios/status/{taskId}` (não existe)
- ❌ **Backend:** Endpoint `GET /relatorios/download/{taskId}` (não existe)
- ❌ **Backend:** Service com `@Async` para gerar CSV (não existe)
- ❌ **Frontend:** Lógica de polling e download (não existe)

**Ação necessária:**
1. Criar `RelatorioService` com método `@Async`
2. Implementar geração de CSV
3. Criar `RelatorioController` com endpoints
4. Implementar polling no frontend
5. Implementar download de arquivo

#### ❌ Botão "Exportar PDF" (linha 42)
```typescript
<AppButton label="Exportar PDF" onPress={() => {}} />
```
**Status:** Vazio - não faz nada

**O que precisa:**
- ❌ **Backend:** Mesmos endpoints do CSV
- ❌ **Backend:** Biblioteca de geração de PDF (Apache PDFBox ou iText)
- ❌ **Frontend:** Mesma lógica do CSV

**Ação necessária:**
1. Adicionar dependência de PDF no `pom.xml`
2. Implementar geração de PDF no `RelatorioService`
3. Mesma lógica de polling e download do CSV

#### ❌ Seletor de Período (linhas 19-26)
```typescript
<View style={{ flexDirection: 'row', gap: 8 }}>
  <View>Últimos 30 dias</View>
  <View>Anual</View>
</View>
```
**Status:** Apenas visual - não seleciona nada

**O que precisa:**
- ❌ **Frontend:** Estado para período selecionado
- ❌ **Frontend:** Lógica de seleção (onPress)
- ❌ **Frontend:** Feedback visual de seleção

**Ação necessária:**
1. Adicionar estado `const [periodo, setPeriodo] = useState('30_dias')`
2. Adicionar `onPress` nos botões
3. Adicionar estilo para botão selecionado
4. Passar período para os botões de exportar

#### ❌ Seletor de Lote (linhas 28-34)
```typescript
<View>
  <AppText>Selecione um lote</AppText>
  <AppText>▼</AppText>
</View>
```
**Status:** Apenas visual - não seleciona nada

**O que precisa:**
- ❌ **Backend:** Endpoint `GET /lotes` (não existe)
- ❌ **Frontend:** Buscar lotes do backend
- ❌ **Frontend:** Picker/Dropdown para seleção
- ❌ **Frontend:** Estado para lote selecionado

**Ação necessária:**
1. Criar endpoint `GET /lotes` no backend
2. Buscar lotes ao carregar tela
3. Implementar picker (usar `@react-native-picker/picker` ou modal)
4. Atualizar estado com lote selecionado
5. Passar loteId para os botões de exportar

---

### 4. **Tela de Login** (`app/login.tsx`)

#### ❌ Link "Esqueci minha senha" (linha 198)
```typescript
onPress={() => {
  if (!loading) {
    alert('Funcionalidade em desenvolvimento');
  }
}}
```
**Status:** Apenas mostra alert

**O que precisa:**
- ❌ **Backend:** Endpoint `POST /auth/recuperar-senha` (não existe)
- ❌ **Frontend:** Tela de recuperação de senha (não existe)

**Ação necessária:**
1. Criar tela `app/recuperar-senha.tsx`
2. Implementar endpoint no backend (opcional - pode ser mock)
3. Conectar link à navegação

---

### 5. **Tela de Animais** (`app/animais/index.tsx`)

#### ❌ Lista de Animais (linhas 39-46)
```typescript
{animaisMock.map((animal) => (
  <InfoCard>...</InfoCard>
))}
```
**Status:** Usa dados mockados

**O que precisa:**
- ❌ **Backend:** Endpoint `GET /animais` (não existe)
- ❌ **Frontend:** Buscar animais do backend
- ❌ **Frontend:** Loading state
- ❌ **Frontend:** Tratamento de erro

**Ação necessária:**
1. Criar endpoint `GET /animais` no backend
2. Substituir `animaisMock` por chamada à API
3. Adicionar `useState` para animais
4. Adicionar `useEffect` para buscar ao carregar
5. Adicionar loading e tratamento de erro

---

## 📊 RESUMO POR PRIORIDADE

### 🔴 **URGENTE - Bloqueia Funcionalidade**

1. **FAB em Lotes** → Precisa de:
   - Entidade `Lote` + CRUD completo
   - Tela de cadastro

2. **FAB em Eventos** → Precisa de:
   - Entidade `Evento` + CRUD completo
   - Tela de cadastro

3. **Lista de Animais** → Precisa de:
   - Endpoint `GET /animais`

### 🟡 **IMPORTANTE - Melhora UX**

4. **Botões Exportar CSV/PDF** → Precisa de:
   - Service com `@Async`
   - Geração de arquivos
   - Endpoints de status e download

5. **Seletores em Relatórios** → Precisa de:
   - Endpoint `GET /lotes`
   - Lógica de seleção no frontend

### 🟢 **OPCIONAL - Pode Fazer Depois**

6. **"Esqueci minha senha"** → Pode ser mock simples

---

## 🎯 CHECKLIST DE IMPLEMENTAÇÃO

### Backend - O que Criar

- [ ] **Entidade `Lote`**
  - [ ] Campos: id, nome, localizacao (lat, lng), produtorId, dataCriacao
  - [ ] Repository `LoteRepository`
  - [ ] Service `LoteService` (CRUD completo)
  - [ ] Controller `LoteController`
    - [ ] `GET /lotes` - Listar todos
    - [ ] `GET /lotes/{id}` - Buscar por ID
    - [ ] `POST /lotes` - Criar
    - [ ] `PUT /lotes/{id}` - Atualizar
    - [ ] `DELETE /lotes/{id}` - Deletar

- [ ] **Entidade `Evento`**
  - [ ] Campos: id, tipo, data, descricao, animalId, loteId, dataCriacao
  - [ ] Repository `EventoRepository`
  - [ ] Service `EventoService` (CRUD completo)
  - [ ] Controller `EventoController`
    - [ ] `GET /eventos` - Listar todos
    - [ ] `GET /eventos/{id}` - Buscar por ID
    - [ ] `POST /eventos` - Criar
    - [ ] `PUT /eventos/{id}` - Atualizar
    - [ ] `DELETE /eventos/{id}` - Deletar

- [ ] **Completar CRUD de Animal**
  - [ ] `GET /animais` - Listar todos (com paginação)
  - [ ] `GET /animais/{id}` - Buscar por ID
  - [ ] `PUT /animais/{id}` - Atualizar
  - [ ] `DELETE /animais/{id}` - Deletar

- [ ] **Relatórios com @Async**
  - [ ] `RelatorioService` com método `@Async`
  - [ ] Geração de CSV
  - [ ] Geração de PDF (adicionar dependência)
  - [ ] `RelatorioController`
    - [ ] `POST /relatorios/gerar`
    - [ ] `GET /relatorios/status/{taskId}`
    - [ ] `GET /relatorios/download/{taskId}`

### Frontend - O que Implementar

- [ ] **Tela de Cadastro de Lote**
  - [ ] `app/lotes/cadastro.tsx`
  - [ ] Formulário: nome, localizacao (GPS)
  - [ ] Integração com `expo-location`
  - [ ] Chamar `POST /lotes`

- [ ] **Tela de Cadastro de Evento**
  - [ ] `app/eventos/cadastro.tsx`
  - [ ] Formulário: tipo, data, descricao, animal, lote
  - [ ] Chamar `POST /eventos`

- [ ] **Conectar FABs**
  - [ ] `lotes.tsx` → `router.push('/lotes/cadastro')`
  - [ ] `eventos.tsx` → `router.push('/eventos/cadastro')`

- [ ] **Implementar Seletores em Relatórios**
  - [ ] Estado para período selecionado
  - [ ] Estado para lote selecionado
  - [ ] Buscar lotes do backend
  - [ ] Picker para seleção de lote
  - [ ] Botões de período funcionais

- [ ] **Implementar Exportação**
  - [ ] Lógica de polling (`GET /relatorios/status/{taskId}`)
  - [ ] Download de arquivo quando concluído
  - [ ] Feedback visual (loading, sucesso, erro)

- [ ] **Conectar Lista de Animais**
  - [ ] Buscar do backend (`GET /animais`)
  - [ ] Substituir mock
  - [ ] Adicionar loading e erro

---

**Última atualização:** 27/11/2025

