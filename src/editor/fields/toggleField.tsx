import { ChangeEvent, FunctionComponent } from 'react';
import { useBound, CustomTag } from 'anux-react-utils';
import { Switch } from '@material-ui/core';
import styles from './styles';

interface IProps {
  label?: string;
  isReadOnly?: boolean;
  get: boolean;
  set?(newValue: boolean): void;
}

export const ToggleField: FunctionComponent<IProps> = ({
  label,
  get,
  set,
  isReadOnly = false,
}) => {
  isReadOnly = isReadOnly || !set;

  const handleChanged = useBound((_event: ChangeEvent, isChecked: boolean) => {
    if (isReadOnly) { return; }
    set(isChecked);
  });

  return (
    <CustomTag name="anux-editor-toggle-field" className={styles.toggleField.root}>
      <CustomTag name="anux-editor-toggle-label" className={styles.toggleField.label}>{label}</CustomTag>
      <Switch
        checked={get}
        disabled={isReadOnly}
        onChange={handleChanged}
        color="primary"
        className={styles.toggleField.span}
      />
    </CustomTag>
  );
};
