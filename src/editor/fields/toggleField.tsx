import { ChangeEvent } from 'react';
import { useBound, CustomTag } from 'anux-react-utils';
import { Switch } from '@material-ui/core';
import { anuxUIFunctionComponent } from '../../utils';
import { classNames } from '../../styles';
import styles from './styles';

interface IProps {
  className?: string;
  label?: string;
  isReadOnly?: boolean;
  applyShrunkenLabel?: boolean;
  get: boolean;
  set?(newValue: boolean): void;
}

export const ToggleField = anuxUIFunctionComponent<IProps>('Editor-Toggle-Field', ({
  className,
  label,
  get,
  set,
  isReadOnly = false,
  applyShrunkenLabel = false,
}, ref) => {
  isReadOnly = isReadOnly || !set;

  const handleChanged = useBound((_event: ChangeEvent, isChecked: boolean) => {
    if (isReadOnly) { return; }
    set(isChecked);
  });

  return (
    <CustomTag name="anux-editor-toggle-field" ref={ref} className={classNames(styles.toggleField.root(applyShrunkenLabel), className)}>
      <CustomTag name="anux-editor-toggle-label" className={styles.toggleField.label(applyShrunkenLabel)}>{label}</CustomTag>
      <Switch
        checked={get}
        disabled={isReadOnly}
        onChange={handleChanged}
        color="primary"
        className={styles.toggleField.span}
      />
    </CustomTag>
  );
});
