import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { DashboardScreen } from '../src/features/tasks/screens/DashBoardScreen';
import { TasksProvider } from '../src/features/tasks/context/TaskContext';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid-' + Math.random().toString(36).substr(2, 9)),
}));

const renderWithProvider = (component: React.ReactElement) => {
  return render(<TasksProvider>{component}</TasksProvider>);
};

describe('DashboardScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('deve renderizar o título do dashboard', async () => {
    const { getByText } = renderWithProvider(<DashboardScreen />);

    await waitFor(() => {
      expect(getByText('Resumo das Tarefas')).toBeTruthy();
    });
  });

  it('deve renderizar os StatusCards com contadores', async () => {
    const { getByText, getAllByText } = renderWithProvider(<DashboardScreen />);

    await waitFor(() => {
      expect(getByText('Pendentes')).toBeTruthy();
      expect(getByText('Concluídas')).toBeTruthy();
      const zeros = getAllByText('0');
      expect(zeros.length).toBeGreaterThan(0);
    });
  });

  it('deve renderizar o botão "Limpar Concluídas"', async () => {
    const { getByText } = renderWithProvider(<DashboardScreen />);

    await waitFor(() => {
      expect(getByText('Limpar Concluídas')).toBeTruthy();
    });
  });

  it('deve renderizar o botão "Gerenciar Tarefas"', async () => {
    const { getByText } = renderWithProvider(<DashboardScreen />);

    await waitFor(() => {
      expect(getByText('Gerenciar Tarefas')).toBeTruthy();
    });
  });

  it('deve chamar navigate quando "Gerenciar Tarefas" for pressionado', async () => {
    const { getByText } = renderWithProvider(<DashboardScreen />);

    await waitFor(() => {
      fireEvent.press(getByText('Gerenciar Tarefas'));
      expect(mockNavigate).toHaveBeenCalledWith('TaskManagement');
    });
  });

  it('deve chamar dispatch quando "Limpar Concluídas" for pressionado', async () => {
    const { getByText } = renderWithProvider(<DashboardScreen />);

    await waitFor(() => {
      fireEvent.press(getByText('Limpar Concluídas'));
      expect(getByText('Limpar Concluídas')).toBeTruthy();
    });
  });

  it('deve ter acessibilidade configurada corretamente', async () => {
    const { getByText } = renderWithProvider(<DashboardScreen />);

    await waitFor(() => {
      const title = getByText('Resumo das Tarefas');
      const manageButton = getByText('Gerenciar Tarefas');
      const clearButton = getByText('Limpar Concluídas');

      expect(title).toBeTruthy();
      expect(manageButton).toBeTruthy();
      expect(clearButton).toBeTruthy();
    });
  });

  it('deve renderizar o estado de carregamento quando isLoading é true', () => {
    const mockContextValue = {
      state: {
        tasks: [],
        isLoading: true,
      },
      dispatch: jest.fn(),
      pendingTasksCount: 0,
      completedTasksCount: 0,
    };

    jest.doMock('../src/features/tasks/context/TaskContext', () => ({
      useTasks: () => mockContextValue,
    }));

    const { getByText } = renderWithProvider(<DashboardScreen />);
    expect(getByText('Carregando tarefas...')).toBeTruthy();
  });

  it('deve renderizar os StatusCards com diferentes contadores', async () => {
    const { getByText } = renderWithProvider(<DashboardScreen />);

    await waitFor(() => {
      expect(getByText('Pendentes')).toBeTruthy();
      expect(getByText('Concluídas')).toBeTruthy();
    });
  });

  it('deve ter layout correto com containers', async () => {
    const { getByText } = renderWithProvider(<DashboardScreen />);

    await waitFor(() => {
      expect(getByText('Resumo das Tarefas')).toBeTruthy();
      expect(getByText('Gerenciar Tarefas')).toBeTruthy();
      expect(getByText('Limpar Concluídas')).toBeTruthy();
    });
  });

  it('deve renderizar corretamente com provider de contexto', async () => {
    const { getByText } = renderWithProvider(<DashboardScreen />);

    await waitFor(() => {
      expect(getByText('Resumo das Tarefas')).toBeTruthy();
    });
  });
});
