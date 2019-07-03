import { FunctionComponent, useRef } from 'react';
import { ButtonGroup, Button, Popper, Grow, Paper, ClickAwayListener, MenuList } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useBound } from 'anux-react-utils';
import { ButtonAppearances, ButtonVariants, ButtonSizes } from './models';
import { convertAppearanceToVariant, ButtonItemType } from './private.models';

interface IProps {
  appearance: ButtonAppearances;
  variant: ButtonVariants;
  isMenuOpen: boolean;
  size: ButtonSizes;
  renderMenuItems(): ButtonItemType[];
  onSetMenu(isMenuOpen: boolean): void;
}

export const SplitButton: FunctionComponent<IProps> = ({
  appearance,
  variant,
  isMenuOpen,
  size,
  renderMenuItems,
  onSetMenu,
  children,
}) => {
  const menuAnchorRef = useRef<HTMLDivElement>()

  const openMenu = useBound(() => onSetMenu(true));
  const closeMenu = useBound(() => onSetMenu(false));

  const buttonGroupWidth = menuAnchorRef.current ? `${menuAnchorRef.current.clientWidth}px` : 'auto';

  return (
    <>
      <ButtonGroup
        variant={convertAppearanceToVariant(appearance) as 'outlined' | 'contained'}
        color={variant}
        size={size}
        ref={menuAnchorRef}
      >
        {children}
        <Button
          variant={convertAppearanceToVariant(appearance)}
          color={variant}
          size="small" // always a small size for the drop down button
          onClick={openMenu}
          aria-owns={isMenuOpen ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper open={isMenuOpen} anchorEl={menuAnchorRef.current} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              minWidth: buttonGroupWidth,
            }}
          >
            <Paper id="menu-list-grow">
              <ClickAwayListener onClickAway={closeMenu}>
                <MenuList>
                  {renderMenuItems()}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
};
