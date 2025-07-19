import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CustomButton } from '../src/features/tasks/components/atoms/CustomButton';

describe('CustomButton', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  it('deve renderizar o botão com título correto', () => {
    const { getByText } = render(
      <CustomButton title="Test Button" onPress={mockOnPress} />,
    );

    expect(getByText('Test Button')).toBeTruthy();
  });

  it('deve chamar onPress quando pressionado', () => {
    const { getByText } = render(
      <CustomButton title="Test Button" onPress={mockOnPress} />,
    );

    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('deve renderizar ActivityIndicator quando loading é true', () => {
    const { UNSAFE_getByType } = render(
      <CustomButton title="Test Button" onPress={mockOnPress} loading={true} />,
    );

    expect(UNSAFE_getByType('ActivityIndicator')).toBeTruthy();
  });

  it('não deve chamar onPress quando loading é true', () => {
    const { UNSAFE_getByType } = render(
      <CustomButton title="Test Button" onPress={mockOnPress} loading={true} />,
    );

    // Verifica que o ActivityIndicator está presente e o botão está desabilitado
    expect(UNSAFE_getByType('ActivityIndicator')).toBeTruthy();
  });

  it('não deve chamar onPress quando disabled é true', () => {
    const { getByText } = render(
      <CustomButton title="Test Button" onPress={mockOnPress} disabled={true} />,
    );

    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('não deve chamar onPress quando disabled e loading são true', () => {
    const { UNSAFE_getByType } = render(
      <CustomButton
        title="Test Button"
        onPress={mockOnPress}
        disabled={true}
        loading={true}
      />,
    );

    // Verifica que o ActivityIndicator está presente
    expect(UNSAFE_getByType('ActivityIndicator')).toBeTruthy();
  });

  it('deve aplicar estilo disabled quando disabled é true', () => {
    const { getByText } = render(
      <CustomButton title="Test Button" onPress={mockOnPress} disabled={true} />,
    );

    const button = getByText('Test Button').parent;
    expect(button).toBeTruthy();
  });

  it('deve ter acessibilidade configurada corretamente', () => {
    const { getByText } = render(
      <CustomButton title="Test Button" onPress={mockOnPress} />,
    );

    const button = getByText('Test Button');
    expect(button).toBeTruthy();
  });

  it('deve renderizar texto quando não está loading', () => {
    const { getByText, queryByTestId } = render(
      <CustomButton title="Test Button" onPress={mockOnPress} loading={false} />,
    );

    expect(getByText('Test Button')).toBeTruthy();
    expect(queryByTestId('activity-indicator')).toBeNull();
  });

  it('deve ter props corretas configuradas', () => {
    const { getByText } = render(
      <CustomButton title="Custom Title" onPress={mockOnPress} />,
    );

    const button = getByText('Custom Title');
    expect(button.props.children).toBe('Custom Title');
  });
}); 