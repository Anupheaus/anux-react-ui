import { FunctionComponent, useState, forwardRef, useMemo } from 'react';
import { INotificationComponentProps, INotificationActions } from './models';
import { Dialog as MUIDialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Zoom, Button } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { useActions, useOnUnmount, useTimeout, useBound } from 'anux-react-utils';

const createTransition = (onFinished: () => void) => forwardRef<unknown, TransitionProps>((props, ref) => (<Zoom ref={ref} {...props} onExited={onFinished} />));

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

  const renderContent = () => message ? <DialogContent><DialogContentText>{message}</DialogContentText></DialogContent> : null;

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
      open={isOpen}
      TransitionComponent={Transition}
      closeAfterTransition={true}
      onBackdropClick={handleBackdropClose}
      onEscapeKeyDown={handleBackdropClose}
      container={host.current}
      style={{ position: 'absolute' }}
      BackdropProps={{ style: { position: 'absolute' } }}
    >
      {renderTitle()}
      {renderContent()}
      {renderButtons()}
    </MUIDialog>
  );
};
