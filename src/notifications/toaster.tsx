import { FunctionComponent, useState, forwardRef, useMemo, CSSProperties } from 'react';
import { INotificationComponentProps, INotificationActions, Variants } from './models';
import { Snackbar, SnackbarContent, Slide, IconButton, CircularProgress, Backdrop } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import SuccessIcon from '@material-ui/icons/CheckCircle';
import { useActions, useOnUnmount, CustomTag, useBound } from 'anux-react-utils';
import { SnackbarOrigin } from '@material-ui/core/Snackbar';
import { ClickAwayListenerProps } from '@material-ui/core/ClickAwayListener';
import styles from './styles';

const anchorOrigin: SnackbarOrigin = { vertical: 'bottom', horizontal: 'center' };
const createTransition = (onFinished: () => void) => forwardRef<unknown, TransitionProps>((props, ref) => (<Slide ref={ref} {...props} direction="up" onExited={onFinished} />));
const closeIconStyle: CSSProperties = { fontSize: 20 };

const renderIconForVariant = (variant: Variants) => {
  const variantIcon = [null, <ErrorIcon />, <WarningIcon />, <InfoIcon />, <SuccessIcon />, <CircularProgress size={20} className={styles.toaster.progress} />][variant];
  if (!variantIcon) { return null; }
  return (<CustomTag name="ui-toaster-icon" className={styles.toaster.message.icon}>{variantIcon}</CustomTag>);
};

export const Toaster: FunctionComponent<INotificationComponentProps> = ({ config: {
  message,
  buttons,
  autoHideAfterMilliseconds,
  waitOn,
  isModal,
  variant = Variants.Standard,
},
  onClose,
}) => {
  const [isOpen, setOpen] = useState(true);

  const actions = useActions<INotificationActions>({
    close() {
      setOpen(false);
    },
    renderCloseButton() {
      return (<IconButton className={styles.toaster.closeIcon} onClick={actions.close}><CloseIcon style={closeIconStyle} /></IconButton>);
    },
  });

  const clickAwayListenerProps = useMemo<Partial<ClickAwayListenerProps>>(() => ({
    onClickAway: () => isModal ? null : actions.close(),
  }), [isModal]);

  const handleClosed = useBound(() => { if (onClose) { onClose(); } });
  const Transition = useMemo(() => createTransition(handleClosed), []);

  const renderContent = () => message ?
    <CustomTag name="ui-toaster-message" className={styles.toaster.message.container}>
      {renderIconForVariant(variant)}
      <CustomTag name="ui-toaster-message" className={styles.toaster.message.content}>{message}</CustomTag>
    </CustomTag>
    : null;

  const renderButtons = () => buttons ? buttons(actions) : null;

  if (waitOn) { waitOn().then(actions.close, actions.close); }

  useOnUnmount(actions.close);

  return (
    <>
      <Backdrop
        className={styles.toaster.backdrop(isModal)}
        open={isOpen}
        transitionDuration={225}
      />
      <Snackbar
        open={isOpen}
        style={styles.toaster.root}
        TransitionComponent={Transition}
        message={renderContent()}
        ClickAwayListenerProps={clickAwayListenerProps}
        autoHideDuration={autoHideAfterMilliseconds}
        anchorOrigin={anchorOrigin}
        disableWindowBlurListener={isModal}
      >
        <SnackbarContent
          className={styles.toaster.content(variant)}
          message={renderContent()}
          action={renderButtons()}
        />
      </Snackbar>
    </>
  );
};
