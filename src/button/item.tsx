import { FunctionComponent } from 'react';
import { PromiseMaybe } from 'anux-common';
import { MenuItem } from '@material-ui/core';
import { useBound } from 'anux-react-utils';
import { SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import { addDisplayNameTo } from '../utils';
import { IconType, IHiddenItemProps } from './private.models';

interface IProps {
  icon?: IconType;
  onClick(): PromiseMaybe;
}

export const ButtonItem: FunctionComponent<IProps> = ({
  icon,
  onClick,
  children,
  ...other
}) => {
  const { renderAs, isInProgress, onSetMenu, onSetProgress, ...passThroughProps } = other as IHiddenItemProps;

  const handleClick = useBound(async () => {
    onSetMenu(false);
    if (isInProgress) { return; }
    onSetProgress(true);
    await onClick();
    onSetProgress(false);
  });

  if (renderAs === 'menu-item') {
    return (
      <MenuItem
        onClick={handleClick}
        {...passThroughProps}
      >
        {children}
      </MenuItem>
    )
  } else {
    return (
      <SpeedDialAction
        icon={<SpeedDialIcon icon={icon} />}
        tooltipTitle={children}
        onClick={handleClick}
        {...passThroughProps}
      />
    );
  }
};

addDisplayNameTo(ButtonItem, 'ButtonItem');
