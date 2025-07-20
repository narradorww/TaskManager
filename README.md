# TaskManager - React Native App

Um aplicativo de gerenciamento de tarefas desenvolvido em React Native com TypeScript, seguindo princípios de arquitetura escalável e boas práticas de desenvolvimento.

## 🎯 Visão Geral

O TaskManager é uma aplicação móvel que permite aos usuários criar, gerenciar e acompanhar suas tarefas de forma eficiente. O projeto foi estruturado com foco em escalabilidade, manutenibilidade e qualidade de código.

## 🏗️ Decisões Arquiteturais

### Por que esta configuração?

A escolha das tecnologias e configurações foi baseada em requisitos específicos de qualidade, escalabilidade e experiência do desenvolvedor(DX):

#### **React Native + TypeScript**
- **Type Safety**: TypeScript oferece verificação de tipos em tempo de compilação, reduzindo bugs em runtime
- **Manutenibilidade**: Código mais legível e auto-documentado
- **Escalabilidade**: Facilita a manutenção em projetos grandes

#### **ESLint + Prettier**
- **Consistência**: Garante padrões de código uniformes em toda a equipe
- **Qualidade**: Identifica problemas potenciais antes da execução
- **Automação**: Formatação automática elimina debates sobre estilo de código
- **Integração**: Configurado com Husky para verificação pré-commit

#### **Jest + Testing Library**
- **Cobertura**: Testes unitários abrangentes (76/76 testes passando)
- **Confiança**: Refatoração segura com testes automatizados
- **Documentação**: Testes servem como documentação viva do comportamento
- **Qualidade**: Reduz regressões e bugs em produção

#### **Maestro E2E Testing**
- **Testes End-to-End**: Validação completa do fluxo do usuário
- **Automação**: Testes automatizados para cenários críticos
- **Confiança**: Garantia de que as funcionalidades principais funcionam
- **Eficiência**: Reduz testes manuais repetitivos

## 🏛️ Arquitetura Híbrida: Escalabilidade e Organização

### Estruturando para Escalabilidade: Uma Abordagem Arquitetural Híbrida

À medida que as aplicações crescem, uma estrutura de pastas simples como `components` e `screens` torna-se incontrolável, levando a um acoplamento indesejado e dificuldade de manutenção. Para evitar isso, foi adotada uma **arquitetura híbrida** que combina três padrões poderosos:

#### **1. Arquitetura Baseada em Funcionalidades (Feature-Based)**
O código é organizado por **domínio de negócio** (por exemplo, `tasks`, `auth`) em vez de por tipo técnico. Esta é a principal estratégia organizacional, promovendo:
- **Encapsulamento**: Cada funcionalidade é autocontida
- **Escalabilidade**: Fácil adição de novas funcionalidades
- **Manutenibilidade**: Mudanças isoladas por domínio
- **Colaboração**: Equipes podem trabalhar em funcionalidades independentes

#### **2. Clean Architecture**
Dentro de cada funcionalidade, os princípios da Clean Architecture são aplicados para separar as responsabilidades em camadas distintas:
- **Camada de Apresentação/UI**: Componentes React e telas
- **Camada de Domínio**: Lógica de negócio (reducers, useCases)
- **Camada de Dados**: Gerenciamento de estado/contexto

#### **3. Atomic Design**
Os componentes de UI são estruturados seguindo uma hierarquia clara:
- **Átomos**: Blocos de construção mais básicos (Button, Input, StatusCard)
- **Moléculas**: Combinações de átomos (AddTaskForm, TaskItem)
- **Organismos**: Seções completas da UI (TaskScreen, DashboardScreen)

Esta abordagem híbrida oferece:
- **Organização em macro-nível** (funcionalidades)
- **Separação lógica** (camadas)
- **Consistência de UI** em micro-nível (componentes atômicos)

## 📁 Estrutura de Diretórios

```
TaskManager/
├── src/
│   ├── App.tsx                             # Ponto de entrada da aplicação
│   ├── features/                           # 🎯 Funcionalidades (Feature-Based)
│   │   └── tasks/                          # Domínio de Tarefas
│   │       ├── components/                 # 🧩 Componentes UI (Atomic Design)
│   │       │   ├── atoms/                  # Àtomos: componentes básicos
│   │       │   │   ├── CustomButton.tsx
│   │       │   │   └── StatusCard.tsx
│   │       │   └── molecules/              # Moléculas: combinações de átomos
│   │       │       ├── AddTaskForm.tsx
│   │       │       ├── TaskItem.tsx
│   │       │       ├── TaskList.tsx
│   │       │       └── TaskActions.tsx
│   │       ├── screens/                    # 🖥️ Organismos: telas completas
│   │       │   ├── DashBoardScreen.tsx
│   │       │   └── TaskScreen.tsx
│   │       └── context/                    # 🧠 Camada de Dados (Clean Architecture)
│   │           ├── TaskContext.tsx
│   │           └── taskReducer.ts
│   ├── navigation/                         # 🧭 Navegação da aplicação
│   │   └── AppNavigator.tsx
│   ├── types/                              # 📝 Definições de tipos TypeScript
│   │   └── task.ts
│   └── core/                               # 🔧 Utilitários e configurações globais
├── __tests__/                              # 🧪 Testes unitários
├── maestro/                                # 🎭 Testes E2E
├── android/                                # 🤖 Configurações Android
├── ios/                                    # 🍎 Configurações iOS
└── [configurações do projeto]
```

