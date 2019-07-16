import { ReactNode, MutableRefObject } from 'react';
import { PromiseMaybe } from 'anux-common';

export enum NotificationModes {
  Dialog,
  Toaster,
}

export enum NotificationVariants {
  Standard,
  Error,
  Warning,
  Info,
  Success,
  Pending,
}

export namespace NotificationVariants {

  export function map<T>(delegate: (variant: NotificationVariants) => T): T[] {
    const results: T[] = [];
    Object.keys(NotificationVariants).forEach(key => {
      const variant = parseInt(key, 10);
      if (!isNaN(variant)) { results.push(delegate(variant as NotificationVariants)); }
    });
    return results;
  }

}

export interface INotificationActions {
  close(): void;
  renderCloseButton(): ReactNode;
}

export interface INotification {
  title?: ReactNode;
  message: ReactNode;
  autoHideAfterMilliseconds?: number;
  mode: NotificationModes;
  isModal?: boolean;
  variant?: NotificationVariants;
  waitOn?(): PromiseMaybe;
  buttons?(actions: INotificationActions): ReactNode;
}

export interface INotificationResult {
  id: string;
  close(): void;
  untilClosed(): Promise<void>;
}

export interface INotificationComponentProps {
  config: INotification;
  host: MutableRefObject<HTMLElement>;
  onClose(): void;
}
