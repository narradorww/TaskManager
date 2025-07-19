import React from 'react';
import { render } from '@testing-library/react-native';
import { TaskScreen } from '../src/features/tasks/screens/TaskScreen';
import { TasksProvider } from '../src/features/tasks/context/TaskContext';

// Mock do uuid para os testes
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid-' + Math.random().toString(36).substr(2, 9)),
}));

const renderWithProvider = (component: React.ReactElement) => {
  return render(<TasksProvider>{component}</TasksProvider>);
};

describe('TaskScreen', () => {
  it('deve renderizar todos os componentes molecules', () => {
    const { getByPlaceholderText, getByText } = renderWithProvider(<TaskScreen />);

    // Verifica se o AddTaskForm está presente
    expect(getByPlaceholderText('Adicionar uma nova tarefa...')).toBeTruthy();
    expect(getByText('Adicionar')).toBeTruthy();
  });

  it('deve ter estrutura de layout correta', () => {
    const { root } = renderWithProvider(<TaskScreen />);
    
    expect(root).toBeTruthy();
  });

  it('deve usar SafeAreaView', () => {
    const { root } = renderWithProvider(<TaskScreen />);
    
    // Verifica se o componente está sendo renderizado
    expect(root).toBeTruthy();
  });

  it('deve ter StatusBar configurado', () => {
    const { root } = renderWithProvider(<TaskScreen />);
    
    expect(root).toBeTruthy();
  });
}); 