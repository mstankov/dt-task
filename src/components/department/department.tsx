import classNames from 'classnames';
import { FC } from 'react';
import { Department as TDepartment, Employee as TEmployee } from '../../shared/types';
import { Checkbox } from '../checkbox/checkbox';
import { Employee } from '../employee/employee';
import styles from './department.module.scss';

export type DepartmentProps = {
  employees: TEmployee[];
  department: TDepartment;
  onEmployeeClick: (employee: TEmployee) => void;
  onClick: (department: TDepartment) => void;
};

export const Department: FC<DepartmentProps> = ({
  employees,
  department,
  onEmployeeClick,
  onClick,
}) => (
  <div className={classNames(styles.container, department.selected && styles.selected)}>
    <div className={styles.header}>
      <h2 className={styles.name}>
        {`${department.name} ${employees.filter((x) => x.department === department.id).length}`}
      </h2>
      <Checkbox
        onClick={() => onClick(department)}
        checked={department.selected}
        className={styles.checkbox}
      />
    </div>
    <div className={styles.employees}>
      {employees.map((x, i) => (
        <Employee onClick={onEmployeeClick} key={`${x.name}-${x.id}-${i}`} data={x} />
      ))}
    </div>
  </div>
);
