import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useTasks } from '../../context/TaskContext';

export const TaskActions = () => {
  const { state, dispatch } = useTasks();

  const hasCompletedTasks = state.tasks.some(
    task => task.status === 'COMPLETED',
  );

  const handleClearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  if (!hasCompletedTasks) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Button
        title="Limpar Concluídas"
        onPress={handleClearCompleted}
        color="#E53935"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
});
