import { createContext } from 'react';
import { IMap } from 'anux-common';
import { INotificationResult, INotification } from './models';

interface INotificationsContext extends IMap<(config: INotification) => INotificationResult> { }

export const CurrentHost = Symbol('currentHost');

export const NotificationsContext = createContext<INotificationsContext>({});
