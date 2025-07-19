import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Task } from '../../../../types/task';
import { TaskItem } from './TaskItem';

export const ITEM_HEIGHT = 60;

interface TaskListProps {
  tasks: Task[];
}

export const TaskList = ({ tasks }: TaskListProps) => {
  const renderItem = ({ item }: { item: Task }) => (
    <TaskItem task={item} />
  );

  const getItemLayout = (_: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  return (
    <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
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
