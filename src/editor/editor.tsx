import { ReactElement, PropsWithChildren, useState, useEffect, useRef } from 'react';
import { useBound, areShallowEqual, CustomTag } from 'anux-react-utils';
import { IMap, PromiseMaybe } from 'anux-common';
import { Notifications } from '../notifications/notifications';
import { anuxUIFunctionComponent } from '../utils';
import { classNames } from '../styles';
import { IValidationError } from './models';
import { EditorContext } from './context';
import styles from './styles';

interface IEditorChildren<T extends {}> {
  record: T;
  update(record: T): void;
}

interface IProps<T extends {}> {
  record: T;
  className?: string;
  children(props: IEditorChildren<T>): ReactElement;
  onSave?(record: T, additionalParams?: IMap): PromiseMaybe;
  onCancel?(additionalParams?: IMap): PromiseMaybe;
}

export const Editor: <T extends {}>(props: PropsWithChildren<IProps<T>>) => ReactElement<PropsWithChildren<IProps<T>>> = anuxUIFunctionComponent('Editor', ({
  record,
  className,
  children,
  onSave,
  onCancel,
}, ref) => {
  type T = typeof record;
  const notificationHostId = useRef(Math.uniqueId());

  const [state, setState] = useState({
    record,
    isDirty: false,
    validationErrors: [] as IValidationError[],
    busyFields: [] as string[],
  });

  const { record: mutatedRecord, validationErrors, busyFields, isDirty } = state;

  const checkIsDirty = (updatedRecord: T) => !areShallowEqual(updatedRecord, record);

  const update = useBound((updatedRecord: T) => setState(innerState => ({ ...innerState, record: updatedRecord, isDirty: checkIsDirty(updatedRecord) })));

  const reset = () => mutatedRecord === record && isDirty === false ? undefined : setState(innerState => ({ ...innerState, record, isDirty: false }));
  useEffect(reset, [record]);

  const cancel = useBound(async (additionalParams?: IMap) => {
    reset();
    if (onCancel) { await onCancel(additionalParams || {}); }
  });

  const save = useBound(async (additionalParams?: IMap) => {
    if (!onSave) { throw new Error('This record has been requested to be saved, but no onSave handler has been provided.'); }
    if (!isDirty) { return; }
    await onSave(mutatedRecord, additionalParams || {});
  });

  const setValidationErrorsFor = useBound((id: string, errors: IValidationError[]) => setState(innerState => ({
    ...innerState,
    validationErrors: innerState.validationErrors
      .filter(error => error.id !== id)
      .concat(errors.map(error => ({ ...error, id }))), // probably unnecessary to add id here, but just making sure :)
  })));

  const setFieldBusyState = useBound((id: string, isBusy: boolean) => {
    if (isBusy && !busyFields.includes(id)) { setState(s => ({ ...s, busyFields: busyFields.concat(id) })); }
    if (!isBusy && busyFields.includes(id)) { setState(s => ({ ...s, busyFields: busyFields.except([id]) })); }
  });

  const canSave = isDirty && busyFields.length === 0 && validationErrors.length === 0;

  return (
    <CustomTag name="anux-editor" ref={ref} className={classNames(styles.root, className)}>
      <Notifications id={notificationHostId.current}>
        <EditorContext.Provider value={{
          record, update, isDirty, canSave, notificationHostId: notificationHostId.current,
          validationErrors, busyFields, setValidationErrorsFor, setFieldBusyState, cancel, save
        }}>
          {children({ record: mutatedRecord, update })}
        </EditorContext.Provider>
      </Notifications>
    </CustomTag>
  );
});
