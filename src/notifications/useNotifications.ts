import { NotificationsContext, CurrentHost } from './context';
import { useContext } from 'react';
import { InternalError } from 'anux-common';
import { INotification } from './models';

export function useNotifications() {
  const hosts = useContext(NotificationsContext);
  return (config: INotification, hostId?: string) => {
    const hostNotify = hosts[hostId || CurrentHost as any];
    if (!hostNotify) { throw new InternalError('The specified notifications host does not exist or there is no current one available.', { hostId }); }
    return hostNotify(config);
  };
}
