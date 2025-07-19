import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AddTaskForm } from '../src/features/tasks/components/molecules/AddTaskForm';
import { TasksProvider } from '../src/features/tasks/context/TaskContext';

// Mock do uuid para os testes
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid-' + Math.random().toString(36).substr(2, 9)),
}));

// Mock do Keyboard
jest.mock('react-native/Libraries/Components/Keyboard/Keyboard', () => ({
  dismiss: jest.fn(),
}));

const renderWithProvider = (component: React.ReactElement) => {
  return render(<TasksProvider>{component}</TasksProvider>);
};

describe('AddTaskForm', () => {
  it('deve renderizar o formulário corretamente', () => {
    const { getByPlaceholderText, getByText } = renderWithProvider(
      <AddTaskForm />
    );

    expect(getByPlaceholderText('Adicionar uma nova tarefa...')).toBeTruthy();
    expect(getByText('Adicionar')).toBeTruthy();
  });

  it('deve ter returnKeyType configurado como done', () => {
    const { getByPlaceholderText } = renderWithProvider(<AddTaskForm />);

    const input = getByPlaceholderText('Adicionar uma nova tarefa...');
    expect(input.props.returnKeyType).toBe('done');
  });

  it('deve ter placeholder configurado corretamente', () => {
    const { getByPlaceholderText } = renderWithProvider(<AddTaskForm />);

    const input = getByPlaceholderText('Adicionar uma nova tarefa...');
    expect(input.props.placeholder).toBe('Adicionar uma nova tarefa...');
  });

  it('deve ter placeholderTextColor configurado', () => {
    const { getByPlaceholderText } = renderWithProvider(<AddTaskForm />);

    const input = getByPlaceholderText('Adicionar uma nova tarefa...');
    expect(input.props.placeholderTextColor).toBe('#8e8e93');
  });

  it('deve ter onSubmitEditing configurado', () => {
    const { getByPlaceholderText } = renderWithProvider(<AddTaskForm />);

    const input = getByPlaceholderText('Adicionar uma nova tarefa...');
    expect(input.props.onSubmitEditing).toBeDefined();
  });

  it('deve ter onChangeText configurado', () => {
    const { getByPlaceholderText } = renderWithProvider(<AddTaskForm />);

    const input = getByPlaceholderText('Adicionar uma nova tarefa...');
    expect(input.props.onChangeText).toBeDefined();
  });


}); 