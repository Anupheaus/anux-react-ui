import { ReactNode, MutableRefObject } from 'react';

export enum NotificationModes {
  Dialog,
  Toaster,
}

export enum Variants {
  Standard,
  Error,
  Warning,
  Info,
  Success,
  Pending,
}

export namespace Variants {

  export function map<T>(delegate: (variant: Variants) => T): T[] {
    const results: T[] = [];
    Object.keys(Variants).forEach(key => {
      const variant = parseInt(key, 10);
      if (!isNaN(variant)) { results.push(delegate(variant as Variants)); }
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
  variant?: Variants;
  waitOn?(): Promise<void>;
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
