import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Task, TaskStatus } from '../../../../types/task';
import { useTasks } from '../../context/TaskContext';

interface TaskItemProps {
  task: Task;
}

export const TaskItem = ({ task }: TaskItemProps) => {
  const { dispatch } = useTasks();

  const handleToggleStatus = () => {
    const newStatus: TaskStatus =
      task.status === 'PENDING' ? 'COMPLETED' : 'PENDING';

    dispatch({
      type: 'UPDATE_TASK_STATUS',
      payload: { id: task.id, status: newStatus },
    });
  };

  const isCompleted = task.status === 'COMPLETED';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.checkbox, isCompleted && styles.checkboxCompleted]}
        onPress={handleToggleStatus}
        accessibilityRole="button"
        accessibilityLabel={`Marcar tarefa ${task.text} como ${isCompleted ? 'pendente' : 'concluída'}`}>
        {isCompleted && <Text style={styles.checkboxText}>✓</Text>}
      </TouchableOpacity>

      <Text style={[styles.text, isCompleted && styles.textCompleted]}>
        {task.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  checkboxCompleted: {
    backgroundColor: '#34C759',
    borderColor: '#34C759',
  },
  checkboxText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: '#8e8e93',
  },
});
