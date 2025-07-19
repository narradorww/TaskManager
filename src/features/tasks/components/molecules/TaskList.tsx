import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Task } from '../../../../types/task';
import { TaskItem } from './TaskItem';

export const ITEM_HEIGHT = 66;

interface TaskListProps {
  tasks: Task[];
}

export const TaskList = ({ tasks }: TaskListProps) => {
  const renderItem = ({ item }: { item: Task }) => <TaskItem task={item} />;

  const getItemLayout = (_: unknown, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  return (
    <FlatList
      testID="task-list"
      data={tasks}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      getItemLayout={getItemLayout}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
