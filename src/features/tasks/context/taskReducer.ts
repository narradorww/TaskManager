import { TasksAction, TasksState } from '../../../types/task';

export const initialState: TasksState = {
  tasks: [],
  isLoading: true,
};

export const tasksReducer = (
  state: TasksState,
  action: TasksAction,
): TasksState => {
  switch (action.type) {
    case 'INITIALIZE_STATE':
      return {
        tasks: action.payload,
        isLoading: false,
      };

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
            : task,
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
