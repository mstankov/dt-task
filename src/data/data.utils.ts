import { MISSING_DEPARTMENT } from '../shared/constants';
import { Department, Employee } from '../shared/types';

export const addMissingDepartment = (data: Department[]): Department[] => [
  ...data,
  MISSING_DEPARTMENT,
];

export const addMissingDepartmentId = (data: Employee[]): Employee[] =>
  data.map((x) => ({ ...x, department: x.department || MISSING_DEPARTMENT.id }));
