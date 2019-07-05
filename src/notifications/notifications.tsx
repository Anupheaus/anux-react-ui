import { FunctionComponent, ReactNode, useState, useContext, useRef, MutableRefObject } from 'react';
import { useBound, CustomTag } from 'anux-react-utils';
import { IMap, InternalError } from 'anux-common';
import { addDisplayName } from '../utils';
import { NotificationsContext, CurrentHost } from './context';
import { INotification, NotificationModes, INotificationResult, INotificationComponentProps } from './models';
import { Dialog } from './dialog';
import { Toaster } from './toaster';
import styles from './styles';

interface IProps {
  id?: string;
}

interface IState {
  notifications: IMap<ReactNode>;
}

function getNotificationComponent(mode: NotificationModes) {
  switch (mode) {
    case NotificationModes.Dialog: return Dialog;
    case NotificationModes.Toaster: return Toaster;
  }
}

function createNotification(NotificationComponent: FunctionComponent<INotificationComponentProps>, config: INotification, host: MutableRefObject<HTMLElement>,
  saveNotification: (id: string, dialog: ReactNode) => void, removeNotification: (id: string) => void): INotificationResult {
  const id = Math.uniqueId();
  const promise = new Promise<void>(resolve => {
    const close = () => {
      removeNotification(id);
      resolve();
    };
    const dialog = (<NotificationComponent key={id} config={config} host={host} onClose={close} />);
    saveNotification(id, dialog);
  });
  return {
    id,
    close: () => removeNotification(id),
    untilClosed: () => promise,
  };
}

export const Notifications: FunctionComponent<IProps> = ({
  id: hostId = Math.uniqueId(),
  children,
}) => {
  const currentHosts = useContext(NotificationsContext);
  const hostRef = useRef<HTMLElement>();
  const [{ notifications }, setState] = useState<IState>({
    notifications: {},
  });

  const addNotification = (id: string, notification: ReactNode) => setState(s => ({ ...s, notifications: { ...s.notifications, [id]: notification } }));
  const removeNotification = (id: string) => setState(s => ({ ...s, notifications: { ...(({ [id]: ignore, ...rest }) => rest)(s.notifications) } }));

  const notify = useBound((config: INotification) => {
    const NotificationComponent = getNotificationComponent(config.mode);
    if (!NotificationComponent) { throw new InternalError('The notification mode requested was invalid or not recognised.', { config }); }
    return createNotification(NotificationComponent, config, hostRef, addNotification, removeNotification);
  });

  return (
    <CustomTag name="ui-notifications-host" className={styles.host}>
      <NotificationsContext.Provider value={{ ...currentHosts, [hostId]: notify, [CurrentHost]: notify }}>
        {children || null}
      </NotificationsContext.Provider>
      <CustomTag name="ui-notifications-container" className={styles.container} ref={hostRef}>
        {Object.values(notifications)}
      </CustomTag>
    </CustomTag>
  );
};

addDisplayName(Notifications, 'Notifications');
