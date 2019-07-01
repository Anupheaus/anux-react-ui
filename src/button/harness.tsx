import { createHarness } from 'anux-package';
import { Button } from './button';
import { style, flex } from '../styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { useBound } from 'anux-react-utils';
import { MenuItem } from '@material-ui/core';

const styles = {

  root: style({
    ...flex.content.wrap,
    alignItems: 'self-start',
    padding: '20px',
    justifyContent: 'space-evenly',

    $nest: {
      '&>*': {
        marginRight: '10px',
        marginBottom: '10px',
      },
    },
  }),

};

export const buttonHarness = createHarness({ name: 'Buttons' }, () => {
  const handleClick = useBound(async () => {
    await Promise.delay(10000);
  });

  return (
    <div className={styles.root}>
      <Button onClick={handleClick}>Flat Button</Button>
      <Button
        appearance="outlined"
        variant="secondary"
        onClick={handleClick}
      >Outlined Button</Button>
      <Button
        appearance="filled"
        variant="primary"
        onClick={handleClick}
      >Filled Button</Button>
      <Button
        badge={12}
        variant="secondary"
        onClick={handleClick}
      >Badge (number direct)</Button>
      <Button
        badge={<span>18</span>}
        onClick={handleClick}
      >Badge (content direct)</Button>
      <Button
        badge={{
          content: <span>15</span>,
        }}
        appearance="filled"
        variant="secondary"
        onClick={handleClick}
      >Badge with Content</Button>
      <Button
        badge={{
          value: 100,
          variant: 'secondary',
          max: 99,
        }}
        size="small"
        appearance="outlined"
        onClick={handleClick}
      >Badge with Value</Button>
      <Button
        badge={{
          content: '!',
          variant: 'error',
        }}
        size="large"
        appearance="filled"
        onClick={handleClick}
      >Badge with Error</Button>
      <Button
        badge={true}
        appearance="filled"
        onClick={handleClick}
      >Badge as dot</Button>
      <Button
        badge={false}
        appearance="filled"
        onClick={handleClick}
      >Badge as dot 2</Button>
      <Button
        appearance="filled"
        size="small"
        onClick={handleClick}
      >Small</Button>
      <Button
        appearance="outlined"
        size="large"
        variant="primary"
        onClick={handleClick}
      >Large</Button>
      <Button
        icon={<DeleteIcon />}
        onClick={handleClick}
      >With Icon</Button>
      <Button
        icon={{
          icon: <DeleteIcon />,
          position: 'right',
        }}
        appearance="outlined"
        variant="primary"
        onClick={handleClick}
      >With Icon</Button>
      <Button
        icon={<DeleteIcon />}
        size="small"
        onClick={handleClick}
      />
      <Button
        icon={<DeleteIcon />}
        onClick={handleClick}
      />
      <Button
        icon={<DeleteIcon />}
        size="large"
        onClick={handleClick}
      />
      <Button
        icon={<DeleteIcon />}
        appearance="filled"
        size="small"
        onClick={handleClick}
      />
      <Button
        icon={<DeleteIcon />}
        appearance="filled"
        variant="secondary"
        onClick={handleClick}
      />
      <Button
        badge={{
          value: 12,
          variant: 'secondary',
        }}
        icon={<DeleteIcon />}
        appearance="filled"
        variant="primary"
        size="large"
        onClick={handleClick}
      />
      <Button
        icon={<DeleteIcon />}
        appearance="filled"
        variant="primary"
        items={[
          <MenuItem key="1" onClick={handleClick}>Choice 1</MenuItem>,
          <MenuItem key="2" onClick={handleClick}>Choice 2</MenuItem>,
        ]}
        onClick={handleClick}
      >Choices!</Button>
      <Button
        icon={<DeleteIcon />}
        appearance="filled"
        variant="primary"
        items={[
          <MenuItem key="1" onClick={handleClick}>Choice 1</MenuItem>,
          <MenuItem key="2" onClick={handleClick}>Choice 2</MenuItem>,
        ]}
        onClick={handleClick}
      />
    </div>
  );
});
