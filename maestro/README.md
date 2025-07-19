# Testes E2E com Maestro

Este diretório contém os testes end-to-end (E2E) para o TaskManager usando o Maestro.

## Pré-requisitos

1. **Maestro CLI instalado**: `curl -Ls "https://get.maestro.mobile.dev" | bash`
2. **Emulador Android ou dispositivo físico** conectado
3. **App compilado e instalado** no dispositivo

## Estrutura dos Testes

### Arquivos de Teste

- `task-management-flow.yaml` - Fluxo completo de gerenciamento de tarefas
- `dashboard-screen-test.yaml` - Testes específicos da tela do dashboard
- `add-task-test.yaml` - Testes da funcionalidade de adicionar tarefas
- `maestro.yaml` - Configuração global do Maestro

### TestIDs Semânticos

Todos os componentes possuem testIDs semânticos para facilitar os testes E2E:

#### Átomos

- `button-{title}` - Botões customizados
- `button-loading-indicator` - Indicador de loading
- `status-card-{type}` - Cards de status
- `status-card-count-{type}` - Contadores de status

#### Molecules

- `add-task-form` - Formulário de adição
- `task-input` - Campo de entrada de tarefa
- `add-task-button` - Botão de adicionar
- `task-item-{id}` - Item de tarefa
- `task-checkbox-{id}` - Checkbox da tarefa
- `task-checkmark-{id}` - Checkmark da tarefa
- `task-text-{id}` - Texto da tarefa
- `task-list` - Lista de tarefas
- `task-actions` - Ações de tarefa
- `clear-completed-button` - Botão de limpar concluídas

#### Telas

- `dashboard-screen` - Tela do dashboard
- `dashboard-title` - Título do dashboard
- `dashboard-cards-container` - Container dos cards
- `dashboard-actions-container` - Container das ações
- `dashboard-loading` - Loading do dashboard
- `loading-text` - Texto de loading
- `task-screen` - Tela de tarefas
- `task-screen-title` - Título da tela de tarefas
- `task-form-container` - Container do formulário
- `task-list-container` - Container da lista

## Executando os Testes

### Todos os Testes E2E

```bash
npm run test:e2e
```

### Teste Específico

```bash
npm run test:e2e:flow
npm run test:e2e:dashboard
npm run test:e2e:add-task
```

### Comando Direto do Maestro

```bash
maestro test maestro/task-management-flow.yaml
```

## Configuração

### Timeout e Retry

- Timeout padrão: 30 segundos
- Retry count: 2 tentativas
- Timeout de elemento: 10 segundos

### Dispositivo

- Nome: Android Emulator
- OS: Android

## Debugging

Para debuggar um teste específico:

```bash
maestro test maestro/task-management-flow.yaml --verbose
```

Para ver a execução em tempo real:

```bash
maestro test maestro/task-management-flow.yaml --format junit
```

## Relatórios

Os relatórios são gerados automaticamente na pasta `maestro/reports/` após a execução dos testes.

## Boas Práticas

1. **TestIDs Semânticos**: Use nomes descritivos para os testIDs
2. **Testes Independentes**: Cada teste deve ser independente dos outros
3. **Assertions Claras**: Use assertions específicas e claras
4. **Timeout Adequado**: Configure timeouts apropriados para cada operação
5. **Cleanup**: Sempre limpe o estado após os testes quando necessário
