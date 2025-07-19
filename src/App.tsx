/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { TasksProvider } from './features/tasks/context/TaskContext';
import { TaskScreen } from './features/tasks/screens/TaskScreen';

function App() {
  return (
    <TasksProvider>
      <TaskScreen />
    </TasksProvider>
  );
}

export default App;
