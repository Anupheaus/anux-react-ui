import { useContext } from 'react';
import { CustomTag, useBound } from 'anux-react-utils';
import { PromiseMaybe } from 'anux-common';
import { Button } from '../button';
import { useNotifications } from '../notifications/useNotifications';
import { INotification, NotificationModes, NotificationVariants } from '../notifications/models';
import { anuxUIFunctionComponent } from '../utils';
import { classNames } from '../styles';
import { EditorContext } from './context';
import styles from './styles';

const tooManyErrorsToSaveMessage = String.pluralize`There ${['is $$ field', 'are $$ fields']} with ${['an error', 'errors']}; you cannot save until ${['it has',
  'they have']} been corrected.`;

const tooBusyToSaveMessage = String.pluralize`There ${['is $$ field', 'are $$ fields']} that ${['is', 'are']} busy; you cannot save until ${['it has', 'they have']} finished.`;

const tooManyErrorsToSave = (validationErrorCount: number): INotification => ({
  mode: NotificationModes.Toaster,
  message: tooManyErrorsToSaveMessage(validationErrorCount),
  variant: NotificationVariants.Error,
  autoHideAfterMilliseconds: 5000,
});

const tooBusyToSave = (busyFieldCount: number): INotification => ({
  mode: NotificationModes.Toaster,
  message: tooBusyToSaveMessage(busyFieldCount),
  variant: NotificationVariants.Error,
  autoHideAfterMilliseconds: 5000,
});

const noChangesToSave = (): INotification => ({
  mode: NotificationModes.Toaster,
  message: 'There are no changes to save.',
  variant: NotificationVariants.Info,
  autoHideAfterMilliseconds: 4000,
});

const noChangesToCancel = (): INotification => ({
  mode: NotificationModes.Toaster,
  message: 'There are no changes to cancel.',
  variant: NotificationVariants.Info,
  autoHideAfterMilliseconds: 4000,
});

const savingChanges = (waitOn: () => PromiseMaybe): INotification => ({
  mode: NotificationModes.Toaster,
  message: 'Your changes are being saved...',
  variant: NotificationVariants.Pending,
  isModal: true,
  waitOn,
});

const changesSaved = (): INotification => ({
  mode: NotificationModes.Toaster,
  message: 'Your changes have been saved.',
  variant: NotificationVariants.Success,
  autoHideAfterMilliseconds: 3000,
});

const cancellingChanges = (waitOn: () => PromiseMaybe): INotification => ({
  mode: NotificationModes.Toaster,
  message: 'Your changes are being reverted...',
  variant: NotificationVariants.Pending,
  isModal: true,
  waitOn,
});

const changesCancelled = (): INotification => ({
  mode: NotificationModes.Toaster,
  message: 'Your changes have been reverted.',
  variant: NotificationVariants.Success,
  autoHideAfterMilliseconds: 3000,
});

interface IProps {
  className?: string;
}

export const EditorToolbar = anuxUIFunctionComponent<IProps>('Editor-Toolbar', ({
  className,
  children,
}, ref) => {
  const { cancel, save, notificationHostId, isDirty, validationErrors, busyFields } = useContext(EditorContext);
  const notify = useNotifications();

  const validationErrorCount = validationErrors.distinct(item => item.id).length;

  const doCancel = useBound(async () => {
    if (!isDirty) { notify(noChangesToCancel(), notificationHostId); return; }
    await notify(cancellingChanges(cancel)).untilClosed();
    notify(changesCancelled(), notificationHostId);
  });

  const doSave = useBound(async () => {
    if (validationErrorCount > 0) { notify(tooManyErrorsToSave(validationErrorCount), notificationHostId); return; }
    if (busyFields.length > 0) { notify(tooBusyToSave(busyFields.length), notificationHostId); return; }
    if (!isDirty) { notify(noChangesToSave(), notificationHostId); return; }
    const promise = save();
    await notify(savingChanges(save)).untilClosed()
    await promise;
    notify(changesSaved(), notificationHostId);
  });

  return (
    <CustomTag name="anux-editor-toolbar" ref={ref} className={classNames(styles.toolbar.root, className)}>
      <CustomTag name="anux-editor-toolbar-custom" className={styles.toolbar.customContainer}>{children || null}</CustomTag>
      <Button onClick={doCancel}>Cancel</Button>
      <Button onClick={doSave} variant="primary">Save</Button>
    </CustomTag>
  );
});
