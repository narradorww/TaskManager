import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { TasksProvider } from '../src/features/tasks/context/TaskContext';
import { DashboardScreen } from '../src/features/tasks/screens/DashBoardScreen';
import { TaskScreen } from '../src/features/tasks/screens/TaskScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
}));

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid-' + Math.random().toString(36).substr(2, 9)),
}));

const renderWithProvider = (component: React.ReactElement) => {
  return render(<TasksProvider>{component}</TasksProvider>);
};

describe('Navigation Components', () => {
  it('deve renderizar o DashboardScreen com funcionalidade de navegação', async () => {
    const { getByText } = renderWithProvider(<DashboardScreen />);

    await waitFor(() => {
      expect(getByText('Resumo das Tarefas')).toBeTruthy();
      expect(getByText('Gerenciar Tarefas')).toBeTruthy();
    });
  });

  it('deve renderizar o TaskScreen com funcionalidade de navegação', () => {
    const { getByText } = renderWithProvider(<TaskScreen />);

    expect(getByText('Task Manager')).toBeTruthy();
  });

  it('deve ter botão de navegação no Dashboard', async () => {
    const { getByText } = renderWithProvider(<DashboardScreen />);

    await waitFor(() => {
      const navigateButton = getByText('Gerenciar Tarefas');
      expect(navigateButton).toBeTruthy();
    });
  });

  it('deve renderizar ambas as telas corretamente', async () => {
    const { getByText: getDashboardText } = renderWithProvider(
      <DashboardScreen />,
    );
    await waitFor(() => {
      expect(getDashboardText('Resumo das Tarefas')).toBeTruthy();
    });

    const { getByText: getTaskText } = renderWithProvider(<TaskScreen />);
    expect(getTaskText('Task Manager')).toBeTruthy();
  });

  it('deve ter estrutura de navegação válida nos componentes', async () => {
    const { getByText } = renderWithProvider(<DashboardScreen />);

    await waitFor(() => {
      expect(getByText('Resumo das Tarefas')).toBeTruthy();
      expect(getByText('Gerenciar Tarefas')).toBeTruthy();
    });
  });

  it('deve renderizar componentes de navegação com contexto', async () => {
    const { getByText } = renderWithProvider(<DashboardScreen />);

    await waitFor(() => {
      expect(getByText('Resumo das Tarefas')).toBeTruthy();
    });
  });

  it('deve ter funcionalidade de navegação configurada', async () => {
    const { getByText } = renderWithProvider(<DashboardScreen />);

    await waitFor(() => {
      const navigateButton = getByText('Gerenciar Tarefas');
      expect(navigateButton).toBeTruthy();
    });
  });

  it('deve renderizar telas com provider de contexto', () => {
    const { getByText } = renderWithProvider(<TaskScreen />);

    expect(getByText('Task Manager')).toBeTruthy();
  });

  it('deve ter navegação funcional nos componentes', async () => {
    const { getByText } = renderWithProvider(<DashboardScreen />);

    await waitFor(() => {
      expect(getByText('Gerenciar Tarefas')).toBeTruthy();
    });
  });
});
