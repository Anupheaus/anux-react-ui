import { FunctionComponent } from 'react';
import { CustomTag, useBound } from 'anux-react-utils';
import { CircularProgress, IconButton, Fab } from '@material-ui/core';
import { SpeedDial, SpeedDialIcon } from '@material-ui/lab';
import styles from './styles';
import { IconType, ButtonItemType } from './private.models';
import { ButtonAppearances } from './models';

interface IProps {
  isInProgress: boolean;
  isMenuOpen: boolean;
  className: string;
  size: 'small' | 'medium' | 'large';
  variant: 'default' | 'primary' | 'secondary';
  appearance: ButtonAppearances;
  hasMenuItems: boolean;
  children: IconType;
  onClick(): void;
  renderMenuItems(): ButtonItemType[];
  onSetMenu(isMenuOpen: boolean): void;
}

export const IconOnlyButton: FunctionComponent<IProps> = ({
  isInProgress,
  isMenuOpen,
  variant,
  size,
  className,
  appearance,
  renderMenuItems,
  hasMenuItems,
  onClick,
  onSetMenu,
  children,
}) => {

  const openMenu = useBound(() => onSetMenu(true));
  const closeMenu = useBound(() => onSetMenu(false));

  const renderProgressInIconButton = (progressSize: number) => isInProgress ? (
    <CustomTag name="ui-button-progress" className={styles.progress.circular.container}>
      <CircularProgress className={styles.progress.circular.root} color={variant === 'default' ? 'primary' : variant} size={progressSize} />
    </CustomTag>
  ) : null;

  const renderFlatIconButton = () => (
    <IconButton
      className={className}
      color={variant}
      size={size === 'large' ? 'medium' : size}
      onClick={onClick}
    >
      {children}
      {renderProgressInIconButton(size === 'small' ? 30 : 48)}
    </IconButton>
  );

  const renderFabButton = () => (
    <Fab
      className={className}
      color={variant}
      size={size}
      onClick={onClick}
    >
      {children}
      {renderProgressInIconButton(size === 'small' ? 44 : size === 'large' ? 60 : 52)}
    </Fab>
  );

  const renderSpeedDial = () => (
    <SpeedDial
      ariaLabel=""
      icon={<SpeedDialIcon openIcon={children} />}
      onBlur={closeMenu}
      onClick={onClick}
      onClose={closeMenu}
      onFocus={openMenu}
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
      open={isMenuOpen}
      direction="up"
    >
      {renderMenuItems()}
      {renderProgressInIconButton(size === 'small' ? 44 : size === 'large' ? 60 : 52)}
    </SpeedDial>
  );

  const renderFilledIconButton = () => !hasMenuItems ? renderFabButton() : renderSpeedDial();

  return appearance === 'flat' ? renderFlatIconButton() : renderFilledIconButton();

}