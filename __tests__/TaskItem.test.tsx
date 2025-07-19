import React from 'react';
import { render } from '@testing-library/react-native';
import { TaskItem } from '../src/features/tasks/components/molecules/TaskItem';
import { Task, TaskStatus } from '../src/types/task';
import { TasksProvider } from '../src/features/tasks/context/TaskContext';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid-' + Math.random().toString(36).substr(2, 9)),
}));

const mockTask: Task = {
  id: 'test-task-1',
  text: 'Teste de tarefa',
  status: 'PENDING' as TaskStatus,
};

const mockCompletedTask: Task = {
  id: 'test-task-2',
  text: 'Tarefa completada',
  status: 'COMPLETED' as TaskStatus,
};

const renderWithProvider = (component: React.ReactElement) => {
  return render(<TasksProvider>{component}</TasksProvider>);
};

describe('TaskItem', () => {
  it('deve renderizar uma tarefa pendente corretamente', () => {
    const { getByText, queryByText } = renderWithProvider(
      <TaskItem task={mockTask} />,
    );

    expect(getByText('Teste de tarefa')).toBeTruthy();
    expect(queryByText('✓')).toBeFalsy();
  });

  it('deve renderizar uma tarefa completada corretamente', () => {
    const { getByText } = renderWithProvider(
      <TaskItem task={mockCompletedTask} />,
    );

    expect(getByText('Tarefa completada')).toBeTruthy();
    expect(getByText('✓')).toBeTruthy();
  });

  it('deve aplicar estilos corretos para tarefa pendente', () => {
    const { getByText } = renderWithProvider(<TaskItem task={mockTask} />);

    const textElement = getByText('Teste de tarefa');
    expect(textElement.props.style).not.toContainEqual(
      expect.objectContaining({ textDecorationLine: 'line-through' }),
    );
  });

  it('deve aplicar estilos corretos para tarefa completada', () => {
    const { getByText } = renderWithProvider(
      <TaskItem task={mockCompletedTask} />,
    );

    const textElement = getByText('Tarefa completada');
    expect(textElement.props.style).toContainEqual(
      expect.objectContaining({ textDecorationLine: 'line-through' }),
    );
  });

  it('deve ter acessibilidade configurada corretamente', () => {
    const { getByRole } = renderWithProvider(<TaskItem task={mockTask} />);

    const checkbox = getByRole('button');
    expect(checkbox.props.accessibilityLabel).toBe(
      'Marcar tarefa Teste de tarefa como concluída',
    );
  });

  it('deve ter acessibilidade configurada para tarefa completada', () => {
    const { getByRole } = renderWithProvider(
      <TaskItem task={mockCompletedTask} />,
    );

    const checkbox = getByRole('button');
    expect(checkbox.props.accessibilityLabel).toBe(
      'Marcar tarefa Tarefa completada como pendente',
    );
  });
});
