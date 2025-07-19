import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TasksProvider } from './features/tasks/context/TaskContext';
import { AppNavigator } from './navigation/AppNavigator';

function App() {
  return (
    <TasksProvider>
      <NavigationContainer testID="navigation-container">
        <AppNavigator />
      </NavigationContainer>
    </TasksProvider>
  );
}

export default App;
