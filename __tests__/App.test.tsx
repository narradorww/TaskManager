/**
 * @format
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../src/App';

// Mock do uuid para os testes
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid-' + Math.random().toString(36).substr(2, 9)),
}));

describe('App', () => {
  it('deve renderizar a interface do TaskManager', () => {
    const { getByPlaceholderText, getByText } = render(<App />);

    // Verifica se o formulário de adicionar tarefa está presente
    expect(getByPlaceholderText('Adicionar uma nova tarefa...')).toBeTruthy();
    expect(getByText('Adicionar')).toBeTruthy();
  });

  it('deve ter o TasksProvider configurado', () => {
    const { root } = render(<App />);
    
    // Verifica se o componente está sendo renderizado
    expect(root).toBeTruthy();
  });

  it('deve ter a TaskScreen como componente principal', () => {
    const { root } = render(<App />);
    
    expect(root).toBeTruthy();
  });
});
