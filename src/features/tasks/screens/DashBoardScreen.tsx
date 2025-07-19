import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTasks } from '../context/TaskContext';
import { CustomButton } from '../components/atoms/CustomButton';
import { StatusCard } from '../components/atoms/StatusCard';

type DashboardNavigationProp = {
  navigate: (screen: 'TaskManagement') => void;
};

export const DashboardScreen = () => {
  const { state, dispatch, pendingTasksCount, completedTasksCount } =
    useTasks();
  const navigation = useNavigation<DashboardNavigationProp>();

  const handleClearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  if (state.isLoading) {
    return (
      <View testID="dashboard-loading" style={styles.centered}>
        <Text testID="loading-text">Carregando tarefas...</Text>
      </View>
    );
  }

  return (
    <View testID="dashboard-screen" style={styles.container}>
      <Text testID="dashboard-title" style={styles.title}>
        Resumo das Tarefas
      </Text>

      <View testID="dashboard-cards-container" style={styles.cardsContainer}>
        <StatusCard
          label="Pendentes"
          count={pendingTasksCount}
          statusType="PENDING"
        />
        <StatusCard
          label="Concluídas"
          count={completedTasksCount}
          statusType="COMPLETED"
        />
      </View>

      <View
        testID="dashboard-actions-container"
        style={styles.actionsContainer}>
        <CustomButton
          title="Limpar Concluídas"
          onPress={handleClearCompleted}
          disabled={completedTasksCount === 0}
        />
        <View style={styles.spacer} />
        <CustomButton
          title="Gerenciar Tarefas"
          onPress={() => navigation.navigate('TaskManagement')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 48,
    color: '#343a40',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 48,
  },
  actionsContainer: {
    paddingHorizontal: 20,
  },
  spacer: {
    marginTop: 16,
  },
});
