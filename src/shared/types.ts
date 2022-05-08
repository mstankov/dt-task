import data from '../data/data.json';
import { GetArrayType } from '../utils/ts-utils';

export type BoardData = typeof data;
export type Organization = BoardData['organization'];
export type Employees = Organization['employees'];
export type Departments = Organization['departments'];

export type Selected = { selected?: boolean };
export type Employee = GetArrayType<Employees> & Selected;
export type Department = GetArrayType<Departments> & Selected;
