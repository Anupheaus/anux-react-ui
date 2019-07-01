interface IProps {

}

export const IconOnlyButton: FunctionComponent<IProps> = ({ }) => {

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

}