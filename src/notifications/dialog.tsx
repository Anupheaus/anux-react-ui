import { FunctionComponent, useState, forwardRef, useMemo } from 'react';
import { Dialog as MUIDialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Zoom, Button } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { useActions, useOnUnmount, useTimeout, useBound } from 'anux-react-utils';
import { BackdropProps } from '@material-ui/core/Backdrop';
import { INotificationComponentProps, INotificationActions } from './models';
import styles from './styles';

const createTransition = (onFinished: () => void) => forwardRef<unknown, TransitionProps>((props, ref) => (<Zoom ref={ref} {...props} onExited={onFinished} />));

const backdropProps: Partial<BackdropProps> = { style: { position: 'absolute' } };

export const Dialog: FunctionComponent<INotificationComponentProps> = ({ config: { title, message, buttons, autoHideAfterMilliseconds, waitOn, isModal }, host, onClose }) => {
  const [isOpen, setOpen] = useState(true);

  const actions = useActions<INotificationActions>({
    close() {
      setOpen(false);
    },
    renderCloseButton() {
      return (<Button onClick={actions.close} color="primary">OK</Button>);
    },
  });

  const renderTitle = () => title ? <DialogTitle>{title}</DialogTitle> : null;

  const renderContent = () => message ? <DialogContent><DialogContentText className={styles.dialog.content.text}>{message}</DialogContentText></DialogContent> : null;

  const renderButtons = () => buttons ? <DialogActions>{buttons(actions)}</DialogActions> : null;

  if (autoHideAfterMilliseconds > 0) { useTimeout(actions.close, autoHideAfterMilliseconds); }

  if (waitOn) { waitOn().then(actions.close, actions.close); }

  const handleBackdropClose = useBound(() => {
    if (isModal) { return; }
    actions.close();
  });

  const Transition = useMemo(() => createTransition(() => onClose ? onClose() : void 0), [onClose]);

  useOnUnmount(actions.close);

  return (
    <MUIDialog
      className={styles.dialog.root}
      open={isOpen}
      TransitionComponent={Transition}
      closeAfterTransition={true}
      onBackdropClick={handleBackdropClose}
      onEscapeKeyDown={handleBackdropClose}
      container={host.current}
      BackdropProps={backdropProps}
    >
      {renderTitle()}
      {renderContent()}
      {renderButtons()}
    </MUIDialog>
  );
};
