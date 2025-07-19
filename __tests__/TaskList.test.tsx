import React from 'react';
import { render } from '@testing-library/react-native';
import { TaskList, ITEM_HEIGHT } from '../src/features/tasks/components/molecules/TaskList';
import { Task, TaskStatus } from '../src/types/task';
import { TasksProvider } from '../src/features/tasks/context/TaskContext';

// Mock do uuid para os testes
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid-' + Math.random().toString(36).substr(2, 9)),
}));

const mockTasks: Task[] = [
  {
    id: 'task-1',
    text: 'Primeira tarefa',
    status: 'PENDING' as TaskStatus,
  },
  {
    id: 'task-2',
    text: 'Segunda tarefa',
    status: 'COMPLETED' as TaskStatus,
  },
  {
    id: 'task-3',
    text: 'Terceira tarefa',
    status: 'PENDING' as TaskStatus,
  },
];

const renderWithProvider = (component: React.ReactElement) => {
  return render(<TasksProvider>{component}</TasksProvider>);
};

describe('TaskList', () => {
  it('deve renderizar lista vazia corretamente', () => {
    const { root } = renderWithProvider(<TaskList tasks={[]} />);
    
    expect(root).toBeTruthy();
  });

  it('deve renderizar lista com tarefas corretamente', () => {
    const { getByText } = renderWithProvider(<TaskList tasks={mockTasks} />);

    expect(getByText('Primeira tarefa')).toBeTruthy();
    expect(getByText('Segunda tarefa')).toBeTruthy();
    expect(getByText('Terceira tarefa')).toBeTruthy();
  });

  it('deve renderizar o checkmark para tarefas completadas', () => {
    const { getByText } = renderWithProvider(<TaskList tasks={mockTasks} />);

    expect(getByText('✓')).toBeTruthy();
  });

  it('deve exportar ITEM_HEIGHT corretamente', () => {
    expect(ITEM_HEIGHT).toBe(60);
  });
}); 