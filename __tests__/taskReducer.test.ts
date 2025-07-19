import {
  tasksReducer,
  initialState,
} from '../src/features/tasks/context/taskReducer';
import { TasksState, TasksAction, TaskStatus } from '../src/types/task';

// Mock do uuid para os testes
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid-' + Math.random().toString(36).substr(2, 9)),
}));

describe('tasksReducer', () => {
  describe('ADD_TASK', () => {
    it('deve adicionar uma nova tarefa ao estado', () => {
      const state: TasksState = {
        tasks: [
          {
            id: '1',
            text: 'Tarefa existente',
            status: 'PENDING' as TaskStatus,
          },
        ],
        isLoading: false,
      };

      const action: TasksAction = {
        type: 'ADD_TASK',
        payload: { text: 'Nova tarefa' },
      };

      const newState = tasksReducer(state, action);

      expect(newState.tasks).toHaveLength(2);
      expect(newState.tasks[1]).toMatchObject({
        text: 'Nova tarefa',
        status: 'PENDING',
      });
      expect(newState.tasks[1].id).toBeDefined();
      expect(typeof newState.tasks[1].id).toBe('string');
    });

    it('deve adicionar uma tarefa quando o estado está vazio', () => {
      const action: TasksAction = {
        type: 'ADD_TASK',
        payload: { text: 'Primeira tarefa' },
      };

      const newState = tasksReducer(initialState, action);

      expect(newState.tasks).toHaveLength(1);
      expect(newState.tasks[0]).toMatchObject({
        text: 'Primeira tarefa',
        status: 'PENDING',
      });
    });

    it('deve gerar IDs únicos (UUIDs) para cada tarefa', () => {
      const action1: TasksAction = {
        type: 'ADD_TASK',
        payload: { text: 'Tarefa 1' },
      };

      const action2: TasksAction = {
        type: 'ADD_TASK',
        payload: { text: 'Tarefa 2' },
      };

      const state1 = tasksReducer(initialState, action1);
      const state2 = tasksReducer(state1, action2);

      expect(state2.tasks[0].id).not.toBe(state2.tasks[1].id);
      expect(state2.tasks[0].id).toBeDefined();
      expect(state2.tasks[1].id).toBeDefined();
      expect(typeof state2.tasks[0].id).toBe('string');
      expect(typeof state2.tasks[1].id).toBe('string');

      // Verifica se são IDs únicos (mock UUIDs)
      expect(state2.tasks[0].id).toMatch(/^test-uuid-/);
      expect(state2.tasks[1].id).toMatch(/^test-uuid-/);
    });
  });

  describe('UPDATE_TASK_STATUS', () => {
    it('deve atualizar o status de uma tarefa específica', () => {
      const state: TasksState = {
        tasks: [
          {
            id: '1',
            text: 'Tarefa 1',
            status: 'PENDING' as TaskStatus,
          },
          {
            id: '2',
            text: 'Tarefa 2',
            status: 'PENDING' as TaskStatus,
          },
        ],
        isLoading: false,
      };

      const action: TasksAction = {
        type: 'UPDATE_TASK_STATUS',
        payload: { id: '1', status: 'COMPLETED' as TaskStatus },
      };

      const newState = tasksReducer(state, action);

      expect(newState.tasks[0].status).toBe('COMPLETED');
      expect(newState.tasks[1].status).toBe('PENDING'); // Não deve ser alterada
    });

    it('deve manter o estado inalterado se o ID não existir', () => {
      const state: TasksState = {
        tasks: [
          {
            id: '1',
            text: 'Tarefa 1',
            status: 'PENDING' as TaskStatus,
          },
        ],
        isLoading: false,
      };

      const action: TasksAction = {
        type: 'UPDATE_TASK_STATUS',
        payload: { id: '999', status: 'COMPLETED' as TaskStatus },
      };

      const newState = tasksReducer(state, action);

      expect(newState.tasks).toEqual(state.tasks);
    });

    it('deve permitir alternar entre PENDING e COMPLETED', () => {
      const state: TasksState = {
        tasks: [
          {
            id: '1',
            text: 'Tarefa 1',
            status: 'PENDING' as TaskStatus,
          },
        ],
        isLoading: false,
      };

      // Primeira transição: PENDING -> COMPLETED
      const action1: TasksAction = {
        type: 'UPDATE_TASK_STATUS',
        payload: { id: '1', status: 'COMPLETED' as TaskStatus },
      };

      const state1 = tasksReducer(state, action1);
      expect(state1.tasks[0].status).toBe('COMPLETED');

      // Segunda transição: COMPLETED -> PENDING
      const action2: TasksAction = {
        type: 'UPDATE_TASK_STATUS',
        payload: { id: '1', status: 'PENDING' as TaskStatus },
      };

      const state2 = tasksReducer(state1, action2);
      expect(state2.tasks[0].status).toBe('PENDING');
    });
  });

  describe('CLEAR_COMPLETED', () => {
    it('deve remover todas as tarefas completadas', () => {
      const state: TasksState = {
        tasks: [
          {
            id: '1',
            text: 'Tarefa pendente 1',
            status: 'PENDING' as TaskStatus,
          },
          {
            id: '2',
            text: 'Tarefa completada 1',
            status: 'COMPLETED' as TaskStatus,
          },
          {
            id: '3',
            text: 'Tarefa pendente 2',
            status: 'PENDING' as TaskStatus,
          },
          {
            id: '4',
            text: 'Tarefa completada 2',
            status: 'COMPLETED' as TaskStatus,
          },
        ],
        isLoading: false,
      };

      const action: TasksAction = {
        type: 'CLEAR_COMPLETED',
      };

      const newState = tasksReducer(state, action);

      expect(newState.tasks).toHaveLength(2);
      expect(newState.tasks[0].id).toBe('1');
      expect(newState.tasks[1].id).toBe('3');
      expect(newState.tasks.every(task => task.status === 'PENDING')).toBe(
        true,
      );
    });

    it('deve manter o estado inalterado se não houver tarefas completadas', () => {
      const state: TasksState = {
        tasks: [
          {
            id: '1',
            text: 'Tarefa pendente 1',
            status: 'PENDING' as TaskStatus,
          },
          {
            id: '2',
            text: 'Tarefa pendente 2',
            status: 'PENDING' as TaskStatus,
          },
        ],
        isLoading: false,
      };

      const action: TasksAction = {
        type: 'CLEAR_COMPLETED',
      };

      const newState = tasksReducer(state, action);

      expect(newState.tasks).toEqual(state.tasks);
    });

    it('deve retornar estado vazio se todas as tarefas forem completadas', () => {
      const state: TasksState = {
        tasks: [
          {
            id: '1',
            text: 'Tarefa completada 1',
            status: 'COMPLETED' as TaskStatus,
          },
          {
            id: '2',
            text: 'Tarefa completada 2',
            status: 'COMPLETED' as TaskStatus,
          },
        ],
        isLoading: false,
      };

      const action: TasksAction = {
        type: 'CLEAR_COMPLETED',
      };

      const newState = tasksReducer(state, action);

      expect(newState.tasks).toHaveLength(0);
    });
  });

  describe('Estado inicial', () => {
    it('deve retornar o estado inicial quando nenhuma ação é fornecida', () => {
      const action = {} as TasksAction;
      const newState = tasksReducer(initialState, action);

      expect(newState).toEqual(initialState);
    });

    it('deve ter a estrutura correta do estado inicial', () => {
      expect(initialState).toHaveProperty('tasks');
      expect(Array.isArray(initialState.tasks)).toBe(true);
      expect(initialState.tasks).toHaveLength(0);
    });
  });

  describe('Imutabilidade', () => {
    it('deve retornar um novo objeto de estado sem modificar o original', () => {
      const state: TasksState = {
        tasks: [
          {
            id: '1',
            text: 'Tarefa original',
            status: 'PENDING' as TaskStatus,
          },
        ],
        isLoading: false,
      };

      const action: TasksAction = {
        type: 'ADD_TASK',
        payload: { text: 'Nova tarefa' },
      };

      const newState = tasksReducer(state, action);

      // Verifica se o estado original não foi modificado
      expect(state.tasks).toHaveLength(1);
      expect(newState.tasks).toHaveLength(2);
      expect(state).not.toBe(newState);
    });

    it('deve criar novos objetos para tarefas modificadas', () => {
      const state: TasksState = {
        tasks: [
          {
            id: '1',
            text: 'Tarefa original',
            status: 'PENDING' as TaskStatus,
          },
        ],
        isLoading: false,
      };

      const action: TasksAction = {
        type: 'UPDATE_TASK_STATUS',
        payload: { id: '1', status: 'COMPLETED' as TaskStatus },
      };

      const newState = tasksReducer(state, action);

      // Verifica se a tarefa modificada é um novo objeto
      expect(state.tasks[0]).not.toBe(newState.tasks[0]);
      expect(state.tasks[0].status).toBe('PENDING');
      expect(newState.tasks[0].status).toBe('COMPLETED');
    });
  });
});
