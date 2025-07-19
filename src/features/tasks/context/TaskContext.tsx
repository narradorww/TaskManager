import React, {
    createContext,
    useReducer,
    useMemo,
    Dispatch,
    useContext,
    ReactNode,
} from 'react';
import { initialState, tasksReducer } from './taskReducer';
import { TasksState, TasksAction } from '../../../types/task';

interface ITasksContext {
    state: TasksState;
    dispatch: Dispatch<TasksAction>;
}

export const TasksContext = createContext<ITasksContext | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(tasksReducer, initialState);

    const contextValue = useMemo(() => ({ state, dispatch }), [state]);

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