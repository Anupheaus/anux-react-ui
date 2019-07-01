import { createHarness } from 'anux-package';
import { NotificationsHost } from './notifications';
import { style, flex, position } from '../styles';
import { Button, Select, MenuItem, InputLabel, FormControl, Switch, FormControlLabel } from '@material-ui/core';
import { useState, ChangeEvent, FunctionComponent } from 'react';
import { useBound } from 'anux-react-utils';
import { NotificationModes, Variants } from './models';
import { useNotifications } from './useNotifications';

const styles = {

  topLevel: style({
    ...flex.full,
    ...position.relative,
    border: 'solid 20px #80b0d4',

    $nest: {
      '&::before': {
        content: `'top-level'`,
        ...position.absolute.full,
        top: '-20px',
        textAlign: 'center',
      },
    },
  }),

  middleLevel: style({
    ...flex.full,
    ...position.relative,
    margin: '150px',
    border: 'solid 20px #80d49f',

    $nest: {
      '&::before': {
        content: `'middle-level'`,
        ...position.absolute.full,
        top: '-20px',
        textAlign: 'center',
      },
    },
  }),

  bottomLevel: style({
    ...flex.full,
    ...position.relative,
    margin: '150px',
    border: 'solid 20px #cebea5',

    $nest: {
      '&::before': {
        content: `'bottom-level'`,
        ...position.absolute.full,
        top: '-20px',
        textAlign: 'center',
      },
    },
  }),

  buttons: style({
    ...flex.full.wrap.align({ vertical: 'center', horizontal: 'center' }),
    justifyContent: 'space-evenly',
  }),

};

const MainPanel: FunctionComponent = () => {
  const [{ hostId, mode, isModal, isOpen, variant }, setState] = useState({
    hostId: 'bottom-level', mode: NotificationModes.Dialog, isModal: false, isOpen: false, variant: Variants.Pending,
  });
  const notify = useNotifications();

  const changeHost = useBound((event: ChangeEvent<{ value: string }>) => {
    const newHost = event.target.value;
    setState(s => ({ ...s, hostId: newHost }));
  });

  const changeMode = useBound((event: ChangeEvent<{ value: string }>) => {
    const newMode = parseInt(event.target.value, 10);
    setState(s => ({ ...s, mode: newMode }));
  });

  const changeModal = useBound((event: ChangeEvent<HTMLInputElement>) => {
    const newIsModal = event.target.checked;
    setState(s => ({ ...s, isModal: newIsModal }));
  });

  const changeVariant = useBound((event: ChangeEvent<HTMLInputElement>) => {
    const newVariant = parseInt(event.target.value, 10);
    setState(s => ({ ...s, variant: newVariant }));
  });

  const showDialog = useBound(async () => {
    setState(s => ({ ...s, isOpen: true }));
    await notify({
      title: 'This is the title!',
      message: (<>This is the&nbsp;<span style={{ color: 'green' }}>message</span>&nbsp;part of the dialog</>),
      mode,
      isModal,
      variant,
      buttons: ({ renderCloseButton }) => isModal ? renderCloseButton() : null,
    }, hostId).untilClosed();
    setState(s => ({ ...s, isOpen: false }));
  });

  return (
    <div className={styles.buttons}>
      <FormControl>
        <InputLabel htmlFor="host">Host</InputLabel>
        <Select
          value={hostId}
          onChange={changeHost}
          inputProps={{ id: 'host', name: 'host' }}
        >
          <MenuItem value="top-level">Top-Level</MenuItem>
          <MenuItem value="middle-level">Middle-Level</MenuItem>
          <MenuItem value="bottom-level">Bottom-Level</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="mode">Mode</InputLabel>
        <Select
          value={mode}
          onChange={changeMode}
          inputProps={{ id: 'mode', name: 'mode' }}
        >
          <MenuItem value="0">Dialog</MenuItem>
          <MenuItem value="1">Toaster</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="variant">Variant</InputLabel>
        <Select
          value={variant}
          onChange={changeVariant}
          inputProps={{ id: 'variant', name: 'variant' }}
        >
          {Variants.map(item => (<MenuItem key={`variant-${item}`} value={item.toString()}>{Variants[item]}</MenuItem>))}
        </Select>
      </FormControl>
      <FormControlLabel
        control={<Switch checked={isModal} onChange={changeModal} />}
        label="Is Modal"
      />
      <Button onClick={showDialog}>Notify!</Button>
      <span style={{ width: '100px' }}>Is Open: {isOpen ? 'true' : 'false'}</span>
    </div>
  );
};

export const notificationsHarness = createHarness({ name: 'Notifications' }, () => {
  return (
    <div className={styles.topLevel}>
      <NotificationsHost id="top-level">
        <div className={styles.middleLevel}>
          <NotificationsHost id="middle-level">
            <div className={styles.bottomLevel}>
              <NotificationsHost id="bottom-level">
                <MainPanel />
              </NotificationsHost>
            </div>
          </NotificationsHost>
        </div>
      </NotificationsHost>
    </div>
  );
});
