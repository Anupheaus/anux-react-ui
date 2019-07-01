import { FunctionComponent, ReactNode, ReactComponentElement, ComponentType, useState, useRef, cloneElement, useMemo } from 'react';
import {
  Badge, Button as MuiButton, IconButton, Fab, LinearProgress, CircularProgress, ButtonGroup, Popper, Grow, ClickAwayListener, Paper,
  MenuList,
} from '@material-ui/core';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
import { PromiseMaybe } from 'anux-common';
import { CustomTag, useBound } from 'anux-react-utils';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import styles from './styles';

export interface IButtonItem {
  tooltip?: ReactNode;
  icon?: ReactNode;
  onClick(): PromiseMaybe;
}

type IconType = ReactComponentElement<ComponentType<SvgIconProps>>;

function createValueOfHelper(value: {}) {
  return function valueOf<T>(propertyName: string, defaultValue?: T): T {
    if (defaultValue == null) { return value[propertyName] != null ? value[propertyName] : defaultValue; }
    if (typeof (value[propertyName]) === typeof (defaultValue)) { return value[propertyName]; }
    return defaultValue;
  };
}

interface IBadge {
  content?: ReactNode;
  value?: number;
  variant?: 'primary' | 'secondary' | 'error';
  max?: number;
  isVisible?: boolean;
  shouldShowZero?: boolean;
  type?: 'standard' | 'dot';
}

function applyDefaultsToBadge(badge: IBadge | JSX.Element | number | boolean): IBadge {
  const valueOf = createValueOfHelper(badge);

  return {
    content: valueOf('content') || (typeof (badge) !== 'number' && typeof (badge) !== 'boolean' && valueOf('value') == null ? badge : null),
    value: typeof (badge) === 'number' ? badge : valueOf('value'),
    variant: valueOf('variant', typeof (badge) === 'boolean' && badge === false ? 'secondary' : 'primary'),
    max: valueOf('max'),
    isVisible: valueOf('isVisible', true),
    shouldShowZero: valueOf('shouldShowZero', false),
    type: ['standard', 'dot'].includes(badge['type']) ? badge['type'] : typeof (badge) === 'boolean' ? 'dot' : 'standard',
  };
}

interface IIcon {
  position?: 'left' | 'right';
  icon: IconType;
}

function applyDefaultsToIcon(icon: IIcon | IconType): IIcon {
  const valueOf = createValueOfHelper(icon || {});

  return {
    position: valueOf('position', 'left'),
    icon: (valueOf('icon') || icon) as IconType,
  };
}

interface IProps {
  badge?: IBadge | JSX.Element | number | boolean;
  icon?: IIcon | ReactComponentElement<ComponentType<SvgIconProps>>;
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  appearance?: 'flat' | 'outlined' | 'filled';
  className?: string;
  items?: IButtonItem[];
  onClick?(): PromiseMaybe;
}

const convertAppearanceToVariant = (appearance: IProps['appearance']) => appearance === 'outlined' ? 'outlined' : appearance === 'filled' ? 'contained' : 'text';

