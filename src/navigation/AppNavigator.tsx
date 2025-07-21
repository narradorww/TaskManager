import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DashboardScreen } from '../features/tasks/screens/DashBoardScreen';
import { TaskScreen } from '../features/tasks/screens/TaskScreen';
import SplashScreen from '../features/tasks/screens/SplashScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const DashboardIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="home-outline" color={color} size={size} />
);

const TaskManagementIcon = ({
  color,
  size,
}: {
  color: string;
  size: number;
}) => <Icon name="list-outline" color={color} size={size} />;

const BottomTabsNavigator = () => (
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
        tabBarIcon: DashboardIcon,
      }}
    />
    <Tab.Screen
      name="TaskManagement"
      component={TaskScreen}
      options={{
        title: 'Gerenciar Tarefas',
        tabBarIcon: TaskManagementIcon,
      }}
    />
  </Tab.Navigator>
);

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Main" component={BottomTabsNavigator} />
    </Stack.Navigator>
  );
};
