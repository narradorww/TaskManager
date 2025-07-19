import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Keyboard } from 'react-native';
import { useTasks } from '../../context/TaskContext';

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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Adicionar uma nova tarefa..."
        placeholderTextColor="#8e8e93"
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleAddTask}
        returnKeyType="done"
      />
      <Button
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
