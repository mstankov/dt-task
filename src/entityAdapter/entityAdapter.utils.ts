import { useReducer } from 'react';

// Types
export type BaseEntity = { id: number; selected?: boolean };
export type Operation = 'add' | 'remove' | 'clear' | 'addMany' | 'update' | 'updateMany';
export type State<T extends BaseEntity> = T[];
export type Action<T extends BaseEntity> = {
  operation: Operation;
  payload?: T | T[];
};
export type Executor = <T extends BaseEntity>(state: State<T>, payload?: T | T[]) => State<T>;
export type EntityStateReducer<T extends BaseEntity> = [
  State<T>,
  (operation: Operation, payload?: T | T[]) => void
];

/**
 * Operation/Executor map
 *
 * Provides an executor for each operation
 */
const operationMap: Record<Operation, Executor> = {
  add: (state, payload) => {
    const result = [...state];

    if (payload && !Array.isArray(payload)) {
      const index = result.findIndex((x) => x.id === payload.id);

      if (index > -1) throw Error('[add] Bad action - attempting to add already existing entity');

      result.push(payload);
    }

    return result;
  },
  remove: (state, payload) => {
    const result = [...state];

    if (payload && !Array.isArray(payload)) {
      const index = result.findIndex((x) => x.id === payload.id);

      if (index === -1) throw Error('[remove] Bad action - attempting to remove missing entity');

      result.splice(index, 1);
    }

    return result;
  },
  clear: (state) => {
    const result = [...state];
    result.splice(0, result.length);
    return result;
  },
  addMany: (state, payload) => {
    if (payload && Array.isArray(payload)) {
      const result = [...state, ...payload];
      return result;
    }

    return state;
  },
  update: (state, payload) => {
    const result = [...state];

    if (payload && !Array.isArray(payload)) {
      const index = result.findIndex((x) => x.id === payload.id);
      if (index === -1) throw Error('[update] Bad action - attempting to update missing entity');

      const entity = { ...result[index], ...payload };
      result.splice(index, 1, entity);
    }

    return result;
  },
  updateMany: (state, payload) => {
    const result = [...state];

    if (payload && Array.isArray(payload)) {
      payload.forEach((entity) => {
        const stateIndex = result.findIndex((x) => x.id === entity.id);
        const payloadIndex = payload.findIndex((x) => x.id === entity.id);
        if (stateIndex === -1 || stateIndex === -1)
          throw Error('[updateMany] Bad action - attempting to update missing entity');

        const updated = { ...result[stateIndex], ...payload[payloadIndex] };

        result.splice(stateIndex, 1, updated);
      });
    }

    return result;
  },
};

/**
 * Provides Entity Reducer function
 * @param name Entity Reducer name
 * @returns Entity Reducer for use with useReducer
 */
const getEntityReducer =
  <T extends BaseEntity>(name: string) =>
  (state: State<T>, action: Action<T>) => {
    const { payload, operation } = action;
    const executor = operationMap[operation];

    if (!executor) throw Error(`[entityReducer: ${name}] Invalid operation provided`);

    const updatedState = executor(state, payload);
    return updatedState;
  };

/**
 * Reusable Entity Reducer hook
 * @param initialState Initial Reducer state
 * @param name Reducer Name
 * @returns Reducer State and typed dispatcher
 */
export const useEntityReducer = <T extends BaseEntity>(
  initialState: T[] = [],
  name: string
): EntityStateReducer<T> => {
  const entityReducer = getEntityReducer<T>(name);
  const [state, dispatcher] = useReducer(entityReducer, initialState);

  const actionDispatcher = (operation: Operation, payload: Action<T>['payload']) =>
    dispatcher({ operation, payload });

  return [state, actionDispatcher];
};
