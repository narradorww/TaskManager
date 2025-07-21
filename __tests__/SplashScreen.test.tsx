import React from 'react';
import { render, act } from '@testing-library/react-native';
import SplashScreen from '../src/features/tasks/screens/SplashScreen';

jest.useFakeTimers();

const mockReplace = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({ replace: mockReplace }),
  };
});

describe('SplashScreen', () => {
  beforeEach(() => {
    mockReplace.mockClear();
  });

  it('deve exibir os textos animados e navegar para Main após 2s', () => {
    const { getByText } = render(<SplashScreen />);
    expect(getByText('Task Manager')).toBeTruthy();
    expect(getByText('by Rodrigo Alexandre feat Capitani Group')).toBeTruthy();

    // Avança o tempo para disparar navegação
    act(() => {
      jest.advanceTimersByTime(2100);
    });
    expect(mockReplace).toHaveBeenCalledWith('Main');
  });
});
