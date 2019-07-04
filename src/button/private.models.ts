import { ReactNode, ReactComponentElement, ComponentType } from 'react';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { ButtonItem } from './item';
import { ButtonAppearances, ButtonBadgeTypes } from './models';
import { ButtonBadge } from './badge';

export type IconType = ReactComponentElement<ComponentType<SvgIconProps>>;

export type ButtonItemType = ReactComponentElement<typeof ButtonItem>;

export type ButtonBadgeType = ReactComponentElement<typeof ButtonBadge>;

export interface IBadgeProps {
  variant?: 'primary' | 'secondary' | 'error';
  max?: number;
  isVisible?: boolean;
  shouldShowZero?: boolean;
  type?: ButtonBadgeTypes;
  children: ReactNode;
}

export interface IHiddenBadgeProps {
  button: ReactNode;
  className: string;
}

export interface IHiddenItemProps {
  renderAs: 'speed-dial' | 'menu-item';
  isInProgress: boolean;
  onSetProgress(isInProgress: boolean): void;
  onSetMenu(isMenuOpen: boolean): void;
}

export const convertAppearanceToVariant = (appearance: ButtonAppearances) => appearance === 'outlined' ? 'outlined' : appearance === 'filled' ? 'contained' : 'text';