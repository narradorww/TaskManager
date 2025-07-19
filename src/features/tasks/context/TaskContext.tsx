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
  
  // 1. Atualizamos a interface do contexto para incluir os novos contadores
  interface ITasksContext {
    state: TasksState;
    dispatch: Dispatch<TasksAction>;
    pendingTasksCount: number;
    completedTasksCount: number;
  }
  
  export const TasksContext = createContext<ITasksContext | undefined>(undefined);
  
  export const TasksProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(tasksReducer, initialState);
  
    // Efeitos para carregar/salvar no AsyncStorage (lógica anterior)
    useEffect(() => {
      const loadTasks = async () => {
        try {
          const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
          if (storedTasks !== null) {
            dispatch({ type: 'INITIALIZE_STATE', payload: JSON.parse(storedTasks) });
          } else {
            dispatch({ type: 'SET_LOADING', payload: false });
          }
        } catch (e) {
          console.error('Failed to load tasks from storage', e);
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      };
      loadTasks();
    }, []);
  
    useEffect(() => {
      if (!state.isLoading) {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
      }
    }, [state.tasks, state.isLoading]);
  
    // 2. Otimização: Calculamos os contadores aqui, usando useMemo.
    // Este cálculo só será refeito se `state.tasks` mudar.
    const pendingTasksCount = useMemo(
      () => state.tasks.filter(task => task.status === 'PENDING').length,
      [state.tasks]
    );
    const completedTasksCount = useMemo(
      () => state.tasks.filter(task => task.status === 'COMPLETED').length,
      [state.tasks]
    );
  
    // 3. O valor do contexto agora inclui o estado, o dispatch e os contadores.
    // Usamos useMemo para o objeto de valor para evitar re-renderizações desnecessárias.
    const contextValue = useMemo(
      () => ({
        state,
        dispatch,
        pendingTasksCount,
        completedTasksCount,
      }),
      [state, pendingTasksCount, completedTasksCount]
    );
  
    return (
      <TasksContext.Provider value={contextValue}>
        {children}
      </TasksContext.Provider>
    );
  };
  
  // O hook customizado agora retorna o contexto enriquecido.
  export const useTasks = (): ITasksContext => {
    const context = useContext(TasksContext);
    if (context === undefined) {
      throw new Error('useTasks deve ser usado dentro de um TasksProvider');
    }
    return context;
  };
  