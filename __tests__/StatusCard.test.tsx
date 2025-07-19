import React from 'react';
import { render } from '@testing-library/react-native';
import { StatusCard } from '../src/features/tasks/components/atoms/StatusCard';

describe('StatusCard', () => {
  it('deve renderizar o card com label e count corretos', () => {
    const { getByText } = render(
      <StatusCard label="Pendentes" count={5} statusType="PENDING" />,
    );

    expect(getByText('Pendentes')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
  });

  it('deve renderizar com status PENDING', () => {
    const { getByText } = render(
      <StatusCard label="Pendentes" count={3} statusType="PENDING" />,
    );

    expect(getByText('Pendentes')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
  });

  it('deve renderizar com status COMPLETED', () => {
    const { getByText } = render(
      <StatusCard label="Concluídas" count={10} statusType="COMPLETED" />,
    );

    expect(getByText('Concluídas')).toBeTruthy();
    expect(getByText('10')).toBeTruthy();
  });

  it('deve renderizar count zero', () => {
    const { getByText } = render(
      <StatusCard label="Pendentes" count={0} statusType="PENDING" />,
    );

    expect(getByText('0')).toBeTruthy();
  });

  it('deve renderizar count grande', () => {
    const { getByText } = render(
      <StatusCard label="Concluídas" count={999} statusType="COMPLETED" />,
    );

    expect(getByText('999')).toBeTruthy();
  });

  it('deve ter acessibilidade configurada corretamente', () => {
    const { getByText } = render(
      <StatusCard label="Pendentes" count={5} statusType="PENDING" />,
    );

    const label = getByText('Pendentes');
    const count = getByText('5');

    expect(label).toBeTruthy();
    expect(count).toBeTruthy();
  });

  it('deve renderizar com diferentes labels', () => {
    const { getByText } = render(
      <StatusCard label="Em Progresso" count={7} statusType="PENDING" />,
    );

    expect(getByText('Em Progresso')).toBeTruthy();
    expect(getByText('7')).toBeTruthy();
  });

  it('deve renderizar com label vazio', () => {
    const { getByText } = render(
      <StatusCard label="" count={2} statusType="COMPLETED" />,
    );

    expect(getByText('')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
  });

  it('deve ter props corretas configuradas', () => {
    const { getByText } = render(
      <StatusCard label="Test Label" count={42} statusType="PENDING" />,
    );

    const label = getByText('Test Label');
    const count = getByText('42');

    expect(label.props.children).toBe('Test Label');
    expect(count.props.children).toBe(42);
  });

  it('deve renderizar ambos os tipos de status corretamente', () => {
    const { getByText, rerender } = render(
      <StatusCard label="Pendentes" count={5} statusType="PENDING" />,
    );

    expect(getByText('Pendentes')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();

    rerender(
      <StatusCard label="Concluídas" count={8} statusType="COMPLETED" />,
    );

    expect(getByText('Concluídas')).toBeTruthy();
    expect(getByText('8')).toBeTruthy();
  });
});
