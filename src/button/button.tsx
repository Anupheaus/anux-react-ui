import { FunctionComponent, ReactNode, useState, useMemo, cloneElement } from 'react';
import { PromiseMaybe } from 'anux-common';
import { CustomTag, useBound } from 'anux-react-utils';
import { addDisplayName } from '../utils';
import { ButtonBadge } from './badge';
import { IHiddenBadgeProps, IconType, ButtonItemType, IBadgeProps, IHiddenItemProps, ButtonBadgeType } from './private.models';
import { IconOnlyButton } from './iconOnlyButton';
import { ButtonAppearances, ButtonVariants, ButtonSizes, ButtonIconPositions, ButtonMenuDirections } from './models';
import { SimpleButton } from './simple';
import { SplitButton } from './split';


const isBadgeElement = (badge: ButtonBadgeType | number | boolean): badge is ButtonBadgeType => {
  if (typeof (badge) !== 'object' || badge == null) { return false; }
  if (typeof (badge.type) !== 'function') { return false; }
  if (badge.type !== ButtonBadge) { return false; }
  return true;
};

const isIconType = (value: IconType | ReactNode): value is IconType => {
  if (typeof (value) !== 'object' || value == null) { return false; }
  if (typeof (value['type']) !== 'object') { return false; }
  if (value['type']['muiName'] !== 'SvgIcon') { return false }
  return true;
};

interface IProps {
  badge?: ButtonBadgeType | number | boolean;
  icon?: IconType;
  iconPosition?: ButtonIconPositions;
  variant?: ButtonVariants;
  size?: ButtonSizes;
  appearance?: ButtonAppearances;
  className?: string;
  items?: ButtonItemType[];
  menuDirection?: ButtonMenuDirections;
  onClick?(): PromiseMaybe;
}

export const Button: FunctionComponent<IProps> = ({
  badge,
  icon,
  iconPosition = 'left',
  variant = 'default',
  size = 'medium',
  appearance = 'flat',
  menuDirection = 'down',
  className,
  items = [],
  onClick,
  children,
}) => {
  const [isInProgress, setInProgress] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  icon = icon || (isIconType(children) ? children : null);
  children = (isIconType(children) ? null : children) || null;

  const isWithinABadge = badge != null;

  const setMenuItemHiddenProps = (hiddenProps: IHiddenItemProps): unknown => hiddenProps;

  const renderMenuItems = (renderAs: IHiddenItemProps['renderAs']) => items.map((menuItem, index) => cloneElement(menuItem, {
    key: `menu-item-${index}`,
    ...setMenuItemHiddenProps({
      renderAs,
      isInProgress,
      onSetProgress: setInProgress,
      onSetMenu: setIsMenuOpen,
    }),
  }));

  const renderIconMenuItems = useBound(() => renderMenuItems('speed-dial'));
  const renderSplitMenuItems = useBound(() => renderMenuItems('menu-item'));

  const handleClick = useBound(async () => {
    setIsMenuOpen(false);
    if (isInProgress) { return; }
    setInProgress(true);
    await onClick();
    setInProgress(false);
  });

  const renderIconOnlyButton = () => (
    <IconOnlyButton
      variant={variant}
      appearance={appearance}
      className={className}
      isInProgress={isInProgress}
      isMenuOpen={isMenuOpen}
      size={size}
      hasMenuItems={items.length > 0}
      menuDirection={menuDirection}
      renderMenuItems={renderIconMenuItems}
      onClick={handleClick}
      onSetMenu={setIsMenuOpen}
    >
      {icon}
    </IconOnlyButton>
  );

  const renderSimpleButton = () => (
    <SimpleButton
      appearance={appearance}
      _className={className}
      icon={icon}
      iconPosition={iconPosition}
      isInProgress={isInProgress}
      isWithinABadge={isWithinABadge}
      _size={size}
      _variant={variant}
      onClick={handleClick}
    >
      {children}
    </SimpleButton>
  );

  const renderSplitButton = () => (
    <SplitButton
      appearance={appearance}
      variant={variant}
      size={size}
      renderMenuItems={renderSplitMenuItems}
      isMenuOpen={isMenuOpen}
      menuDirection={menuDirection}
      onSetMenu={setIsMenuOpen}
    >
      {renderSimpleButton()}
    </SplitButton>
  );

  const buttonRendering = children == null ? renderIconOnlyButton() : items.length > 0 ? renderSplitButton() : renderSimpleButton();

  const finalRendering = useMemo(() => {
    if (badge == null) { return buttonRendering; }
    let badgeComponent = isBadgeElement(badge) ? badge : null;
    if (!isBadgeElement(badge)) {
      const badgeChildren: ReactNode = typeof (badge) !== 'boolean' ? badge : null;
      const type: IBadgeProps['type'] = typeof (badge) === 'boolean' ? 'dot' : 'standard';
      const badgeVariant: IBadgeProps['variant'] = typeof (badge) === 'boolean' ? (badge === false ? 'secondary' : 'primary')
        : variant === 'default' ? 'primary' : variant;
      badgeComponent = (
        <ButtonBadge variant={badgeVariant} type={type}>{badgeChildren}</ButtonBadge>
      );
    }
    const hiddenProperties: IHiddenBadgeProps = {
      button: buttonRendering,
      className,
    };
    return cloneElement(badgeComponent, { ...hiddenProperties as unknown, });
  }, [badge, variant, className, buttonRendering]);

  return (
    <CustomTag name="ui-button">
      {finalRendering}
    </CustomTag>
  );
};

addDisplayName(Button, 'Button');
