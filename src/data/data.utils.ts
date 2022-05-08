import { markSelectedAll } from '../features/board/board.utils';
import { MISSING_DEPARTMENT } from '../shared/constants';
import {
  Department,
  Employee,
  EmployeeRaw,
  DepartmentRaw,
  NormalizedEmployeeRaw,
} from '../shared/types';

/**
 * Adds special department for employees without one
 * @param data Raw Departments as taken from backend
 * @returns Raw Departments with additional department obj for frontend
 */
const addMissingDepartmentEntity = (data: DepartmentRaw[]): DepartmentRaw[] => [
  ...data,
  MISSING_DEPARTMENT,
];

const addMissingDepartmentId = (employee: EmployeeRaw): NormalizedEmployeeRaw => ({
  ...employee,
  department: employee.department || MISSING_DEPARTMENT.id,
});

/**
 * Tunes department data for frontend work
 * @param data Raw departments as taken from backend
 * @returns Departments tuned for the departments reducer (with selected prop for example)
 */
export const normalizeDepartments = (data: DepartmentRaw[]): Department[] =>
  markSelectedAll(addMissingDepartmentEntity(data), false);

export const normalizeEmployees = (data: EmployeeRaw[]): Employee[] => {
  const updated = data.map(addMissingDepartmentId);
  return markSelectedAll(updated, false);
};
