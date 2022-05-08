import classNames from 'classnames';
import { FC } from 'react';
import { Employee as TEmployee } from '../../shared/types';
import { Checkbox } from '../checkbox/checkbox';
import { Selected } from '../selected/selected';
import styles from './employee.module.scss';

export type EmployeeProps = {
  data: TEmployee;
  onClick: (employee: TEmployee) => void;
};

export const Employee: FC<EmployeeProps> = ({ data, onClick }) => (
  <div
    aria-label="Employee"
    onClick={() => onClick(data)}
    className={classNames(styles.container, data.selected && styles.selected)}
  >
    <div className={styles.avatarContainer}>
      <Checkbox aria-checked={data.selected} className={styles.checkbox} checked={data.selected} />
      <img
        className={styles.avatar}
        alt={`${data.name}'s avatar image`}
        loading="lazy"
        src={data.avatar}
      />
      <div className={styles.details}>
        <span className={styles.name}>{data.name}</span>
      </div>
      {data.selected && <Selected />}
    </div>
  </div>
);
