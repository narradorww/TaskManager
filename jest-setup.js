import '@testing-library/jest-native/extend-expect';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('@react-navigation/bottom-tabs', () => {
  const actualNav = jest.requireActual('@react-navigation/bottom-tabs');
  return {
    ...actualNav,
    createBottomTabNavigator: jest.fn(() => {
      return {
        Navigator: ({ children }) => children,
        Screen: ({ children }) => children,
      };
    }),
  };
});
