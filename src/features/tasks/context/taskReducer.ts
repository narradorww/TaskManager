import { Task, TasksAction, TasksState } from '../../../types/task';

export const initialState: TasksState = {
    tasks: [],
};

export const tasksReducer = (state: TasksState, action: TasksAction): TasksState => {
    switch (action.type) {
        case 'ADD_TASK': {
            const newTask: Task = {
                id: new Date().toISOString(),
                text: action.payload.text,
                status: 'PENDING',
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
