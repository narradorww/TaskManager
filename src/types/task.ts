export type TaskStatus = 'PENDING' | 'COMPLETED';

export interface Task {
  id: string;
  text: string;
  status: TaskStatus;
}

export interface TasksState {
  tasks: Task[];
  isLoading: boolean;
}

export type TasksAction =
  | { type: 'ADD_TASK'; payload: { text: string } }
  | { type: 'UPDATE_TASK_STATUS'; payload: { id: string; status: TaskStatus } }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'INITIALIZE_STATE'; payload: Task[] }
  | { type: 'SET_LOADING'; payload: boolean };
