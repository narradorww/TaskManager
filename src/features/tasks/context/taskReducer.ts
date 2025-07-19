import { TasksAction, TasksState } from '../../../types/task';

/**
 * O estado inicial agora inclui a flag `isLoading`.
 * A aplicação começa em um estado de carregamento até que os dados do
 * AsyncStorage sejam lidos.
 */
export const initialState: TasksState = {
  tasks: [],
  isLoading: true,
};

/**
 * O reducer atualizado para lidar com a persistência e o estado de carregamento.
 */
export const tasksReducer = (state: TasksState, action: TasksAction): TasksState => {
  switch (action.type) {
    /**
     * Nova ação para popular o estado com os dados carregados do AsyncStorage.
     * Define `isLoading` como `false` para indicar que o carregamento inicial terminou.
     */
    case 'INITIALIZE_STATE':
      return {
        tasks: action.payload,
        isLoading: false,
      };

    /**
     * Nova ação para controlar manualmente o estado de carregamento.
     * Útil caso não haja dados no storage.
     */
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'ADD_TASK': {
      const { v4: uuidv4 } = require('uuid');
      const newTask = {
        id: uuidv4(),
        text: action.payload.text,
        status: 'PENDING' as const,
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };
    }

    case 'UPDATE_TASK_STATUS': {
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, status: action.payload.status }
            : task
        ),
      };
    }

    case 'CLEAR_COMPLETED': {
      return {
        ...state,
        tasks: state.tasks.filter(task => task.status !== 'COMPLETED'),
      };
    }

    default:
      return state;
  }
};
