import { FunctionComponent, useMemo } from 'react';
import { Button, LinearProgress } from '@material-ui/core';
import { CustomTag } from 'anux-react-utils';
import { classNames } from '../styles';
import { ButtonAppearances, ButtonVariants, ButtonSizes, ButtonIconPositions } from './models';
import { IconType, convertAppearanceToVariant } from './private.models';
import styles from './styles';

interface IProps {
  icon: IconType;
  iconPosition: ButtonIconPositions;
  isWithinABadge: boolean;
  isInProgress: boolean;
  className?: string;
  _className: string; // _ is used because when used in a button group, the button group overrides these values :(
  appearance: ButtonAppearances;
  _variant: ButtonVariants;
  _size: ButtonSizes;
  onClick(): void;
}

export const SimpleButton: FunctionComponent<IProps> = ({
  icon,
  iconPosition,
  isWithinABadge,
  isInProgress,
  className,
  _className: customClassName,
  appearance,
  _variant: variant,
  _size: size,
  onClick,
  children,
}) => {

  const renderIcon = useMemo(() => (
    icon ? <CustomTag name="ui-button-icon" className={styles.iconInButton(iconPosition)}>{icon}</CustomTag> : null
  ), [icon, iconPosition]);

  const renderProgressInButton = useMemo(() => isInProgress ? (
    <CustomTag name="ui-button-progress" className={styles.progress.linear.container}>
      <LinearProgress className={styles.progress.linear.root} color={variant === 'default' ? 'primary' : variant} />
    </CustomTag>
  ) : null, [isInProgress, variant]);

  return (
    <Button
      className={classNames(isWithinABadge ? undefined : customClassName, className)}
      variant={convertAppearanceToVariant(appearance)}
      color={variant}
      size={size}
      onClick={onClick}
    >
      {iconPosition === 'left' ? renderIcon : null}
      <CustomTag name="ui-button-content">{children}</CustomTag>
      {iconPosition === 'right' ? renderIcon : null}
      {renderProgressInButton}
    </Button>
  );
}