import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '../features/tasks/screens/DashBoardScreen';
import { TaskScreen } from '../features/tasks/screens/TaskScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <Tab.Navigator
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
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Dashboard de Tarefas',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TaskManagement"
        component={TaskScreen}
        options={{
          title: 'Gerenciar Tarefas',
          tabBarIcon: ({ color, size }) => (
            <Icon name="list-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
