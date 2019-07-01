import { createContext } from 'react';
import { INotificationResult, INotification } from './models';
import { IMap } from 'anux-common';

interface INotificationsContext extends IMap<(config: INotification) => INotificationResult> { }

export const CurrentHost = Symbol('currentHost');

export const NotificationsContext = createContext<INotificationsContext>({});
