import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DashboardScreen } from '../features/tasks/screens/DashBoardScreen';
import { TaskScreen } from '../features/tasks/screens/TaskScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: 'Dashboard de Tarefas' }}
      />
      <Stack.Screen
        name="TaskManagement"
        component={TaskScreen}
        options={{ title: 'Gerenciar Tarefas' }}
      />
    </Stack.Navigator>
  );
};
