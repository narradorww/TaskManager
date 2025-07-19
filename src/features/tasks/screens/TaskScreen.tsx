import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  Platform,
} from 'react-native';
import { AddTaskForm } from '../components/molecules/AddTaskForm';
import { TaskList } from '../components/molecules/TaskList';
import { TaskActions } from '../components/molecules/TaskActions';
import { useTasks } from '../context/TaskContext';

export const TaskScreen = () => {
  const { state } = useTasks();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9f9f9" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Task Manager</Text>
        </View>

        <View style={styles.formContainer}>
          <AddTaskForm />
        </View>

        <View style={styles.listContainer}>
          <TaskList tasks={state.tasks} />
        </View>

        <TaskActions />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 52 : 48,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#f9f9f9',
    paddingTop: 8,
    paddingBottom: 8,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 8,
  },
});