export const Button: FunctionComponent<IProps> = ({
  badge,
  icon,
  variant = 'default',
  size = 'medium',
  appearance = 'flat',
  className,
  items,
  onClick,
  children,
}) => {
  const [isInProgress, setInProgress] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuAnchorRef = useRef(null);

  const openMenu = useBound(() => setMenuOpen(true));

  const closeMenu = useBound(() => setMenuOpen(false));

  const invokeClickHandler = useBound((menuItemOnClickHandler: (...args: any[]) => PromiseMaybe) => {
    return (async (...args: any[]) => {
      closeMenu();
      if (!menuItemOnClickHandler || isInProgress) { return; }
      setInProgress(true);
      await menuItemOnClickHandler(...args);
      setInProgress(false);
    }) as () => void;
  });

  const handleClick = useBound(invokeClickHandler(onClick));

  const menuItems = useMemo(() => (items || []).map(menuItem => ({ ...menuItem, onClick: invokeClickHandler(menuItem.onClick) })), [items]);

  const renderProgressInIconButton = (progressSize: number) => isInProgress ? (
    <CustomTag name="ui-button-progress" className={styles.progress.circular.container}>
      <CircularProgress className={styles.progress.circular.root} color={variant === 'default' ? 'primary' : variant} size={progressSize} />
    </CustomTag>
  ) : null;

  const renderFlatIconButton = (config: IIcon) => (
    <IconButton
      className={className}
      color={variant}
      size={size === 'large' ? 'medium' : size}
      onClick={handleClick}
    >
      {config.icon}
      {renderProgressInIconButton(size === 'small' ? 30 : 48)}
    </IconButton>
  );

  const renderFabButton = (config: IIcon) => (
    <Fab
      className={className}
      color={variant}
      size={size}
      onClick={handleClick}
    >
      {config.icon}
      {renderProgressInIconButton(size === 'small' ? 44 : size === 'large' ? 60 : 52)}
    </Fab>
  );

  const renderSpeedDial = (config: IIcon) => (
    <SpeedDial
      icon={<SpeedDialIcon openIcon={config.icon} />}
      onBlur={closeMenu}
      onClick={handleClick}
      onClose={closeMenu}
      onFocus={openMenu}
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
      open={isMenuOpen}
      direction={menuDirection}
    >
      {menuItems.map((menuItem, index) => (
        <SpeedDialAction
          key={`menu-item-${index}`}
          icon={menuItem.icon}
          tooltipTitle={menuItem.tooltip}
          onClick={menuItem.onClick}
        />
      ))}
    </SpeedDial>
  );

  const renderFilledIconButton = (config: IIcon) => menuItems.length === 0 ? renderFabButton(config) : renderSpeedDial(config);

  const renderIconInButton = ({ icon: iconElement, position }: IIcon, actualPosition: IIcon['position']) => (
    icon && position === actualPosition ? <CustomTag name="ui-button-icon" className={styles.iconInButton(actualPosition)}>{iconElement}</CustomTag> : null
  );

  const renderProgressInButton = () => isInProgress ? (
    <CustomTag name="ui-button-progress" className={styles.progress.linear.container}>
      <LinearProgress className={styles.progress.linear.root} color={variant === 'default' ? 'primary' : variant} />
    </CustomTag>
  ) : null;

  const renderSimpleButton = (isWithinABadge: boolean, iconConfig: IIcon) => (
    <MuiButton
      className={!isWithinABadge ? className : undefined}
      variant={convertAppearanceToVariant(appearance)}
      color={variant}
      size={size}
      onClick={handleClick}
    >
      {renderIconInButton(iconConfig, 'left')}
      <CustomTag name="ui-button-content">{children || null}</CustomTag>
      {renderIconInButton(iconConfig, 'right')}
      {renderProgressInButton()}
    </MuiButton>
  );

  const renderSplitButton = (isWithinABadge: boolean, iconConfig: IIcon) => (
    <>
      <ButtonGroup variant={convertAppearanceToVariant(appearance) as any} ref={menuAnchorRef}>
        {renderSimpleButton(isWithinABadge, iconConfig)}
        <MuiButton
          variant={convertAppearanceToVariant(appearance)}
          color={variant}
          size="small"
          onClick={openMenu}
          aria-owns={isMenuOpen ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
        >
          <ArrowDropDownIcon />
        </MuiButton>
      </ButtonGroup>
      <Popper open={isMenuOpen} anchorEl={menuAnchorRef.current} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper id="menu-list-grow">
              <ClickAwayListener onClickAway={closeMenu}>
                <MenuList>
                  {menuItems}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );

  const renderButton = (isWithinABadge: boolean) => ((iconConfig: IIcon) =>
    iconConfig.icon != null && children == null
      ? (appearance === 'filled' ? renderFilledIconButton(iconConfig) : renderFlatIconButton(iconConfig))
      : (menuItems.length > 0 ? renderSplitButton(isWithinABadge, iconConfig) : renderSimpleButton(isWithinABadge, iconConfig))
  )(applyDefaultsToIcon(icon));

  const renderButtonWithBadge = () => ((config: IBadge) => (
    <Badge
      className={className}
      badgeContent={config.content || config.value || null}
      color={config.variant}
      invisible={!config.isVisible}
      max={config.max}
      showZero={config.shouldShowZero}
      variant={config.type}
    >
      {renderButton(true)}
    </Badge>
  ))(applyDefaultsToBadge(badge));

  return (
    <CustomTag name="ui-button">
      {badge != null ? renderButtonWithBadge() : renderButton(false)}
    </CustomTag>
  );
};
