import { ChangeEvent, useMemo } from 'react';
import { useBound, CustomTag } from 'anux-react-utils';
import { TextField as MUITextField } from '@material-ui/core';
import { InputLabelProps } from '@material-ui/core/InputLabel';
import { useValidation, useFieldId } from '../hooks';
import { anuxUIFunctionComponent } from '../../utils';
import { classNames } from '../../styles';
import styles from './styles';

interface IProps {
  className?: string;
  label?: string;
  isReadOnly?: boolean;
  isRequired?: boolean;
  applyShrunkenLabel?: boolean;
  hint?: string;
  get: string;
  set?(newValue: string): void;
}

export const TextField = anuxUIFunctionComponent<IProps>('Editor-Text-Field', ({
  className,
  label,
  get,
  set,
  hint,
  isReadOnly = false,
  isRequired = false,
  applyShrunkenLabel = false,
}, ref) => {
  isReadOnly = isReadOnly || !set;
  const id = useFieldId('anux-text');

  const validationError = useValidation({
    id,
    value: get,
    isRequired,
    isDisabled: isReadOnly,
  });

  const handleChanged = useBound((event: ChangeEvent) => {
    if (isReadOnly) { return; }
    const value: string = event.target['value'];
    set(value);
  });

  const inputProps = useMemo<InputLabelProps>(() => applyShrunkenLabel ? { shrink: true } : {}, [applyShrunkenLabel]);

  return (
    <CustomTag name="anux-editor-text-field" ref={ref} className={classNames(styles.textField, className)}>
      <MUITextField
        label={label}
        value={get || ''}
        placeholder={hint}
        disabled={isReadOnly}
        onChange={handleChanged}
        error={!!validationError}
        helperText={validationError && validationError.message}
        InputLabelProps={inputProps}
      />
    </CustomTag>
  );
});
