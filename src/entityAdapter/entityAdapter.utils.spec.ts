import * as entityAdapterUtils from './entityAdapter.utils';

let state: entityAdapterUtils.BaseEntity[];

beforeEach(() => {
  state = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ];
});

describe('entityAdapterUtils', () => {
  describe('executors', () => {
    it('clear - should return empty state', () => {
      const updated = entityAdapterUtils.clear(state);
      expect(updated.length).toBe(0);
    });
    it('add - should return updated state with new entity', () => {
      const entity: entityAdapterUtils.BaseEntity = { id: 4 };
      const updated = entityAdapterUtils.add(state, entity);

      expect(updated.length).toBe(4);
      expect(updated.includes(entity)).toBeTruthy();
    });
    it('addMany - should return updated state with new entities', () => {
      const entities: entityAdapterUtils.BaseEntity[] = [{ id: 4 }, { id: 5 }];
      const updated = entityAdapterUtils.addMany(state, entities);

      expect(updated.length).toBe(5);
      expect(updated.includes(entities[0])).toBeTruthy();
      expect(updated.includes(entities[1])).toBeTruthy();
    });
    it('update - should return updated state with updated entity', () => {
      const entity: entityAdapterUtils.BaseEntity = { id: 3, selected: true };
      const updated = entityAdapterUtils.update(state, entity);

      expect(updated.length).toBe(3);
      expect(updated.find((x) => x.id === entity.id)?.selected).toBeTruthy();
    });
    it('updateMany - should return updated state with updated entities', () => {
      const entities: entityAdapterUtils.BaseEntity[] = [...state].map((x) => ({
        ...x,
        selected: true,
      }));
      const updated = entityAdapterUtils.updateMany(state, entities);

      expect(updated.length).toBe(3);
      expect(updated.every((x) => x.selected === true)).toBeTruthy();
    });
    it('remove - should return updated state with removed entity', () => {
      const entity: entityAdapterUtils.BaseEntity = { id: 3 };
      const updated = entityAdapterUtils.remove(state, entity);

      expect(updated.length).toBe(2);
      expect(updated.find((x) => x.id === entity.id)).toBeFalsy();
    });
    it('update - should should throw error', () => {
      const entity: entityAdapterUtils.BaseEntity = { id: 4, selected: true };

      expect(() => entityAdapterUtils.update(state, entity)).toThrow();
    });
  });
});
