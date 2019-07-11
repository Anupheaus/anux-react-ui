import { ChangeEvent } from 'react';
import { useBound, CustomTag } from 'anux-react-utils';
import { TextField as MUITextField } from '@material-ui/core';
import * as NumberFormatType from 'react-number-format';
import { InputBaseComponentProps } from '@material-ui/core/InputBase';
import { useValidation, useFieldId } from '../hooks';
import { anuxUIFunctionComponent } from '../../utils';
import { classNames } from '../../styles';
import styles from './styles';

const NumberFormat = NumberFormatType as unknown as typeof NumberFormatType.default; // types are wrong...grrrr

interface IProps {
  className?: string;
  label?: string;
  isReadOnly?: boolean;
  isRequired?: boolean;
  hint?: string;
  get: number;
  decimalPlaces?: number;
  symbols?: {
    thousands?: string;
    prefix?: string;
    suffix?: string;
    decimalPoint?: string;
  };
  set?(newValue: number): void;
}

export const NumberField = anuxUIFunctionComponent<IProps>('Editor-Number-Field', ({
  className,
  label,
  get,
  set,
  hint,
  isReadOnly = false,
  isRequired = false,
  decimalPlaces = 2,
  symbols: {
    thousands = ',',
    decimalPoint = '.',
    prefix,
    suffix,
  } = {},
}) => {
  isReadOnly = isReadOnly || !set;
  const id = useFieldId('anux-number');

  const validationError = useValidation({
    id,
    value: get,
    isRequired,
    isDisabled: isReadOnly,
  });

  const handleChanged = useBound((event: ChangeEvent) => {
    if (isReadOnly) { return; }
    const value: number = Number.parseFloat(event.target['value']);
    set(value);
  });

  const CustomNumberField = useBound(({ inputRef, onChange, defaultValue, ...other }: InputBaseComponentProps) => (
    <NumberFormat
      {...other}
      thousandSeparator={thousands}
      defaultValue={defaultValue as string}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        } as any); // eslint-disable-line @typescript-eslint/no-explicit-any
      }}
      decimalSeparator={decimalPoint}
      decimalScale={decimalPlaces}
      prefix={prefix}
      suffix={suffix}
    />
  ));

  return (
    <CustomTag name="anux-editor-number-field" className={classNames(styles.numberField, className)}>
      <MUITextField
        label={label}
        value={get}
        placeholder={hint}
        disabled={isReadOnly}
        onChange={handleChanged}
        error={!!validationError}
        helperText={validationError && validationError.message}
        InputProps={{ inputComponent: CustomNumberField }}
      />
    </CustomTag>
  );
});
