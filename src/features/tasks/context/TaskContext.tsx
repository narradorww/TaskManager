import React, {
  createContext,
  useReducer,
  useMemo,
  Dispatch,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initialState, tasksReducer } from './taskReducer';
import { TasksState, TasksAction } from '../../../types/task';

const STORAGE_KEY = '@TaskManager:tasks';

interface ITasksContext {
  state: TasksState;
  dispatch: Dispatch<TasksAction>;
  pendingTasksCount: number;
  completedTasksCount: number;
}

export const TasksContext = createContext<ITasksContext | undefined>(undefined);

export const TasksProvider = ({
  children,
  initialTestState,
}: {
  children: ReactNode;
  initialTestState?: TasksState;
}) => {
  const [state, dispatch] = useReducer(
    tasksReducer,
    initialTestState || initialState,
  );

  useEffect(() => {
    if (initialTestState) return; // Pula o efeito de carregamento em testes
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedTasks !== null) {
          dispatch({
            type: 'INITIALIZE_STATE',
            payload: JSON.parse(storedTasks),
          });
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (e) {
        console.error('Failed to load tasks from storage', e);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };
    loadTasks();
  }, [initialTestState]);

  useEffect(() => {
    if (!state.isLoading) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
    }
  }, [state.tasks, state.isLoading]);

  const pendingTasksCount = useMemo(
    () => state.tasks.filter(task => task.status === 'PENDING').length,
    [state.tasks],
  );
  const completedTasksCount = useMemo(
    () => state.tasks.filter(task => task.status === 'COMPLETED').length,
    [state.tasks],
  );

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      pendingTasksCount,
      completedTasksCount,
    }),
    [state, pendingTasksCount, completedTasksCount],
  );

  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = (): ITasksContext => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasks deve ser usado dentro de um TasksProvider');
  }
  return context;
};
