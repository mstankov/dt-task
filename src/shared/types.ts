import data from '../data/data.json';
import { GetArrayType } from '../utils/ts-utils';

export type BoardData = typeof data;
export type Organization = BoardData['organization'];
export type Employees = Organization['employees'];
export type Departments = Organization['departments'];

export type EmployeeRaw = GetArrayType<Employees>;
export type NormalizedEmployeeRaw = Required<EmployeeRaw>;
export type DepartmentRaw = GetArrayType<Departments>;

export type Selected = { selected: boolean };
export type Employee = NormalizedEmployeeRaw & Selected;
export type Department = DepartmentRaw & Selected;
