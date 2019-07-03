import { FunctionComponent, ReactNode } from 'react';
import { PromiseMaybe } from 'anux-common';
import { MenuItem } from '@material-ui/core';
import { useBound } from 'anux-react-utils';
import { SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import { IconType, IHiddenItemProps } from './private.models';

interface IProps {
  icon?: IconType;
  tooltip?: ReactNode;
  onClick(): PromiseMaybe;
}

export const ButtonItem: FunctionComponent<IProps> = ({
  icon,
  tooltip,
  onClick,
  children,
  ...other
}) => {
  const { renderAs, isInProgress, onSetMenu, onSetProgress } = other as IHiddenItemProps;

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
      >
        {children}
      </MenuItem>
    )
  } else {
    return (
      <SpeedDialAction
        icon={<SpeedDialIcon icon={icon} />}
        tooltipTitle={tooltip}
      />
    );
  }
};
