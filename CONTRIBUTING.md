# Como Contribuir com o TaskManager

Ficamos felizes com seu interesse em contribuir! Para manter a qualidade e a consistência do projeto, siga estas diretrizes.

## 🚀 Começando

1. **Faça um fork** do repositório.
2. Clone seu fork: `git clone https://github.com/SEU_USUARIO/TaskManager.git`
3. Siga as instruções de instalação no `README.md`.
4. Crie uma nova branch para sua feature: `git checkout -b feat/minha-nova-feature`

## 🏛️ Filosofia de Código e Arquitetura

Utilizamos uma arquitetura híbrida para garantir escalabilidade e fácil manutenção. Ao adicionar código, siga estes princípios:

- **Feature-Based:** Organize o código por domínio de negócio. Tudo relacionado a tarefas fica em `src/features/tasks/`.
- **Clean Architecture:** Mantenha a lógica de negócio separada da UI. Componentes devem ser o mais "burros" possível, recebendo dados e disparando funções vindas de `contexts` ou `reducers`.
- **Atomic Design:**
  - **Átomos (`src/features/tasks/components/atoms`):** Componentes de UI puros, básicos e reutilizáveis (ex: botão, input).
  - **Moléculas (`src/features/tasks/components/molecules`):** Combinações de átomos que formam unidades funcionais (ex: formulário de busca).
  - **Organismos:** Componentes maiores que formam seções de uma tela.

## 🧪 Padrão de Testes

- **Testes Unitários:** Adicione testes para toda nova lógica em reducers e useCases.
- **Testes de Componentes:** Componentes de UI devem ter testes que verifiquem renderização e interação do usuário.
- **Testes E2E:** Para novas funcionalidades completas, adicione um fluxo no Maestro para garantir o caminho principal do usuário.

## ✅ Checklist de Qualidade Antes do PR

- Rode o lint: `npm run lint`
- Rode o type-check: `npm run type-check`
- Rode os testes unitários: `npm test`
- Rode os testes E2E (se aplicável): `npm run test:e2e`
- Certifique-se de que todos os checks passaram antes de abrir o PR.

## Pull Requests (PRs)

Um bom PR acelera o processo de revisão:

- **Mantenha pequeno:** Foque em uma única tarefa ou correção.
- **Título claro:** Use [Conventional Commits](https://www.conventionalcommits.org/).
- **Descrição detalhada:** Explique o que e por que você mudou.
- **Mudanças visuais:** Se sua alteração impacta a UI, **adicione um screenshot ou GIF** na descrição do PR.
- **Garanta que todos os checks passaram:** Rode todos os checks localmente antes de pedir revisão.

Obrigado por contribuir! 🚀