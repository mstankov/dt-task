import React, { FC } from 'react';
import styles from './loadingIndicator.module.scss';
import classnames from 'classnames';

export const LoadingIndicator: FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, ...rest }) => <div className={classnames(styles.loader, className)} {...rest} />;
