import classNames from 'classnames';
import { useCallback, useState } from 'react';
import styles from './filter.module.scss';

export type FilterItem<T> = { value: T; label: string };
export type FilterProps<T> = {
  data: FilterItem<T>[];
  onChange: (value: T | null) => void;
  onClear: () => void;
  selected: FilterItem<T> | undefined | null;
  label?: string;
};

export const Filter = <T,>({ data, onChange, label, onClear, selected }: FilterProps<T>) => {
  const [visible, setVisible] = useState(false);

  const changeVisibility = useCallback(() => {
    setVisible(!visible);
  }, [visible]);
  const onClearClick = useCallback((event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();

    onClear();
  }, []);

  const select = useCallback(
    (item: FilterItem<T>) => {
      onChange(item.value);
    },
    [onChange]
  );

  return (
    <div
      onClick={changeVisibility}
      className={classNames(styles.container, selected && styles.selected)}
    >
      {/* Label & Input */}
      {label && <span className={styles.label}>{label}</span>}
      <span className={styles.value}>{selected?.label ?? ''}</span>
      {selected && (
        <span onClick={onClearClick} className={styles.clear}>
          X
        </span>
      )}

      {/* Dropdown component (initially hidden) */}
      <ul className={classNames(styles.dropdown, visible && styles.visible)}>
        {data.map((x, i) => (
          <li
            key={`${x.label}-${i}`}
            onClick={() => {
              select(x);
            }}
            className={classNames(
              styles.filterOption,
              selected?.value === x.value && styles.active
            )}
          >
            {x.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
