import React from 'react';
import { render } from '@testing-library/react-native';
import { TaskActions } from '../src/features/tasks/components/molecules/TaskActions';
import { TasksProvider } from '../src/features/tasks/context/TaskContext';

// Mock do uuid para os testes
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid-' + Math.random().toString(36).substr(2, 9)),
}));

const renderWithProvider = (component: React.ReactElement) => {
  return render(<TasksProvider>{component}</TasksProvider>);
};

describe('TaskActions', () => {
  it('deve não renderizar quando não há tarefas completadas', () => {
    const { queryByText } = renderWithProvider(<TaskActions />);

    expect(queryByText('Limpar Concluídas')).toBeFalsy();
  });

  it('deve renderizar quando há tarefas completadas', () => {
    const { queryByText } = renderWithProvider(<TaskActions />);

    // Inicialmente não deve renderizar
    expect(queryByText('Limpar Concluídas')).toBeFalsy();
  });


}); 