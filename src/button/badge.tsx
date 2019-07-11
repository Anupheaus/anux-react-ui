import { Badge } from '@material-ui/core';
import { anuxUIFunctionComponent } from '../utils';
import { IHiddenBadgeProps, IBadgeProps } from './private.models';

export const ButtonBadge = anuxUIFunctionComponent<IBadgeProps>('Button-Badge', ({
  variant = 'primary',
  isVisible = true,
  max,
  shouldShowZero = true,
  type = 'standard',
  children,
  ...hiddenProps
}) => {
  const { button, className } = hiddenProps as unknown as IHiddenBadgeProps;

  return (
    <Badge
      className={className}
      badgeContent={children}
      color={variant}
      invisible={!isVisible}
      max={max}
      showZero={shouldShowZero}
      variant={type}
    >
      {button}
    </Badge>
  );
});
