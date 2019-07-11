import { CustomTag, useBound } from 'anux-react-utils';
import { CircularProgress, IconButton, Fab } from '@material-ui/core';
import { SpeedDial, SpeedDialIcon } from '@material-ui/lab';
import { anuxUIFunctionComponent } from '../utils';
import styles from './styles';
import { IconType, ButtonItemType } from './private.models';
import { ButtonAppearances, ButtonSizes, ButtonVariants, ButtonMenuDirections } from './models';

interface IProps {
  isInProgress: boolean;
  isMenuOpen: boolean;
  className: string;
  size: ButtonSizes;
  variant: ButtonVariants;
  appearance: ButtonAppearances;
  hasMenuItems: boolean;
  menuDirection: ButtonMenuDirections;
  children: IconType;
  onClick(): void;
  renderMenuItems(): ButtonItemType[];
  onSetMenu(isMenuOpen: boolean): void;
}

export const IconOnlyButton = anuxUIFunctionComponent<IProps>('Editor-Button-IconOnly', ({
  isInProgress,
  isMenuOpen,
  variant,
  size,
  className,
  appearance,
  renderMenuItems,
  hasMenuItems,
  menuDirection,
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
      {renderProgressInIconButton(size === 'small' ? 34 : 54)}
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
      {renderProgressInIconButton(size === 'small' ? 46 : size === 'large' ? 60 : 52)}
    </Fab>
  );

  const renderSpeedDial = () => (
    <SpeedDial
      className={styles.speedDial}
      ariaLabel=""
      icon={<SpeedDialIcon openIcon={children} />}
      onBlur={closeMenu}
      onClick={onClick}
      onClose={closeMenu}
      onFocus={openMenu}
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
      open={isMenuOpen}
      direction={menuDirection}
    >
      {renderMenuItems()}
      {renderProgressInIconButton(60)}
    </SpeedDial>
  );

  const renderFilledIconButton = () => !hasMenuItems ? renderFabButton() : renderSpeedDial();

  return appearance === 'flat' ? renderFlatIconButton() : renderFilledIconButton();

});
