import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Keyboard } from 'react-native';
import { useTasks } from '../../context/TaskContext';
import { CustomButton } from '../atoms/CustomButton';

export const AddTaskForm = () => {
  const [text, setText] = useState('');
  const { dispatch } = useTasks();

  const handleAddTask = () => {
    if (text.trim().length > 0) {
      dispatch({ type: 'ADD_TASK', payload: { text: text.trim() } });
      setText('');
      Keyboard.dismiss();
    }
  };

  return (
    <View testID="add-task-form" style={styles.container}>
      <TextInput
        testID="task-input"
        style={styles.input}
        placeholder="Adicionar uma nova tarefa..."
        placeholderTextColor="#8e8e93"
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleAddTask}
        returnKeyType="done"
      />
      <CustomButton
        testID="add-task-button"
        title="Adicionar"
        onPress={handleAddTask}
        disabled={text.trim().length === 0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f9f9f9',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});
