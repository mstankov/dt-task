import { FC } from 'react';
import styles from './button.module.scss';
import classNames from 'classnames';

export const Button: FC<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ className, children, ...rest }) => {
  return (
    <button className={classNames(styles.button, className)} {...rest}>
      {children}
    </button>
  );
};
