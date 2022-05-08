import { FC } from 'react';
import classNames from 'classnames';
import styles from './checkbox.module.scss';

export type CheckboxProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type'
>;
export const Checkbox: FC<CheckboxProps> = ({ className, ...rest }) => {
  return <input className={classNames(styles.checkbox, className)} type="checkbox" {...rest} />;
};
