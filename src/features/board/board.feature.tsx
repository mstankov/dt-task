import { createContext, FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { BoardData, Department as TDepartment, Employee } from '../../shared/types';
import styles from './board.module.scss';
import { Filter } from '../../components/filter/filter';
import { groupEmployeesByDepartmentId, markSelectedAll, markSelected } from './board.utils';
import { Department } from '../../components/department/department';
import { Button } from '../../components/button/button';
import { DepartmentContext, EmployeeContext } from '../../App';

export const DataContext = createContext<BoardData | null>(null);
DataContext.displayName = 'DataContext';

export const Board: FC = () => {
  // Contexts
  const [departments, departmentDispatcher] = useContext(DepartmentContext)!;
  const [employees, employeeDispatcher] = useContext(EmployeeContext)!;
  const data = useContext(DataContext);
  const [filteredDepartment, setFilteredDepartment] = useState<TDepartment | null>(null);
  const groupedEmployees = useMemo(() => {
    return groupEmployeesByDepartmentId(employees);
  }, [employees]);

  // Click handlers
  const onSelectAll = useCallback(() => {
    employeeDispatcher('updateMany', markSelectedAll(employees, true));
  }, [employees]);

  const onEmployeeClick = useCallback(
    (employee: Employee) => {
      employeeDispatcher('update', markSelected(employee, !employee.selected));
    },
    [employeeDispatcher]
  );

  const onDepartmentClick = useCallback(
    (department: TDepartment) => {
      departmentDispatcher('update', markSelected(department, !department.selected));
      employeeDispatcher(
        'updateMany',
        markSelectedAll(groupedEmployees[department.id], !department.selected)
      );
    },
    [departmentDispatcher, employeeDispatcher, groupedEmployees]
  );

  const onDepartmentFilterClear = useCallback(
    () => setFilteredDepartment(null),
    [setFilteredDepartment]
  );

  const filteredDepartments = useMemo(() => {
    return filteredDepartment ? [filteredDepartment] : departments;
  }, [filteredDepartment, departments]);

  const onClearAll = useCallback(() => {
    departmentDispatcher('updateMany', markSelectedAll(departments, false));
    employeeDispatcher('updateMany', markSelectedAll(employees, false));
    setFilteredDepartment(null);
  }, [departments, employees]);

  // Button states
  const isClearDisabled = useMemo(() => {
    const hasSelected = employees.some((x) => x.selected);
    const hasFiltered = !!filteredDepartment;
    return !hasSelected && !hasFiltered;
  }, [filteredDepartment, employees]);

  const isSelectAllDisabled = useMemo(() => {
    return employees.every((x) => x.selected);
  }, [employees]);

  // Listeners
  useEffect(() => {
    Object.keys(groupedEmployees).forEach((id) => {
      const depId = Number(id);
      const employees = groupedEmployees[depId];

      if (employees.every((x) => x.selected)) {
        const dep = departments.find((x) => x.id === depId);
        if (dep) {
          departmentDispatcher('update', markSelected(dep, true));
        }
      }
    });
  }, [groupedEmployees]);

  return (
    <div className={styles.container}>
      <h1 className={styles.name}>{data?.organization.name.toUpperCase() ?? ''}</h1>
      <hr />
      <div className={styles.filtersContainer}>
        <Filter<TDepartment>
          onClear={onDepartmentFilterClear}
          onChange={setFilteredDepartment}
          label="Departments"
          data={departments.map((x) => ({ value: x, label: x.name }))}
          selected={
            filteredDepartment
              ? { value: filteredDepartment, label: filteredDepartment.name }
              : null
          }
        />
        <Button
          disabled={isSelectAllDisabled}
          className={styles.button}
          type="button"
          onClick={onSelectAll}
        >
          Select all
        </Button>
        <Button
          disabled={isClearDisabled}
          className={styles.button}
          type="button"
          onClick={onClearAll}
        >
          Clear All
        </Button>
      </div>
      <div className={styles.departmentsContainer}>
        {filteredDepartments.map((x, i) => (
          <Department
            onEmployeeClick={onEmployeeClick}
            onClick={onDepartmentClick}
            key={`${i}-${x.id}-${x.name}`}
            employees={groupedEmployees[x.id]}
            department={x}
          />
        ))}
      </div>
    </div>
  );
};