### 📊 Hierarquia de Componentes (Atomic Design)

```
Átomos (Atoms)
├── CustomButton     # Botão reutilizável
└── StatusCard       # Card de status

Moléculas (Molecules)
├── AddTaskForm      # Formulário de adição (Button + Input)
├── TaskItem         # Item de tarefa (Button + Text + Status)
├── TaskList         # Lista de tarefas (múltiplos TaskItem)
└── TaskActions      # Ações de tarefas (múltiplos Button)

Organismos (Organisms)
├── DashBoardScreen  # Tela principal (StatusCards + TaskActions)
└── TaskScreen       # Tela de tarefas (AddTaskForm + TaskList)
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js (v18+)
- React Native CLI
- Android Studio / Xcode
- Maestro CLI (para testes E2E)

### Instalação
```bash
# Clonar o repositório
git clone https://github.com/narradorww/TaskManager.git
cd TaskManager

# Instalar dependências
npm install

# iOS (macOS apenas)
cd ios && pod install && cd ..

# Android
# Certifique-se de ter um emulador Android rodando
```

### Executar o Projeto
```bash
# Iniciar Metro bundler
npm start

# Android
npm run android

# iOS
npm run ios
```

## 🧪 Testes

### Testes Unitários
```bash
# Executar todos os testes
npm test

# Executar com watch mode
npm test -- --watch

# Executar com coverage
npm test -- --coverage
```

### Testes E2E (Maestro)

Este projeto utiliza o [Maestro](https://maestro.mobile.dev/) para testes end-to-end.

> **Atenção:** Os testes E2E funcionam apenas com seletores de texto, não utilize testIDs.

```bash
# Executar o teste E2E funcional
npm run test:e2e
# ou diretamente
maestro test maestro/test.yaml
```

#### Troubleshooting Maestro
- Certifique-se de que o app está compilado com as últimas mudanças.
- Use sempre seletores de texto nos testes E2E.
- Se o teste falhar, rode novamente após recompilar o app.
- Para mais dicas, consulte a seção de troubleshooting abaixo.

### Qualidade de Código
```bash
# Linting
npm run lint

# Formatação
npm run format

# Verificar tipos TypeScript
npm run type-check
```

## 📋 Funcionalidades

### ✅ Implementadas
- [x] Dashboard com resumo de tarefas
- [x] Adicionar novas tarefas
- [x] Marcar tarefas como concluídas
- [x] Listar tarefas pendentes e concluídas
- [x] Limpar tarefas concluídas
- [x] Persistência local com AsyncStorage
- [x] Navegação entre telas
- [x] Interface responsiva e acessível

### 🔄 Próximas Funcionalidades
- [ ] Categorização de tarefas
- [ ] Filtros e busca
- [ ] Notificações
- [ ] Sincronização com backend
- [ ] Temas claro/escuro
- [ ] Animações e transições

## 🛠️ Tecnologias Utilizadas

### Core
- **React Native** - Framework mobile
- **TypeScript** - Linguagem tipada
- **React Navigation** - Navegação

### Estado e Dados
- **React Context** - Gerenciamento de estado
- **AsyncStorage** - Persistência local

### Qualidade e Testes
- **Jest** - Framework de testes
- **Testing Library** - Utilitários de teste
- **Maestro** - Testes E2E
- **ESLint** - Linting
- **Prettier** - Formatação

### Desenvolvimento
- **Husky** - Git hooks
- **Commitlint** - Padronização de commits

## 📈 Métricas de Qualidade

- **Cobertura de Testes**: 76/76 testes passando (100%)
- **Linting**: Zero erros de ESLint
- **TypeScript**: Verificação de tipos rigorosa
- **E2E**: Testes automatizados funcionais

## 🤝 Contribuição

Para contribuir, siga as diretrizes detalhadas em [CONTRIBUTING.md](CONTRIBUTING.md).

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

[Rodrigo Alexandre](mailto:rodrigo.anst@gmail.com)  
🌐 [rodrigoalexandre.dev](https://rodrigoalexandre.dev)  
🔗 [linkedin.com/in/rodrigoalexandre79](https://linkedin.com/in/rodrigoalexandre79)  
📩 [rodrigo.anst@gmail.com](mailto:rodrigo.anst@gmail.com)

---

**TaskManager** - Organize suas tarefas de forma eficiente e escalável! 🚀
