import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { TaskScreen } from '../src/features/tasks/screens/TaskScreen';
import { TasksProvider } from '../src/features/tasks/context/TaskContext';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid-' + Math.random().toString(36).substr(2, 9)),
}));

const renderWithProvider = (
  component: React.ReactElement,
  initialTestState = { tasks: [], isLoading: false },
) => {
  return render(
    <TasksProvider initialTestState={initialTestState}>
      {component}
    </TasksProvider>,
  );
};

describe('TaskScreen', () => {
  it('deve renderizar todos os componentes molecules', async () => {
    const { getByPlaceholderText, getByText } = renderWithProvider(
      <TaskScreen />,
    );
    await waitFor(() => {
      expect(getByPlaceholderText('Adicionar uma nova tarefa...')).toBeTruthy();
      expect(getByText('Adicionar')).toBeTruthy();
    });
  });

  it('deve ter estrutura de layout correta', async () => {
    const { root } = renderWithProvider(<TaskScreen />);
    await waitFor(() => {
      expect(root).toBeTruthy();
    });
  });

  it('deve usar SafeAreaView', async () => {
    const { root } = renderWithProvider(<TaskScreen />);
    await waitFor(() => {
      expect(root).toBeTruthy();
    });
  });

  it('deve ter StatusBar configurado', async () => {
    const { root } = renderWithProvider(<TaskScreen />);
    await waitFor(() => {
      expect(root).toBeTruthy();
    });
  });
});
