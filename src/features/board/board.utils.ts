import { BaseEntity } from '../../entityAdapter/entityAdapter.utils';
import { NULL_DATA_ID } from '../../shared/constants';
import { Employee, Selected } from '../../shared/types';

/**
 * Groups employees by department ID
 *
 * ! If department id is missing, employee is assigned to special department id  const `NULL_DATA_ID`
 * @param employees Employees data arr
 * @returns Returns grouped employees by department ID
 */
export const groupEmployeesByDepartmentId = (employees: Employee[]) => {
  return employees.reduce<Record<number, Employee[]>>(
    (acc, employee) => {
      const { department } = employee;
      if (!department) acc[NULL_DATA_ID].push(employee);
      else {
        if (!(department in acc)) acc[department] = [];

        acc[department].push(employee);
      }

      return acc;
    },
    { [NULL_DATA_ID]: [] }
  );
};

export const markSelected = <T extends BaseEntity>(entity: T, selected: boolean): T & Selected => ({
  ...entity,
  selected,
});
/**
 * Marks all provided entities as selected
 * @param entities Entities
 * @returns Updated entities
 */
export const markSelectedAll = <T extends BaseEntity>(
  entities: T[],
  selected: boolean
): (T & Selected)[] => entities.map((x) => markSelected(x, selected));
